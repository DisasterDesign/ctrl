"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

const LERP_FACTOR = 0.08;

// Custom blur shader
const BlurSpotlightShader = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: null },
    uMouse: { value: null },
    uRadius: { value: 0.35 },
    uBlurAmount: { value: 3.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uRadius;
    uniform float uBlurAmount;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Aspect-corrected distance from mouse
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      float dist = distance(uv * aspect, uMouse * aspect);

      // Smooth transition from clear to blurred
      float blurFactor = smoothstep(uRadius * 0.6, uRadius, dist);

      // Blur via weighted multi-sample averaging
      vec4 color = vec4(0.0);
      float total = 0.0;
      float blur = uBlurAmount * blurFactor / uResolution.y;

      for (float x = -3.0; x <= 3.0; x += 1.0) {
        for (float y = -3.0; y <= 3.0; y += 1.0) {
          float weight = 1.0 - length(vec2(x, y)) / 4.24;
          if (weight > 0.0) {
            color += texture2D(tDiffuse, uv + vec2(x, y) * blur) * weight;
            total += weight;
          }
        }
      }

      gl_FragColor = color / total;
    }
  `,
};

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let animationId: number | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let composer: any = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let isVisible = true;

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let onMouseMove: ((e: MouseEvent) => void) | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let onVisibilityChange: (() => void) | null = null;

    async function init() {
      const THREE = await import("three");
      const { EffectComposer } = await import(
        "three/addons/postprocessing/EffectComposer.js"
      );
      const { RenderPass } = await import(
        "three/addons/postprocessing/RenderPass.js"
      );
      const { ShaderPass } = await import(
        "three/addons/postprocessing/ShaderPass.js"
      );

      if (disposed || !container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xfafbfc);

      // Camera — skyscraper on the left side of the viewport (right in real world, since RTL site)
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(10, 8, 22);
      camera.lookAt(-4, 14, 0);

      // Renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0xfafbfc, 1);
      container.appendChild(renderer.domElement);

      // Skyscraper
      const meshes: THREE.Mesh[] = [];
      const building = new THREE.Group();

      // Base / lobby — wider podium
      const baseGeo = new THREE.BoxGeometry(6, 3, 6);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xbfccd9,
        roughness: 0.8,
        metalness: 0.1,
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 1.5;
      building.add(base);
      meshes.push(base);

      // Main tower body
      const bodyGeo = new THREE.BoxGeometry(4, 24, 4);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xc8d4e0,
        roughness: 0.6,
        metalness: 0.15,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 3 + 12;
      building.add(body);
      meshes.push(body);

      // Glass panels — recessed faces (front & back)
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x9bb5cc,
        roughness: 0.3,
        metalness: 0.3,
      });
      for (let side = 0; side < 4; side++) {
        const panelGeo = new THREE.BoxGeometry(
          side < 2 ? 3.2 : 0.15,
          22,
          side < 2 ? 0.15 : 3.2
        );
        const panel = new THREE.Mesh(panelGeo, glassMat);
        panel.position.y = 3 + 12;
        const offset = 2.05;
        if (side === 0) panel.position.z = offset;
        if (side === 1) panel.position.z = -offset;
        if (side === 2) panel.position.x = offset;
        if (side === 3) panel.position.x = -offset;
        building.add(panel);
        meshes.push(panel);
      }

      // Floor bands — horizontal lines every 3 units
      const bandMat = new THREE.MeshStandardMaterial({
        color: 0xd4dee8,
        roughness: 0.7,
        metalness: 0.05,
      });
      for (let y = 5; y < 27; y += 3) {
        const bandGeo = new THREE.BoxGeometry(4.2, 0.15, 4.2);
        const band = new THREE.Mesh(bandGeo, bandMat);
        band.position.y = y;
        building.add(band);
        meshes.push(band);
      }

      // Crown — setback top section
      const crownGeo = new THREE.BoxGeometry(3, 4, 3);
      const crownMat = new THREE.MeshStandardMaterial({
        color: 0xb8c8d8,
        roughness: 0.5,
        metalness: 0.2,
      });
      const crown = new THREE.Mesh(crownGeo, crownMat);
      crown.position.y = 29;
      building.add(crown);
      meshes.push(crown);

      // Spire / antenna
      const spireGeo = new THREE.CylinderGeometry(0.08, 0.15, 5, 8);
      const spireMat = new THREE.MeshStandardMaterial({
        color: 0x9bb5cc,
        roughness: 0.3,
        metalness: 0.4,
      });
      const spire = new THREE.Mesh(spireGeo, spireMat);
      spire.position.y = 33.5;
      building.add(spire);
      meshes.push(spire);

      scene.add(building);

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(8, 20, 12);
      scene.add(dirLight);
      const fillLight = new THREE.DirectionalLight(0xddeeff, 0.3);
      fillLight.position.set(-6, 10, -5);
      scene.add(fillLight);

      // Post-processing
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const blurPass = new ShaderPass({
        ...BlurSpotlightShader,
        uniforms: {
          tDiffuse: { value: null },
          uResolution: { value: new THREE.Vector2(width, height) },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uRadius: { value: 0.35 },
          uBlurAmount: { value: 3.0 },
        },
      });
      composer.addPass(blurPass);

      // Mobile detection
      const isMobile =
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window;

      if (isMobile) {
        targetMouse.x = 0.5;
        targetMouse.y = 0.45;
      } else {
        onMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          targetMouse.x = (e.clientX - rect.left) / rect.width;
          targetMouse.y = (e.clientY - rect.top) / rect.height;
        };
        document.addEventListener("mousemove", onMouseMove);
      }

      // Visibility management
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(container);

      onVisibilityChange = () => {
        if (document.hidden) {
          isVisible = false;
        } else {
          const rect = container.getBoundingClientRect();
          isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      // Resize
      resizeObserver = new ResizeObserver(([entry]) => {
        if (disposed || !renderer) return;
        const { width: w, height: h } = entry.contentRect;
        if (w === 0 || h === 0) return;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer.setSize(w, h);
        blurPass.uniforms.uResolution.value.set(w, h);
      });
      resizeObserver.observe(container);

      // Fade in after first render
      container.style.transition = "opacity 0.8s ease";
      container.style.borderRadius = "inherit";

      // Render loop
      function animate() {
        animationId = requestAnimationFrame(animate);
        if (!isVisible || disposed) return;

        mouse.x += (targetMouse.x - mouse.x) * LERP_FACTOR;
        mouse.y += (targetMouse.y - mouse.y) * LERP_FACTOR;
        blurPass.uniforms.uMouse.value.set(mouse.x, mouse.y);

        composer.render();
      }

      // First render then fade in
      composer.render();
      container.style.opacity = "0.7";

      animate();

      // Cleanup helper stored for return
      return () => {
        meshes.forEach((mesh) => {
          mesh.geometry.dispose();
          (mesh.material as THREE.MeshStandardMaterial).dispose();
        });
      };
    }

    let cleanupTowers: (() => void) | undefined;

    init().then((cleanup) => {
      cleanupTowers = cleanup;
    });

    return () => {
      disposed = true;
      if (animationId !== null) cancelAnimationFrame(animationId);
      if (onMouseMove) document.removeEventListener("mousemove", onMouseMove);
      if (onVisibilityChange)
        document.removeEventListener("visibilitychange", onVisibilityChange);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      cleanupTowers?.();
      composer?.dispose();
      renderer?.dispose();
      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
}
