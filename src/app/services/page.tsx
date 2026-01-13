"use client";

import { motion } from "framer-motion";
import { Shield, Network, Cpu, ArrowLeft } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const services = [
  {
    number: "01",
    icon: Shield,
    title: "פיקוח פיננסי",
    tagline: "ניהול תזרים מזומנים בדייקנות של שעון שוויצרי",
    description:
      "אנחנו שולטים בכל שקל שנכנס ויוצא. מעקב חשבוניות, ניהול תשלומים, הכנת דוחות לרואה החשבון - הכל בזמן אמת, בלי הפתעות.",
    features: ["ניהול חשבוניות", "מעקב תזרים", "קישור לרו״ח", "דוחות תקופתיים"],
  },
  {
    number: "02",
    icon: Network,
    title: "יחסי ספקים",
    tagline: "אנחנו לא רק מזמינים - אנחנו מנהלים משא ומתן",
    description:
      "ניהול ספקים זה לא רק לשלוח הזמנה. זה לבנות מערכות יחסים, למקסם תנאים, ולוודא שכל אספקה מגיעה בזמן ובתקציב.",
    features: ["ניהול ספקים", "משא ומתן", "לוגיסטיקה", "בקרת איכות"],
  },
  {
    number: "03",
    icon: Cpu,
    title: "לוגיסטיקת פרויקטים",
    tagline: "פינוי המסלול לצוותים שלכם לבנות",
    description:
      "מהיתרים ועד רשויות, מתיאום עבודות ועד מעקב לוחות זמנים. אנחנו מפנים את כל החסמים כדי שהצוות בשטח יוכל להתמקד במה שהוא עושה הכי טוב.",
    features: ["מעקב פרויקטים", "היתרים ורישוי", "תיאום רשויות", "בקרת לו״ז"],
  },
];

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden pt-32 bg-white">
      {/* Header */}
      <section className="relative px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              מה אנחנו עושים
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
              השירותים שלנו
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed">
              שלושה מוקדי פעולה שמכסים את כל מה שקורה מאחורי הקלעים
              של פרויקט בנייה מוצלח.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="relative px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16 lg:space-y-20">
            {services.map((service, index) => (
              <FadeIn key={service.number} delay={0.1}>
                <motion.div
                  className="group relative"
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Service Card */}
                  <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-start p-8 lg:p-12 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
                    {/* Number & Icon */}
                    <div>
                      <div className="flex items-center gap-6 mb-8">
                        <span className="text-blue-600 text-5xl lg:text-6xl font-bold">
                          {service.number}
                        </span>
                        <div className="w-px h-12 bg-slate-200" />
                        <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center">
                          <service.icon className="w-7 h-7 text-blue-600" />
                        </div>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                        {service.title}
                      </h2>

                      <p className="text-blue-600 text-lg font-medium mb-6">
                        {service.tagline}
                      </p>

                      <p className="text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="lg:pt-20">
                      <h3 className="text-slate-400 text-sm uppercase tracking-widest mb-6">
                        מה כלול
                      </h3>
                      <ul className="space-y-4">
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            className="flex items-center gap-4 text-slate-700"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.3 + featureIndex * 0.1,
                              duration: 0.4,
                            }}
                          >
                            <span className="w-2 h-2 bg-blue-600 rounded-full" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover accent line */}
                    <div className="absolute right-0 top-0 bottom-0 w-1 rounded-l-full bg-gradient-to-b from-blue-600 via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              צריכים משהו ספציפי?
            </h2>
            <p className="text-slate-600 text-lg mb-10">
              כל פרויקט הוא ייחודי. נשמח לדבר על הצרכים המדויקים שלכם.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              בואו נדבר
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
