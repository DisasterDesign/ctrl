"use client";

import { useEffect, useRef, useState } from "react";
import HeroOverlay from "./HeroOverlay";
import { COLORS, MOBILE_BREAKPOINT } from "./constants";

export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const chaosEl = chaosRef.current;
    const titleEl = titleRef.current;
    const ctaEl = ctaRef.current;
    if (!section || !viewport || !chaosEl || !titleEl || !ctaEl) return;

    let disposed = false;
    let rafId: number;

    // Dynamic imports to avoid SSR
    async function init() {
      const [
        { SceneManager },
        { PhysicsWorld },
        { createObjects },
        { MouseInteraction },
        { ScrollAnimator },
      ] = await Promise.all([
        import("./SceneManager"),
        import("./PhysicsWorld"),
        import("./ObjectFactory"),
        import("./MouseInteraction"),
        import("./ScrollAnimator"),
      ]);

      if (disposed) return;

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

      // Initialize systems
      const scene = new SceneManager(viewport!);
      const physics = new PhysicsWorld();
      createObjects(scene.scene, physics, isMobile);
      const mouse = new MouseInteraction(
        scene.renderer.domElement,
        scene.camera,
        physics
      );
      const scroll = new ScrollAnimator(
        section!,
        physics,
        mouse,
        chaosEl!,
        titleEl!,
        ctaEl!
      );

      // Render loop
      function loop() {
        if (disposed) return;
        rafId = requestAnimationFrame(loop);
        if (!scene.isVisible) return;
        physics.step();
        scene.render();
      }
      loop();

      // Cleanup
      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        scroll.dispose();
        mouse.dispose();
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

  // Reduced motion fallback
  if (reducedMotion) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center" style={{ background: "#0A0A0F" }}>
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold" style={{ color: "#EDEDF0" }}>
            בהירות בעסק.
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-2" style={{ color: "#4A56D0" }}>
            שקט בניהול.
          </h1>
          <p className="mt-6 text-base md:text-lg max-w-md mx-auto whitespace-pre-line" style={{ color: "#EDEDF0", opacity: 0.7 }}>
            עושה סדר בכספים, בתהליכים ובניהול השוטף של העסק —{"\n"}כדי שתוכל/י לקבל החלטות רגועות ולצמוח בביטחון.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="hero" style={{ height: "200vh", position: "relative" }}>
      <div
        className="sticky top-0 flex items-center justify-center overflow-hidden"
        style={{ height: "100vh", background: COLORS.pageBackground }}
      >
        {/* 3D Viewport */}
        <div
          ref={viewportRef}
          className="relative w-full h-full overflow-hidden"
          style={{
            margin: "16px",
            borderRadius: "16px",
            background: `#${COLORS.background.toString(16).padStart(6, "0")}`,
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "calc(100vh - 32px)",
          }}
        >
          {/* Canvas will be appended here by SceneManager */}

          {/* DOM Overlays */}
          <HeroOverlay chaosRef={chaosRef} titleRef={titleRef} ctaRef={ctaRef} />
        </div>
      </div>
    </section>
  );
}
