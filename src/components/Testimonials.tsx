import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Testimonials() {
  const { testimonials } = siteContent;

  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-sm font-medium text-[#3848FE] mb-4">{testimonials.badge}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {testimonials.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              {testimonials.description}
            </p>
          </FadeIn>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.items.map((item, index) => (
            <FadeIn key={index} delay={0.25 + index * 0.1}>
              <div className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full flex flex-col">
                {/* Quote mark */}
                <span className="text-5xl font-bold text-[#3848FE] leading-none mb-4">&ldquo;</span>

                <p className="text-[#333333] mb-6 leading-relaxed flex-grow">
                  {item.text}
                </p>

                <div className="pt-4 border-t border-[rgba(0,0,0,0.08)]">
                  <div className="font-bold text-black">{item.name}</div>
                  <div className="text-sm text-[#666666]">{item.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Stats Row */}
        <FadeIn delay={0.6}>
          <div className="flex justify-center gap-16 md:gap-24">
            {testimonials.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#3848FE] mb-2">
                  {stat.value}
                </div>
                <div className="text-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
