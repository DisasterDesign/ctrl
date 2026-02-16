import * as THREE from "three";

// ─── Ball definitions ───
interface BallDef { n: number; c: string; t: string; s: boolean }
interface BallObj {
  mesh: THREE.Mesh;
  shadow: THREE.Mesh;
  target: THREE.Vector2;
  pos: THREE.Vector2;
  vel: THREE.Vector2;
}

const BALLS: BallDef[] = [
  { n: 1,  c: "#3848FE", t: "ניהול כספים",     s: false },
  { n: 2,  c: "#1a1a2e", t: "משכורות",         s: false },
  { n: 3,  c: "#3848FE", t: "תזרים מזומנים",   s: false },
  { n: 4,  c: "#1a1a2e", t: "חשבוניות",        s: false },
  { n: 5,  c: "#3848FE", t: "תקציב שנתי",     s: false },
  { n: 6,  c: "#1a1a2e", t: "דוחות כספיים",    s: false },
  { n: 7,  c: "#3848FE", t: "גבייה",          s: false },
  { n: 8,  c: "#1a1a2e", t: "תפעול",          s: false },
  { n: 9,  c: "#3848FE", t: "ספקים",          s: true },
  { n: 10, c: "#1a1a2e", t: "הנהלת חשבונות",  s: true },
  { n: 11, c: "#3848FE", t: 'מע"מ',           s: true },
  { n: 12, c: "#1a1a2e", t: "ביטוחים",        s: true },
  { n: 13, c: "#3848FE", t: "חוזים",          s: true },
  { n: 14, c: "#1a1a2e", t: "הסכמי שכר",      s: true },
  { n: 15, c: "#3848FE", t: "תכנון פיננסי",   s: true },
];

// ─── Procedural Matcap Generator ───
// Creates a glossy sphere texture procedurally — no external files needed
function createMatcapCanvas(): HTMLCanvasElement {
  const size = 512;
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const ctx = cv.getContext("2d")!;
  const cx = size / 2, cy = size / 2, r = size / 2;

  // Background — transparent/black outside sphere
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, size, size);

  // Main sphere gradient — highlight offset to upper-left
  const grad = ctx.createRadialGradient(
    cx * 0.65, cy * 0.6, r * 0.02,  // highlight center (upper-left)
    cx, cy, r * 0.95                  // sphere edge
  );
  grad.addColorStop(0.0, "#ffffff");   // bright highlight
  grad.addColorStop(0.15, "#f0f0f5"); // near-highlight
  grad.addColorStop(0.35, "#c8c8d8"); // mid-light
  grad.addColorStop(0.55, "#8888a0"); // mid-tone
  grad.addColorStop(0.75, "#505068"); // shadow zone
  grad.addColorStop(0.90, "#2a2a3a"); // deep shadow
  grad.addColorStop(1.0, "#101018");  // edge (almost black)

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.95, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Secondary highlight — subtle rim light at bottom-right
  const rim = ctx.createRadialGradient(
    cx * 1.35, cy * 1.3, r * 0.01,
    cx * 1.35, cy * 1.3, r * 0.35
  );
  rim.addColorStop(0, "rgba(200, 210, 255, 0.25)");
  rim.addColorStop(1, "rgba(200, 210, 255, 0)");
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.95, 0, Math.PI * 2);
  ctx.fillStyle = rim;
  ctx.fill();

  return cv;
}

