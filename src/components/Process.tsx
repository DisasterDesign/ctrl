import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Process() {
  const { process, business } = siteContent;

  return (
    <section id="process" className="py-24 lg:py-32 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-[2.25rem] font-bold text-[#1A2B3C] text-center mb-16">
            {process.title}
          </h2>
        </FadeIn>

        {/* Desktop: horizontal, Mobile: vertical */}
        <div className="hidden md:flex items-center justify-between mb-14">
          {process.steps.map((step, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.12}>
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 bg-[#3B82A0] rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-[#1A2B3C] max-w-[140px]">
                  {step.title}
                </h3>
              </div>
              {index < process.steps.length - 1 && (
                <div className="h-[2px] flex-1 bg-gradient-to-l from-[#E2E8F0] to-[#3B82A0] mx-2 mt-[-2rem]" />
              )}
            </FadeIn>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-6 mb-14">
          {process.steps.map((step, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1}>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#3B82A0] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg text-[#1A2B3C] font-medium">
                  {step.title}
                </h3>
              </div>
              {index < process.steps.length - 1 && (
                <div className="mr-6 w-px h-4 bg-[#E2E8F0]" />
              )}
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8}>
          <div className="text-center">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3B82A0] hover:bg-[#2D6A84] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              {process.cta}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
