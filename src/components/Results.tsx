"use client";

import { useRef, useEffect } from "react";
import {
  BarChart3,
  SlidersHorizontal,
  ListChecks,
  TrendingUp,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { siteContent } from "@/lib/content";
import { useIsMobile } from "@/hooks/useIsMobile";
import FadeIn from "@/components/ui/FadeIn";

/* ═══════════════════════════════════════════════════════════
   Results — Roadmap Section
   Desktop: Sticky viewport + scroll-driven milestone reveal
   Mobile: Simple vertical list with FadeIn
   ═══════════════════════════════════════════════════════════ */

const STEP_ICONS = [BarChart3, SlidersHorizontal, ListChecks, TrendingUp, ShieldCheck];
const THRESHOLDS = [0.05, 0.22, 0.39, 0.56, 0.73];
const REVEAL_RANGE = 0.12;

export default function Results() {
  const { results, business } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<SVGLineElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    // Prepare icon SVG paths for stroke-draw animation
    const iconPaths: SVGElement[][] = [];
    const iconLengths: number[][] = [];
    for (let i = 0; i < THRESHOLDS.length; i++) {
      const el = milestoneRefs.current[i];
      if (!el) { iconPaths.push([]); iconLengths.push([]); continue; }
      const svgEl = el.querySelector(".milestone-icon svg");
      if (!svgEl) { iconPaths.push([]); iconLengths.push([]); continue; }
      const paths = Array.from(svgEl.querySelectorAll("path, line, polyline")) as SVGElement[];
      const lengths: number[] = [];
      for (const p of paths) {
        try {
          const len = (p as SVGGeometryElement).getTotalLength?.() ?? 100;
          (p as unknown as HTMLElement).style.strokeDasharray = `${len}`;
          (p as unknown as HTMLElement).style.strokeDashoffset = `${len}`;
          lengths.push(len);
        } catch {
          lengths.push(100);
        }
      }
      iconPaths.push(paths);
      iconLengths.push(lengths);
    }

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledInto = -rect.top;
      const totalScroll = rect.height - vh;
      const progress = Math.max(0, Math.min(1, scrolledInto / totalScroll));

      // Title: fade in early
      const tEl = titleRef.current;
      if (tEl) {
        const tp = Math.max(0, Math.min(1, progress / 0.06));
        tEl.style.opacity = `${tp}`;
        tEl.style.transform = `translateY(${(1 - tp) * 30}px)`;
      }

      // Dashed line: progressive reveal
      const lineEl = lineRef.current;
      if (lineEl) {
        const lineProgress = Math.min(1, progress / 0.85);
        const clip = `inset(0 0 ${(1 - lineProgress) * 100}% 0)`;
        lineEl.style.clipPath = clip;
        (lineEl.style as unknown as Record<string, string>).webkitClipPath = clip;
      }

      // Milestones
      for (let i = 0; i < THRESHOLDS.length; i++) {
        const el = milestoneRefs.current[i];
        if (!el) continue;

        const threshold = THRESHOLDS[i];
        const t = Math.max(0, Math.min(1, (progress - threshold) / REVEAL_RANGE));
        const eased = 1 - Math.pow(1 - t, 3);

        el.style.opacity = `${eased}`;
        const isEven = i % 2 === 0;
        const slideX = (1 - eased) * (isEven ? 60 : -60);
        const slideY = (1 - eased) * 20;
        el.style.transform = `translate(${slideX}px, ${slideY}px)`;

        const iconEl = el.querySelector(".milestone-icon") as HTMLElement;
        if (iconEl) {
          iconEl.style.transform = `scale(${0.3 + 0.7 * eased})`;
          iconEl.style.opacity = `${eased}`;
        }

        // Icon stroke-draw animation
        const paths = iconPaths[i];
        const lengths = iconLengths[i];
        if (paths.length) {
          const drawT = Math.max(0, Math.min(1, (t - 0.3) / 0.7));
          const drawEased = 1 - Math.pow(1 - drawT, 2);
          for (let j = 0; j < paths.length; j++) {
            (paths[j] as unknown as HTMLElement).style.strokeDashoffset = `${lengths[j] * (1 - drawEased)}`;
          }
        }
      }

      // CTA
      const ctaEl = ctaRef.current;
      if (ctaEl) {
        const cp = Math.max(0, Math.min(1, (progress - 0.88) / 0.10));
        const eased = 1 - Math.pow(1 - cp, 3);
        ctaEl.style.opacity = `${eased}`;
        ctaEl.style.transform = `translateY(${(1 - eased) * 40}px)`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="results"
      dir="rtl"
      className="relative"
      style={{ minHeight: isMobile ? "auto" : "250vh", background: "#F0F1FB" }}
    >
      {/* Sticky viewport (disabled on mobile) */}
      <div className={`${isMobile ? "py-16" : "sticky top-0 h-screen gpu-layer"} flex flex-col items-center overflow-hidden px-6 md:px-12 lg:px-20`}>
        {/* Title */}
        {isMobile ? (
          <FadeIn>
            <div className="pt-0 pb-4 text-center">
              <h2
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold"
                style={{ color: "#000" }}
              >
                {results.title}
              </h2>
            </div>
          </FadeIn>
        ) : (
          <div
            ref={titleRef}
            className="pt-10 md:pt-20 lg:pt-28 pb-4 md:pb-6 lg:pb-10 text-center"
            style={{ opacity: 0 }}
          >
            <h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold"
              style={{ color: "#000" }}
            >
              {results.title}
            </h2>
          </div>
        )}

        {/* Roadmap area */}
        <div className="relative w-full max-w-[1000px] mx-auto flex-1 flex items-center">
          {/* Dashed vertical line — desktop only */}
          {!isMobile && (
            <svg
              className="absolute left-1/2 top-[5%] h-[90%] -translate-x-1/2 pointer-events-none"
              width="4"
              viewBox="0 0 4 1000"
              preserveAspectRatio="none"
              style={{ overflow: "visible" }}
            >
              <line
                ref={lineRef}
                x1="2"
                y1="0"
                x2="2"
                y2="1000"
                stroke="#3848FE"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
                opacity="0.35"
                style={{ clipPath: "inset(0 0 100% 0)", WebkitClipPath: "inset(0 0 100% 0)" } as React.CSSProperties}
              />
            </svg>
          )}

          {/* Milestones */}
          <div className="relative w-full py-4">
            {results.items.map((item, i) => {
              const Icon = STEP_ICONS[i];
              const isEven = i % 2 === 0;

              if (isMobile) {
                return (
                  <FadeIn key={i} delay={0.1 + i * 0.08}>
                    <div className="flex flex-col items-center gap-3 mb-6">
                      <div
                        className="milestone-icon flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: "#3848FE",
                          boxShadow: "0 4px 20px rgba(56,72,254,0.3)",
                        }}
                      >
                        <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                      </div>
                      <div className="w-full text-center text-right">
                        <div
                          className="rounded-2xl p-4"
                          style={{
                            background: "rgba(255,255,255,0.8)",
                            border: "1px solid rgba(56,72,254,0.08)",
                          }}
                        >
                          <p className="text-base font-medium text-black leading-relaxed">
                            {item}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              }

              return (
                <div
                  key={i}
                  ref={(el) => {
                    milestoneRefs.current[i] = el;
                  }}
                  className={`flex items-center gap-4 md:gap-6 mb-8 md:mb-12 ${isEven ? "flex-row" : "flex-row md:flex-row-reverse"}`}
                  style={{ opacity: 0 }}
                >
                  {/* Text card */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} text-right`}>
                    <div
                      className="rounded-2xl p-4 md:p-5 lg:p-7"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        border: "1px solid rgba(56,72,254,0.08)",
                      }}
                    >
                      <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-black leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>

                  {/* Icon node — desktop */}
                  <div
                    className="milestone-icon flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: "#3848FE",
                      boxShadow: "0 4px 20px rgba(56,72,254,0.3)",
                      transform: "scale(0.3)",
                      opacity: 0,
                    }}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Spacer for alternating side — desktop only */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Block */}
        {isMobile ? (
          <FadeIn delay={0.6}>
            <div className="pb-6 text-center">
              <div className="mb-4">
                <p className="text-base">
                  <span className="font-bold" style={{ color: "#3848FE" }}>
                    {results.closingLabel}
                  </span>{" "}
                  <span className="font-bold text-black">{results.closing}</span>
                </p>
              </div>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-medium rounded-full transition-colors duration-300"
                style={{ background: "#3848FE" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2B35CC")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#3848FE")}
              >
                <MessageCircle className="w-5 h-5" />
                {results.cta}
              </a>
            </div>
          </FadeIn>
        ) : (
          <div
            ref={ctaRef}
            className="pb-6 md:pb-10 lg:pb-16 text-center"
            style={{ opacity: 0 }}
          >
            <div className="mb-4 md:mb-5">
              <p className="text-base md:text-lg lg:text-xl">
                <span className="font-bold" style={{ color: "#3848FE" }}>
                  {results.closingLabel}
                </span>{" "}
                <span className="font-bold text-black">{results.closing}</span>
              </p>
            </div>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-medium rounded-full transition-colors duration-300"
              style={{ background: "#3848FE" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2B35CC")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3848FE")}
            >
              <MessageCircle className="w-5 h-5" />
              {results.cta}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
