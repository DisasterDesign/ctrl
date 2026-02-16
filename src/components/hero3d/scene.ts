import * as THREE from "three";

interface SceneObject {
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  vel: THREE.Vector3;
  rotSpeed: THREE.Vector3;
}

export function initHero3D(
  canvasElement: HTMLCanvasElement,
  overlayElement: HTMLDivElement
): () => void {
  // ============ RENDERER ============
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // ============ SCENE ============
  const scene = new THREE.Scene();

  // ============ CAMERA ============
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 14);

  // ============ LIGHTS ============
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
  mainLight.position.set(5, 8, 5);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0x3848fe, 0.2);
  fillLight.position.set(-5, 2, -3);
  scene.add(fillLight);

  // ============ MATERIALS ============
  function glassMat(color: number, opacity: number) {
    return new THREE.MeshPhysicalMaterial({
      color,
      transparent: true,
      opacity,
      roughness: 0.15,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
    });
  }

  const materials = [
    glassMat(0x3848fe, 0.7),
    glassMat(0x3848fe, 0.5),
    glassMat(0x6b7cff, 0.6),
    glassMat(0xffffff, 0.45),
    glassMat(0xc0c4e0, 0.35),
    glassMat(0x8b92ff, 0.5),
  ];

  // ============ GEOMETRIES ============
  const geometries: THREE.BufferGeometry[] = [
    new THREE.IcosahedronGeometry(0.5, 0),
    new THREE.OctahedronGeometry(0.45, 0),
    new THREE.TorusGeometry(0.35, 0.15, 16, 32),
    new THREE.BoxGeometry(0.55, 0.55, 0.55),
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.TetrahedronGeometry(0.5, 0),
    new THREE.CylinderGeometry(0.25, 0.25, 0.5, 8),
    new THREE.DodecahedronGeometry(0.4, 0),
  ];

  // ============ CREATE OBJECTS ============
  const isMobile = window.innerWidth < 768;
  const NUM = isMobile ? 15 : 28;
  const objects: SceneObject[] = [];

  for (let i = 0; i < NUM; i++) {
    const geo = geometries[i % geometries.length];
    const mat = materials[i % materials.length];
    const mesh = new THREE.Mesh(geo, mat);

    const spread = isMobile ? 4 : 6;
    mesh.position.set(
      (Math.random() - 0.5) * spread * 2,
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * 3
    );

    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    const s = 0.5 + Math.random() * 0.7;
    mesh.scale.setScalar(s);

    scene.add(mesh);

    objects.push({
      mesh,
      home: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      ),
      vel: new THREE.Vector3(),
      rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008
      ),
    });
  }

  // ============ MOUSE ============
  const mouse3D = new THREE.Vector3(999, 999, 0);
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2(999, 999);
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  let mouseActive = false;
  let idleTime = 0;

  // Use parent section for mouse events so CTAs remain clickable
  const eventTarget = canvasElement.parentElement ?? canvasElement;

  function onMouseMove(e: MouseEvent) {
    mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseNDC, camera);
    raycaster.ray.intersectPlane(plane, mouse3D);
    mouseActive = true;
    idleTime = 0;
  }

  function onMouseLeave() {
    mouseActive = false;
    mouse3D.set(999, 999, 0);
  }

  function onTouchMove(e: TouchEvent) {
    const t = e.touches[0];
    if (!t) return;
    mouseNDC.x = (t.clientX / window.innerWidth) * 2 - 1;
    mouseNDC.y = -(t.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseNDC, camera);
    raycaster.ray.intersectPlane(plane, mouse3D);
    mouseActive = true;
    idleTime = 0;
  }

  function onTouchEnd() {
    mouseActive = false;
    mouse3D.set(999, 999, 0);
  }

  eventTarget.addEventListener("mousemove", onMouseMove as EventListener);
  eventTarget.addEventListener("mouseleave", onMouseLeave);
  eventTarget.addEventListener("touchmove", onTouchMove as EventListener, {
    passive: true,
  });
  eventTarget.addEventListener("touchend", onTouchEnd);

  // ============ PHYSICS CONSTANTS ============
  const ATTRACT = 0.015;
  const REPEL = 0.2;
  const REPEL_RADIUS = 3.5;
  const DAMPING = 0.94;
  const MAX_VEL = 0.25;

  // ============ GLASS OVERLAY ============
  let currentBlur = 6;

  // ============ ANIMATION LOOP ============
  const clock = new THREE.Clock();
  let animationId = 0;
  let stopped = false;

  function animate() {
    if (stopped) return;
    animationId = requestAnimationFrame(animate);
    const dt = clock.getDelta();

    // Idle timer
    if (mouseActive) {
      idleTime += dt;
      if (idleTime > 1.5) mouseActive = false;
    }

    // Blur
    const targetBlur = mouseActive ? 1 : 8;
    currentBlur += (targetBlur - currentBlur) * 0.04;
    overlayElement.style.backdropFilter = `blur(${currentBlur}px)`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (overlayElement.style as any).webkitBackdropFilter = `blur(${currentBlur}px)`;

    // Update objects
    const toHome = new THREE.Vector3();
    const away = new THREE.Vector3();

    objects.forEach((obj) => {
      const pos = obj.mesh.position;
      const vel = obj.vel;

      // Attract to home
      toHome.subVectors(obj.home, pos);
      const homeDist = toHome.length();
      toHome.normalize().multiplyScalar(ATTRACT * homeDist);
      vel.add(toHome);

      // Repel from mouse
      if (mouseActive) {
        away.subVectors(pos, mouse3D);
        const dist = away.length();
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const strength = 1 - dist / REPEL_RADIUS;
          away.normalize().multiplyScalar(REPEL * strength * strength);
          vel.add(away);
        }
      }

      // Damping + clamp
      vel.multiplyScalar(DAMPING);
      if (vel.length() > MAX_VEL) vel.normalize().multiplyScalar(MAX_VEL);

      // Apply
      pos.add(vel);

      // Rotate
      const activity = vel.length() * 3;
      obj.mesh.rotation.x += obj.rotSpeed.x + activity * 0.01;
      obj.mesh.rotation.y += obj.rotSpeed.y + activity * 0.01;
      obj.mesh.rotation.z += obj.rotSpeed.z;
    });

    renderer.render(scene, camera);
  }

  animate();

  // ============ RESIZE ============
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  window.addEventListener("resize", onResize);

  // ============ CLEANUP ============
  return () => {
    stopped = true;
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", onResize);
    eventTarget.removeEventListener("mousemove", onMouseMove as EventListener);
    eventTarget.removeEventListener("mouseleave", onMouseLeave);
    eventTarget.removeEventListener("touchmove", onTouchMove as EventListener);
    eventTarget.removeEventListener("touchend", onTouchEnd);

    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });

    renderer.dispose();
  };
}
