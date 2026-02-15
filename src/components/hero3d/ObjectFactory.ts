import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OBJECT_DEFS, PHYSICS, MOBILE_BREAKPOINT, type BusinessObjectDef } from "./constants";
import { PhysicsWorld } from "./PhysicsWorld";

export function createObjects(
  scene: THREE.Scene,
  physics: PhysicsWorld,
  isMobile: boolean
): void {
  const objMaterial = new CANNON.Material({
    restitution: PHYSICS.restitution,
    friction: PHYSICS.friction,
  });

  // Geometry cache: reuse per definition
  const geoCache = new Map<string, THREE.BufferGeometry>();

  for (const def of OBJECT_DEFS) {
    const count = isMobile ? Math.min(def.count, Math.ceil(def.count * 0.5)) : def.count;

    // Cache geometry
    let geometry = geoCache.get(def.name);
    if (!geometry) {
      if (def.geo.type === "box") {
        geometry = new THREE.BoxGeometry(...(def.geo.args as [number, number, number]));
      } else {
        geometry = new THREE.CylinderGeometry(
          ...(def.geo.args as [number, number, number, number])
        );
      }
      geoCache.set(def.name, geometry);
    }

    const material = new THREE.MeshStandardMaterial({
      color: def.color,
      metalness: def.metalness,
      roughness: def.roughness,
    });

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      // Cannon shape
      let shape: CANNON.Shape;
      if (def.geo.type === "box") {
        const [w, h, d] = def.geo.args;
        shape = new CANNON.Box(new CANNON.Vec3(w / 2, h / 2, d / 2));
      } else {
        const [radiusTop, radiusBottom, height, segments] = def.geo.args;
        shape = new CANNON.Cylinder(radiusTop, radiusBottom, height, segments);
      }

      const body = new CANNON.Body({
        mass: def.mass,
        shape,
        material: objMaterial,
        position: new CANNON.Vec3(
          (Math.random() - 0.5) * PHYSICS.spreadX,
          PHYSICS.dropMinY + Math.random() * (PHYSICS.dropMaxY - PHYSICS.dropMinY),
          (Math.random() - 0.5) * PHYSICS.spreadZ
        ),
        linearDamping: PHYSICS.linearDamping,
        angularDamping: PHYSICS.angularDamping,
      });

      // Random initial rotation
      body.quaternion.setFromEuler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      physics.addBody(mesh, body);
    }
  }
}
