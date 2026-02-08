import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Services() {
  const { services, business } = siteContent;

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="badge mb-6">{services.badge}</span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-[2.25rem] font-bold text-[#1A2B3C] mb-6">
              {services.title}
            </h2>
          </FadeIn>
        </div>

        {/* Services Grid - 3 cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.items.map((service, index) => (
            <FadeIn key={service.title} delay={0.3 + index * 0.15}>
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-[0_4px_12px_rgba(26,43,60,0.04)] hover:border-[#3B82A0] hover:shadow-[0_8px_24px_rgba(59,130,160,0.12)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#1A2B3C] mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#3B82A0] font-medium mb-4">
                  {service.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#4A5568]">
                      <span className="text-[#3B82A0] mt-1 flex-shrink-0">
                        •
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Result */}
                <div className="pt-4 border-t border-[#E2E8F0] bg-[#F5F7FA] -mx-8 -mb-8 px-8 py-5 rounded-b-2xl">
                  <p className="text-[#1A2B3C] font-medium text-sm italic">
                    {service.result}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA Button */}
        <FadeIn delay={0.7}>
          <div className="text-center">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3B82A0] hover:bg-[#2D6A84] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              בוא/י נדבר
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
