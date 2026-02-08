import { Check, X } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function WhoIsThisFor() {
  const { whoIsThisFor } = siteContent;

  return (
    <section className="py-24 lg:py-32 bg-[#F5F7FA]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A2B3C] text-center mb-14">
            {whoIsThisFor.title}
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Suitable For */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-8 border border-[#68B5A0]/30 shadow-[0_4px_12px_rgba(26,43,60,0.04)] h-full">
              <h3 className="text-lg font-bold text-[#1A2B3C] mb-6">
                {whoIsThisFor.suitableTitle}
              </h3>
              <ul className="space-y-4">
                {whoIsThisFor.suitableFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#68B5A0]/15 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-[#68B5A0]" />
                    </div>
                    <span className="text-[#4A5568]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Less Suitable */}
          <FadeIn delay={0.4}>
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-[0_4px_12px_rgba(26,43,60,0.04)] h-full">
              <h3 className="text-lg font-bold text-[#1A2B3C] mb-6">
                {whoIsThisFor.lessSuitableTitle}
              </h3>
              <ul className="space-y-4">
                {whoIsThisFor.lessSuitable.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#718096]/10 rounded-full flex items-center justify-center mt-0.5">
                      <X className="w-4 h-4 text-[#718096]" />
                    </div>
                    <span className="text-[#718096]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
