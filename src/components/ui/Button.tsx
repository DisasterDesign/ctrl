"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full hover:-translate-y-1";

  const variants = {
    primary:
      "bg-blue-600 !text-white hover:bg-blue-700 border border-blue-600 hover:border-blue-700 shadow-sm hover:[box-shadow:0_6px_0_0_rgba(244,114,182,0.7)]",
    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:[box-shadow:0_6px_0_0_rgba(244,114,182,0.7)]",
    outline:
      "bg-white text-slate-900 border border-slate-900 hover:border-slate-900 hover:[box-shadow:0_6px_0_0_rgba(244,114,182,0.7)]",
    ghost:
      "bg-transparent text-slate-600 hover:text-blue-600 border-none",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const MotionComponent = motion.button;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2"
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <MotionComponent
      type={type}
      onClick={onClick}
      className={combinedClassName}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionComponent>
  );
}
