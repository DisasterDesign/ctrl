"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function FAQ() {
  const { faq } = siteContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-14 md:py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <FadeIn>
              <p className="text-sm font-medium text-[#3848FE] mb-4">{faq.badge}</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{faq.title}</h2>
            </FadeIn>
          </div>

          {/* FAQ Items */}
          <div>
            {faq.items.map((item, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.05}>
                <div className="border-b border-[rgba(0,0,0,0.08)]">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between py-6 text-right"
                  >
                    <span className="text-base md:text-lg font-semibold pr-4">{item.question}</span>
                    {openIndex === index ? (
                      <X className="w-5 h-5 text-[#3848FE] flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#3848FE] flex-shrink-0" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-[#333333] leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
