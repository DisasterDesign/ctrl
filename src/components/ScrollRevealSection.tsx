"use client";
import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import FadeIn from "@/components/ui/FadeIn";

/* ═══════════════════════════════════════════════════════════
   ScrollRevealSection — CLARITY
   Desktop: SVG path draw + scroll-driven reveals
   Mobile: Simple vertical list with FadeIn
   ═══════════════════════════════════════════════════════════ */

const CURVE_PATH =
  "M-73 818.498C269.416 148.035 1198.06 1401.73 742 1759C246.234 2147.38 -55.6772 1564.05 248 1226.5C508 937.5 1441.95 1097.38 1695.5 1444.5C1969.43 1819.53 1165.26 2191.27 1117.5 2211.5";

const DOTS = [
  { cx: 629.5, cy: 892.5 },
  { cx: 1107.5, cy: 1123.5 },
  { cx: 859.5, cy: 1599.5 },
  { cx: 1574.5, cy: 1910.5 },
];

// Each text positioned next to its dot (Figma viewBox 1920×2372)
const PAIN_TEXTS = [
  { text: "אין תמונה ברורה של ההכנסות וההוצאות", x: 720, y: 845, width: 520 },
  { text: "אין זמן לעצור ולחשוב קדימה", x: 650, y: 1280, width: 700, earlyStart: -0.03 },
  { text: "התזרים לא יציב ויוצר לחץ", x: 270, y: 1555, width: 520 },
  { text: "העומס בעסק גולש לחיים האישיים", x: 750, y: 1868, width: 700 },
];

const SUBTITLE_WORDS = ["אם", "זה", "מרגיש", "מוכר:"];
const WORD_SCATTER = [
  { x: 120, y: -40 },
  { x: -80, y: 30 },
  { x: 60, y: -20 },
  { x: -100, y: 25 },
];

