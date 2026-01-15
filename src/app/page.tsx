"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Users,
  Settings,
  CheckCircle,
  TrendingUp,
  UserCheck,
  ArrowLeft,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionDivider from "@/components/ui/SectionDivider";
import FloatingTechShapes from "@/components/ui/FloatingTechShapes";

const floatingCards = [
  {
    icon: CheckCircle,
    text: "שרית, הצלת אותי עם הספק הזה! תודה.",
    color: "text-green-500",
    position: "top-4 right-4 lg:top-8 lg:-right-4",
    delay: 0,
  },
  {
    icon: TrendingUp,
    text: "סוף סוף יש סדר בניירת. איזה שקט.",
    color: "text-blue-500",
    position: "bottom-8 left-4 lg:bottom-16 lg:-left-8",
    delay: 0.5,
  },
  {
    icon: UserCheck,
    text: "הכל מתויק ומטופל.",
    color: "text-purple-500",
    position: "top-1/2 -right-4 lg:top-1/3 lg:-right-12",
    delay: 1,
  },
];

const moduleItems = [
  {
    image: "/1.png",
    badge: "הליבה הפיננסית",
    title: "ניהול פיננסי ותזרים",
    description:
      "אנחנו עוצרים את דליפת הכספים. איסוף חשבוניות, הכנת תשלומים, התנהלות מול רואי חשבון ומעקב תקציבי הדוק. השקל שלכם מפסיק ללכת לאיבוד.",
  },
  {
    image: "/2.png",
    badge: "אופרציית רכש וספקים",
    title: "ניהול רכש וספקים",
    description:
      "מהצעת המחיר ועד הגעת הסחורה לשטח. אנחנו משווים, מתמקחים, מזמינים ומוודאים שהכל מגיע בזמן. אתם מקבלים שקט תפעולי.",
  },
  {
    image: "/3.png",
    badge: "המעטפת המשרדית",
    title: "בירוקרטיה וניהול משרד",
    description:
      "כל מה שמעכב אתכם מלבנות: טיפול בביטוחים, היתרים, חוזי עבודה, משכורות וניהול יומנים. המשרד הופך למכונה משומנת.",
  },
];

const promiseItems = [
  {
    icon: Phone,
    title: "גישה ישירה",
    description: "קו חם אליך. בלי טלפונים מרכזיים, בלי המתנה.",
  },
  {
    icon: Users,
    title: "טיפול יזום",
    description: "אנחנו לא מחכים לבעיות - אנחנו מונעים אותן מראש.",
  },
  {
    icon: Settings,
    title: "פתרונות מותאמים",
    description: "כל פרויקט מקבל את המעטפת שמתאימה לו בדיוק.",
  },
];

function FloatingCard({
  icon: Icon,
  text,
  color,
  position,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  color: string;
  position: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute ${position} z-20`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + delay, duration: 0.5 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/50 flex items-center gap-3"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
          {text}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-white via-white to-blue-50/30">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content - Right side */}
            <div className="order-2 lg:order-1 text-right">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide px-4 py-2 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  הפינה השקטה שלך בתוך הכאוס.
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                הופכים את אתר הבנייה
                <br />
                <span className="text-blue-600">לבית.</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                className="text-slate-600 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                שירותי ניהול אישיים ליזמי נדל״ן. אתם תבנו, שרית תדאג לכל השאר – מהניירת ועד הספקים, באווירה משפחתית ובלי כאבי ראש.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button href="/contact" variant="primary" size="lg">
                  <span className="flex items-center gap-2">
                    בואו נשב על קפה
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </Button>
                <Button href="#how-it-works" variant="outline" size="lg">
                  איך זה עובד?
                </Button>
              </motion.div>
            </div>

            {/* Visual - Left side */}
            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {/* Main Image */}
              <div className="relative">
                <img
                  src="/hero.png"
                  alt="שרית - ניהול אישי לפרויקטי בנייה"
                  className="w-full h-auto rounded-2xl"
                />

                {/* Floating Cards */}
                {floatingCards.map((card) => (
                  <FloatingCard key={card.text} {...card} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-blue-600 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      <SectionDivider />

      {/* How It Works - 3 Modules Section */}
      <section
        id="how-it-works"
        className="relative py-24 lg:py-32 px-6 lg:px-8 bg-white overflow-hidden"
      >
        <FloatingTechShapes variant="sparse" color="blue" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                3 המודולים
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                איך זה עובד?
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                שלושה עמודי תפעול שמשחררים אתכם לעשות את מה שאתם יודעים הכי טוב
                — לבנות.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {moduleItems.map((item, index) => (
              <FadeIn key={item.title} delay={0.2 + index * 0.15}>
                <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:border-blue-200 hover:[box-shadow:0_8px_0_0_rgba(244,114,182,0.5)] transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 text-right">
                    <span className="inline-block text-blue-600 text-xs font-semibold tracking-wide mb-3">
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Promise Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-white overflow-hidden tech-bg">
        <FloatingTechShapes variant="sparse" color="slate" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                בלי מערכות טיקטים.
                <br />
                <span className="text-blue-600">בלי בוטים.</span>
                <br />
                רק אנחנו.
              </h2>
              <p className="text-slate-600 text-lg max-w-xl mx-auto">
                שירות אישי ומותאם שמרגיש כמו חלק מהצוות שלכם
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {promiseItems.map((item, index) => (
              <FadeIn key={item.title} delay={0.2 + index * 0.1}>
                <Card className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Value Proposition */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-relaxed">
              &ldquo;המשרד הכאוטי שלכם הוא
              <br />
              <span className="text-blue-600">הקנבס המסודר</span> שלי.&rdquo;
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-slate-500 text-lg">— שרית, מייסדת CTRL</p>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-white overflow-hidden">
        <FloatingTechShapes variant="sparse" color="blue" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              מוכנים לסדר?
            </h2>
            <p className="text-slate-600 text-lg mb-10">
              נשמח להכיר את הפרויקט שלכם ולראות איך נוכל לעזור
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
