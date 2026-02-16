import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

interface BallDef {
  n: number;
  c: string;
  t: string;
  s: boolean;
}

interface BallObj {
  mesh: THREE.Mesh;
  target: THREE.Vector2;
  pos: THREE.Vector2;
  vel: THREE.Vector2;
}

const BALLS: BallDef[] = [
  { n: 1, c: "#3848FE", t: "ניהול כספים", s: false },
  { n: 2, c: "#000000", t: "משכורות", s: false },
  { n: 3, c: "#3848FE", t: "תזרים מזומנים", s: false },
  { n: 4, c: "#000000", t: "חשבוניות", s: false },
  { n: 5, c: "#3848FE", t: "תקציב שנתי", s: false },
  { n: 6, c: "#000000", t: "דוחות כספיים", s: false },
  { n: 7, c: "#3848FE", t: "גבייה", s: false },
  { n: 8, c: "#000000", t: "תפעול", s: false },
  { n: 9, c: "#3848FE", t: "ספקים", s: true },
  { n: 10, c: "#000000", t: "הנהלת חשבונות", s: true },
  { n: 11, c: "#3848FE", t: 'מע"מ', s: true },
  { n: 12, c: "#000000", t: "ביטוחים", s: true },
  { n: 13, c: "#3848FE", t: "חוזים", s: true },
  { n: 14, c: "#000000", t: "הסכמי שכר", s: true },
  { n: 15, c: "#3848FE", t: "תכנון פיננסי", s: true },
];

