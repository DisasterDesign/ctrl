import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <FadeIn>
              <p className="text-sm font-medium text-[#3848FE] mb-4">{about.badge}</p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {about.title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-[#3848FE] font-medium mb-6">{about.subtitle}</p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="text-lg text-[#333333] leading-relaxed mb-10 whitespace-pre-line">
                {about.description}
              </div>
            </FadeIn>

            {/* Value badges */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-3">
                {about.values.map((value, index) => (
                  <span
                    key={index}
                    className="inline-block px-4 py-1.5 text-sm font-medium text-[#3848FE] border border-[#3848FE] rounded-full"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Image placeholder */}
          <FadeIn delay={0.2}>
            <div className="aspect-square max-w-md mx-auto bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center">
              <div className="text-center text-[#666666]">
                <p className="text-sm">תמונה של שרית</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
