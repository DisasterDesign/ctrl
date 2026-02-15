import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Footer() {
  const { footer, business } = siteContent;

  return (
    <footer>
      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-[rgba(0,0,0,0.08)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block text-2xl font-bold tracking-tight text-black mb-4">
              CLARITY
            </Link>
            <p className="text-[#666666] mb-6">{footer.description}</p>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3848FE] hover:bg-[#2B35CC] text-white font-medium rounded-full transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              דברו איתי בוואטסאפ
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">קישורים מהירים</h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#666666] hover:text-[#3848FE] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">השירותים</h3>
            <ul className="space-y-3">
              {footer.services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-[#666666] hover:text-[#3848FE] transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">צור קשר</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#3848FE] mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${business.phone}`}
                  className="text-[#666666] hover:text-[#3848FE] transition-colors"
                >
                  {business.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#3848FE] mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${business.email}`}
                  className="text-[#666666] hover:text-[#3848FE] transition-colors"
                >
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#3848FE] mt-0.5 flex-shrink-0" />
                <span className="text-[#666666]">{business.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#3848FE] mt-0.5 flex-shrink-0" />
                <span className="text-[#666666]">{business.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[rgba(0,0,0,0.08)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#666666] text-sm">{footer.copyright}</p>
            <div className="flex items-center gap-6">
              {footer.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#666666] hover:text-[#3848FE] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-[#666666] text-sm">{footer.madeWith}</p>
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://www.fuzionwebz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black/20 hover:text-black/50 transition-opacity duration-300"
            >
              Built by Fuzion
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
