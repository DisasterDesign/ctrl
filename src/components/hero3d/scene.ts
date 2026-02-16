import * as THREE from "three";

interface BallDef {
  num: number;
  color: string;
  label: string;
  stripe: boolean;
}

interface BallObject {
  mesh: THREE.Mesh;
  target: THREE.Vector2;
  vel: THREE.Vector2;
  pos: THREE.Vector2;
  radius: number;
}

const BALLS: BallDef[] = [
  { num: 1, color: "#FFD700", label: "ניהול כספים", stripe: false },
  { num: 2, color: "#1E3A8A", label: "משכורות", stripe: false },
  { num: 3, color: "#DC2626", label: "תזרים מזומנים", stripe: false },
  { num: 4, color: "#7C3AED", label: "חשבוניות", stripe: false },
  { num: 5, color: "#F97316", label: "תקציב שנתי", stripe: false },
  { num: 6, color: "#059669", label: 'דוחות כספיים', stripe: false },
  { num: 7, color: "#8B4513", label: "גבייה", stripe: false },
  { num: 8, color: "#111111", label: "תפעול", stripe: false },
  { num: 9, color: "#FFD700", label: "ספקים", stripe: true },
  { num: 10, color: "#1E3A8A", label: "הנהלת חשבונות", stripe: true },
  { num: 11, color: "#DC2626", label: 'מע"מ', stripe: true },
  { num: 12, color: "#7C3AED", label: "ביטוחים", stripe: true },
  { num: 13, color: "#F97316", label: "חוזים", stripe: true },
  { num: 14, color: "#059669", label: "הסכמי שכר", stripe: true },
  { num: 15, color: "#8B4513", label: "תכנון פיננסי", stripe: true },
];

