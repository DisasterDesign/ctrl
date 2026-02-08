import { Check, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Results() {
  const { results, business } = siteContent;

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#142850] mb-12">
            {results.title}
          </h2>
        </FadeIn>

        <div className="space-y-5 mb-12 max-w-xl mx-auto">
          {results.items.map((item, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1}>
              <div className="flex items-center gap-3 text-right">
                <div className="flex-shrink-0 w-7 h-7 bg-[#0090D5]/10 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#0090D5]" />
                </div>
                <span className="text-lg text-[#333333]">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.7}>
          <p className="text-lg mb-10">
            <strong className="text-[#0090D5]">{results.closingLabel}</strong>{" "}
            <strong className="text-[#142850]">{results.closing}</strong>
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0090D5] hover:bg-[#0077b3] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            {results.cta}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
