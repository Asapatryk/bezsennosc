"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headlines = [
  { text: "Nie śpimy.", color: "#ffffff" },
  { text: "Tworzymy.", color: "#ffffff" },
  { text: "Hipnotyzujemy.", color: "#8b5cf6" },
];

export default function Claim() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      headlines.forEach((_, i) => {
        const el = wrapperRefs.current[i];
        if (!el) return;

        // Each headline occupies 1/3 of the 300vh section
        // Calculate start/end as percentages of scroll through section
        const segStart = i / 3;
        const segEnd = (i + 1) / 3;

        // Fade in
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${segStart * 100}% bottom`,
          end: `${(segStart + 0.07) * 100}% bottom`,
          scrub: true,
          animation: gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.out" }),
        });

        // Fade out (not for last)
        if (i < headlines.length - 1) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `${(segEnd - 0.07) * 100}% bottom`,
            end: `${segEnd * 100}% bottom`,
            scrub: true,
            animation: gsap.fromTo(el, { opacity: 1, y: 0 }, { opacity: 0, y: -30, ease: "power2.in" }),
          });
        } else {
          // Last one fades when leaving section
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "bottom 55%",
            end: "bottom top",
            scrub: true,
            animation: gsap.fromTo(el, { opacity: 1 }, { opacity: 0, ease: "power2.in" }),
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="claim"
      ref={sectionRef}
      className="relative"
      style={{
        height: "300vh",
        background: "linear-gradient(180deg, #050505 0%, #0a0510 50%, #050505 100%)",
      }}
    >
      {headlines.map((h, i) => (
        <div
          key={i}
          ref={(el) => { wrapperRefs.current[i] = el; }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0, zIndex: 10 }}
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-wider text-center px-6"
            style={{ color: h.color }}
          >
            {h.text}
          </h2>
        </div>
      ))}
    </section>
  );
}
