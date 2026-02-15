import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Process() {
  const { process, business } = siteContent;

  return (
    <section id="process" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {process.title}
          </h2>
        </FadeIn>

        {/* Steps */}
        <div className="max-w-2xl mx-auto mb-14">
          {process.steps.map((step, index) => (
            <FadeIn key={index} delay={0.15 + index * 0.1}>
              <div className="flex gap-6 items-start">
                {/* Number + Line */}
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-[#3848FE] leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < process.steps.length - 1 && (
                    <div className="w-px h-12 bg-[rgba(56,72,254,0.2)] mt-3" />
                  )}
                </div>

                {/* Text */}
                <div className="pt-1 pb-8">
                  <h3 className="text-lg font-medium">{step.title}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.7}>
          <div className="text-center">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300"
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
