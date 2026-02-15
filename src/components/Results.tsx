import { Check, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Results() {
  const { results, business } = siteContent;

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">
              {results.title}
            </h2>
          </FadeIn>

          <div className="space-y-5 mb-12">
            {results.items.map((item, index) => (
              <FadeIn key={index} delay={0.15 + index * 0.08}>
                <div className="flex items-center gap-4">
                  <Check className="w-5 h-5 text-[#3848FE] flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-lg text-[#333333]">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6}>
            <div className="border-r-[3px] border-[#3848FE] pr-6 mb-10">
              <p className="text-lg">
                <strong className="text-[#3848FE]">{results.closingLabel}</strong>{" "}
                <strong className="text-black">{results.closing}</strong>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="text-center">
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                {results.cta}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
