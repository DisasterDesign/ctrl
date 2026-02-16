import * as THREE from "three";
import { OBJECT_DEFS, MOBILE_OBJECT_COUNT, MOBILE_BREAKPOINT, type GlassObjectDef } from "./constants";

export interface GlassObject {
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
}

function createGeometry(def: GlassObjectDef): THREE.BufferGeometry {
  const { type, args } = def.geo;
  switch (type) {
    case "box":
      return new THREE.BoxGeometry(...(args as [number, number, number]));
    case "sphere":
      return new THREE.SphereGeometry(...(args as [number, number, number]));
    case "cylinder":
      return new THREE.CylinderGeometry(...(args as [number, number, number, number]));
    case "torus":
      return new THREE.TorusGeometry(...(args as [number, number, number, number]));
  }
}

export function createGlassObjects(scene: THREE.Scene): GlassObject[] {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const defs = isMobile ? OBJECT_DEFS.slice(0, MOBILE_OBJECT_COUNT) : OBJECT_DEFS;

  return defs.map((def) => {
    const geometry = createGeometry(def);
    const color = new THREE.Color(def.color);

    const material = new THREE.MeshPhysicalMaterial({
      color,
      transmission: 0.7,
      roughness: 0.15,
      thickness: 0.5,
      ior: 1.5,
      transparent: true,
      opacity: 0.85,
      envMapIntensity: 1.0,
      clearcoat: 0.1,
      clearcoatRoughness: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(def.scale);
    mesh.position.set(...def.home);

    // Random initial rotation for variety
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    scene.add(mesh);

    return {
      mesh,
      home: new THREE.Vector3(...def.home),
      velocity: new THREE.Vector3(0, 0, 0),
      rotationSpeed: new THREE.Vector3(...def.rotationSpeed),
    };
  });
}
