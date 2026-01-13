"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Quote } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 15, suffix: "+", label: "שנות ניסיון" },
  { value: 50, suffix: "+", label: "פרויקטים" },
  { value: 100, suffix: "%", label: "מחויבות" },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden pt-32 bg-white">
      {/* Header */}
      <section className="relative px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              מי אנחנו
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
              הכירו את שרית
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed">
              המייסדת והרוח החיה מאחורי CTRL
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Image Placeholder */}
            <FadeIn>
              <div className="relative">
                <div className="aspect-[4/5] bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                  {/* Placeholder for Sarit's photo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-5xl font-bold text-blue-600">ש</span>
                      </div>
                      <p className="text-slate-400 text-sm">תמונה בקרוב</p>
                    </div>
                  </div>
                </div>
                {/* Blue frame accent */}
                <div className="absolute -top-3 -right-3 w-full h-full border-2 border-blue-100 rounded-xl pointer-events-none" />
              </div>
            </FadeIn>

            {/* Bio */}
            <div>
              <FadeIn delay={0.2}>
                <div className="mb-12">
                  <Quote className="w-12 h-12 text-blue-200 mb-6" />
                  <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed mb-6">
                    &ldquo;המשרד הכאוטי שלכם הוא הקנבס המסודר שלי.&rdquo;
                  </blockquote>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="space-y-6 text-slate-600 leading-relaxed">
                  <p>
                    אחרי יותר מ-15 שנה בעולם הנדל״ן והבנייה, ראיתי הכל.
                    פרויקטים שקרסו בגלל חשבוניות שהלכו לאיבוד. יזמים שנשרפו
                    מספקים שלא עמדו בהבטחות. לוחות זמנים שהתפוצצו בגלל בירוקרטיה.
                  </p>
                  <p>
                    הבנתי שהבעיה לא באנשים - הבעיה במערכות. יזמים וקבלנים
                    צריכים להתמקד בבנייה, לא בניהול משרד. זה המקום שלי.
                  </p>
                  <p className="text-slate-900 font-medium">
                    ב-CTRL, אני לא עוד ״עוזרת״. אני שותפה אסטרטגית שמתקינה
                    את עצמה עמוק בתוך הפעילות שלכם. אני מכירה את הספקים,
                    את הבנקים, את הרשויות. ואני יודעת בדיוק איך לגרום לכל
                    הגלגלים להסתובב חלק.
                  </p>
                </div>
              </FadeIn>

              {/* Stats */}
              <FadeIn delay={0.6}>
                <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-100">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-slate-500 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                הערכים שלנו
              </h2>
              <p className="text-slate-600">מה מנחה אותנו בכל יום</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "שקיפות מלאה",
                description:
                  "תמיד תדעו מה קורה. דוחות ברורים, עדכונים שוטפים, גישה לכל המידע.",
              },
              {
                title: "יזמות פרואקטיבית",
                description:
                  "לא מחכים שתגידו לנו מה לעשות. רואים בעיה - פותרים אותה לפני שהיא גדלה.",
              },
              {
                title: "מצוינות בפרטים",
                description:
                  "כל שקל, כל חשבונית, כל מייל - מטופל בתשומת לב מלאה.",
              },
            ].map((value, index) => (
              <FadeIn key={value.title} delay={0.2 + index * 0.1}>
                <div className="p-8 bg-white border border-slate-100 rounded-xl shadow-sm h-full">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              נשמע כמו מתאים?
            </h2>
            <p className="text-slate-600 text-lg mb-10">
              נשמח להכיר ולשמוע על הפרויקט שלכם
            </p>
            <Button href="/contact" variant="primary" size="lg">
              הגשת בקשה לניהול
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