function createBallTexture(ball: BallDef): THREE.CanvasTexture {
  const size = 512;
  const canvas2d = document.createElement("canvas");
  canvas2d.width = size;
  canvas2d.height = size;
  const ctx = canvas2d.getContext("2d")!;

  // Background
  ctx.fillStyle = "#F5F5F0";
  ctx.fillRect(0, 0, size, size);

  if (!ball.stripe) {
    // Solid ball — full color background
    ctx.fillStyle = ball.color;
    ctx.fillRect(0, 0, size, size);
  } else {
    // Stripe ball — color band in the middle
    const stripeTop = size * 0.28;
    const stripeBottom = size * 0.72;
    ctx.fillStyle = ball.color;
    ctx.fillRect(0, stripeTop, size, stripeBottom - stripeTop);
  }

  // White circle for number
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  // Number
  ctx.fillStyle = "#000000";
  ctx.font = `bold ${size * 0.18}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(ball.num), size / 2, size / 2);

  // Label text
  ctx.fillStyle = "#FFFFFF";
  const fontSize = ball.stripe ? size * 0.08 : size * 0.09;
  ctx.font = `bold ${fontSize}px Arial, "Segoe UI", sans-serif`;
  ctx.fillText(ball.label, size / 2, size * 0.78);

  const texture = new THREE.CanvasTexture(canvas2d);
  texture.needsUpdate = true;
  return texture;
}

export function initHero3D(canvasElement: HTMLCanvasElement): () => void {
  const container = canvasElement.parentElement!;
  const W = container.clientWidth;
  const H = container.clientHeight;

  // ============ RENDERER ============
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
    alpha: false,
  });
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ============ CAMERA — top-down orthographic ============
  const aspect = W / H;
  const viewSize = 12;
  const camera = new THREE.OrthographicCamera(
    (-viewSize * aspect) / 2,
    (viewSize * aspect) / 2,
    viewSize / 2,
    -viewSize / 2,
    0.1,
    100
  );
  camera.position.set(0, 50, 0);
  camera.lookAt(0, 0, 0);

  // ============ SCENE ============
  const scene = new THREE.Scene();

  // ============ LIGHTS ============
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const topLight = new THREE.PointLight(0xffffff, 1.2, 100);
  topLight.position.set(0, 30, 0);
  scene.add(topLight);

  const sideLight = new THREE.PointLight(0xffffff, 0.3, 100);
  sideLight.position.set(10, 20, 10);
  scene.add(sideLight);

  // ============ BILLIARD BALLS ============
  const BALL_RADIUS = 0.42;
  const geometry = new THREE.SphereGeometry(BALL_RADIUS, 64, 64);

  // Triangle rack positions (5 rows: 1+2+3+4+5 = 15)
  const spacing = BALL_RADIUS * 2.15;
  const trianglePositions: { x: number; z: number }[] = [];
  for (let row = 0; row < 5; row++) {
    const numInRow = row + 1;
    const rowZ = (-row * spacing * Math.sqrt(3)) / 2;
    const startX = (-(numInRow - 1) * spacing) / 2;
    for (let col = 0; col < numInRow; col++) {
      trianglePositions.push({
        x: startX + col * spacing,
        z: rowZ,
      });
    }
  }

  const balls: BallObject[] = [];

  BALLS.forEach((ballData, i) => {
    const texture = createBallTexture(ballData);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.15,
      metalness: 0.05,
      transparent: false,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Start off-screen scattered
    const angle = Math.random() * Math.PI * 2;
    const dist = 15 + Math.random() * 8;
    mesh.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);

    scene.add(mesh);

    balls.push({
      mesh,
      target: new THREE.Vector2(trianglePositions[i].x, trianglePositions[i].z),
      vel: new THREE.Vector2(0, 0),
      pos: new THREE.Vector2(mesh.position.x, mesh.position.z),
      radius: BALL_RADIUS,
    });
  });

  // ============ PHYSICS ============
  const ATTRACT_FORCE = 0.008;
  const DAMPING = 0.97;
  const MOUSE_REPEL = 2.5;
  const MOUSE_RADIUS = 3.0;
  const SETTLE_THRESHOLD = 0.01;
  const COLLISION_RESPONSE = 0.8;

  // ============ MOUSE ============
  const mouse2D = new THREE.Vector2(9999, 9999);
  let mouseActive = false;

  function onMouseMove(e: MouseEvent) {
    const rect = container.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouse2D.set(
      ndcX * ((viewSize * aspect) / 2),
      ndcY * (viewSize / 2)
    );
    mouseActive = true;
  }

  function onMouseLeave() {
    mouseActive = false;
    mouse2D.set(9999, 9999);
  }

  function onTouchMove(e: TouchEvent) {
    const t = e.touches[0];
    if (!t) return;
    const rect = container.getBoundingClientRect();
    const ndcX = ((t.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((t.clientY - rect.top) / rect.height) * 2 + 1;
    mouse2D.set(
      ndcX * ((viewSize * aspect) / 2),
      ndcY * (viewSize / 2)
    );
    mouseActive = true;
  }

  function onTouchEnd() {
    mouseActive = false;
    mouse2D.set(9999, 9999);
  }

  canvasElement.addEventListener("mousemove", onMouseMove as EventListener);
  canvasElement.addEventListener("mouseleave", onMouseLeave);
  canvasElement.addEventListener("touchmove", onTouchMove as EventListener, {
    passive: true,
  });
  canvasElement.addEventListener("touchend", onTouchEnd);

  // ============ ANIMATION LOOP ============
  let animationId = 0;
  let stopped = false;

  function animate() {
    if (stopped) return;
    animationId = requestAnimationFrame(animate);

    // Step 1: Forces
    for (const ball of balls) {
      const toTarget = new THREE.Vector2().subVectors(ball.target, ball.pos);
      const distToTarget = toTarget.length();

      if (distToTarget > SETTLE_THRESHOLD) {
        toTarget.normalize().multiplyScalar(ATTRACT_FORCE * distToTarget);
        ball.vel.add(toTarget);
      }

      // Mouse repulsion
      if (mouseActive) {
        const fromMouse = new THREE.Vector2().subVectors(ball.pos, mouse2D);
        const mouseDist = fromMouse.length();
        if (mouseDist < MOUSE_RADIUS && mouseDist > 0.01) {
          const force = MOUSE_REPEL * (1 - mouseDist / MOUSE_RADIUS);
          fromMouse.normalize().multiplyScalar(force * 0.1);
          ball.vel.add(fromMouse);
        }
      }

      // Damping
      ball.vel.multiplyScalar(DAMPING);
    }

    // Step 2: Collision detection & response
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i];
        const b = balls[j];
        const diff = new THREE.Vector2().subVectors(a.pos, b.pos);
        const dist = diff.length();
        const minDist = a.radius + b.radius;

        if (dist < minDist && dist > 0.001) {
          const overlap = minDist - dist;
          const normal = diff.clone().normalize();

          // Separate
          a.pos.add(normal.clone().multiplyScalar(overlap / 2));
          b.pos.sub(normal.clone().multiplyScalar(overlap / 2));

          // Elastic collision
          const relVel = new THREE.Vector2().subVectors(a.vel, b.vel);
          const velAlongNormal = relVel.dot(normal);

          if (velAlongNormal > 0) continue; // already separating

          const impulse = normal
            .clone()
            .multiplyScalar(velAlongNormal * COLLISION_RESPONSE);
          a.vel.sub(impulse);
          b.vel.add(impulse);
        }
      }
    }

    // Step 3: Update positions
    for (const ball of balls) {
      ball.pos.add(ball.vel);
      ball.mesh.position.x = ball.pos.x;
      ball.mesh.position.z = ball.pos.y; // pos.y -> world z

      // Rolling effect
      const speed = ball.vel.length();
      if (speed > 0.001) {
        const rollAxis = new THREE.Vector3(
          -ball.vel.y,
          0,
          ball.vel.x
        ).normalize();
        const rollAngle = speed / ball.radius;
        ball.mesh.rotateOnWorldAxis(rollAxis, rollAngle);
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  // ============ RESIZE ============
  function onResize() {
    const newW = container.clientWidth;
    const newH = container.clientHeight;
    const newAspect = newW / newH;

    camera.left = (-viewSize * newAspect) / 2;
    camera.right = (viewSize * newAspect) / 2;
    camera.top = viewSize / 2;
    camera.bottom = -viewSize / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(newW, newH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  window.addEventListener("resize", onResize);

  // ============ CLEANUP ============
  return () => {
    stopped = true;
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", onResize);
    canvasElement.removeEventListener(
      "mousemove",
      onMouseMove as EventListener
    );
    canvasElement.removeEventListener("mouseleave", onMouseLeave);
    canvasElement.removeEventListener(
      "touchmove",
      onTouchMove as EventListener
    );
    canvasElement.removeEventListener("touchend", onTouchEnd);

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
