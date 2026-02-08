import { MessageCircle, ArrowDown } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  const { hero, business } = siteContent;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-dark-gradient overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dots pattern */}
        <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
          <div className="grid grid-cols-4 gap-3">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full" />
            ))}
          </div>
        </div>
        {/* Circles */}
        <div className="absolute bottom-20 left-10 w-64 h-64 border border-white/10 rounded-full" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-full" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-20 text-center">
        <FadeIn delay={0.2}>
          <span className="inline-block px-4 py-2 text-sm font-medium text-[#0090D5] bg-[#0090D5]/10 rounded-full mb-6">
            {hero.badge}
          </span>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {hero.title}
            <br />
            <span className="text-[#0090D5]">{hero.titleHighlight}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed whitespace-pre-line">
            {hero.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0090D5] hover:bg-[#0077b3] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              {hero.cta1}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-medium rounded-lg transition-all duration-300"
            >
              {hero.cta2}
            </a>
          </div>
          <p className="text-sm text-white/50 mb-16">{hero.subCta}</p>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={1}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {hero.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0090D5]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FadeIn delay={1.2}>
          <a
            href="#about"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          >
            <span className="text-sm">גלול למטה</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
