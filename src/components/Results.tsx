import { Check, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Results() {
  const { results, business } = siteContent;

  return (
    <section className="py-24 lg:py-32 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A2B3C] mb-12">
            {results.title}
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          {results.items.map((item, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1}>
              <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(26,43,60,0.06)] text-right flex items-center gap-3">
                <div className="flex-shrink-0 w-7 h-7 bg-[#68B5A0]/15 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#68B5A0]" />
                </div>
                <span className="text-[#4A5568]">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.7}>
          <div className="bg-[#E8F4F8] rounded-xl p-6 border-r-4 border-[#3B82A0] max-w-lg mx-auto mb-10">
            <p className="text-lg">
              <strong className="text-[#3B82A0]">{results.closingLabel}</strong>{" "}
              <strong className="text-[#1A2B3C]">{results.closing}</strong>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3B82A0] hover:bg-[#2D6A84] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            {results.cta}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
