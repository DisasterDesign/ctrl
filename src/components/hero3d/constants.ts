export const COLORS = {
  accent: 0x3848fe,
  accentLight: 0x6b7aff,
  purple: 0x7c5bf0,
  purpleLight: 0xa78bfa,
  blue: 0x3b82f6,
  blueLight: 0x93c5fd,
  indigo: 0x6366f1,
  slate: 0xc4c8e0,
  white: 0xf0f1fb,
} as const;

export type GeoType = "box" | "sphere" | "cylinder" | "torus";

export interface GlassObjectDef {
  geo: { type: GeoType; args: number[] };
  color: number;
  home: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
}

// ~25 objects spread across the viewport
export const OBJECT_DEFS: GlassObjectDef[] = [
  // Large accent pieces
  { geo: { type: "box", args: [1, 1, 1] }, color: COLORS.accent, home: [4, 2, -2], scale: 0.9, rotationSpeed: [0.003, 0.005, 0.002] },
  { geo: { type: "sphere", args: [0.6, 32, 32] }, color: COLORS.purple, home: [-3, 1.5, -1], scale: 1.1, rotationSpeed: [0.002, 0.004, 0.001] },
  { geo: { type: "torus", args: [0.5, 0.2, 16, 32] }, color: COLORS.accentLight, home: [3, -1, 0], scale: 1.0, rotationSpeed: [0.004, 0.003, 0.005] },

  // Medium shapes — right side cluster
  { geo: { type: "box", args: [0.7, 0.7, 0.7] }, color: COLORS.indigo, home: [5, 0, -1], scale: 0.7, rotationSpeed: [0.005, 0.002, 0.004] },
  { geo: { type: "cylinder", args: [0.4, 0.4, 0.8, 24] }, color: COLORS.blueLight, home: [4.5, -2, 0.5], scale: 0.8, rotationSpeed: [0.003, 0.006, 0.002] },
  { geo: { type: "sphere", args: [0.45, 24, 24] }, color: COLORS.purpleLight, home: [3.5, 3, -0.5], scale: 0.9, rotationSpeed: [0.004, 0.003, 0.003] },
  { geo: { type: "torus", args: [0.35, 0.12, 12, 24] }, color: COLORS.accent, home: [5.5, 1.5, 0], scale: 0.85, rotationSpeed: [0.006, 0.004, 0.002] },

  // Medium shapes — left side cluster
  { geo: { type: "box", args: [0.6, 0.8, 0.5] }, color: COLORS.blue, home: [-4, -1, -0.5], scale: 0.75, rotationSpeed: [0.004, 0.005, 0.003] },
  { geo: { type: "sphere", args: [0.35, 20, 20] }, color: COLORS.accentLight, home: [-5, 2, 0], scale: 0.85, rotationSpeed: [0.003, 0.002, 0.005] },
  { geo: { type: "cylinder", args: [0.3, 0.3, 0.6, 20] }, color: COLORS.purple, home: [-3.5, -2.5, 0.5], scale: 0.7, rotationSpeed: [0.005, 0.003, 0.004] },

  // Scattered small pieces
  { geo: { type: "box", args: [0.4, 0.4, 0.4] }, color: COLORS.slate, home: [1.5, 3, -1], scale: 0.6, rotationSpeed: [0.006, 0.004, 0.005] },
  { geo: { type: "sphere", args: [0.25, 16, 16] }, color: COLORS.purpleLight, home: [-1, -3, 0], scale: 0.7, rotationSpeed: [0.005, 0.006, 0.003] },
  { geo: { type: "torus", args: [0.25, 0.08, 10, 20] }, color: COLORS.blue, home: [2, -2.5, 0.5], scale: 0.65, rotationSpeed: [0.007, 0.003, 0.005] },
  { geo: { type: "cylinder", args: [0.2, 0.2, 0.5, 16] }, color: COLORS.indigo, home: [-2, 3.5, -0.5], scale: 0.6, rotationSpeed: [0.004, 0.007, 0.003] },
  { geo: { type: "box", args: [0.35, 0.5, 0.35] }, color: COLORS.accentLight, home: [0.5, -1.5, -1.5], scale: 0.55, rotationSpeed: [0.005, 0.004, 0.006] },

  // Tiny accent particles
  { geo: { type: "sphere", args: [0.18, 12, 12] }, color: COLORS.accent, home: [6, 0.5, 0], scale: 0.5, rotationSpeed: [0.008, 0.005, 0.006] },
  { geo: { type: "sphere", args: [0.15, 12, 12] }, color: COLORS.purple, home: [-5.5, -0.5, 0.5], scale: 0.5, rotationSpeed: [0.006, 0.008, 0.004] },
  { geo: { type: "box", args: [0.3, 0.3, 0.3] }, color: COLORS.blueLight, home: [1, 4, 0], scale: 0.45, rotationSpeed: [0.007, 0.006, 0.005] },
  { geo: { type: "torus", args: [0.2, 0.06, 8, 16] }, color: COLORS.indigo, home: [-1.5, -4, -0.5], scale: 0.5, rotationSpeed: [0.009, 0.005, 0.007] },
  { geo: { type: "cylinder", args: [0.15, 0.15, 0.35, 12] }, color: COLORS.purpleLight, home: [3, -3.5, 0], scale: 0.5, rotationSpeed: [0.006, 0.009, 0.004] },

  // Far background pieces
  { geo: { type: "box", args: [0.8, 0.8, 0.8] }, color: COLORS.slate, home: [-6, 3, -3], scale: 0.6, rotationSpeed: [0.002, 0.003, 0.001] },
  { geo: { type: "sphere", args: [0.5, 20, 20] }, color: COLORS.white, home: [6.5, -2, -2.5], scale: 0.7, rotationSpeed: [0.002, 0.002, 0.003] },
  { geo: { type: "torus", args: [0.4, 0.15, 12, 20] }, color: COLORS.blueLight, home: [-4.5, -3.5, -2], scale: 0.65, rotationSpeed: [0.003, 0.002, 0.004] },
  { geo: { type: "box", args: [0.5, 0.5, 0.5] }, color: COLORS.accent, home: [2.5, 4.5, -2], scale: 0.5, rotationSpeed: [0.003, 0.004, 0.002] },
  { geo: { type: "sphere", args: [0.3, 16, 16] }, color: COLORS.purple, home: [-3, 4.5, -1.5], scale: 0.55, rotationSpeed: [0.004, 0.003, 0.003] },
];

// Mobile: use first 12 objects only
export const MOBILE_OBJECT_COUNT = 12;

export const PHYSICS = {
  attractStrength: 2.5,
  repelForce: 15,
  repelRadius: 4,
  damping: 0.92,
  maxVelocity: 8,
  mouseIdleTimeout: 2000, // ms before mouse considered idle
} as const;

export const BLUR = {
  min: 0,
  max: 8,
  lerpUp: 0.04,
  lerpDown: 0.02,
} as const;

export const CAMERA = {
  fov: 45,
  near: 0.1,
  far: 100,
  position: [0, 0, 14] as [number, number, number],
  lookAt: [0, 0, 0] as [number, number, number],
} as const;

export const MOBILE_BREAKPOINT = 768;
