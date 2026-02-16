"use client";

import { useEffect, useRef } from "react";
import { initHero3D } from "./scene";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = initHero3D(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#F0F1FB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "120px 24px 40px",
        direction: "rtl",
      }}
    >
      {/* טקסט מעל התיבה */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "800px",
          marginBottom: "32px",
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontSize: "0.85rem",
            color: "#3848FE",
            fontWeight: 500,
            marginBottom: "16px",
            letterSpacing: "0.08em",
          }}
        >
          ניהול פיננסי ותפעולי לבעלי עסקים
        </p>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "#000000",
            lineHeight: 1.15,
            marginBottom: "24px",
          }}
        >
          בהירות בעסק.
          <br />
          שקט בניהול.
        </h1>
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "#333333",
            maxWidth: "550px",
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          עושה סדר בכספים, בתהליכים ובניהול השוטף של העסק — כדי שתוכל/י לקבל
          החלטות רגועות ולצמוח בביטחון.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#contact"
            style={{
              background: "#3848FE",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            לתיאום שיחת היכרות
          </a>
          <a
            href="#services"
            style={{
              border: "1.5px solid #3848FE",
              color: "#3848FE",
              padding: "14px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            עוד על השירותים
          </a>
        </div>
      </div>

      {/* תיבה שחורה עם Canvas */}
      <div
        id="hero-box"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1400px",
          height: "55vh",
          minHeight: "400px",
          background: "#000000",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </section>
  );
}
