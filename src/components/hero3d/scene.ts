import * as THREE from "three";

/* ═══════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════ */

interface BallDef {
  n: number;
  c: string;
  t: string;
  s: boolean;
}

interface BallObj {
  mesh: THREE.Mesh;
  shadow: THREE.Mesh;
  target: THREE.Vector2;
  pos: THREE.Vector2;
  vel: THREE.Vector2;
}

/* ═══════════════════════════════════════════════
   BALL DATA — 15 billiard balls
   Colors: #3848FE (brand blue), #1a1a2e (dark)
   ═══════════════════════════════════════════════ */

const BALLS: BallDef[] = [
  { n: 1,  c: "#000000", t: "ניהול כספים",    s: false },
  { n: 2,  c: "#FFFFFF", t: "משכורות",        s: false },
  { n: 3,  c: "#000000", t: "תזרים מזומנים",  s: false },
  { n: 4,  c: "#FFFFFF", t: "חשבוניות",       s: false },
  { n: 5,  c: "#3848FE", t: "תקציב שנתי",    s: false },
  { n: 6,  c: "#000000", t: "דוחות כספיים",   s: false },
  { n: 7,  c: "#FFFFFF", t: "גבייה",         s: false },
  { n: 8,  c: "#000000", t: "תפעול",         s: false },
  { n: 9,  c: "#FFFFFF", t: "ספקים",         s: false },
  { n: 10, c: "#3848FE", t: "הנהלת חשבונות", s: false },
  { n: 11, c: "#000000", t: 'מע"מ',          s: false },
  { n: 12, c: "#FFFFFF", t: "ביטוחים",       s: false },
  { n: 13, c: "#000000", t: "חוזים",         s: false },
  { n: 14, c: "#FFFFFF", t: "הסכמי שכר",     s: false },
  { n: 15, c: "#3848FE", t: "תכנון פיננסי",  s: false },
];

/* ═══════════════════════════════════════════════
   MATCAP TEXTURE — procedural glossy sphere
   This is the KEY to making balls look 3D.
   No lights needed — all shading is baked here.
   ═══════════════════════════════════════════════ */

function createMatcap(): THREE.CanvasTexture {
  const S = 1024; // high-res for quality
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const ctx = cv.getContext("2d")!;
  const cx = S / 2;
  const cy = S / 2;
  const r = S / 2;

  // Black background
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, S, S);

  // === Main sphere gradient ===
  // Highlight is upper-left — classic billiard ball lighting
  const main = ctx.createRadialGradient(
    cx * 0.55, cy * 0.50, r * 0.01,   // highlight center
    cx * 0.90, cy * 0.90, r * 0.98    // sphere edge
  );
  main.addColorStop(0.00, "#ffffff");  // hot spot
  main.addColorStop(0.05, "#fafaff");
  main.addColorStop(0.15, "#e8e8f2");
  main.addColorStop(0.30, "#c0c0d4");
  main.addColorStop(0.45, "#9090a8");
  main.addColorStop(0.60, "#606078");
  main.addColorStop(0.75, "#3a3a50");
  main.addColorStop(0.88, "#1e1e30");
  main.addColorStop(1.00, "#0a0a14");

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.97, 0, Math.PI * 2);
  ctx.fillStyle = main;
  ctx.fill();

  // === Secondary rim highlight (bottom-right) ===
  const rim = ctx.createRadialGradient(
    cx * 1.50, cy * 1.45, r * 0.01,
    cx * 1.50, cy * 1.45, r * 0.45
  );
  rim.addColorStop(0.0, "rgba(180, 190, 255, 0.35)");
  rim.addColorStop(0.5, "rgba(180, 190, 255, 0.08)");
  rim.addColorStop(1.0, "rgba(180, 190, 255, 0.00)");

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.97, 0, Math.PI * 2);
  ctx.fillStyle = rim;
  ctx.fill();

  // === Subtle top-edge highlight (fresnel-like) ===
  const fresnel = ctx.createRadialGradient(cx, cy, r * 0.80, cx, cy, r * 0.97);
  fresnel.addColorStop(0.0, "rgba(200, 210, 255, 0.00)");
  fresnel.addColorStop(0.6, "rgba(200, 210, 255, 0.00)");
  fresnel.addColorStop(1.0, "rgba(200, 210, 255, 0.08)");

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.97, 0, Math.PI * 2);
  ctx.fillStyle = fresnel;
  ctx.fill();

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

