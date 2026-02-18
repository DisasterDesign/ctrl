import * as THREE from "three";

/* ────────── CONFIGURATION ────────── */

// Ball setup
const RADIUS = 5.0;
const GAP = 0.3;
const ROWS = 5;

// Physics — Lusion-inspired: fluid, organic, premium feel
const ATTRACT = 0.003;
const DAMP = 0.965;
const REPEL = 14.0;
const REPEL_RAD = 45.0;
const MAX_V = 0.6;
const SETTLE = 0.2;
const COLLISION_PUSH = 0.3;

// Camera
const CAM_HEIGHT = 50;
const FOV = 40;

// Colors — CLARITY brand
const BLACK = "#808080";
const WHITE = "#f0f0f0";
const BLUE  = "#3848FE";

/* ────────── BALL DEFINITIONS ────────── */

interface BallDef {
  color: string;
}

const DARK = "#1a1a1a"; // true black for matte balls

// 3 blue, 5 gray, 3 white, 2 dark matte, 2 random — shuffled
const BALL_POOL: string[] = [
  BLUE, BLUE, BLUE,
  BLACK, BLACK, BLACK, BLACK, BLACK,
  WHITE, WHITE, WHITE,
  DARK, DARK,
];
// Fill remaining randomly
while (BALL_POOL.length < 15) {
  BALL_POOL.push([BLUE, BLACK, WHITE][Math.floor(Math.random() * 3)]);
}
// Shuffle (Fisher-Yates)
for (let i = BALL_POOL.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [BALL_POOL[i], BALL_POOL[j]] = [BALL_POOL[j], BALL_POOL[i]];
}
const BALLS: BallDef[] = BALL_POOL.map((color) => ({ color }));

/* ────────── TRIANGLE TARGET POSITIONS ────────── */

function calcTriangleTargets(): THREE.Vector2[] {
  const targets: THREE.Vector2[] = [];
  const step = RADIUS * 2 + GAP;
  for (let row = 0; row < ROWS; row++) {
    const count = row + 1;
    const offsetX = -(count - 1) * step * 0.5;
    for (let col = 0; col < count; col++) {
      const x = offsetX + col * step;
      const z = (row - (ROWS - 1) / 2) * step * 0.866;
      targets.push(new THREE.Vector2(x, z));
    }
  }
  return targets;
}

/* ────────── MAIN INIT ────────── */

