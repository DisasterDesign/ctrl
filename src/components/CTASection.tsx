"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function CTASection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { cta, business } = siteContent;

  const handleSubmitForm = () => {
    const parts = [];
    if (name) parts.push(`שם: ${name}`);
    if (phone) parts.push(`טלפון: ${phone}`);
    if (message) parts.push(`${message}`);
    const text =
      parts.length > 0
        ? parts.join("\n")
        : "היי, אשמח לשמוע עוד על השירותים שלך";
    const encodedMessage = encodeURIComponent(text);
    window.open(
      `https://wa.me/${business.whatsapp}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="py-14 md:py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* CTA Content */}
          <FadeIn>
            <div className="text-center lg:text-right">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6">
                {cta.title}
              </h2>
              <p className="text-base md:text-lg text-[#333333] mb-6 md:mb-8 whitespace-pre-line">
                {cta.subtitle}
              </p>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300 mb-4"
              >
                <MessageCircle className="w-5 h-5" />
                {cta.button}
              </a>
              <p className="text-sm text-[#666666]">{cta.subText}</p>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={cta.form.namePlaceholder}
                  className="w-full px-4 py-3 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg text-black placeholder-[#666666] focus:border-[#3848FE] focus:ring-1 focus:ring-[#3848FE] transition-all"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={cta.form.phonePlaceholder}
                  className="w-full px-4 py-3 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg text-black placeholder-[#666666] focus:border-[#3848FE] focus:ring-1 focus:ring-[#3848FE] transition-all"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={cta.form.messagePlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg text-black placeholder-[#666666] focus:border-[#3848FE] focus:ring-1 focus:ring-[#3848FE] transition-all resize-none"
                />
                <button
                  onClick={handleSubmitForm}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  {cta.form.button}
                </button>
                <p className="text-center text-sm text-[#666666]">
                  {cta.form.privacy}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
