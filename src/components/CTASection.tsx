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
    <section id="contact" className="py-24 lg:py-32 bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* CTA Content */}
          <FadeIn>
            <div className="text-center lg:text-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {cta.title}
              </h2>
              <p className="text-lg text-white/70 mb-8 whitespace-pre-line">
                {cta.subtitle}
              </p>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
              >
                <MessageCircle className="w-5 h-5" />
                {cta.button}
              </a>
              <p className="text-sm text-white/50">{cta.subText}</p>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/10">
              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={cta.form.namePlaceholder}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#0090D5] focus:ring-1 focus:ring-[#0090D5] transition-all"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={cta.form.phonePlaceholder}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#0090D5] focus:ring-1 focus:ring-[#0090D5] transition-all"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={cta.form.messagePlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#0090D5] focus:ring-1 focus:ring-[#0090D5] transition-all resize-none"
                />
                <button
                  onClick={handleSubmitForm}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#0090D5] hover:bg-[#0077b3] text-white font-medium rounded-lg transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  {cta.form.button}
                </button>
                <p className="text-center text-sm text-white/40">
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
