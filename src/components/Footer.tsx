"use client";

import Link from "next/link";
import { Linkedin, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const companyLinks = [
  { label: "אודות", href: "/about" },
  { label: "קריירה", href: "/careers" },
  { label: "שותפים", href: "/partners" },
  { label: "צור קשר", href: "/contact" },
];

const serviceLinks = [
  { label: "ניהול כספים", href: "/services#finance" },
  { label: "רכש וספקים", href: "/services#procurement" },
  { label: "לוגיסטיקה", href: "/services#logistics" },
  { label: "ניהול משרד", href: "/services#office" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://wa.me/972", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold tracking-tight">
                <span className="text-slate-900">CTRL</span>
                <span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              מערכת ההפעלה של יזמי הנדל״ן.
            </p>
            <p className="text-slate-400 text-xs">
              © {new Date().getFullYear()} CTRL. All rights reserved.
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-medium text-slate-900 mb-5">החברה</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-blue-600 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-medium text-slate-900 mb-5">השירותים</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-blue-600 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-medium text-slate-900 mb-5">יצירת קשר</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin className="w-4 h-4 mt-0.5 text-slate-400 flex-shrink-0" />
                <span>מגדלי הארבעה, תל אביב</span>
              </li>
              <li>
                <a
                  href="mailto:hello@ctrl-management.com"
                  className="flex items-center gap-3 text-sm text-slate-500 hover:text-blue-600 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>hello@ctrl-management.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:*6789"
                  className="flex items-center gap-3 text-sm text-slate-500 hover:text-blue-600 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span dir="ltr">*6789</span>
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:[box-shadow:0_6px_0_0_rgba(244,114,182,0.7)] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Divider & Extra Info */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-blue-600 transition-colors"
              >
                מדיניות פרטיות
              </Link>
              <Link
                href="/terms"
                className="hover:text-blue-600 transition-colors"
              >
                תנאי שימוש
              </Link>
            </div>
            <p>
              נבנה עם <span className="text-blue-600">♥</span> בתל אביב
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
