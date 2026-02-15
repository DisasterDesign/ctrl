export const COLORS = {
  background: 0x0a0a0f,
  pageBackground: "#EDEDF0",
  objects: {
    deepBlue: 0x2b35af,
    midBlue: 0x4a56d0,
    lightBluePurple: 0x7b82c0,
    neutral: 0xe8e8ec,
    white: 0xf5f5f7,
  },
  cta: {
    primary: "#2B35AF",
    hover: "#4A56D0",
  },
} as const;

export interface BusinessObjectDef {
  name: string;
  geo: { type: "box" | "cylinder"; args: number[] };
  color: number;
  metalness: number;
  roughness: number;
  count: number;
  mass: number;
}

export const OBJECT_DEFS: BusinessObjectDef[] = [
  { name: "document", geo: { type: "box", args: [1.2, 0.05, 1.6] }, color: COLORS.objects.white, metalness: 0, roughness: 0.9, count: 4, mass: 0.5 },
  { name: "folder", geo: { type: "box", args: [1.4, 0.8, 0.15] }, color: COLORS.objects.midBlue, metalness: 0.1, roughness: 0.7, count: 3, mass: 1.5 },
  { name: "chart", geo: { type: "box", args: [1.0, 0.8, 0.08] }, color: COLORS.objects.lightBluePurple, metalness: 0, roughness: 0.8, count: 2, mass: 0.8 },
  { name: "clock", geo: { type: "cylinder", args: [0.4, 0.4, 0.1, 32] }, color: COLORS.objects.neutral, metalness: 0.3, roughness: 0.5, count: 2, mass: 1 },
  { name: "calculator", geo: { type: "box", args: [0.7, 1.0, 0.1] }, color: COLORS.objects.deepBlue, metalness: 0.1, roughness: 0.6, count: 2, mass: 1 },
  { name: "coin", geo: { type: "cylinder", args: [0.3, 0.3, 0.06, 32] }, color: COLORS.objects.neutral, metalness: 0.8, roughness: 0.2, count: 5, mass: 0.3 },
];

export const PHYSICS = {
  gravity: [0, -9.82, 0] as [number, number, number],
  groundY: -3,
  wallDistance: 6,
  dropMinY: 4,
  dropMaxY: 10,
  spreadX: 6,
  spreadZ: 4,
  mouseForce: 8,
  scatterForce: 25,
  fixedTimeStep: 1 / 60,
  maxSubSteps: 3,
  linearDamping: 0.3,
  angularDamping: 0.3,
  restitution: 0.3,
  friction: 0.5,
};

export const CAMERA = {
  fov: 45,
  near: 0.1,
  far: 100,
  position: [0, 4, 12] as [number, number, number],
  lookAt: [0, 0, 0] as [number, number, number],
};

export const SCROLL = {
  scatterStart: 0.3,
  scatterEnd: 0.6,
  clarityStart: 0.6,
};

export const MOBILE_BREAKPOINT = 768;
