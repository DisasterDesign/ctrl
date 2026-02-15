import * as CANNON from "cannon-es";
import * as THREE from "three";
import { PHYSICS } from "./constants";

export class PhysicsWorld {
  world: CANNON.World;
  enabled = true;
  private pairs: { body: CANNON.Body; mesh: THREE.Mesh }[] = [];

  constructor() {
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(...PHYSICS.gravity),
    });
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    (this.world.solver as CANNON.GSSolver).iterations = 10;

    // Ground plane
    const groundMat = new CANNON.Material({ restitution: 0.2, friction: 0.8 });
    const ground = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: groundMat,
      position: new CANNON.Vec3(0, PHYSICS.groundY, 0),
    });
    ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.world.addBody(ground);

    // Invisible walls
    const wallMat = new CANNON.Material({ restitution: 0.5, friction: 0.3 });
    const walls: [number, number, number, number, number, number][] = [
      [-PHYSICS.wallDistance, 5, 0, 0, 0, Math.PI / 2],   // left
      [PHYSICS.wallDistance, 5, 0, 0, 0, -Math.PI / 2],   // right
      [0, 5, -PHYSICS.wallDistance, Math.PI / 2, 0, 0],    // back
      [0, 5, PHYSICS.wallDistance, -Math.PI / 2, 0, 0],    // front
    ];
    for (const [x, y, z, rx, ry, rz] of walls) {
      const wall = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        material: wallMat,
        position: new CANNON.Vec3(x, y, z),
      });
      wall.quaternion.setFromEuler(rx, ry, rz);
      this.world.addBody(wall);
    }
  }

  addBody(mesh: THREE.Mesh, body: CANNON.Body) {
    this.world.addBody(body);
    this.pairs.push({ body, mesh });
  }

  step() {
    if (!this.enabled) return;
    this.world.step(PHYSICS.fixedTimeStep, undefined, PHYSICS.maxSubSteps);
    for (const { body, mesh } of this.pairs) {
      mesh.position.copy(body.position as unknown as THREE.Vector3);
      mesh.quaternion.copy(body.quaternion as unknown as THREE.Quaternion);
    }
  }

  scatterAll() {
    for (const { body } of this.pairs) {
      const angle = Math.atan2(body.position.z, body.position.x) + (Math.random() - 0.5) * 0.5;
      const f = PHYSICS.scatterForce * (0.8 + Math.random() * 0.4);
      body.applyImpulse(
        new CANNON.Vec3(
          Math.cos(angle) * f,
          f * 0.6,
          Math.sin(angle) * f
        ),
        body.position
      );
      body.angularVelocity.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
    }
  }

  getBodyForMesh(mesh: THREE.Mesh): CANNON.Body | undefined {
    return this.pairs.find((p) => p.mesh === mesh)?.body;
  }

  getAllMeshes(): THREE.Mesh[] {
    return this.pairs.map((p) => p.mesh);
  }

  dispose() {
    for (const { body } of this.pairs) {
      this.world.removeBody(body);
    }
    this.pairs = [];
  }
}
