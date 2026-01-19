"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Settings,
  Phone,
  Zap,
  UserCheck,
  Quote,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionDivider from "@/components/ui/SectionDivider";

const serviceCards = [
  {
    icon: TrendingUp,
    badge: "שום שקל לא הולך לאיבוד",
    title: "שליטה פיננסית",
    description:
      "מעקב חשבוניות, תזרים, תשלומים לספקים, קשר עם רואה החשבון. אתה תמיד יודע איפה אתה עומד.",
  },
  {
    icon: Users,
    badge: "שאתה תתמקד בצמיחה",
    title: "ניהול ממשקים",
    description:
      "ספקים, עובדים, קבלנים, רשויות — אני נקודת הצומת שמחברת את כל החלקים ומוודאת שהכל זורם.",
  },
  {
    icon: Settings,
    badge: "כי סדר זה לא מותרות",
    title: "תהליכים חכמים",
    description:
      "בניית מערכות שגורמות לעסק לרוץ בצורה יעילה. מעקב, בקרה, ומניעת הפתעות לפני שהן קורות.",
  },
];

const personalFeatures = [
  {
    icon: Phone,
    title: "גישה ישירה",
    description: "קו חם אליי. בלי מזכירות, בלי המתנה.",
  },
  {
    icon: Zap,
    title: "טיפול יזום",
    description: "אני מונעת בעיות לפני שהן מתפתחות.",
  },
  {
    icon: UserCheck,
    title: "התאמה אישית",
    description: "כל עסק מקבל בדיוק את מה שהוא צריך.",
  },
];

const floatingQuotes = [
  "סוף סוף מישהי שרואה את התמונה המלאה",
  "לא ידעתי שאפשר לנשום ככה בעסק",
  "היא מסדרת דברים שאני אפילו לא חושב עליהם",
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">
        {/* Subtle blue glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl" />

        {/* Floating quotes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingQuotes.map((quote, index) => (
            <motion.div
              key={index}
              className="absolute hidden lg:block"
              style={{
                top: `${25 + index * 20}%`,
                [index % 2 === 0 ? "left" : "right"]: "5%",
              }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ delay: 1.5 + index * 0.3, duration: 0.8 }}
            >
              <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-lg px-4 py-3 shadow-sm max-w-[200px]">
                <Quote className="w-4 h-4 text-blue-400 mb-1" />
                <p className="text-sm text-slate-600">{quote}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn delay={0.2} duration={0.8}>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              יד ימין ולב שמאל של העסק שלך
            </span>
          </FadeIn>

          <FadeIn delay={0.4} duration={0.8}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 text-slate-900">
              עסוק בכיבוי שריפות?
              <br />
              <span className="text-blue-600">בואו נעשה סדר.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.6} duration={0.8}>
            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
              אתה רץ בלי הפסקה, מטפל בכל דבר קטן, ואין לך זמן לצמוח. אני לוקחת
              ממך את כל מה שלא צריך להיות עליך — הניירת, הספקים, הבלאגן — כדי
              שתהיה פנוי לפתח את העסק.
            </p>
          </FadeIn>

          <FadeIn delay={0.8} duration={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                בואו נדבר
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                מה זה אומר בפועל?
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-blue-600 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      <SectionDivider />

      {/* How It Works Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-4">
                מה קורה בפועל
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                אני לוקחת ממך את מה שמעכב אותך
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                כל מה שגוזל לך זמן ואנרגיה, כל מה שאתה דוחה ליום ראשון — אני
                מטפלת בזה. בשקט, ביסודיות, ובלי שתצטרך לחשוב על זה.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {serviceCards.map((card, index) => (
              <FadeIn key={card.title} delay={0.2 + index * 0.1}>
                <Card className="h-full">
                  <div className="flex flex-col h-full">
                    <span className="text-blue-600 text-sm font-medium mb-4">
                      {card.badge}
                    </span>
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                      <card.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Personal Service Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                  לא עוזרת. <span className="text-blue-600">שותפה.</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  אני לא מחכה שתגיד לי מה לעשות. אני רואה את התמונה המלאה, חושבת
                  קדימה, ודואגת לכל פרט — כדי שיהיה לך שקט ניהולי אמיתי.
                </p>
              </div>
            </FadeIn>

            <div className="space-y-6">
              {personalFeatures.map((feature, index) => (
                <FadeIn key={feature.title} delay={0.2 + index * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Quote Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-relaxed">
              &ldquo;אני יד ימין ולב שמאל —
              <br />
              <span className="text-blue-600">פרודוקטיביות עם חיבור אישי.</span>
              &rdquo;
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-slate-500 text-lg">— שרית, מייסדת CTRL</p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* Final CTA Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              אתה חשוב לעצמך?
            </h2>
            <p className="text-slate-600 text-lg mb-10">
              תן לי לאפשר לעסק שלך להתנהל כמו שצריך. שיחת היכרות, בלי התחייבות.
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
