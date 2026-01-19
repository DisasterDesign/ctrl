"use client";

import { TrendingUp, Users, Settings, Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

const services = [
  {
    id: "financial",
    number: "01",
    icon: TrendingUp,
    title: "שליטה פיננסית",
    subtitle: "שום שקל לא הולך לאיבוד",
    description:
      "אני שולטת בכל שקל שנכנס ויוצא. מעקב חשבוניות, ניהול תשלומים, הכנת דוחות לרואה החשבון — הכל בזמן אמת, בלי הפתעות.",
    features: ["ניהול חשבוניות", "מעקב תזרים", "קשר עם רו״ח", "דוחות תקופתיים"],
  },
  {
    id: "interfaces",
    number: "02",
    icon: Users,
    title: "ניהול ממשקים",
    subtitle: "נקודת הצומת של העסק שלך",
    description:
      "ספקים, עובדים, לקוחות, רשויות — אני מחברת את כל החלקים ומוודאת שהמידע זורם והדברים קורים בזמן.",
    features: ["ניהול ספקים", "תיאום עובדים", "טיפול ברשויות", "מעקב משימות"],
  },
  {
    id: "processes",
    number: "03",
    icon: Settings,
    title: "סדר ותהליכים",
    subtitle: "כי סדר זה לא מותרות",
    description:
      "בניית תהליכי עבודה חכמים שגורמים לעסק לרוץ בצורה יעילה. מעקב, בקרה, ומניעת בעיות לפני שהן קורות.",
    features: ["בניית תהליכים", "מעקב ובקרה", "ארגון מידע", "ייעול שוטף"],
  },
];

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              מה אני עושה בפועל
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              שקט ניהולי
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              כל מה שמעכב אותך מלהתפתח — אני לוקחת על עצמי.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* Services List */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-24">
            {services.map((service, index) => (
              <FadeIn key={service.id} delay={index * 0.1}>
                <div
                  id={service.id}
                  className="grid md:grid-cols-2 gap-12 items-start scroll-mt-32"
                >
                  {/* Service Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-bold text-slate-100">
                        {service.number}
                      </span>
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-blue-600 font-medium mb-6">
                      {service.subtitle}
                    </p>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="bg-slate-50 rounded-2xl p-8">
                    <h3 className="font-semibold text-slate-900 mb-6">
                      מה כולל:
                    </h3>
                    <ul className="space-y-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              כל עסק הוא ייחודי
            </h2>
            <p className="text-slate-600 text-lg mb-10">
              בואו נדבר על מה שהעסק שלך צריך בדיוק.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              בואו נדבר
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
