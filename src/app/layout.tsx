import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLARITY | ניהול פיננסי ותפעולי לבעלי עסקים",
  description:
    "בהירות בעסק. שקט בניהול. ניהול פיננסי ותפעולי לבעלי עסקים — סדר בכספים, בתהליכים ובניהול השוטף.",
  keywords: [
    "ניהול פיננסי",
    "ניהול תפעולי",
    "בעלי עסקים",
    "בהירות עסקית",
    "ליווי עסקי",
    "סדר בעסק",
  ],
  icons: {
    icon: "/FABICON.png",
    apple: "/FABICON.png",
  },
  openGraph: {
    title: "CLARITY | ניהול פיננסי ותפעולי לבעלי עסקים",
    description: "בהירות בעסק. שקט בניהול. סדר בכספים, בתהליכים ובניהול השוטף.",
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
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
