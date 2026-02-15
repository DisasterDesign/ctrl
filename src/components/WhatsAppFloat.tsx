"use client";

import { MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function WhatsAppFloat() {
  const { whatsapp } = siteContent.business;

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#3848FE] hover:bg-[#2B35CC] rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      aria-label="צור קשר בוואטסאפ"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </a>
  );
}
