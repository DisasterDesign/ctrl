"use client";

import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/lib/content";

export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { hero } = siteContent;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("./scene")
      .then(({ initHero3D }) => {
        if (disposed) return;
        cleanup = initHero3D(canvas, overlay);
      })
      .catch((err) => {
        console.error("[Hero3D] init failed:", err);
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  if (reducedMotion) {
    return (
      <section
        id="hero"
        className="relative flex items-center justify-center text-center"
        style={{ height: "100vh", background: "#F0F1FB", padding: "0 24px" }}
      >
        <div>
          <p className="text-sm font-medium text-[#3848FE] mb-4 tracking-wide">
            {hero.badge}
          </p>
          <h1
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            className="font-bold leading-[1.15] mb-6"
          >
            {hero.title}
            <br />
            {hero.titleHighlight}
          </h1>
          <p className="text-[#333] max-w-[600px] mx-auto leading-relaxed mb-10 whitespace-pre-line"
            style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
          >
            {hero.description}
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="#contact"
              className="bg-[#3848FE] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#2B35CC] transition-colors"
            >
              {hero.cta1}
            </a>
            <a
              href="#services"
              className="border-[1.5px] border-[#3848FE] text-[#3848FE] px-8 py-3.5 rounded-full font-medium hover:bg-[rgba(56,72,254,0.08)] transition-colors"
            >
              {hero.cta2}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ height: "100vh", background: "#F0F1FB" }}
    >
      {/* Layer 1 (z-1): Text — behind everything */}
      <div
        className="absolute inset-0 z-[1] flex flex-col items-center justify-center text-center"
        style={{ padding: "0 24px" }}
      >
        <p className="text-sm font-medium text-[#3848FE] mb-4 tracking-wide">
          {hero.badge}
        </p>
        <h1
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          className="font-bold leading-[1.15] mb-6"
        >
          {hero.title}
          <br />
          {hero.titleHighlight}
        </h1>
        <p
          className="text-[#333] max-w-[600px] leading-relaxed mb-10 whitespace-pre-line"
          style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
        >
          {hero.description}
        </p>
        <div className="flex gap-4 flex-wrap justify-center relative z-[10]">
          <a
            href="#contact"
            className="bg-[#3848FE] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#2B35CC] transition-colors"
          >
            {hero.cta1}
          </a>
          <a
            href="#services"
            className="border-[1.5px] border-[#3848FE] text-[#3848FE] px-8 py-3.5 rounded-full font-medium hover:bg-[rgba(56,72,254,0.08)] transition-colors"
          >
            {hero.cta2}
          </a>
        </div>
      </div>

      {/* Layer 2 (z-2): Frosted glass overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          background: "rgba(240, 241, 251, 0.12)",
        }}
      />

      {/* Layer 3 (z-3): Three.js Canvas — on top, pointer-events none so CTAs work */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[3] w-full h-full pointer-events-none"
      />
    </section>
  );
}
