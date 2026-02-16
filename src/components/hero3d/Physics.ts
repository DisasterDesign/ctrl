import * as THREE from "three";
import { PHYSICS, BLUR } from "./constants";
import type { GlassObject } from "./GlassObjects";

export class PhysicsController {
  objects: GlassObject[] = [];
  blurAmount = 0;

  private mouseWorld = new THREE.Vector3();
  private mouseActive = false;
  private mouseIdleTimer = 0;
  private lastMouseMove = 0;
  private raycaster = new THREE.Raycaster();
  private mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private mouseNDC = new THREE.Vector2();
  private camera: THREE.PerspectiveCamera;
  private canvas: HTMLCanvasElement;
  private disposed = false;

  private onPointerMove: (e: PointerEvent) => void;
  private onPointerLeave: () => void;
  private onTouchMove: (e: TouchEvent) => void;
  private onTouchEnd: () => void;

  constructor(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) {
    this.camera = camera;
    this.canvas = canvas;

    this.onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // handled separately
      this.updateMouseNDC(e.clientX, e.clientY);
      this.projectMouse();
      this.mouseActive = true;
      this.lastMouseMove = performance.now();
    };

    this.onPointerLeave = () => {
      this.mouseActive = false;
    };

    this.onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      this.updateMouseNDC(touch.clientX, touch.clientY);
      this.projectMouse();
      this.mouseActive = true;
      this.lastMouseMove = performance.now();
    };

    this.onTouchEnd = () => {
      this.mouseActive = false;
    };

    canvas.addEventListener("pointermove", this.onPointerMove);
    canvas.addEventListener("pointerleave", this.onPointerLeave);
    canvas.addEventListener("touchmove", this.onTouchMove, { passive: true });
    canvas.addEventListener("touchend", this.onTouchEnd);
  }

  private updateMouseNDC(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.mouseNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  }

  private projectMouse() {
    this.raycaster.setFromCamera(this.mouseNDC, this.camera);
    this.raycaster.ray.intersectPlane(this.mousePlane, this.mouseWorld);
  }

  update(dt: number) {
    if (this.disposed) return;

    const now = performance.now();

    // Auto-idle after timeout
    if (this.mouseActive && now - this.lastMouseMove > PHYSICS.mouseIdleTimeout) {
      this.mouseActive = false;
    }

    const force = new THREE.Vector3();
    const diff = new THREE.Vector3();

    for (const obj of this.objects) {
      force.set(0, 0, 0);

      // 1. Attract toward home
      diff.copy(obj.home).sub(obj.mesh.position);
      force.addScaledVector(diff, PHYSICS.attractStrength);

      // 2. Repel from mouse
      if (this.mouseActive) {
        diff.copy(obj.mesh.position).sub(this.mouseWorld);
        const dist = diff.length();
        if (dist < PHYSICS.repelRadius && dist > 0.01) {
          diff.normalize();
          const repel = PHYSICS.repelForce / (dist * dist);
          force.addScaledVector(diff, repel);
        }
      }

      // 3. Update velocity with damping
      obj.velocity.multiplyScalar(PHYSICS.damping);
      obj.velocity.addScaledVector(force, dt);

      // Clamp velocity
      if (obj.velocity.length() > PHYSICS.maxVelocity) {
        obj.velocity.setLength(PHYSICS.maxVelocity);
      }

      // 4. Update position
      obj.mesh.position.addScaledVector(obj.velocity, dt);

      // 5. Continuous rotation
      obj.mesh.rotation.x += obj.rotationSpeed.x;
      obj.mesh.rotation.y += obj.rotationSpeed.y;
      obj.mesh.rotation.z += obj.rotationSpeed.z;
    }

    // Update blur
    const targetBlur = this.mouseActive ? BLUR.max : BLUR.min;
    const lerpSpeed = this.mouseActive ? BLUR.lerpUp : BLUR.lerpDown;
    this.blurAmount += (targetBlur - this.blurAmount) * lerpSpeed;
  }

  dispose() {
    this.disposed = true;
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerleave", this.onPointerLeave);
    this.canvas.removeEventListener("touchmove", this.onTouchMove);
    this.canvas.removeEventListener("touchend", this.onTouchEnd);
  }
}
