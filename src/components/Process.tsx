"use client";

import { useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import { useIsMobile } from "@/hooks/useIsMobile";
import FadeIn from "@/components/ui/FadeIn";

/* ═══════════════════════════════════════════════════════════
   Process — Horizontal scroll-driven roadmap (sticky viewport)
   Background: isometric cube collecting wandering balls
   Mobile: Vertical list with FadeIn
   ═══════════════════════════════════════════════════════════ */

/* ── Ball / cube animation helpers ── */

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

function makeBall(w: number, h: number): Ball {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: 8 + Math.random() * 12,
  };
}

function respawnAtEdge(ball: Ball, w: number, h: number) {
  const side = Math.floor(Math.random() * 4);
  if (side === 0) { ball.x = -30; ball.y = Math.random() * h; }
  else if (side === 1) { ball.x = w + 30; ball.y = Math.random() * h; }
  else if (side === 2) { ball.x = Math.random() * w; ball.y = -30; }
  else { ball.x = Math.random() * w; ball.y = h + 30; }
  ball.vx = (Math.random() - 0.5) * 0.5;
  ball.vy = (Math.random() - 0.5) * 0.5;
}

function drawIsoCube(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, size: number, pulse: number
) {
  const scale = 1 + pulse * 0.1;
  const s = size * scale;
  const dx = s * Math.cos(Math.PI / 6);
  const dy = s * Math.sin(Math.PI / 6);

  ctx.lineWidth = 2;
  const strokeAlpha = 0.45 + pulse * 0.25;

  // Top face
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.lineTo(cx + dx, cy - s + dy);
  ctx.lineTo(cx, cy - s + 2 * dy);
  ctx.lineTo(cx - dx, cy - s + dy);
  ctx.closePath();
  ctx.fillStyle = `rgba(56,72,254,${0.18 + pulse * 0.12})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(56,72,254,${strokeAlpha})`;
  ctx.stroke();

  // Left face
  ctx.beginPath();
  ctx.moveTo(cx - dx, cy - s + dy);
  ctx.lineTo(cx, cy - s + 2 * dy);
  ctx.lineTo(cx, cy + dy);
  ctx.lineTo(cx - dx, cy);
  ctx.closePath();
  ctx.fillStyle = `rgba(56,72,254,${0.13 + pulse * 0.1})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(56,72,254,${strokeAlpha})`;
  ctx.stroke();

  // Right face
  ctx.beginPath();
  ctx.moveTo(cx + dx, cy - s + dy);
  ctx.lineTo(cx, cy - s + 2 * dy);
  ctx.lineTo(cx, cy + dy);
  ctx.lineTo(cx + dx, cy);
  ctx.closePath();
  ctx.fillStyle = `rgba(56,72,254,${0.10 + pulse * 0.08})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(56,72,254,${strokeAlpha})`;
  ctx.stroke();

  // Glow ring on pulse
  if (pulse > 0.05) {
    ctx.beginPath();
    ctx.arc(cx, cy - s / 3, s * 1.4 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(56,72,254,${pulse * 0.2})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

/* ── Component ── */

export default function Process() {
  const { process, business } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  /* ── Scroll-driven roadmap animation ── */
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledInto = -rect.top;
      const totalScroll = rect.height - vh;
      const progress = Math.max(0, Math.min(1, scrolledInto / totalScroll));

      // Title
      const tEl = titleRef.current;
      if (tEl) {
        const t = Math.min(1, progress / 0.12);
        tEl.style.opacity = `${t}`;
        tEl.style.transform = `translateY(${(1 - t) * 30}px)`;
      }

      // Dashed line
      const lineEl = lineRef.current;
      if (lineEl) {
        const lineProgress = Math.min(1, progress / 0.82);
        lineEl.style.clipPath = `inset(0 0 0 ${(1 - lineProgress) * 100}%)`;
      }

      // Steps
      const stepCount = stepRefs.current.length;
      for (let i = 0; i < stepCount; i++) {
        const el = stepRefs.current[i];
        if (!el) continue;

        const start = 0.08 + i * (0.82 / stepCount);
        const t = Math.max(0, Math.min(1, (progress - start) / 0.13));
        const eased = 1 - Math.pow(1 - t, 3);

        const circle = el.querySelector(".step-circle") as HTMLElement;
        if (circle) {
          circle.style.transform = `scale(${0.3 + 0.7 * eased})`;
          circle.style.opacity = `${eased}`;
        }
        const text = el.querySelector(".step-text") as HTMLElement;
        if (text) {
          text.style.opacity = `${eased}`;
          text.style.transform = `translateY(${(1 - eased) * 20}px)`;
        }
      }

      // CTA
      const ctaEl = ctaRef.current;
      if (ctaEl) {
        const t = Math.max(0, Math.min(1, (progress - 0.87) / 0.10));
        const eased = 1 - Math.pow(1 - t, 3);
        ctaEl.style.opacity = `${eased}`;
        ctaEl.style.transform = `translateY(${(1 - eased) * 30}px)`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  /* ── Background: cube + balls canvas animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    let raf = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    const BALL_COUNT = 14;
    const CUBE_SIZE = 55;
    const balls: Ball[] = Array.from({ length: BALL_COUNT }, () => makeBall(w, h));

    let cubeX = w * 0.5;
    let cubeY = h * 0.48;
    let cubeVx = 0;
    let cubeVy = 0;
    let cubePulse = 0;
    let cooldown = 30;
    let time = 0;

    function animate() {
      ctx!.clearRect(0, 0, w, h);
      time += 0.006;

      let nearest: Ball | null = null;
      let nearestDist = Infinity;
      for (const ball of balls) {
        const dx = ball.x - cubeX;
        const dy = ball.y - cubeY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = ball;
        }
      }

      cubeVx += Math.sin(time * 1.1) * 0.04 + Math.cos(time * 0.7) * 0.02;
      cubeVy += Math.cos(time * 1.3) * 0.03 + Math.sin(time * 0.9) * 0.02;

      if (cooldown > 0) {
        cooldown--;
      } else if (nearest) {
        const dx = nearest.x - cubeX;
        const dy = nearest.y - cubeY;
        const dist = Math.max(1, nearestDist);
        const force = 0.18;
        cubeVx += (dx / dist) * force;
        cubeVy += (dy / dist) * force;

        ctx!.beginPath();
        ctx!.moveTo(cubeX, cubeY);
        ctx!.lineTo(nearest.x, nearest.y);
        ctx!.strokeStyle = "rgba(56,72,254,0.12)";
        ctx!.lineWidth = 1.2;
        ctx!.stroke();

        if (dist < 35) {
          cubePulse = 1;
          respawnAtEdge(nearest, w, h);
          cooldown = 50 + Math.random() * 40;
        }
      }

      cubeVx *= 0.97;
      cubeVy *= 0.97;
      cubeX += cubeVx;
      cubeY += cubeVy;

      if (cubeX < 60) cubeVx += 0.4;
      if (cubeX > w - 60) cubeVx -= 0.4;
      if (cubeY < 60) cubeVy += 0.4;
      if (cubeY > h - 60) cubeVy -= 0.4;

      if (cubePulse > 0) cubePulse *= 0.93;
      if (cubePulse < 0.005) cubePulse = 0;

      for (const ball of balls) {
        ball.vx += (Math.random() - 0.5) * 0.05;
        ball.vy += (Math.random() - 0.5) * 0.05;
        ball.vx *= 0.992;
        ball.vy *= 0.992;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x < -40) ball.vx += 0.2;
        if (ball.x > w + 40) ball.vx -= 0.2;
        if (ball.y < -40) ball.vy += 0.2;
        if (ball.y > h + 40) ball.vy -= 0.2;

        ctx!.beginPath();
        ctx!.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(56,72,254,0.18)";
        ctx!.fill();
      }

      drawIsoCube(ctx!, cubeX, cubeY, CUBE_SIZE, cubePulse);

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      dir="rtl"
      className="relative"
      style={{ minHeight: isMobile ? "auto" : "200vh", background: "#F0F1FB" }}
    >
      {/* Sticky viewport (disabled on mobile) */}
      <div className={`${isMobile ? "py-16" : "sticky top-0 h-screen"} flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden`}>
        {/* Canvas background — cube + balls */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Title */}
        {isMobile ? (
          <FadeIn>
            <div className="relative z-10 text-center mb-8">
              <h2 className="text-2xl font-bold">{process.title}</h2>
            </div>
          </FadeIn>
        ) : (
          <div
            ref={titleRef}
            className="relative z-10 text-center mb-8 md:mb-14 lg:mb-20"
            style={{ opacity: 0 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{process.title}</h2>
          </div>
        )}

        {/* Roadmap */}
        <div className="relative z-10 w-full max-w-[1100px] mx-auto">
          {/* Dashed line — desktop only */}
          {!isMobile && (
            <div
              ref={lineRef}
              className="absolute top-[28px] md:top-[32px] right-[8%] left-[8%] h-[2px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to left, #3848FE 0, #3848FE 8px, transparent 8px, transparent 14px)",
                opacity: 0.35,
                clipPath: "inset(0 0 0 100%)",
              }}
            />
          )}

          {/* Steps */}
          <div className={`flex ${isMobile ? "flex-col items-center gap-6" : "justify-between items-start"}`}>
            {process.steps.map((step, i) => {
              if (isMobile) {
                return (
                  <FadeIn key={i} delay={0.1 + i * 0.08}>
                    <div className="flex flex-col items-center text-center w-full max-w-[280px]">
                      <div
                        className="step-circle w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10"
                        style={{
                          background: "#3848FE",
                          boxShadow: "0 4px 20px rgba(56,72,254,0.3)",
                        }}
                      >
                        <span className="text-white font-bold text-base">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="step-text max-w-full">
                        <p className="text-sm font-medium text-black leading-relaxed">
                          {step.title}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              }

              return (
                <div
                  key={i}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="flex flex-col items-center text-center px-1 md:px-2"
                  style={{ flex: "1 1 0%" }}
                >
                  <div
                    className="step-circle w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 lg:mb-5 relative z-10"
                    style={{
                      background: "#3848FE",
                      boxShadow: "0 4px 20px rgba(56,72,254,0.3)",
                      transform: "scale(0.3)",
                      opacity: 0,
                    }}
                  >
                    <span className="text-white font-bold text-base md:text-lg lg:text-xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="step-text max-w-[160px] md:max-w-[180px]"
                    style={{ opacity: 0 }}
                  >
                    <p className="text-sm md:text-base font-medium text-black leading-relaxed">
                      {step.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        {isMobile ? (
          <FadeIn delay={0.7}>
            <div className="relative z-10 mt-8 text-center">
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-medium rounded-full transition-colors duration-300"
                style={{ background: "#3848FE" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#2B35CC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#3848FE")
                }
              >
                <MessageCircle className="w-5 h-5" />
                {process.cta}
              </a>
            </div>
          </FadeIn>
        ) : (
          <div
            ref={ctaRef}
            className="relative z-10 mt-8 md:mt-14 lg:mt-20 text-center"
            style={{ opacity: 0 }}
          >
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-medium rounded-full transition-colors duration-300"
              style={{ background: "#3848FE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#2B35CC")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#3848FE")
              }
            >
              <MessageCircle className="w-5 h-5" />
              {process.cta}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
