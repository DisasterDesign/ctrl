import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCROLL } from "./constants";
import { PhysicsWorld } from "./PhysicsWorld";
import { MouseInteraction } from "./MouseInteraction";

gsap.registerPlugin(ScrollTrigger);

export class ScrollAnimator {
  private trigger: ScrollTrigger | null = null;
  private tl: gsap.core.Timeline | null = null;
  private scattered = false;

  constructor(
    heroSection: HTMLElement,
    physics: PhysicsWorld,
    mouse: MouseInteraction,
    chaosEl: HTMLDivElement,
    titleEl: HTMLDivElement,
    ctaEl: HTMLDivElement
  ) {
    // Timeline for overlay animations
    this.tl = gsap.timeline({ paused: true });

    // Fade out chaos overlay
    this.tl.to(chaosEl, { opacity: 0, duration: 0.3 }, 0);

    // Fade in title
    this.tl.fromTo(
      titleEl,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      0.3
    );

    // Fade in CTA
    this.tl.fromTo(
      ctaEl,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      0.5
    );

    // ScrollTrigger
    this.trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;

        // Scatter phase
        if (p >= SCROLL.scatterStart && !this.scattered) {
          this.scattered = true;
          mouse.setEnabled(false);
          physics.scatterAll();
        }

        // After scatter, disable physics once objects have flown out
        if (p >= SCROLL.scatterEnd) {
          physics.enabled = false;
        } else if (p < SCROLL.scatterStart) {
          // Reset if scrolling back up
          physics.enabled = true;
          mouse.setEnabled(true);
          if (this.scattered) {
            this.scattered = false;
          }
        }

        // Drive overlay timeline with scroll progress mapped to 0-1
        if (p >= SCROLL.clarityStart) {
          const clarityProgress = (p - SCROLL.clarityStart) / (1 - SCROLL.clarityStart);
          this.tl?.progress(clarityProgress);
        } else {
          this.tl?.progress(0);
        }
      },
    });
  }

  dispose() {
    this.trigger?.kill();
    this.tl?.kill();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}
