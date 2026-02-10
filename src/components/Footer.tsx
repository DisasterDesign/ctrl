import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Footer() {
  const { footer, business } = siteContent;

  return (
    <footer className="bg-[#1A2B3C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.svg"
                alt="CLARITY"
                width={120}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 mb-6">{footer.description}</p>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded-lg transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              דברו איתי בוואטסאפ
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">
              קישורים מהירים
            </h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#3B82A0] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">השירותים</h3>
            <ul className="space-y-3">
              {footer.services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-white/60 hover:text-[#3B82A0] transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">צור קשר</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#3B82A0] mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${business.phone}`}
                  className="text-white/60 hover:text-[#3B82A0] transition-colors"
                >
                  {business.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#3B82A0] mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${business.email}`}
                  className="text-white/60 hover:text-[#3B82A0] transition-colors"
                >
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#3B82A0] mt-0.5 flex-shrink-0" />
                <span className="text-white/60">{business.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#3B82A0] mt-0.5 flex-shrink-0" />
                <span className="text-white/60">{business.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">{footer.copyright}</p>
            <div className="flex items-center gap-6">
              {footer.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-[#3B82A0] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-white/60 text-sm">{footer.madeWith}</p>
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://www.fuzionwebz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-white/60 transition-opacity duration-300"
            >
              Built by Fuzion
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
