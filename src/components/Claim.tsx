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
  const headlineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const totalHeight = section.offsetHeight;
    const segmentHeight = totalHeight / headlines.length;

    headlineRefs.current.forEach((el, i) => {
      if (!el) return;

      const startPct = (i * segmentHeight) / totalHeight;
      const endPct = ((i + 1) * segmentHeight) / totalHeight;

      // Fade in
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: `${startPct * 100}% bottom`,
            end: `${(startPct + 0.08) * 100}% bottom`,
            scrub: true,
          },
        }
      );

      // Fade out (except last)
      if (i < headlines.length - 1) {
        gsap.fromTo(
          el,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -30,
            ease: "power2.in",
            scrollTrigger: {
              trigger: section,
              start: `${(endPct - 0.08) * 100}% bottom`,
              end: `${endPct * 100}% bottom`,
              scrub: true,
            },
          }
        );
      } else {
        // Last headline fades out at end of section
        gsap.fromTo(
          el,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "power2.in",
            scrollTrigger: {
              trigger: section,
              start: "bottom 60%",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="claim"
      ref={sectionRef}
      className="relative"
      style={{
        height: "300vh",
        background: "linear-gradient(to bottom, #050505, #0a0510, #050505)",
      }}
    >
      {headlines.map((h, i) => (
        <div
          key={i}
          ref={(el) => {
            headlineRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-10"
          style={{ opacity: 0 }}
        >
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider text-center px-6"
            style={{ color: h.color }}
          >
            {h.text}
          </h2>
        </div>
      ))}
    </section>
  );
}
