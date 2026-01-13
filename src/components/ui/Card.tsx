"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <motion.div
      className={`
        bg-white border border-slate-100 rounded-xl p-8 shadow-sm
        ${hover ? "hover:border-blue-200 hover:[box-shadow:0_8px_0_0_rgba(244,114,182,0.5)]" : ""}
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
