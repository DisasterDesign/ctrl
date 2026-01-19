import { Metadata } from "next";
import { Mail } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "קריירה | CTRL",
  description: "הצטרפו לצוות CTRL - משרות פתוחות והזדמנויות קריירה.",
};

export default function CareersPage() {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              הצטרפו אלינו
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              קריירה ב-CTRL
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              כרגע אין משרות פתוחות, אבל תמיד שמחים להכיר אנשים טובים.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* Content Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="bg-slate-50 rounded-2xl p-12">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-8">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                אנחנו תמיד מחפשים אנשים מוכשרים שאוהבים סדר, מבינים עסקים, ויודעים
                לעבוד עצמאית.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                אם את/ה חושב/ת שאנחנו יכולים להתאים — שלח/י לנו קורות חיים ונשמור
                את הפרטים לעתיד.
              </p>

              <Button
                href="mailto:hello@ctrl.co.il?subject=קורות חיים - CTRL"
                variant="primary"
                size="lg"
              >
                שלח קורות חיים
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
