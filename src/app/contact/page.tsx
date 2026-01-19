"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

const businessTypes = [
  { value: "", label: "בחרו סוג" },
  { value: "small", label: "עסק קטן (עד 10 עובדים)" },
  { value: "medium", label: "עסק בינוני (10-50 עובדים)" },
  { value: "freelancer", label: "עצמאי / פרילנסר" },
  { value: "other", label: "אחר" },
];

const contactInfo = [
  {
    icon: Mail,
    label: "אימייל",
    value: "sarit@ctrl.co.il",
    href: "mailto:sarit@ctrl.co.il",
  },
  {
    icon: Phone,
    label: "טלפון",
    value: "054-123-4567",
    href: "tel:+972541234567",
  },
  {
    icon: MapPin,
    label: "מיקום",
    value: "תל אביב",
    href: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              בואו נדבר
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              שיחת היכרות
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              ספר לי על העסק שלך ונראה איך אני יכולה לעזור. בלי התחייבות.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* Contact Form & Info */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <FadeIn>
              <div className="bg-slate-50 rounded-2xl p-8 lg:p-12">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      תודה על הפנייה!
                    </h3>
                    <p className="text-slate-600">
                      אחזור אליך בהקדם האפשרי.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        שם מלא
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          אימייל
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          טלפון
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="businessType"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        סוג העסק
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        required
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-white"
                      >
                        {businessTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        ספר לי על העסק שלך
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="מה העסק שלך? מה הכי מציק לך היום?"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      {isSubmitting ? "שולח..." : "שלח הודעה"}
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                  דרכים נוספות ליצור קשר
                </h2>

                <div className="space-y-6 mb-12">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 mb-1">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-slate-900 font-medium hover:text-blue-600 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-slate-900 font-medium">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <p className="text-slate-600">
                    מעדיפים לדבר? צרו קשר ונקבע שיחה.
                    <br />
                    אני זמינה בימים א׳-ה׳, 9:00-18:00.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
