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
  title: "CTRL | יד ימין ולב שמאל של העסק שלך",
  description:
    "ניהול בק-אופיס בוטיק לעסקים קטנים ובינוניים. שליטה פיננסית, ניהול ממשקים, וסדר בתהליכים — כדי שתהיה פנוי לפתח את העסק.",
  keywords: [
    "ניהול עסקי",
    "בק-אופיס",
    "שליטה פיננסית",
    "ניהול ממשקים",
    "תהליכים",
    "עסקים קטנים",
  ],
  openGraph: {
    title: "CTRL | יד ימין ולב שמאל של העסק שלך",
    description: "ניהול בק-אופיס בוטיק לעסקים קטנים ובינוניים",
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
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