export function initScene(canvas: HTMLCanvasElement, container: HTMLElement): () => void {
  /* ──── Renderer ──── */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0x000000, 0);
  try {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
  } catch {
    renderer.toneMapping = THREE.LinearToneMapping;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* ──── Scene ──── */
  const scene = new THREE.Scene();

  /* ──── Camera — 90° top-down ──── */
  const camera = new THREE.PerspectiveCamera(FOV, 2, 0.1, 500);
  camera.position.set(0, CAM_HEIGHT, 0);
  camera.lookAt(0, 0, 0);

  /* ──── Lighting ──── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.1));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(12, 50, 10);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-10, 40, -8);
  scene.add(fillLight);

  /* ──── Full-screen background plane ──── */
  const bgMat = new THREE.MeshStandardMaterial({
    color: 0xbfbfbf,
    roughness: 0.0,
    metalness: 1.0,
  });
  let bgMesh: THREE.Mesh | null = null;

  function updateBackground() {
    if (bgMesh) {
      bgMesh.geometry.dispose();
      scene.remove(bgMesh);
    }
    const vFov = (camera.fov * Math.PI) / 180;
    const h = 2 * Math.tan(vFov / 2) * CAM_HEIGHT;
    const w = h * camera.aspect;

    const bgGeo = new THREE.PlaneGeometry(w * 1.1, h * 1.1);
    bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.rotation.x = -Math.PI / 2;
    bgMesh.position.y = -0.5;
    scene.add(bgMesh);
  }

  /* ──── Ball geometry (shared) ──── */
  const geo = new THREE.SphereGeometry(RADIUS, 32, 32);

  /* ──── Triangle targets ──── */
  const targets = calcTriangleTargets();

  /* ──── Ball state ──── */
  interface BallState {
    mesh: THREE.Mesh;
    pos: THREE.Vector2;
    vel: THREE.Vector2;
    target: THREE.Vector2;
  }

  const balls: BallState[] = [];

  /* ──── Create balls — randomly matte or glass ──── */
  BALLS.forEach((bd, i) => {
    const isDark = bd.color === DARK;
    const isWhite = bd.color === WHITE;
    const isGlass = isDark ? true : isWhite ? false : Math.random() > 0.5;

    const mat = new THREE.MeshPhysicalMaterial({
      color: bd.color,
      roughness: isGlass ? 0.02 : isWhite ? 0.6 : 0.9,
      metalness: isGlass ? 0.9 : 0.0,
      clearcoat: isGlass ? 1.0 : 0,
      clearcoatRoughness: 0.01,
      reflectivity: isGlass ? 1.0 : 0.2,
    });

    const mesh = new THREE.Mesh(geo, mat);

    // Random start position
    const angle = Math.random() * Math.PI * 2;
    const dist = 15 + Math.random() * 25;
    const startX = Math.cos(angle) * dist;
    const startZ = Math.sin(angle) * dist;

    mesh.position.set(startX, 0, startZ);

    scene.add(mesh);

    balls.push({
      mesh,
      pos: new THREE.Vector2(startX, startZ),
      vel: new THREE.Vector2(0, 0),
      target: targets[i],
    });
  });

  /* ──── Mouse tracking (smoothed) ──── */
  const mouse = new THREE.Vector2(9999, 9999);
  const smoothMouse = new THREE.Vector2(9999, 9999);
  let mouseActive = false;

  const rayPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const raycaster = new THREE.Raycaster();
  const ndcVec = new THREE.Vector2();
  const hitVec = new THREE.Vector3();

  function onPointerMove(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    ndcVec.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(ndcVec, camera);
    if (raycaster.ray.intersectPlane(rayPlane, hitVec)) {
      mouse.set(hitVec.x, hitVec.z);
      mouseActive = true;
    }
  }

  function onPointerLeave() {
    mouseActive = false;
    mouse.set(9999, 9999);
  }

  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", onPointerLeave);

  /* ──── Resize handler ──── */
  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    updateBackground();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  /* ──── Physics step ──── */
  const tmp = new THREE.Vector2();

  function physicsTick() {
    // Smooth mouse position (lerp towards real cursor)
    if (mouseActive) {
      smoothMouse.lerp(mouse, 0.12);
    } else {
      smoothMouse.set(9999, 9999);
    }

    const time = performance.now() * 0.001;

    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];

      // 1. Attract to target
      tmp.copy(ball.target).sub(ball.pos);
      const distToTarget = tmp.length();

      if (distToTarget > SETTLE) {
        tmp.multiplyScalar(ATTRACT);
        ball.vel.add(tmp);
      } else {
        ball.vel.multiplyScalar(0.9);
      }

      // 2. Mouse repulsion — smooth parabolic falloff
      if (mouseActive) {
        tmp.copy(ball.pos).sub(smoothMouse);
        const dm = tmp.length();
        if (dm < REPEL_RAD && dm > 0.01) {
          const falloff = (1 - dm / REPEL_RAD) ** 2;
          tmp.normalize().multiplyScalar(REPEL * falloff);
          ball.vel.add(tmp);
        }
      }

      // 3. Ball-to-ball collision
      for (const other of balls) {
        if (other === ball) continue;
        tmp.copy(ball.pos).sub(other.pos);
        const dist = tmp.length();
        const minDist = RADIUS * 2;
        if (dist < minDist && dist > 0.01) {
          const overlap = minDist - dist;
          tmp.normalize().multiplyScalar(overlap * COLLISION_PUSH);
          ball.vel.add(tmp);
        }
      }

      // 4. Organic idle breathing — subtle per-ball drift
      const phase = i * 1.7;
      ball.vel.x += Math.sin(time * 0.4 + phase) * 0.002;
      ball.vel.y += Math.cos(time * 0.3 + phase * 0.7) * 0.002;

      // 5. Damping
      ball.vel.multiplyScalar(DAMP);

      // 6. Speed limit
      if (ball.vel.length() > MAX_V) {
        ball.vel.normalize().multiplyScalar(MAX_V);
      }

      // 7. Update position
      ball.pos.add(ball.vel);

      // 8. Sync mesh position
      ball.mesh.position.x = ball.pos.x;
      ball.mesh.position.z = ball.pos.y;

      // 9. Subtle tilt based on movement
      const speed = ball.vel.length();
      if (speed > 0.01) {
        ball.mesh.rotation.z += ball.vel.x * 0.02;
        ball.mesh.rotation.x += ball.vel.y * 0.02;
      } else {
        ball.mesh.rotation.x *= 0.95;
        ball.mesh.rotation.z *= 0.95;
      }
    }
  }

  /* ──── Animation loop — pauses when off-screen ──── */
  let raf = 0;
  let running = false;

  function loop() {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    physicsTick();
    renderer.render(scene, camera);
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  // Only run when visible
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    },
    { threshold: 0 }
  );
  io.observe(container);

  /* ──── Cleanup ──── */
  return () => {
    stop();
    io.disconnect();
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerleave", onPointerLeave);
    ro.disconnect();
    renderer.dispose();
    geo.dispose();
    if (bgMesh) bgMesh.geometry.dispose();
    bgMat.dispose();
    balls.forEach((b) => {
      (b.mesh.material as THREE.MeshPhysicalMaterial).dispose();
    });
  };
}
