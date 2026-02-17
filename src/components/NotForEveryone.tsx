"use client";

import { useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import { siteContent } from "@/lib/content";
import { useIsMobile } from "@/hooks/useIsMobile";
import FadeIn from "@/components/ui/FadeIn";

/* ═══════════════════════════════════════════════════════════
   WhoIsThisFor — sticky viewport + scroll-driven reveal
   Mobile: Normal scroll with FadeIn
   ═══════════════════════════════════════════════════════════ */

export default function WhoIsThisFor() {
  const { whoIsThisFor } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const suitableCardRef = useRef<HTMLDivElement>(null);
  const lessCardRef = useRef<HTMLDivElement>(null);
  const suitableItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lessItemRefs = useRef<(HTMLLIElement | null)[]>([]);
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

      const tEl = titleRef.current;
      if (tEl) {
        const t = Math.min(1, progress / 0.15);
        const e = 1 - Math.pow(1 - t, 3);
        tEl.style.opacity = `${e}`;
        tEl.style.transform = `translateY(${(1 - e) * 30}px)`;
      }

      const sCard = suitableCardRef.current;
      if (sCard) {
        const t = Math.max(0, Math.min(1, (progress - 0.12) / 0.23));
        const e = 1 - Math.pow(1 - t, 3);
        sCard.style.opacity = `${e}`;
        sCard.style.transform = `translateX(${(1 - e) * -60}px)`;
      }

      const lCard = lessCardRef.current;
      if (lCard) {
        const t = Math.max(0, Math.min(1, (progress - 0.20) / 0.25));
        const e = 1 - Math.pow(1 - t, 3);
        lCard.style.opacity = `${e}`;
        lCard.style.transform = `translateX(${(1 - e) * 60}px)`;
      }

      for (let i = 0; i < suitableItemRefs.current.length; i++) {
        const el = suitableItemRefs.current[i];
        if (!el) continue;
        const start = 0.35 + i * 0.06;
        const t = Math.max(0, Math.min(1, (progress - start) / 0.14));
        const e = 1 - Math.pow(1 - t, 3);
        el.style.opacity = `${e}`;
        el.style.transform = `translateX(${(1 - e) * -20}px)`;
      }

      for (let i = 0; i < lessItemRefs.current.length; i++) {
        const el = lessItemRefs.current[i];
        if (!el) continue;
        const start = 0.45 + i * 0.06;
        const t = Math.max(0, Math.min(1, (progress - start) / 0.14));
        const e = 1 - Math.pow(1 - t, 3);
        el.style.opacity = `${e}`;
        el.style.transform = `translateX(${(1 - e) * 20}px)`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
      <section dir="rtl" style={{ background: "#F0F1FB" }}>
        <div className="py-16 px-6">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <h2 className="text-xl font-bold text-center mb-8">
                  {whoIsThisFor.title}
                </h2>
              </FadeIn>

              <div className="grid gap-4">
                {/* Suitable */}
                <FadeIn delay={0.15}>
                  <div
                    className="bg-white rounded-2xl p-5 border border-[rgba(0,0,0,0.08)] h-full"
                    style={{ borderRight: "3px solid #3848FE" }}
                  >
                    <h3 className="text-base font-bold mb-4">{whoIsThisFor.suitableTitle}</h3>
                    <ul className="space-y-3">
                      {whoIsThisFor.suitableFor.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: "#3848FE" }}
                            strokeWidth={2.5}
                          />
                          <span className="text-sm" style={{ color: "#333333" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                {/* Less Suitable */}
                <FadeIn delay={0.25}>
                  <div
                    className="bg-white rounded-2xl p-5 border border-[rgba(0,0,0,0.08)] h-full"
                    style={{ borderRight: "3px solid rgba(0,0,0,0.15)" }}
                  >
                    <h3 className="text-base font-bold mb-4">{whoIsThisFor.lessSuitableTitle}</h3>
                    <ul className="space-y-3">
                      {whoIsThisFor.lessSuitable.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <X
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: "#666666" }}
                          />
                          <span className="text-sm" style={{ color: "#666666" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative"
      style={{ minHeight: "160vh", background: "#F0F1FB" }}
    >
      <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="max-w-3xl mx-auto">
            <h2
              ref={titleRef}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-8 md:mb-14"
              style={{ opacity: 0 }}
            >
              {whoIsThisFor.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Suitable */}
              <div
                ref={suitableCardRef}
                className="bg-white rounded-2xl p-5 md:p-8 border border-[rgba(0,0,0,0.08)] h-full"
                style={{
                  borderRight: "3px solid #3848FE",
                  opacity: 0,
                }}
              >
                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6">{whoIsThisFor.suitableTitle}</h3>
                <ul className="space-y-3 md:space-y-4">
                  {whoIsThisFor.suitableFor.map((item, index) => (
                    <li
                      key={index}
                      ref={(el) => {
                        suitableItemRefs.current[index] = el;
                      }}
                      className="flex items-start gap-3"
                      style={{ opacity: 0 }}
                    >
                      <Check
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: "#3848FE" }}
                        strokeWidth={2.5}
                      />
                      <span className="text-sm md:text-base" style={{ color: "#333333" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Less Suitable */}
              <div
                ref={lessCardRef}
                className="bg-white rounded-2xl p-5 md:p-8 border border-[rgba(0,0,0,0.08)] h-full"
                style={{
                  borderRight: "3px solid rgba(0,0,0,0.15)",
                  opacity: 0,
                }}
              >
                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6">{whoIsThisFor.lessSuitableTitle}</h3>
                <ul className="space-y-3 md:space-y-4">
                  {whoIsThisFor.lessSuitable.map((item, index) => (
                    <li
                      key={index}
                      ref={(el) => {
                        lessItemRefs.current[index] = el;
                      }}
                      className="flex items-start gap-3"
                      style={{ opacity: 0 }}
                    >
                      <X
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: "#666666" }}
                      />
                      <span className="text-sm md:text-base" style={{ color: "#666666" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
