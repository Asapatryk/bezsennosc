"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortalEnter() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current) return;

    const ctx = gsap.context(() => {
      // Jasny okrąg rośnie z 5% do 150% na scroll
      gsap.fromTo(
        circleRef.current,
        { clipPath: "circle(5% at 50% 70%)" },
        {
          clipPath: "circle(150% at 50% 50%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        }
      );

      // Subtelny glow rośnie razem z okręgiem
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { scale: 0.3, opacity: 0.7 },
          {
            scale: 2.2,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=150%",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portal-enter"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Delikatna poświata dookoła rosnącego okręgu */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "60vmin",
          height: "60vmin",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(200,180,255,0.15) 30%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      {/* Jasna warstwa odsłaniana przez clip-path circle */}
      <div
        ref={circleRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #ffffff 0%, #f4f4f4 55%, #e8e8e8 100%)",
          clipPath: "circle(5% at 50% 70%)",
          filter: "blur(0.5px)",
        }}
      />
    </section>
  );
}
