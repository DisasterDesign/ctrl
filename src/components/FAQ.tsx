"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function FAQ() {
  const { faq } = siteContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 lg:py-32 bg-dark-gradient">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="inline-block px-4 py-2 text-sm font-medium text-[#0090D5] bg-[#0090D5]/10 rounded-full mb-6">
              {faq.badge}
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {faq.title}
            </h2>
          </FadeIn>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faq.items.map((item, index) => (
            <FadeIn key={index} delay={0.3 + index * 0.05}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-6 text-right"
                >
                  <span className="text-lg font-medium text-white pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0090D5] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-white/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
