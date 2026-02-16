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
        className="relative flex items-center justify-center"
        style={{ height: "100vh", background: "#F0F1FB", padding: "24px" }}
      >
        <div
          className="relative w-full flex flex-col items-center justify-center text-center"
          style={{
            maxWidth: 1400,
            height: "calc(100vh - 120px)",
            background: "#000000",
            borderRadius: 24,
            padding: "0 32px",
          }}
        >
          <p className="text-[0.85rem] font-medium text-[#3848FE] mb-4 tracking-[0.08em]">
            {hero.badge}
          </p>
          <h1
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            className="font-bold leading-[1.15] mb-6 text-white"
          >
            {hero.title}
            <br />
            {hero.titleHighlight}
          </h1>
          <p
            className="max-w-[550px] leading-relaxed mb-10 whitespace-pre-line"
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "rgba(255,255,255,0.7)",
            }}
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
              className="text-white px-8 py-3.5 rounded-full font-medium transition-colors"
              style={{
                border: "1.5px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(4px)",
              }}
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
      id="hero"
      className="relative flex items-center justify-center"
      style={{ height: "100vh", background: "#F0F1FB", padding: "24px" }}
    >
      {/* Black box container */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 1400,
          height: "calc(100vh - 120px)",
          background: "#000000",
          borderRadius: 24,
        }}
      >
        {/* Text — on top of everything */}
        <div
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center"
          style={{ padding: "0 32px" }}
        >
          <p className="text-[0.85rem] font-medium text-[#3848FE] mb-4 tracking-[0.08em]">
            {hero.badge}
          </p>
          <h1
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            className="font-bold leading-[1.15] mb-6 text-white"
          >
            {hero.title}
            <br />
            {hero.titleHighlight}
          </h1>
          <p
            className="max-w-[550px] leading-relaxed mb-10 whitespace-pre-line"
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "rgba(255,255,255,0.7)",
            }}
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
              className="text-white px-8 py-3.5 rounded-full font-medium transition-colors"
              style={{
                border: "1.5px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              {hero.cta2}
            </a>
          </div>
        </div>

        {/* Three.js Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[2] w-full h-full"
        />
      </div>
    </section>
  );
}
