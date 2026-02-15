import * as THREE from "three";
import * as CANNON from "cannon-es";
import { PHYSICS } from "./constants";
import { PhysicsWorld } from "./PhysicsWorld";

export class MouseInteraction {
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2(9999, 9999);
  private camera: THREE.PerspectiveCamera;
  private meshes: THREE.Mesh[];
  private physics: PhysicsWorld;
  private canvas: HTMLCanvasElement;
  private enabled = true;
  private lastTime = 0;

  private onPointerMove: (e: PointerEvent) => void;
  private onPointerDown: (e: PointerEvent) => void;

  constructor(
    canvas: HTMLCanvasElement,
    camera: THREE.PerspectiveCamera,
    physics: PhysicsWorld
  ) {
    this.canvas = canvas;
    this.camera = camera;
    this.physics = physics;
    this.meshes = physics.getAllMeshes();

    this.onPointerMove = (e: PointerEvent) => {
      if (!this.enabled) return;
      const rect = canvas.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.applyForce();
    };

    this.onPointerDown = (e: PointerEvent) => {
      if (!this.enabled) return;
      const rect = canvas.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.applyForce(2); // stronger on click/tap
    };

    canvas.addEventListener("pointermove", this.onPointerMove);
    canvas.addEventListener("pointerdown", this.onPointerDown);
  }

  private applyForce(multiplier = 1) {
    const now = performance.now();
    if (now - this.lastTime < 50) return; // throttle
    this.lastTime = now;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.meshes);
    if (hits.length === 0) return;

    const hit = hits[0];
    const body = this.physics.getBodyForMesh(hit.object as THREE.Mesh);
    if (!body) return;

    const dir = this.raycaster.ray.direction.clone().multiplyScalar(
      PHYSICS.mouseForce * multiplier
    );
    const contactPoint = new CANNON.Vec3(
      hit.point.x - body.position.x,
      hit.point.y - body.position.y,
      hit.point.z - body.position.z
    );
    body.applyImpulse(
      new CANNON.Vec3(dir.x, Math.abs(dir.y) * 0.5, dir.z),
      contactPoint
    );
  }

  setEnabled(v: boolean) {
    this.enabled = v;
  }

  dispose() {
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
  }
}
