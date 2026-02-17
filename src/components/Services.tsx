"use client";

import { useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import { useIsMobile } from "@/hooks/useIsMobile";
import FadeIn from "@/components/ui/FadeIn";

/* ═══════════════════════════════════════════════════════════
   Services — scroll-driven 3D card reveal (sticky viewport)
   Mobile: Static cards with FadeIn
   ═══════════════════════════════════════════════════════════ */

export default function Services() {
  const { services, business } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
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

      const hEl = headerRef.current;
      if (hEl) {
        const t = Math.min(1, progress / 0.15);
        hEl.style.opacity = `${t}`;
        hEl.style.transform = `translateY(${(1 - t) * 30}px)`;
      }

      const cardCount = cardRefs.current.length;
      for (let i = 0; i < cardCount; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const start = 0.15 + i * 0.2;
        const t = Math.max(0, Math.min(1, (progress - start) / 0.2));
        const eased = 1 - Math.pow(1 - t, 3);

        const rotateY = (1 - eased) * (i === 1 ? 0 : i === 0 ? 35 : -35);
        const rotateX = (1 - eased) * 15;
        const translateZ = (1 - eased) * -80;
        const translateY = (1 - eased) * 40;

        el.style.opacity = `${eased}`;
        el.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px) translateY(${translateY}px)`;
      }

      const ctaEl = ctaRef.current;
      if (ctaEl) {
        const t = Math.max(0, Math.min(1, (progress - 0.85) / 0.12));
        const eased = 1 - Math.pow(1 - t, 3);
        ctaEl.style.opacity = `${eased}`;
        ctaEl.style.transform = `translateY(${(1 - eased) * 30}px)`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="services"
      dir="rtl"
      className="relative"
      style={{ minHeight: isMobile ? "auto" : "180vh", background: "#F0F1FB" }}
    >
      <div className={`${isMobile ? "py-16" : "sticky top-0 h-screen flex items-center"} flex flex-col items-center justify-center px-6 md:px-12 lg:px-20`}>
        <div className="max-w-[1200px] mx-auto w-full">
          {/* Header */}
          {isMobile ? (
            <FadeIn>
              <div className="text-center mb-8">
                <p className="text-sm font-medium mb-4" style={{ color: "#3848FE" }}>
                  {services.badge}
                </p>
                <h2 className="text-2xl font-bold">{services.title}</h2>
              </div>
            </FadeIn>
          ) : (
            <div
              ref={headerRef}
              className="text-center mb-8 md:mb-12 lg:mb-16"
              style={{ opacity: 0 }}
            >
              <p className="text-sm font-medium mb-4" style={{ color: "#3848FE" }}>
                {services.badge}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{services.title}</h2>
            </div>
          )}

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10 lg:mb-12" style={{ perspective: isMobile ? undefined : "1200px" }}>
            {services.items.map((service, index) => {
              const cardContent = (
                <div
                  {...(!isMobile ? {
                    ref: (el: HTMLDivElement | null) => { cardRefs.current[index] = el; }
                  } : {})}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#3848FE] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  style={{
                    opacity: isMobile ? undefined : 0,
                    transformStyle: isMobile ? undefined : "preserve-3d",
                    backfaceVisibility: isMobile ? undefined : "hidden",
                  }}
                >
                  <h3 className="text-lg md:text-xl font-bold mb-3">{service.title}</h3>
                  <p className="font-medium text-sm mb-4" style={{ color: "#3848FE" }}>
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2" style={{ color: "#333333" }}>
                        <span className="mt-1 flex-shrink-0" style={{ color: "#3848FE" }}>
                          •
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                    <p className="text-sm italic" style={{ color: "#666666" }}>
                      {service.result}
                    </p>
                  </div>
                </div>
              );

              if (isMobile) {
                return (
                  <FadeIn key={service.title} delay={0.1 + index * 0.12}>
                    {cardContent}
                  </FadeIn>
                );
              }
              return <div key={service.title}>{cardContent}</div>;
            })}
          </div>

          {/* CTA */}
          {isMobile ? (
            <FadeIn delay={0.5}>
              <div className="text-center">
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
                  בוא/י נדבר
                </a>
              </div>
            </FadeIn>
          ) : (
            <div ref={ctaRef} className="text-center" style={{ opacity: 0 }}>
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
                בוא/י נדבר
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
