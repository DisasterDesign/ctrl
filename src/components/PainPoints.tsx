import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function PainPoints() {
  const { painPoints } = siteContent;

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A2B3C] mb-4">
            {painPoints.title}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-[#718096] mb-10">{painPoints.subtitle}</p>
        </FadeIn>

        <div className="space-y-4 mb-12 text-right max-w-xl mx-auto">
          {painPoints.items.map((item, index) => (
            <FadeIn key={index} delay={0.3 + index * 0.1}>
              <div className="flex items-center gap-3">
                <span className="text-[#3B82A0] font-bold text-lg flex-shrink-0">
                  —
                </span>
                <p className="text-lg text-[#4A5568]">{item}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8}>
          <p className="text-lg text-[#718096]">
            {painPoints.closing}
            <br />
            <strong className="text-[#3B82A0] text-xl">
              {painPoints.closingBold}
            </strong>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
