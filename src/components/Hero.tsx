import { Check, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  const { hero, business } = siteContent;

  return (
    <section id="hero" className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <FadeIn>
              <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }} className="font-bold leading-tight">
                {hero.title}
                <br />
                <span className="text-[#3848FE]">{hero.titleHighlight}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg text-[#333333] whitespace-pre-line max-w-lg">
                {hero.description}
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  {hero.cta1}
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center px-8 py-3.5 border-[1.5px] border-[#3848FE] text-[#3848FE] hover:bg-[rgba(56,72,254,0.08)] font-medium rounded-full transition-colors duration-300"
                >
                  {hero.cta2}
                </a>
              </div>
            </FadeIn>

            {/* Checkmarks */}
            <FadeIn delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-6">
                {hero.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#3848FE]" strokeWidth={2.5} />
                    <span className="text-sm text-[#333333]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* 3D Placeholder */}
          <FadeIn delay={0.2}>
            <div
              id="hero-3d-placeholder"
              className="w-full min-h-[500px] rounded-2xl"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
