import { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "תנאי שימוש | CTRL",
  description: "תנאי השימוש באתר CTRL - הגדרת הזכויות והחובות בשימוש באתר.",
};

const sections = [
  {
    title: "1. כללי",
    content: `ברוכים הבאים לאתר CTRL. השימוש באתר זה כפוף לתנאים המפורטים להלן. גלישה באתר מהווה הסכמה לתנאים אלה.`,
  },
  {
    title: "2. השירותים",
    content: `CTRL מספקת שירותי ניהול בק-אופיס לעסקים קטנים ובינוניים. המידע באתר הוא למטרות מידע כללי בלבד ואינו מהווה הצעה מחייבת.`,
  },
  {
    title: "3. קניין רוחני",
    content: null,
    list: [
      "כל התכנים באתר (טקסט, עיצוב, לוגו, תמונות) הם רכושה של CTRL",
      "אין להעתיק, לשכפל או להפיץ תכנים ללא אישור בכתב",
    ],
  },
  {
    title: "4. שימוש מותר",
    content: null,
    list: [
      "השימוש באתר מותר למטרות חוקיות בלבד",
      "אין להשתמש באתר באופן שעלול לפגוע בתפקודו",
    ],
  },
  {
    title: "5. הגבלת אחריות",
    content: null,
    list: [
      'המידע באתר מסופק "כמות שהוא" (AS IS)',
      "CTRL אינה אחראית לנזקים ישירים או עקיפים הנובעים מהשימוש באתר",
      "CTRL אינה אחראית לאתרים חיצוניים המקושרים מהאתר",
    ],
  },
  {
    title: "6. שינויים באתר ובתנאים",
    content: null,
    list: [
      "CTRL רשאית לשנות את תכני האתר ותנאי השימוש בכל עת",
      "המשך השימוש לאחר שינויים מהווה הסכמה לתנאים המעודכנים",
    ],
  },
  {
    title: "7. הדין החל וסמכות שיפוט",
    content: `על תנאי שימוש אלה יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית תהיה לבתי המשפט המוסמכים בתל אביב-יפו.`,
  },
  {
    title: "8. יצירת קשר",
    content: "לשאלות בנוגע לתנאי השימוש:",
    contact: {
      email: "hello@ctrl.co.il",
      phone: "050-000-0000",
    },
  },
];

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              תנאי שימוש
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              תנאי השימוש
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg">עדכון אחרון: ינואר 2025</p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* Content Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <FadeIn key={section.title} delay={index * 0.05}>
                <div className="border-b border-slate-100 pb-12 last:border-0">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    {section.title}
                  </h2>

                  {section.content && (
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {section.content}
                    </p>
                  )}

                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item, i) => (
                        <li
                          key={i}
                          className="text-slate-600 flex items-start gap-3"
                        >
                          <span className="text-blue-600 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.contact && (
                    <div className="mt-4 space-y-2">
                      <p className="text-slate-600">
                        אימייל:{" "}
                        <a
                          href={`mailto:${section.contact.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {section.contact.email}
                        </a>
                      </p>
                      <p className="text-slate-600">
                        טלפון:{" "}
                        <a
                          href={`tel:${section.contact.phone.replace(/-/g, "")}`}
                          className="text-blue-600 hover:underline"
                        >
                          {section.contact.phone}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
