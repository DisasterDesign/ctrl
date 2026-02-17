"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { siteContent } from "@/lib/content";
import { useIsMobile } from "@/hooks/useIsMobile";
import FadeIn from "@/components/ui/FadeIn";

/* ═══════════════════════════════════════════════════════════
   About — sticky viewport + scroll-driven reveal
   Mobile: Normal scroll with FadeIn
   ═══════════════════════════════════════════════════════════ */

export default function About() {
  const { about } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

      const bEl = badgeRef.current;
      if (bEl) {
        const t = Math.min(1, progress / 0.12);
        const e = 1 - Math.pow(1 - t, 3);
        bEl.style.opacity = `${e}`;
        bEl.style.transform = `translateX(${(1 - e) * -40}px)`;
      }

      const tEl = titleRef.current;
      if (tEl) {
        const t = Math.max(0, Math.min(1, (progress - 0.08) / 0.14));
        const e = 1 - Math.pow(1 - t, 3);
        tEl.style.opacity = `${e}`;
        tEl.style.transform = `translateY(${(1 - e) * 30}px)`;
      }

      const sEl = subtitleRef.current;
      if (sEl) {
        const t = Math.max(0, Math.min(1, (progress - 0.15) / 0.15));
        const e = 1 - Math.pow(1 - t, 3);
        sEl.style.opacity = `${e}`;
        sEl.style.transform = `translateY(${(1 - e) * 20}px)`;
      }

      const dEl = descRef.current;
      if (dEl) {
        const t = Math.max(0, Math.min(1, (progress - 0.25) / 0.20));
        const e = 1 - Math.pow(1 - t, 3);
        dEl.style.opacity = `${e}`;
        dEl.style.transform = `translateY(${(1 - e) * 25}px)`;
      }

      for (let i = 0; i < valueRefs.current.length; i++) {
        const el = valueRefs.current[i];
        if (!el) continue;
        const start = 0.45 + i * 0.06;
        const t = Math.max(0, Math.min(1, (progress - start) / 0.15));
        const e = 1 - Math.pow(1 - t, 3);
        el.style.opacity = `${e}`;
        el.style.transform = `scale(${0.7 + 0.3 * e}) translateY(${(1 - e) * 10}px)`;
      }

      const iEl = imageRef.current;
      if (iEl) {
        const t = Math.max(0, Math.min(1, (progress - 0.10) / 0.30));
        const e = 1 - Math.pow(1 - t, 3);
        iEl.style.opacity = `${e}`;
        iEl.style.transform = `translateX(${(1 - e) * 50}px) rotate(${(1 - e) * -3}deg)`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
      <section id="about" dir="rtl" style={{ background: "#F0F1FB" }}>
        <div className="py-16 px-6">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="grid gap-8 items-center">
              {/* Content */}
              <div>
                <FadeIn>
                  <p className="text-sm font-medium mb-4" style={{ color: "#3848FE" }}>
                    {about.badge}
                  </p>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h2 className="text-2xl font-bold mb-4">
                    {about.title}
                  </h2>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <p className="text-base font-medium mb-4" style={{ color: "#3848FE" }}>
                    {about.subtitle}
                  </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="text-base leading-relaxed mb-6 whitespace-pre-line" style={{ color: "#333333" }}>
                    {about.description}
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-2">
                    {about.values.map((value, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1.5 text-sm font-medium rounded-full"
                        style={{
                          color: "#3848FE",
                          border: "1px solid #3848FE",
                        }}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Image */}
              <FadeIn delay={0.35}>
                <div className="aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden">
                  <Image
                    src="/Gemini_Generated_Image_xsl90sxsl90sxsl9.png"
                    alt="שרית — CLARITY"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      dir="rtl"
      className="relative"
      style={{ minHeight: "180vh", background: "#F0F1FB" }}
    >
      <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <p
                ref={badgeRef}
                className="text-sm font-medium mb-4"
                style={{ color: "#3848FE", opacity: 0 }}
              >
                {about.badge}
              </p>

              <h2
                ref={titleRef}
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
                style={{ opacity: 0 }}
              >
                {about.title}
              </h2>

              <p
                ref={subtitleRef}
                className="text-base md:text-lg font-medium mb-4 md:mb-6"
                style={{ color: "#3848FE", opacity: 0 }}
              >
                {about.subtitle}
              </p>

              <div
                ref={descRef}
                className="text-base md:text-lg leading-relaxed mb-6 md:mb-10 whitespace-pre-line"
                style={{ color: "#333333", opacity: 0 }}
              >
                {about.description}
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3">
                {about.values.map((value, index) => (
                  <span
                    key={index}
                    ref={(el) => {
                      valueRefs.current[index] = el;
                    }}
                    className="inline-block px-3 md:px-4 py-1.5 text-sm font-medium rounded-full"
                    style={{
                      color: "#3848FE",
                      border: "1px solid #3848FE",
                      opacity: 0,
                    }}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Image */}
            <div
              ref={imageRef}
              className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden"
              style={{ opacity: 0 }}
            >
              <Image
                src="/Gemini_Generated_Image_xsl90sxsl90sxsl9.png"
                alt="שרית — CLARITY"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
