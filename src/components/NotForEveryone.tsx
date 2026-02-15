import { Check, X } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function WhoIsThisFor() {
  const { whoIsThisFor } = siteContent;

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-14">
              {whoIsThisFor.title}
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Suitable */}
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.08)] border-r-[3px] border-r-[#3848FE] h-full">
                <h3 className="text-lg font-bold mb-6">{whoIsThisFor.suitableTitle}</h3>
                <ul className="space-y-4">
                  {whoIsThisFor.suitableFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#3848FE] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-[#333333]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Less Suitable */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.08)] border-r-[3px] border-r-[rgba(0,0,0,0.15)] h-full">
                <h3 className="text-lg font-bold mb-6">{whoIsThisFor.lessSuitableTitle}</h3>
                <ul className="space-y-4">
                  {whoIsThisFor.lessSuitable.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-[#666666] flex-shrink-0 mt-0.5" />
                      <span className="text-[#666666]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
