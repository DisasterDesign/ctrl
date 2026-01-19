import { Metadata } from "next";
import { Handshake } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "שותפים | CTRL",
  description: "שותפויות עסקיות עם CTRL - לרואי חשבון, יועצים עסקיים ונותני שירותים.",
};

export default function PartnersPage() {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              שותפויות
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              שותפים עסקיים
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              עובדים עם רואי חשבון, יועצים עסקיים או נותני שירותים אחרים? בואו
              נדבר.
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
                <Handshake className="w-8 h-8 text-blue-600" />
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                אנחנו מאמינים בשיתופי פעולה.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                אם אתם עובדים עם בעלי עסקים קטנים ובינוניים ומחפשים פתרון אמין
                להפנות אליו לקוחות שצריכים עזרה בניהול השוטף — נשמח להכיר.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                שותפויות שלנו מבוססות על אמון, שקיפות ורצון משותף לעזור לעסקים
                לצמוח.
              </p>

              <Button href="/contact" variant="primary" size="lg">
                בואו נדבר על שיתוף פעולה
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
