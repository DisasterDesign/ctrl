import { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "מדיניות הפרטיות | CLARITY",
  description: "מדיניות הפרטיות של CLARITY - כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.",
};

const sections = [
  {
    title: "1. מבוא",
    content: `CLARITY ("אנחנו", "שלנו") מחויבת להגן על פרטיותך. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלך בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ותקנות הגנת הפרטיות (אבטחת מידע), התשע"ז-2017.`,
  },
  {
    title: "2. מידע שאנו אוספים",
    content: null,
    list: [
      "מידע שאתה מספק לנו: שם, אימייל, טלפון, פרטי העסק",
      "מידע שנאסף אוטומטית: כתובת IP, סוג דפדפן, עמודים שנצפו",
      "עוגיות (Cookies): לשיפור חוויית המשתמש",
    ],
  },
  {
    title: "3. כיצד אנו משתמשים במידע",
    content: null,
    list: [
      "ליצירת קשר ומתן שירות",
      "לשיפור השירותים שלנו",
      "לשליחת עדכונים (בהסכמתך בלבד)",
    ],
  },
  {
    title: "4. שיתוף מידע עם צדדים שלישיים",
    content: null,
    list: [
      "איננו מוכרים או משכירים את המידע שלך",
      "שיתוף רק עם ספקי שירות הכרחיים (אחסון, אנליטיקה)",
      "שיתוף בהתאם לדרישות חוק",
    ],
  },
  {
    title: "5. אבטחת מידע",
    content: null,
    list: [
      "אנו נוקטים באמצעי אבטחה מקובלים להגנה על המידע",
      "העברת מידע מוצפנת (SSL)",
    ],
  },
  {
    title: "6. זכויותיך",
    content: "בהתאם לחוק הגנת הפרטיות, יש לך זכות:",
    list: [
      "לעיין במידע שנאסף עליך",
      "לבקש תיקון או מחיקה של המידע",
      "להתנגד לשימוש במידע לצורכי דיוור ישיר",
    ],
  },
  {
    title: "7. עוגיות (Cookies)",
    content: null,
    list: [
      "אנו משתמשים בעוגיות לשיפור חוויית הגלישה",
      "ניתן לשלוט בהגדרות העוגיות דרך הדפדפן",
    ],
  },
  {
    title: "8. שינויים במדיניות",
    content: null,
    list: [
      "אנו עשויים לעדכן מדיניות זו מעת לעת",
      "שינויים מהותיים יפורסמו באתר",
    ],
  },
  {
    title: "9. יצירת קשר",
    content: "לשאלות בנוגע למדיניות הפרטיות או לבקשות בנוגע למידע שלך, ניתן לפנות אלינו:",
    contact: {
      email: "sarit@ctrl.co.il",
      phone: "054-670-1232",
    },
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              מדיניות פרטיות
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              מדיניות הפרטיות
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg">עדכון אחרון: ינואר 2025</p>
          </FadeIn>
        </div>
      </section>

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