function makeTex(ball: BallDef): THREE.CanvasTexture {
  const S = 512;
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const x = cv.getContext("2d")!;

  if (!ball.s) {
    x.fillStyle = ball.c;
    x.fillRect(0, 0, S, S);
  } else {
    x.fillStyle = "#FFFFFF";
    x.fillRect(0, 0, S, S);
    x.fillStyle = ball.c;
    x.fillRect(0, S * 0.28, S, S * 0.44);
  }

  x.beginPath();
  x.arc(S / 2, S / 2, S * 0.2, 0, Math.PI * 2);
  x.fillStyle = "#FFFFFF";
  x.fill();

  x.fillStyle = "#000000";
  x.font = `bold ${S * 0.16}px Arial`;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText(String(ball.n), S / 2, S / 2);

  x.fillStyle = "#FFFFFF";
  x.font = `bold ${S * 0.08}px Arial, sans-serif`;
  x.fillText(ball.t, S / 2, S * 0.82);

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

export function initHero3D(canvasEl: HTMLCanvasElement): () => void {
  const box = canvasEl.parentElement!;
  let W = box.clientWidth;
  let H = box.clientHeight;

  // ──────────────── RENDERER ────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
    antialias: true,
  });
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();

  // ──────────────── ENVIRONMENT MAP (critical for glossy 3D look) ────────────────
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromScene(new RoomEnvironment()).texture;
  scene.environment = envMap;
  pmremGenerator.dispose();

  // ──────────────── CAMERA — PerspectiveCamera for depth ────────────────
  const cam = new THREE.PerspectiveCamera(35, W / H, 0.1, 500);
  cam.position.set(0, 55, 30);
  cam.lookAt(0, 0, -2);

  // ──────────────── LIGHTS ────────────────
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  const key = new THREE.PointLight(0xffffff, 2.5, 200);
  key.position.set(8, 40, 8);
  scene.add(key);

  const fill = new THREE.PointLight(0xffffff, 1.0, 200);
  fill.position.set(-10, 30, -6);
  scene.add(fill);

  const rim = new THREE.PointLight(0xffffff, 0.6, 200);
  rim.position.set(0, 20, -15);
  scene.add(rim);

  // ──────────────── CREATE MESHES ────────────────
  const RADIUS = 3.2;
  const geo = new THREE.SphereGeometry(RADIUS, 64, 64);

  // Shadow disc geometry (shared)
  const shadowGeo = new THREE.CircleGeometry(RADIUS * 1.1, 32);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });

  // Triangle target positions (5 rows, 1+2+3+4+5 = 15)
  const targets: { x: number; z: number }[] = [];
  const sp = RADIUS * 2.15;
  for (let row = 0; row < 5; row++) {
    const n = row + 1;
    const z = -row * sp * 0.866;
    const x0 = (-(n - 1) * sp) / 2;
    for (let col = 0; col < n; col++) {
      targets.push({ x: x0 + col * sp, z });
    }
  }

  const balls: BallObj[] = [];

  BALLS.forEach((bd, i) => {
    const mat = new THREE.MeshStandardMaterial({
      map: makeTex(bd),
      roughness: 0.08,
      metalness: 0.25,
      envMapIntensity: 1.5,
      transparent: false,
    });

    const mesh = new THREE.Mesh(geo, mat);

    // Shadow disc — child of ball, sits on floor
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -RADIUS - 0.01;
    mesh.add(shadow);

    // Start off-screen
    const ang = Math.random() * Math.PI * 2;
    const dist = 45 + Math.random() * 20;
    mesh.position.set(Math.cos(ang) * dist, 0, Math.sin(ang) * dist);

    scene.add(mesh);

    balls.push({
      mesh,
      target: new THREE.Vector2(targets[i].x, targets[i].z),
      pos: new THREE.Vector2(mesh.position.x, mesh.position.z),
      vel: new THREE.Vector2(0, 0),
    });
  });

  // ──────────────── PHYSICS ────────────────
  const ATTRACT = 0.002;
  const DAMP = 0.992;
  const M_REPEL = 3.0;
  const M_RAD = 10.0;
  const MAX_V = 0.06;
  const SETTLE = 0.005;
  const COL_RESP = 0.8;
  const DIAM = RADIUS * 2;

  // ──────────────── MOUSE (Raycaster-based for PerspectiveCamera) ────────────────
  const mouse = new THREE.Vector2(9999, 9999);
  let mActive = false;
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const mouse3DPoint = new THREE.Vector3();

  function onMouseMove(e: MouseEvent) {
    const r = box.getBoundingClientRect();
    mouseNDC.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouseNDC.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(mouseNDC, cam);
    raycaster.ray.intersectPlane(groundPlane, mouse3DPoint);
    if (mouse3DPoint) {
      mouse.set(mouse3DPoint.x, mouse3DPoint.z);
    }
    mActive = true;
  }

  function onMouseLeave() {
    mActive = false;
    mouse.set(9999, 9999);
  }

  function onTouchMove(e: TouchEvent) {
    const t = e.touches[0];
    if (!t) return;
    const r = box.getBoundingClientRect();
    mouseNDC.x = ((t.clientX - r.left) / r.width) * 2 - 1;
    mouseNDC.y = -((t.clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(mouseNDC, cam);
    raycaster.ray.intersectPlane(groundPlane, mouse3DPoint);
    if (mouse3DPoint) {
      mouse.set(mouse3DPoint.x, mouse3DPoint.z);
    }
    mActive = true;
  }

  function onTouchEnd() {
    mActive = false;
    mouse.set(9999, 9999);
  }

  canvasEl.addEventListener("mousemove", onMouseMove as EventListener);
  canvasEl.addEventListener("mouseleave", onMouseLeave);
  canvasEl.addEventListener("touchmove", onTouchMove as EventListener, {
    passive: true,
  });
  canvasEl.addEventListener("touchend", onTouchEnd);

  // ──────────────── ANIMATION LOOP ────────────────
  let stopped = false;
  let animId = 0;

  function tick() {
    if (stopped) return;
    animId = requestAnimationFrame(tick);

    for (const b of balls) {
      const toT = new THREE.Vector2().subVectors(b.target, b.pos);
      const d = toT.length();
      if (d > SETTLE) {
        toT.normalize().multiplyScalar(ATTRACT * d);
        b.vel.add(toT);
      }

      if (mActive) {
        const fromM = new THREE.Vector2().subVectors(b.pos, mouse);
        const md = fromM.length();
        if (md < M_RAD && md > 0.01) {
          fromM.normalize().multiplyScalar(M_REPEL * (1 - md / M_RAD) * 0.1);
          b.vel.add(fromM);
        }
      }

      b.vel.multiplyScalar(DAMP);
      const spd = b.vel.length();
      if (spd > MAX_V) b.vel.multiplyScalar(MAX_V / spd);
    }

    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i],
          b = balls[j];
        const diff = new THREE.Vector2().subVectors(a.pos, b.pos);
        const dist = diff.length();
        if (dist < DIAM && dist > 0.001) {
          const n = diff.normalize();
          const overlap = DIAM - dist;
          a.pos.add(n.clone().multiplyScalar(overlap / 2));
          b.pos.sub(n.clone().multiplyScalar(overlap / 2));
          const rv = new THREE.Vector2().subVectors(a.vel, b.vel);
          const van = rv.dot(n);
          if (van < 0) {
            const imp = n.clone().multiplyScalar(van * COL_RESP);
            a.vel.sub(imp);
            b.vel.add(imp);
          }
        }
      }
    }

    for (const b of balls) {
      b.pos.add(b.vel);
      b.mesh.position.x = b.pos.x;
      b.mesh.position.z = b.pos.y;
      const spd = b.vel.length();
      if (spd > 0.001) {
        const axis = new THREE.Vector3(-b.vel.y, 0, b.vel.x).normalize();
        b.mesh.rotateOnWorldAxis(axis, (spd / RADIUS) * 0.4);
      }
    }

    renderer.render(scene, cam);
  }

  tick();

  // ──────────────── RESIZE ────────────────
  function onResize() {
    W = box.clientWidth;
    H = box.clientHeight;
    cam.aspect = W / H;
    cam.updateProjectionMatrix();
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  }

  window.addEventListener("resize", onResize);

  // ──────────────── CLEANUP ────────────────
  return () => {
    stopped = true;
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", onResize);
    canvasEl.removeEventListener("mousemove", onMouseMove as EventListener);
    canvasEl.removeEventListener("mouseleave", onMouseLeave);
    canvasEl.removeEventListener("touchmove", onTouchMove as EventListener);
    canvasEl.removeEventListener("touchend", onTouchEnd);

    envMap.dispose();

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
