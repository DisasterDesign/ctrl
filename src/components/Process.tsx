import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Process() {
  const { process, business } = siteContent;

  return (
    <section id="process" className="py-24 lg:py-32 bg-dark-gradient">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16">
            {process.title}
          </h2>
        </FadeIn>

        <div className="space-y-8">
          {process.steps.map((step, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1}>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-[#0090D5] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl text-white font-medium">
                  {step.title}
                </h3>
              </div>
              {index < process.steps.length - 1 && (
                <div className="mr-6 w-px h-4 bg-white/20" />
              )}
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8}>
          <div className="text-center mt-14">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0090D5] hover:bg-[#0077b3] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              {process.cta}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
