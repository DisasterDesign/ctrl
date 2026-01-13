import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CTRL | ניהול בק-אופיס בוטיק",
  description: "ניהול בק-אופיס בוטיק ליזמים מובילים. אנחנו מטפלים בפרטים בדיוק של כפפה לבנה.",
  keywords: ["ניהול פרויקטים", "בק-אופיס", "נדלן", "יזמות", "ניהול בנייה"],
  openGraph: {
    title: "CTRL | ניהול בק-אופיס בוטיק",
    description: "ניהול בק-אופיס בוטיק ליזמים מובילים",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans antialiased`}>
        <Navigation />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
