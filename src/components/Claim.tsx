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

        // Explicit initial state
        gsap.set(el, { opacity: 0, y: 40 });

        // Single timeline per headline — fade in, hold, fade out
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${(i / 3) * 100}% bottom`,
            end: `${((i + 1) / 3) * 100}% bottom`,
            scrub: 1,
            onEnter: () => console.log(`[Claim] headline ${i} enter: ${headlines[i].text}`),
            onLeave: () => console.log(`[Claim] headline ${i} leave: ${headlines[i].text}`),
            onEnterBack: () => console.log(`[Claim] headline ${i} enter back: ${headlines[i].text}`),
          },
        });

        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          immediateRender: false,
        })
          .to(el, { opacity: 1, duration: 0.5, immediateRender: false })
          .to(el, {
            opacity: 0,
            y: -30,
            duration: 0.25,
            ease: "power2.in",
            immediateRender: false,
          });
      });

      ScrollTrigger.refresh();
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
          ref={(el) => {
            wrapperRefs.current[i] = el;
          }}
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
