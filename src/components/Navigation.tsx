"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nav, business } = siteContent;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-bar" dir="ltr">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" aria-label="CLARITY — חזרה לדף הבית">
            <Image src="/LOGO.png" alt="CLARITY" width={200} height={56} priority className="h-auto w-[140px] md:w-[200px]" />
          </Link>

          {/* Buttons */}
          <div className="flex items-center gap-2 md:gap-3 relative">
            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-black text-sm md:text-base transition-all duration-300"
              style={{ background: "#E5E6F0" }}
            >
              {isMenuOpen ? "סגור" : "תפריט"}
            </button>

            {/* CTA Button */}
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-black hover:bg-[#222233] text-[#f0f0f0] font-medium text-sm md:text-base rounded-full transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">{nav.cta}</span>
              <span className="md:hidden">וואטסאפ</span>
            </a>

            {/* Menu Dropdown */}
            {isMenuOpen && (
              <div
                className="absolute top-full right-0 mt-3 w-48 md:w-52 rounded-2xl py-4 px-5"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  animation: "menuFadeIn 0.2s ease-out",
                }}
              >
                <div className="flex flex-col gap-1" dir="rtl">
                  {nav.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleNavClick}
                      className="nav-menu-link"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
