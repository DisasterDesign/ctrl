"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Hero3D() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const glassOverlayRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { hero, business } = siteContent;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    const container = canvasContainerRef.current;
    const overlay = glassOverlayRef.current;
    if (!container || !overlay) return;

    let disposed = false;
    let rafId: number;

    async function init() {
      const [{ SceneManager }, { createGlassObjects }, { PhysicsController }] =
        await Promise.all([
          import("./SceneManager"),
          import("./GlassObjects"),
          import("./Physics"),
        ]);

      if (disposed) return;

      const scene = new SceneManager(container!);
      const objects = createGlassObjects(scene.scene);
      const physics = new PhysicsController(
        scene.camera,
        scene.renderer.domElement
      );
      physics.objects = objects;

      let lastTime = performance.now();

      function loop() {
        if (disposed) return;
        rafId = requestAnimationFrame(loop);

        if (!scene.isVisible) return;

        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.05); // cap dt
        lastTime = now;

        physics.update(dt);
        scene.render();

        // Update glass overlay blur
        const blurVal = `blur(${physics.blurAmount}px)`;
        overlay!.style.backdropFilter = blurVal;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (overlay!.style as any).webkitBackdropFilter = blurVal;
      }
      loop();

      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        physics.dispose();
        scene.dispose();
      };
    }

    let cleanup: (() => void) | undefined;
    init()
      .then((fn) => {
        cleanup = fn;
      })
      .catch((err) => {
        console.error("[Hero3D] init failed:", err);
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  // Reduced motion fallback — static text only
  if (reducedMotion) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h1
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            className="font-bold leading-tight"
          >
            {hero.title}
            <br />
            <span className="text-[#3848FE]">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-6 text-lg text-[#333333] whitespace-pre-line max-w-lg">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              {hero.cta1}
            </a>
            <a
              href="#services"
              className="inline-flex items-center px-8 py-3.5 border-[1.5px] border-[#3848FE] text-[#3848FE] hover:bg-[rgba(56,72,254,0.08)] font-medium rounded-full transition-colors duration-300"
            >
              {hero.cta2}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative h-screen overflow-hidden pt-20">
      {/* z-1: Three.js transparent canvas */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-[1]"
      />

      {/* z-2: Glass overlay — backdrop-filter blur */}
      <div
        ref={glassOverlayRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
      />

      {/* z-3: Hero text content */}
      <div className="relative z-[3] h-full flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          <div className="max-w-2xl">
            <h1
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              className="font-bold leading-tight"
            >
              {hero.title}
              <br />
              <span className="text-[#3848FE]">{hero.titleHighlight}</span>
            </h1>

            <p className="mt-6 text-lg text-[#333333] whitespace-pre-line max-w-lg">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                {hero.cta1}
              </a>
              <a
                href="#services"
                className="inline-flex items-center px-8 py-3.5 border-[1.5px] border-[#3848FE] text-[#3848FE] hover:bg-[rgba(56,72,254,0.08)] font-medium rounded-full transition-colors duration-300"
              >
                {hero.cta2}
              </a>
            </div>

            {/* Checkmarks */}
            <div className="mt-8 flex flex-wrap gap-6">
              {hero.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#3848FE]" strokeWidth={2.5} />
                  <span className="text-sm text-[#333333]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
