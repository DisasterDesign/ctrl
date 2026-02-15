import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function PainPoints() {
  const { painPoints } = siteContent;

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {painPoints.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg text-[#666666] mb-10">{painPoints.subtitle}</p>
          </FadeIn>

          <div className="space-y-4 mb-12 text-right max-w-xl mx-auto">
            {painPoints.items.map((item, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.08}>
                <div className="flex items-center gap-3">
                  <span className="text-[#3848FE] font-bold text-lg flex-shrink-0">—</span>
                  <p className="text-lg text-[#333333]">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6}>
            <p className="text-lg text-[#666666]">
              {painPoints.closing}
              <br />
              <strong className="text-black text-xl">{painPoints.closingBold}</strong>
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
