"use client";
import { useRef, useEffect } from "react";
import { initScene } from "./scene";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Hero3D() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!canvasRef.current || !boxRef.current) return;
    const cleanup = initScene(canvasRef.current, boxRef.current);
    return cleanup;
  }, []);

  return (
    <section id="hero" dir="rtl" className="flex flex-col items-center overflow-hidden h-dvh md:h-screen" style={{
      padding: isMobile ? "70px 4vw 16px" : "80px 5vw",
      background: "#F0F1FB",
    }}>
      {/* Text block */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="text-sm md:text-base font-medium mb-2" style={{ color: "#3848FE" }}>
          ניהול פיננסי ותפעולי לבעלי עסקים
        </p>

        <h1 className="text-3xl md:text-6xl font-bold text-black leading-tight mb-2">
          בהירות בעסק. שקט בניהול.
        </h1>

        <p className="text-sm md:text-lg text-gray-600 max-w-xl px-2">
          עושה סדר בכספים, בתהליכים ובניהול השוטף של העסק — כדי שתוכל/י לקבל החלטות רגועות ולצמוח בביטחון.
        </p>
      </div>

      {/* 3D box */}
      <div
        ref={boxRef}
        style={{
          width: "100%",
          ...(isMobile
            ? { flex: 1, minHeight: 0 }
            : { aspectRatio: "12/5" }),
          marginTop: "auto",
          position: "relative",
          overflow: "hidden",
          borderRadius: isMobile ? "12px" : "16px",
        }}
      >
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

        {/* CTA buttons */}
        <a
          href="#contact"
          style={{
            position: "absolute",
            top: "50%",
            right: isMobile ? "5%" : "10%",
            transform: "translateY(-50%)",
            background: "#F0F1FB",
            color: "#000",
            padding: isMobile ? "8px 16px" : "10px 24px",
            borderRadius: "999px",
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
            zIndex: 1,
          }}
        >
          לתיאום שיחת היכרות
        </a>
        <a
          href="#services"
          style={{
            position: "absolute",
            top: "50%",
            left: isMobile ? "5%" : "10%",
            transform: "translateY(-50%)",
            background: "#F0F1FB",
            color: "#000",
            padding: isMobile ? "8px 16px" : "10px 24px",
            borderRadius: "999px",
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
            zIndex: 1,
          }}
        >
          עוד על השירותים
        </a>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      {!isMobile && (
        <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px", color: "#666", fontSize: "0.95rem", letterSpacing: "0.03em" }}>
          <span>גלו את השירותים שלנו</span>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ animation: "bounceDown 1.5s ease-in-out infinite" }}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </section>
  );
}