/* ═══════════════════════════════════════════════
   BALL COLOR/TEXT TEXTURE — canvas 2D
   ═══════════════════════════════════════════════ */

function makeBallMap(ball: BallDef): THREE.CanvasTexture {
  const S = 1024;
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const ctx = cv.getContext("2d")!;

  // Solid color background — no stripe, no number
  ctx.fillStyle = ball.c;
  ctx.fillRect(0, 0, S, S);

  // Task text — centered
  // Black text on white balls, white text on dark balls
  ctx.fillStyle = ball.c === "#FFFFFF" ? "#000000" : "#FFFFFF";
  ctx.font = `bold ${S * 0.08}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(ball.t, S / 2, S / 2);

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

/* ═══════════════════════════════════════════════
   MAIN INIT
   ═══════════════════════════════════════════════ */

export function initHero3D(canvasEl: HTMLCanvasElement): () => void {
  const box = canvasEl.parentElement!;
  let W = box.clientWidth;
  let H = box.clientHeight;

  /* ──── Renderer ──── */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
    antialias: true,
  });
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();

  /* ──── Camera ──── */
  // PerspectiveCamera — 90° top-down
  const cam = new THREE.PerspectiveCamera(28, W / H, 0.1, 500);
  cam.position.set(0, 160, 0);
  cam.lookAt(0, 0, 0);

  /* ──── NO LIGHTS — matcap handles everything ──── */

  /* ──── Matcap texture ──── */
  const matcapTex = createMatcap();

  /* ──── Ball geometry ──── */
  const RADIUS = 7.0;
  const geo = new THREE.SphereGeometry(RADIUS, 64, 64);

  /* ──── Shadow disc ──── */
  const shadowGeo = new THREE.CircleGeometry(RADIUS * 1.15, 32);
  const shadowMatBase = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });

  /* ──── Triangle target positions ──── */
  // Classic billiard rack: 5 rows (1+2+3+4+5 = 15)
  const targets: { x: number; z: number }[] = [];
  const spacing = RADIUS * 2.08; // slight gap between balls
  for (let row = 0; row < 5; row++) {
    const count = row + 1;
    const z = -row * spacing * 0.866;
    const x0 = (-(count - 1) * spacing) / 2;
    for (let col = 0; col < count; col++) {
      targets.push({ x: x0 + col * spacing, z });
    }
  }

  /* ──── Create ball meshes ──── */
  const balls: BallObj[] = [];

  BALLS.forEach((bd, i) => {
    const mat = new THREE.MeshMatcapMaterial({
      matcap: matcapTex,
      map: makeBallMap(bd),
    });

    const mesh = new THREE.Mesh(geo, mat);

    // Shadow disc under ball
    const shadow = new THREE.Mesh(shadowGeo, shadowMatBase.clone());
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -RADIUS + 0.05;

    // Start off-screen — distributed around the edges
    const angle = (i / BALLS.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
    const dist = 80 + Math.random() * 40;
    const sx = Math.cos(angle) * dist;
    const sz = Math.sin(angle) * dist;

    mesh.position.set(sx, 0, sz);
    shadow.position.set(sx, -RADIUS + 0.05, sz);

    // Random initial rotation so texture is varied
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    scene.add(mesh);
    scene.add(shadow);

    balls.push({
      mesh,
      shadow,
      target: new THREE.Vector2(targets[i].x, targets[i].z),
      pos: new THREE.Vector2(sx, sz),
      vel: new THREE.Vector2(0, 0),
    });
  });

  /* ──── Physics constants ──── */
  const ATTRACT   = 0.0025;  // gentle pull to target
  const DAMP      = 0.991;   // high = low friction, long glide
  const REPEL     = 3.5;     // mouse push force
  const REPEL_RAD = 20.0;    // mouse influence radius
  const MAX_V     = 0.07;    // max speed cap
  const SETTLE    = 0.008;   // distance threshold to "settle"
  const COL_RESP  = 0.75;    // collision elasticity
  const DIAM      = RADIUS * 2;

  /* ──── Mouse tracking (Raycaster → ground plane) ──── */
  const mouseWorld = new THREE.Vector2(9999, 9999);
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  let mouseActive = false;

  function setMouse(cx: number, cy: number) {
    const r = box.getBoundingClientRect();
    ndc.set(
      ((cx - r.left) / r.width) * 2 - 1,
      -((cy - r.top) / r.height) * 2 + 1
    );
    raycaster.setFromCamera(ndc, cam);
    if (raycaster.ray.intersectPlane(plane, hit)) {
      mouseWorld.set(hit.x, hit.z);
    }
    mouseActive = true;
  }

  const onMM = (e: MouseEvent) => setMouse(e.clientX, e.clientY);
  const onML = () => { mouseActive = false; mouseWorld.set(9999, 9999); };
  const onTM = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) setMouse(t.clientX, t.clientY);
  };
  const onTE = () => { mouseActive = false; mouseWorld.set(9999, 9999); };

  canvasEl.addEventListener("mousemove", onMM);
  canvasEl.addEventListener("mouseleave", onML);
  canvasEl.addEventListener("touchmove", onTM, { passive: true });
  canvasEl.addEventListener("touchend", onTE);

  /* ──── Temp vectors (reuse to avoid GC) ──── */
  const _v2a = new THREE.Vector2();
  const _v2b = new THREE.Vector2();
  const _v3  = new THREE.Vector3();

  /* ──── Animation loop ──── */
  let stopped = false;
  let frameId = 0;

  function tick() {
    if (stopped) return;
    frameId = requestAnimationFrame(tick);

    // --- Forces ---
    for (const b of balls) {
      _v2a.subVectors(b.target, b.pos);
      const d = _v2a.length();
      if (d > SETTLE) {
        _v2a.normalize().multiplyScalar(ATTRACT * d);
        b.vel.add(_v2a);
      } else {
        // Close to target — apply extra damping to settle
        b.vel.multiplyScalar(0.95);
      }

      if (mouseActive) {
        _v2a.subVectors(b.pos, mouseWorld);
        const md = _v2a.length();
        if (md < REPEL_RAD && md > 0.01) {
          const strength = REPEL * Math.pow(1 - md / REPEL_RAD, 2); // quadratic falloff
          _v2a.normalize().multiplyScalar(strength * 0.08);
          b.vel.add(_v2a);
        }
      }

      b.vel.multiplyScalar(DAMP);
      const spd = b.vel.length();
      if (spd > MAX_V) b.vel.multiplyScalar(MAX_V / spd);
    }

    // --- Collisions ---
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i];
        const bb = balls[j];
        _v2a.subVectors(a.pos, bb.pos);
        const dist = _v2a.length();

        if (dist < DIAM && dist > 0.001) {
          const normal = _v2a.normalize();
          const overlap = DIAM - dist;

          // Separate
          a.pos.addScaledVector(normal, overlap * 0.5);
          bb.pos.addScaledVector(normal, -overlap * 0.5);

          // Elastic impulse
          _v2b.subVectors(a.vel, bb.vel);
          const vn = _v2b.dot(normal);
          if (vn < 0) {
            const imp = vn * COL_RESP;
            a.vel.addScaledVector(normal, -imp);
            bb.vel.addScaledVector(normal, imp);
          }
        }
      }
    }

    // --- Update positions ---
    for (const b of balls) {
      b.pos.add(b.vel);

      b.mesh.position.x = b.pos.x;
      b.mesh.position.z = b.pos.y;

      // Rolling rotation
      const spd = b.vel.length();
      if (spd > 0.0005) {
        _v3.set(-b.vel.y, 0, b.vel.x).normalize();
        b.mesh.rotateOnWorldAxis(_v3, (spd / RADIUS) * 0.35);
      }

      // Shadow follows
      b.shadow.position.x = b.pos.x;
      b.shadow.position.z = b.pos.y;
    }

    renderer.render(scene, cam);
  }
  tick();

  /* ──── Resize ──── */
  function onResize() {
    W = box.clientWidth;
    H = box.clientHeight;
    cam.aspect = W / H;
    cam.updateProjectionMatrix();
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  }
  window.addEventListener("resize", onResize);

  /* ──── Cleanup ──── */
  return () => {
    stopped = true;
    cancelAnimationFrame(frameId);
    window.removeEventListener("resize", onResize);
    canvasEl.removeEventListener("mousemove", onMM);
    canvasEl.removeEventListener("mouseleave", onML);
    canvasEl.removeEventListener("touchmove", onTM);
    canvasEl.removeEventListener("touchend", onTE);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m.dispose();
      }
    });
    renderer.dispose();
  };
}
