"use client";

import { motion } from "framer-motion";

interface FloatingTechShapesProps {
  variant?: "sparse" | "dense";
  color?: "blue" | "slate";
  className?: string;
}

const shapes = {
  sparse: [
    // Hexagon - top right
    {
      type: "hexagon",
      position: "top-[15%] right-[10%]",
      size: 60,
      delay: 0,
      duration: 12,
    },
    // Circle - bottom left
    {
      type: "circle",
      position: "bottom-[20%] left-[8%]",
      size: 40,
      delay: 2,
      duration: 10,
    },
    // Square - top left
    {
      type: "square",
      position: "top-[30%] left-[15%]",
      size: 35,
      delay: 1,
      duration: 14,
    },
    // Dots cluster - right middle
    {
      type: "dots",
      position: "top-[50%] right-[5%]",
      size: 80,
      delay: 3,
      duration: 8,
    },
    // Small hexagon - bottom right
    {
      type: "hexagon",
      position: "bottom-[15%] right-[20%]",
      size: 30,
      delay: 1.5,
      duration: 11,
    },
  ],
  dense: [
    // All sparse shapes plus more
    {
      type: "hexagon",
      position: "top-[10%] right-[15%]",
      size: 70,
      delay: 0,
      duration: 12,
    },
    {
      type: "circle",
      position: "bottom-[25%] left-[10%]",
      size: 50,
      delay: 2,
      duration: 10,
    },
    {
      type: "square",
      position: "top-[25%] left-[12%]",
      size: 40,
      delay: 1,
      duration: 14,
    },
    {
      type: "dots",
      position: "top-[45%] right-[8%]",
      size: 90,
      delay: 3,
      duration: 8,
    },
    {
      type: "hexagon",
      position: "bottom-[10%] right-[25%]",
      size: 35,
      delay: 1.5,
      duration: 11,
    },
    {
      type: "circle",
      position: "top-[60%] left-[5%]",
      size: 25,
      delay: 4,
      duration: 9,
    },
    {
      type: "square",
      position: "bottom-[40%] right-[3%]",
      size: 28,
      delay: 2.5,
      duration: 13,
    },
    {
      type: "lines",
      position: "top-[20%] right-[30%]",
      size: 100,
      delay: 0.5,
      duration: 15,
    },
  ],
};

function HexagonShape({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={color}
    >
      <path
        d="M50 5L93.3 27.5V72.5L50 95L6.7 72.5V27.5L50 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path
        d="M50 20L78.3 35V65L50 80L21.7 65V35L50 20Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.3"
      />
    </svg>
  );
}

function CircleShape({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={color}
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="8 4"
        opacity="0.5"
      />
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function SquareShape({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={color}
    >
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
        transform="rotate(45 50 50)"
      />
      <rect
        x="25"
        y="25"
        width="50"
        height="50"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 3"
        opacity="0.3"
        transform="rotate(45 50 50)"
      />
    </svg>
  );
}

function DotsShape({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={color}
    >
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="15" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="80" cy="25" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="30" cy="50" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="70" cy="55" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="25" cy="80" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="60" cy="85" r="3" fill="currentColor" opacity="0.4" />
      <line
        x1="20"
        y1="20"
        x2="50"
        y2="15"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
      <line
        x1="50"
        y1="15"
        x2="80"
        y2="25"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
      <line
        x1="30"
        y1="50"
        x2="70"
        y2="55"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  );
}

function LinesShape({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={color}
    >
      <line
        x1="10"
        y1="30"
        x2="90"
        y2="30"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
      <line
        x1="20"
        y1="50"
        x2="80"
        y2="50"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <line
        x1="30"
        y1="70"
        x2="70"
        y2="70"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.1"
      />
      <circle cx="10" cy="30" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="90" cy="30" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

const shapeComponents = {
  hexagon: HexagonShape,
  circle: CircleShape,
  square: SquareShape,
  dots: DotsShape,
  lines: LinesShape,
};

export default function FloatingTechShapes({
  variant = "sparse",
  color = "blue",
  className = "",
}: FloatingTechShapesProps) {
  const colorClass = color === "blue" ? "text-blue-400" : "text-slate-400";
  const selectedShapes = shapes[variant];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {selectedShapes.map((shape, index) => {
        const ShapeComponent =
          shapeComponents[shape.type as keyof typeof shapeComponents];

        return (
          <motion.div
            key={`${shape.type}-${index}`}
            className={`absolute ${shape.position}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -12, 0],
              rotate: [0, shape.type === "square" ? 8 : 3, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: shape.delay * 0.3 },
              scale: { duration: 1, delay: shape.delay * 0.3 },
              y: {
                duration: shape.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              },
              rotate: {
                duration: shape.duration * 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              },
            }}
          >
            <ShapeComponent size={shape.size} color={colorClass} />
          </motion.div>
        );
      })}
    </div>
  );
}
