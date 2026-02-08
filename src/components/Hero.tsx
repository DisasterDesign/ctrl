import { MessageCircle, ArrowDown } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";
import HeroAnimation from "@/components/HeroAnimation";

export default function Hero() {
  const { hero, business } = siteContent;

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Animated geometric shapes — right side */}
      <HeroAnimation />

      {/* Content — left half of the screen */}
      <div dir="ltr" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
        <div dir="rtl" className="py-20 w-full lg:w-1/2 text-center lg:text-right">
          <FadeIn delay={0.2}>
            <span className="inline-block px-4 py-2 text-sm font-medium text-[#3B82A0] bg-[#E8F4F8] rounded-full mb-6">
              {hero.badge}
            </span>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#1A2B3C] leading-tight mb-2 clarity-line">
              {hero.title}
              <br />
              <span className="text-[#3B82A0]">{hero.titleHighlight}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="text-lg md:text-xl text-[#4A5568] max-w-xl mb-10 leading-relaxed whitespace-pre-line mt-8 mx-auto lg:mx-0">
              {hero.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-4">
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3B82A0] hover:bg-[#2D6A84] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                {hero.cta1}
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#E2E8F0] hover:border-[#3B82A0] text-[#1A2B3C] font-medium rounded-lg transition-all duration-300"
              >
                {hero.cta2}
              </a>
            </div>
            <p className="text-sm text-[#718096] mb-12">{hero.subCta}</p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={1}>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
              {hero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#3B82A0]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#718096] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <FadeIn delay={1.2}>
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#718096] hover:text-[#3B82A0] transition-colors"
        >
          <span className="text-sm">גלול למטה</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </FadeIn>
    </section>
  );
}
