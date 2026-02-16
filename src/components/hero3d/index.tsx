"use client";

import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/lib/content";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { hero } = siteContent;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("./scene")
      .then(({ initHero3D }) => {
        if (disposed) return;
        cleanup = initHero3D(canvas);
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
        className="relative flex flex-col items-center justify-start"
        style={{
          minHeight: "100vh",
          background: "#F0F1FB",
          padding: "120px 24px 40px",
        }}
      >
        <div className="text-center max-w-[800px] mb-8 z-[5]">
          <p className="text-[0.85rem] font-medium text-[#3848FE] mb-4 tracking-[0.08em]">
            {hero.badge}
          </p>
          <h1
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            className="font-bold leading-[1.15] mb-6 text-black"
          >
            {hero.title}
            <br />
            {hero.titleHighlight}
          </h1>
          <p
            className="max-w-[550px] mx-auto leading-relaxed mb-8 text-[#333] whitespace-pre-line"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
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
        <div
          className="relative w-full overflow-hidden"
          style={{
            maxWidth: 1400,
            height: "50vh",
            minHeight: 350,
            background: "#000000",
            borderRadius: 24,
          }}
        />
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start"
      style={{
        minHeight: "100vh",
        background: "#F0F1FB",
        padding: "120px 24px 40px",
      }}
    >
      {/* Text above the box */}
      <div className="text-center max-w-[800px] mb-8 z-[5]">
        <p className="text-[0.85rem] font-medium text-[#3848FE] mb-4 tracking-[0.08em]">
          {hero.badge}
        </p>
        <h1
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          className="font-bold leading-[1.15] mb-6 text-black"
        >
          {hero.title}
          <br />
          {hero.titleHighlight}
        </h1>
        <p
          className="max-w-[550px] mx-auto leading-relaxed mb-8 text-[#333] whitespace-pre-line"
          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
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

      {/* Black box — canvas only */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 1400,
          height: "50vh",
          minHeight: 350,
          background: "#000000",
          borderRadius: 24,
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[2] w-full h-full"
        />
      </div>
    </section>
  );
}
