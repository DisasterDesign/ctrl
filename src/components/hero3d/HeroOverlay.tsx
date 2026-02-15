"use client";

import { forwardRef } from "react";
import { MessageCircle, ArrowDown } from "lucide-react";
import { siteContent } from "@/lib/content";
import { COLORS } from "./constants";

export interface OverlayRefs {
  chaosEl: HTMLDivElement | null;
  titleEl: HTMLDivElement | null;
  ctaEl: HTMLDivElement | null;
}

interface Props {
  chaosRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLDivElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroOverlay({ chaosRef, titleRef, ctaRef }: Props) {
  const { hero, business } = siteContent;

  return (
    <>
      {/* Chaos state — visible initially */}
      <div
        ref={chaosRef}
        className="absolute inset-x-0 bottom-16 z-10 text-center pointer-events-none"
      >
        <p className="text-sm md:text-base tracking-wide" style={{ color: "#EDEDF0", opacity: 0.5 }}>
          כל הנתונים, המשימות, הפרטים...
        </p>
        <ArrowDown
          className="mx-auto mt-4 animate-bounce"
          style={{ color: "#EDEDF0", opacity: 0.3 }}
          size={20}
        />
      </div>

      {/* Clarity state — initially hidden, fades in via GSAP */}
      <div
        ref={titleRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none opacity-0"
      >
        <p
          className="text-xs md:text-sm tracking-widest uppercase mb-6"
          style={{ color: "#7B82C0" }}
        >
          {hero.badge}
        </p>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          style={{ color: "#EDEDF0" }}
        >
          {hero.title}
        </h1>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mt-1"
          style={{ color: "#4A56D0" }}
        >
          {hero.titleHighlight}
        </h1>
        <p
          className="mt-6 text-base md:text-lg max-w-md whitespace-pre-line"
          style={{ color: "#EDEDF0", opacity: 0.7 }}
        >
          {hero.description}
        </p>
      </div>

      {/* CTA — fades in after title */}
      <div
        ref={ctaRef}
        className="absolute inset-x-0 bottom-20 md:bottom-24 z-10 flex flex-col items-center gap-4 opacity-0"
      >
        <a
          href={`https://wa.me/${business.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 pointer-events-auto"
          style={{ background: COLORS.cta.primary }}
          onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.cta.hover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.cta.primary)}
        >
          <MessageCircle className="w-5 h-5" />
          {hero.cta1}
        </a>
        <p className="text-xs" style={{ color: "#EDEDF0", opacity: 0.4 }}>
          {hero.subCta}
        </p>
      </div>
    </>
  );
}
