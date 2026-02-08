import { Quote } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Testimonials() {
  const { testimonials } = siteContent;

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="badge mb-6">{testimonials.badge}</span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2B3C] mb-6">
              {testimonials.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg text-[#718096] max-w-2xl mx-auto">
              {testimonials.description}
            </p>
          </FadeIn>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.items.map((item, index) => (
            <FadeIn key={index} delay={0.4 + index * 0.1}>
              <div className="relative bg-[#F5F7FA] rounded-xl p-8 h-full">
                {/* Quote icon */}
                <div className="absolute top-4 left-4">
                  <Quote className="w-8 h-8 text-[#3B82A0]/20" />
                </div>

                {/* Decorative line */}
                <div className="w-12 h-1 bg-[#3B82A0] mb-6" />

                {/* Quote text */}
                <p className="text-[#4A5568] mb-6 leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <div className="font-bold text-[#1A2B3C]">{item.name}</div>
                  <div className="text-sm text-[#718096]">{item.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Stats Bar */}
        <FadeIn delay={0.8}>
          <div className="bg-[#1A2B3C] rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {testimonials.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${
                    index !== testimonials.stats.length - 1
                      ? "md:border-l md:border-white/20"
                      : ""
                  }`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#3B82A0] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
