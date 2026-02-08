"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nav, business } = siteContent;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="CLARITY"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#333333] hover:text-[#0090D5] font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-[#0090D5] hover:bg-[#0077b3] text-white font-medium rounded-lg transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            {nav.cta}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#333333] hover:text-[#0090D5]"
            aria-label="תפריט"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-[#e2e8f0]">
            <div className="flex flex-col gap-4">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-[#333333] hover:text-[#0090D5] font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0090D5] hover:bg-[#0077b3] text-white font-medium rounded-lg transition-all duration-300 mt-4"
              >
                <MessageCircle className="w-4 h-4" />
                {nav.cta}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