/* ── Mobile Layout ── */
function MobileLayout() {
  return (
    <section dir="rtl" className="py-16 px-6" style={{ background: "#F0F1FB" }}>
      <div className="max-w-lg mx-auto">
        {/* Title */}
        <FadeIn>
          <h2
            className="text-2xl font-bold text-black leading-[1.4] mb-3 text-right"
          >
            העסק עובד — אבל הכול עובר דרכך
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.15}>
          <p className="text-lg text-black mb-8 text-right">
            אם זה מרגיש מוכר:
          </p>
        </FadeIn>

        {/* Pain points */}
        <div className="space-y-5 mb-10">
          {PAIN_TEXTS.map((item, i) => (
            <FadeIn key={i} delay={0.25 + i * 0.1}>
              <div className="flex items-start gap-3 text-right">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: "#3848FE" }}
                />
                <p className="text-base text-black leading-relaxed">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Conclusion */}
        <FadeIn delay={0.7}>
          <p
            className="text-xl font-bold leading-relaxed text-right"
            style={{ color: "#3848FE" }}
          >
            את/ה לא צריך/ה עוד משימות
            <br />
            את/ה צריך/ה בהירות.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Desktop Layout (SVG scroll-driven) ── */
function DesktopLayout() {
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const painTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const conclusionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Setup path for scroll-driven draw
    const pathEl = pathRef.current;
    let pathLength = 0;
    const dotThresholds: number[] = [];

    if (pathEl) {
      pathLength = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = `${pathLength}`;
      pathEl.style.strokeDashoffset = `${pathLength}`;

      // Find where the path passes closest to each dot
      const STEP = 4;
      for (const dot of DOTS) {
        let bestDist = Infinity;
        let bestLen = 0;
        for (let l = 0; l <= pathLength; l += STEP) {
          const pt = pathEl.getPointAtLength(l);
          const dx = pt.x - dot.cx;
          const dy = pt.y - dot.cy;
          const dist = dx * dx + dy * dy;
          if (dist < bestDist) {
            bestDist = dist;
            bestLen = l;
          }
        }
        dotThresholds.push(bestLen / pathLength);
      }
    }

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledInto = -rect.top;
      const totalScroll = rect.height - vh;
      const progress = Math.max(0, Math.min(1, scrolledInto / totalScroll));

      // Path
      if (pathEl && pathLength) {
        pathEl.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
      }

      // Dots + pain texts
      for (let i = 0; i < DOTS.length; i++) {
        const threshold = dotThresholds[i] ?? 0;

        const dot = dotRefs.current[i];
        if (dot) {
          const t = Math.max(0, Math.min(1, (progress - threshold) / 0.06));
          dot.style.opacity = `${t}`;
          dot.style.transform = `scale(${t})`;
        }

        const textEl = painTextRefs.current[i];
        if (textEl) {
          const earlyOffset = PAIN_TEXTS[i]?.earlyStart ?? 0;
          const textStart = threshold + 0.02 + earlyOffset;
          const textRange = 0.10;
          const tp = Math.max(0, Math.min(1, (progress - textStart) / textRange));
          const clipLeft = (1 - tp) * 100;
          const clip = `inset(0 0 0 ${clipLeft}%)`;
          textEl.style.clipPath = clip;
          (textEl.style as unknown as Record<string, string>).webkitClipPath = clip;
          textEl.style.opacity = tp > 0 ? "1" : "0";
        }
      }

      // Entry progress
      const entry = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.8)));

      // Title: letter-spacing compression
      const titleEl = titleRef.current;
      if (titleEl) {
        const eased = 1 - Math.pow(1 - entry, 3);
        const fadeIn = Math.min(1, entry / 0.3);
        titleEl.style.opacity = `${fadeIn}`;
        const h2 = titleEl.firstElementChild as HTMLElement;
        if (h2) {
          const spacing = 30 * (1 - eased);
          h2.style.letterSpacing = `${spacing}px`;
        }
      }

      // Subtitle: words scatter → settle
      const subEl = subtitleRef.current;
      if (subEl) {
        const delayed = Math.max(0, Math.min(1, (entry - 0.15) / 0.85));
        const eased = 1 - Math.pow(1 - delayed, 3);
        const fadeIn = Math.min(1, delayed / 0.3);
        subEl.style.opacity = `${fadeIn}`;
        for (let i = 0; i < SUBTITLE_WORDS.length; i++) {
          const wordEl = wordRefs.current[i];
          if (!wordEl) continue;
          const scatter = WORD_SCATTER[i];
          const tx = scatter.x * (1 - eased);
          const ty = scatter.y * (1 - eased);
          wordEl.style.transform = `translate(${tx}px, ${ty}px)`;
        }
      }

      // Conclusion
      const conEl = conclusionRef.current;
      if (conEl) {
        const cp = Math.max(0, Math.min(1, (progress - 0.95) / 0.05));
        const eased = 1 - Math.pow(1 - cp, 3);
        conEl.style.opacity = cp > 0 ? "1" : "0";
        const scale = 0.85 + 0.15 * eased;
        const clipLeft = (1 - eased) * 100;
        const clip = `inset(0 0 0 ${clipLeft}%)`;
        conEl.style.clipPath = clip;
        (conEl.style as unknown as Record<string, string>).webkitClipPath = clip;
        conEl.style.transform = `scale(${scale})`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mouse parallax on title/subtitle
    let mx = 0, my = 0;
    let paralaxRaf = 0;

    function applyParallax() {
      const tEl = titleRef.current;
      const sEl = subtitleRef.current;
      if (tEl) tEl.style.transform = `translate(${mx * 5}px, ${my * 5}px)`;
      if (sEl) sEl.style.transform = `translate(${mx * 8}px, ${my * 8}px)`;
      paralaxRaf = 0;
    }

    function onMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!paralaxRaf) paralaxRaf = requestAnimationFrame(applyParallax);
    }

    section.addEventListener("mousemove", onMouseMove, { passive: true });

    // IntersectionObserver for text elements
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    section.querySelectorAll(".sr-item").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("mousemove", onMouseMove);
      if (paralaxRaf) cancelAnimationFrame(paralaxRaf);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative overflow-hidden"
      style={{ background: "#F0F1FB" }}
    >
      <div
        className="relative w-full"
        style={{ paddingBottom: `${(2372 / 1920) * 100}%` }}
      >
        <div className="absolute inset-0">
          {/* SVG layer */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 2372"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <path
              ref={pathRef}
              d={CURVE_PATH}
              stroke="#3848FE"
              strokeWidth="30"
              strokeLinecap="round"
              fill="none"
              className="sr-path"
            />
            {DOTS.map((dot, i) => (
              <circle
                key={i}
                ref={(el) => { dotRefs.current[i] = el; }}
                cx={dot.cx}
                cy={dot.cy}
                r="62.5"
                fill="#3848FE"
                style={{
                  opacity: 0,
                  transform: "scale(0)",
                  transformOrigin: `${dot.cx}px ${dot.cy}px`,
                }}
              />
            ))}
          </svg>

          {/* Text layer */}
          <div className="absolute inset-0" style={{ direction: "rtl" }}>
            {/* Title */}
            <div
              ref={titleRef}
              style={{
                position: "absolute",
                right: `${(120 / 1920) * 100}%`,
                top: `${(300 / 2372) * 100}%`,
                width: `${(1200 / 1920) * 100}%`,
                opacity: 0,
              }}
            >
              <h2
                className="font-bold text-black leading-[1.4]"
                style={{
                  fontSize: "clamp(24px, 3.8vw, 72px)",
                  textAlign: "right",
                  letterSpacing: "clamp(10px, 1.5vw, 30px)",
                }}
              >
                העסק עובד — אבל הכול עובר דרכך
              </h2>
            </div>

            {/* Subtitle */}
            <div
              ref={subtitleRef}
              style={{
                position: "absolute",
                right: `${(120 / 1920) * 100}%`,
                top: `${(450 / 2372) * 100}%`,
                width: `${(600 / 1920) * 100}%`,
                opacity: 0,
              }}
            >
              <p
                className="text-black"
                style={{ fontSize: "clamp(16px, 2.2vw, 42px)", textAlign: "right", lineHeight: 1.55 }}
              >
                {SUBTITLE_WORDS.map((word, i) => (
                  <span
                    key={i}
                    ref={(el) => { wordRefs.current[i] = el; }}
                    style={{
                      display: "inline-block",
                      marginLeft: i < SUBTITLE_WORDS.length - 1 ? "0.3em" : 0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Pain texts */}
            {PAIN_TEXTS.map((node, i) => (
              <div
                key={i}
                ref={(el) => { painTextRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  left: `${(node.x / 1920) * 100}%`,
                  top: `${(node.y / 2372) * 100}%`,
                  width: `${(node.width / 1920) * 100}%`,
                  opacity: 0,
                  clipPath: "inset(0 0 0 100%)",
                }}
              >
                <p
                  className="text-black"
                  style={{ fontSize: "clamp(16px, 2vw, 38px)", textAlign: "right", lineHeight: 1.54 }}
                >
                  {node.text}
                </p>
              </div>
            ))}

            {/* Conclusion */}
            <div
              ref={conclusionRef}
              style={{
                position: "absolute",
                left: `${(40 / 1920) * 100}%`,
                top: `${(2122 / 2372) * 100}%`,
                width: `${(963 / 1920) * 100}%`,
                opacity: 0,
                clipPath: "inset(0 0 0 100%)",
                transform: "scale(0.85)",
                transformOrigin: "right center",
              }}
            >
              <p
                className="font-bold"
                style={{ fontSize: "clamp(20px, 2.6vw, 50px)", textAlign: "right", lineHeight: 1.66, color: "#3848FE" }}
              >
                את/ה לא צריך/ה עוד משימות
                <br />
                את/ה צריך/ה בהירות.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Component ── */
export default function ScrollRevealSection() {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileLayout />;
  return <DesktopLayout />;
}
