import * as THREE from "three";
import { CAMERA } from "./constants";

export class SceneManager {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  isVisible = true;

  private container: HTMLDivElement;
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;

  constructor(container: HTMLDivElement) {
    this.container = container;

    // Scene — transparent, no background
    this.scene = new THREE.Scene();
    this.scene.background = null;

    // Camera
    const { width, height } = container.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(
      CAMERA.fov,
      width / height,
      CAMERA.near,
      CAMERA.far
    );
    this.camera.position.set(...CAMERA.position);
    this.camera.lookAt(...CAMERA.lookAt);

    // Renderer — transparent canvas
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);

    // Canvas CSS — absolute-fill
    const canvas = this.renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.prepend(canvas);

    // Lights — simple setup, no shadows
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 8, 10);
    this.scene.add(dir);

    // Soft fill from below
    const fill = new THREE.DirectionalLight(0xc4c8ff, 0.3);
    fill.position.set(-3, -5, 5);
    this.scene.add(fill);

    // Resize
    this.resizeObserver = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      if (w === 0 || h === 0) return;
      this.resize(w, h);
    });
    this.resizeObserver.observe(container);

    // Visibility
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        this.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    this.intersectionObserver.observe(container);
  }

  resize(w: number, h: number) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();

    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });

    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
