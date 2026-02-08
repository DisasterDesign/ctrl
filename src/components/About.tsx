import { Check } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <FadeIn>
              <span className="badge mb-6">{about.badge}</span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#142850] mb-4">
                {about.title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg text-[#0090D5] font-medium mb-6">
                {about.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="text-lg text-[#666666] leading-relaxed mb-10 whitespace-pre-line">
                {about.description}
              </div>
            </FadeIn>

            {/* Values with checkmarks */}
            <div className="grid sm:grid-cols-2 gap-4">
              {about.values.map((value, index) => (
                <FadeIn key={index} delay={0.5 + index * 0.1}>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#0090D5]/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#0090D5]" />
                    </div>
                    <span className="text-[#142850] font-medium">{value}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Image placeholder */}
          <FadeIn delay={0.3}>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-[#0090D5]/20 to-[#142850]/20 rounded-2xl shadow-xl overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#142850]/30">
                    <div className="text-6xl mb-4">👩‍💼</div>
                    <p className="text-sm">תמונה של שרית</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#0090D5]/10 rounded-xl -z-10" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
