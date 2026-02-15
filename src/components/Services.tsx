import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Services() {
  const { services, business } = siteContent;

  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-sm font-medium text-[#3848FE] mb-4">{services.badge}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="text-3xl md:text-4xl font-bold">{services.title}</h2>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {services.items.map((service, index) => (
            <FadeIn key={service.title} delay={0.2 + index * 0.12}>
              <div className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#3848FE] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-[#3848FE] font-medium text-sm mb-4">{service.description}</p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#333333]">
                      <span className="text-[#3848FE] mt-1 flex-shrink-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[rgba(0,0,0,0.08)]">
                  <p className="text-[#666666] text-sm italic">{service.result}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.6}>
          <div className="text-center">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300"
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
