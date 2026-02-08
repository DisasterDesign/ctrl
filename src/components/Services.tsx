import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Services() {
  const { services, business } = siteContent;

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F7F9FB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="badge mb-6">{services.badge}</span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#142850] mb-6">
              {services.title}
            </h2>
          </FadeIn>
        </div>

        {/* Services Grid - 3 cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.items.map((service, index) => (
            <FadeIn key={service.title} delay={0.3 + index * 0.1}>
              <div className="bg-white rounded-xl p-8 card-shadow card-shadow-hover transition-all duration-300 h-full flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#142850] mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#0090D5] font-medium mb-4">
                  {service.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#666666]">
                      <span className="text-[#0090D5] mt-1 flex-shrink-0">
                        •
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Result */}
                <div className="pt-4 border-t border-[#e2e8f0]">
                  <p className="text-[#142850] font-medium text-sm">
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0090D5] hover:bg-[#0077b3] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
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