// ─── Ball Color/Text Texture ───
function makeBallMap(ball: BallDef): THREE.CanvasTexture {
  const S = 512;
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const ctx = cv.getContext("2d")!;

  if (!ball.s) {
    // SOLID ball — full color
    ctx.fillStyle = ball.c;
    ctx.fillRect(0, 0, S, S);
  } else {
    // STRIPE ball — white with color band
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = ball.c;
    ctx.fillRect(0, S * 0.25, S, S * 0.50);
  }

  // White circle for number
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Number
  ctx.fillStyle = "#000000";
  ctx.font = `bold ${S * 0.14}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(ball.n), S / 2, S / 2);

  // Label text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `bold ${S * 0.07}px Arial, sans-serif`;
  ctx.fillText(ball.t, S / 2, S * 0.82);

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

// ─── Main init ───
export function initHero3D(canvasEl: HTMLCanvasElement): () => void {
  const box = canvasEl.parentElement!;
  let W = box.clientWidth;
  let H = box.clientHeight;

  // ──── Renderer ────
  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true });
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();

  // ──── Camera — PerspectiveCamera with slight angle ────
  const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 500);
  cam.position.set(0, 65, 25);
  cam.lookAt(0, 0, -3);

  // ──── NO LIGHTS NEEDED — matcap handles all shading ────

  // ──── Matcap texture ────
  const matcapCanvas = createMatcapCanvas();
  const matcapTexture = new THREE.CanvasTexture(matcapCanvas);
  matcapTexture.needsUpdate = true;

  // ──── Ball geometry ────
  const RADIUS = 3.2;
  const geo = new THREE.SphereGeometry(RADIUS, 64, 64);

  // Shadow disc geometry (flat circle under each ball)
  const shadowGeo = new THREE.CircleGeometry(RADIUS * 1.15, 32);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
  });

  // ──── Triangle target positions (5 rows) ────
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

  // ──── Create ball meshes ────
  const balls: BallObj[] = [];

  BALLS.forEach((bd, i) => {
    // *** CRITICAL: MeshMatcapMaterial with BOTH matcap AND map ***
    const mat = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,    // provides 3D shading (highlight, shadow, edge)
      map: makeBallMap(bd),     // provides color, number, text
      transparent: false,
    });

    const mesh = new THREE.Mesh(geo, mat);

    // Shadow disc
    const shadow = new THREE.Mesh(shadowGeo, shadowMat.clone());
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -RADIUS + 0.05;
    scene.add(shadow);

    // Start off-screen
    const ang = (i / BALLS.length) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 40 + Math.random() * 20;
    const startX = Math.cos(ang) * dist;
    const startZ = Math.sin(ang) * dist;
    mesh.position.set(startX, 0, startZ);
    shadow.position.set(startX, -RADIUS + 0.05, startZ);

    scene.add(mesh);

    balls.push({
      mesh,
      shadow,
      target: new THREE.Vector2(targets[i].x, targets[i].z),
      pos: new THREE.Vector2(startX, startZ),
      vel: new THREE.Vector2(0, 0),
    });
  });

  // ──── Physics constants ────
  const ATTRACT = 0.002;
  const DAMP = 0.992;
  const M_REPEL = 3.0;
  const M_RAD = 10.0;
  const MAX_V = 0.06;
  const SETTLE = 0.005;
  const COL_RESP = 0.8;
  const DIAM = RADIUS * 2;

  // ──── Mouse ────
  const mouse = new THREE.Vector2(9999, 9999);
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hitPoint = new THREE.Vector3();
  let mActive = false;

  function updateMouse(clientX: number, clientY: number) {
    const r = box.getBoundingClientRect();
    mouseNDC.set(
      ((clientX - r.left) / r.width) * 2 - 1,
      -((clientY - r.top) / r.height) * 2 + 1
    );
    raycaster.setFromCamera(mouseNDC, cam);
    if (raycaster.ray.intersectPlane(groundPlane, hitPoint)) {
      mouse.set(hitPoint.x, hitPoint.z);
    }
    mActive = true;
  }

  function onMouseMove(e: MouseEvent) { updateMouse(e.clientX, e.clientY); }
  function onMouseLeave() { mActive = false; mouse.set(9999, 9999); }
  function onTouchMove(e: TouchEvent) {
    const t = e.touches[0];
    if (t) updateMouse(t.clientX, t.clientY);
  }
  function onTouchEnd() { mActive = false; mouse.set(9999, 9999); }

  canvasEl.addEventListener("mousemove", onMouseMove);
  canvasEl.addEventListener("mouseleave", onMouseLeave);
  canvasEl.addEventListener("touchmove", onTouchMove, { passive: true });
  canvasEl.addEventListener("touchend", onTouchEnd);

  // ──── Animation ────
  let stopped = false;
  let animId = 0;

  function tick() {
    if (stopped) return;
    animId = requestAnimationFrame(tick);

    for (const b of balls) {
      // Attract to target
      const toT = new THREE.Vector2().subVectors(b.target, b.pos);
      const d = toT.length();
      if (d > SETTLE) {
        toT.normalize().multiplyScalar(ATTRACT * d);
        b.vel.add(toT);
      }

      // Mouse repel
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

    // Collisions
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i], bb = balls[j];
        const diff = new THREE.Vector2().subVectors(a.pos, bb.pos);
        const dist = diff.length();
        if (dist < DIAM && dist > 0.001) {
          const n = diff.normalize();
          const overlap = DIAM - dist;
          a.pos.add(n.clone().multiplyScalar(overlap / 2));
          bb.pos.sub(n.clone().multiplyScalar(overlap / 2));
          const rv = new THREE.Vector2().subVectors(a.vel, bb.vel);
          const van = rv.dot(n);
          if (van < 0) {
            const imp = n.clone().multiplyScalar(van * COL_RESP);
            a.vel.sub(imp);
            bb.vel.add(imp);
          }
        }
      }
    }

    // Update positions + rolling
    for (const b of balls) {
      b.pos.add(b.vel);
      b.mesh.position.x = b.pos.x;
      b.mesh.position.z = b.pos.y; // pos.y = world z
      const spd = b.vel.length();
      if (spd > 0.001) {
        const axis = new THREE.Vector3(-b.vel.y, 0, b.vel.x).normalize();
        b.mesh.rotateOnWorldAxis(axis, (spd / RADIUS) * 0.4);
      }
      // Shadow follows ball
      b.shadow.position.x = b.pos.x;
      b.shadow.position.z = b.pos.y;
    }

    renderer.render(scene, cam);
  }
  tick();

  // ──── Resize ────
  function onResize() {
    W = box.clientWidth;
    H = box.clientHeight;
    cam.aspect = W / H;
    cam.updateProjectionMatrix();
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  }
  window.addEventListener("resize", onResize);

  // ──── Cleanup ────
  return () => {
    stopped = true;
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", onResize);
    canvasEl.removeEventListener("mousemove", onMouseMove);
    canvasEl.removeEventListener("mouseleave", onMouseLeave);
    canvasEl.removeEventListener("touchmove", onTouchMove);
    canvasEl.removeEventListener("touchend", onTouchEnd);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
    renderer.dispose();
  };
}
