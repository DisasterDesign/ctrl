"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`relative py-12 ${className}`}>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent via-blue-600 to-transparent opacity-40"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
