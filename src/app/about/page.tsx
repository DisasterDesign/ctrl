"use client";

import { Eye, Zap, Heart } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionDivider from "@/components/ui/SectionDivider";

const stats = [
  { value: "10+", label: "שנים של ניסיון" },
  { value: "50+", label: "עסקים מרוצים" },
  { value: "100%", label: "מחויבות מלאה" },
];

const values = [
  {
    icon: Eye,
    title: "שקיפות מלאה",
    description:
      "תמיד תדע מה קורה. עדכונים שוטפים, דוחות ברורים, גישה לכל המידע.",
  },
  {
    icon: Zap,
    title: "יזמות פרואקטיבית",
    description:
      "אני לא מחכה שתגיד לי מה לעשות. רואה בעיה — פותרת אותה לפני שהיא גדלה.",
  },
  {
    icon: Heart,
    title: "תשומת לב לפרטים",
    description:
      "כל שקל, כל חשבונית, כל מייל — מטופל בתשומת לב מלאה.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              נעים להכיר
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              שרית יצחקיאן
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              יד ימין ולב שמאל של העסק שלך
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* Story Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 mb-12 text-center">
              &ldquo;אני רואה בעלי עסקים מבריקים שטובעים בבלאגן.&rdquo;
            </blockquote>
          </FadeIn>

          <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
            <FadeIn delay={0.1}>
              <p>
                אחרי שנים בעולם העסקים, ראיתי הכל. בעלי עסקים שרצים בלי הפסקה,
                מכבים שריפות כל היום, ואין להם רגע לחשוב קדימה. עסקים שנתקעים לא
                בגלל שהרעיון לא טוב — אלא בגלל שאף אחד לא מסדר את מה שמאחורי
                הקלעים.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p>
                הבנתי שהבעיה לא באנשים — הבעיה בזה שבעלי עסקים צריכים להתמקד
                בלצמוח, לא בלנהל משרד. זה המקום שלי.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p>
                ב-CTRL, אני לא עוד ״עוזרת״. אני שותפה אסטרטגית שנכנסת לעומק
                הפעילות שלך. אני מכירה את הספקים, את הלקוחות, את הרשויות — ואני
                יודעת בדיוק איך לגרום לכל הגלגלים להסתובב חלק.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Stats Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-3">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Values Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                איך אני עובדת
              </h2>
              <p className="text-slate-600 text-lg">העקרונות שמנחים אותי</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.1}>
                <Card className="h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">{value.description}</p>
                </Card>
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
              נשמע כמו מתאים?
            </h2>
            <p className="text-slate-600 text-lg mb-10">
              בואו נדבר ונראה איך אני יכולה לעזור לעסק שלך.
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
