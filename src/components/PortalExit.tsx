"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortalExit() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current) return;

    const ctx = gsap.context(() => {
      // Jasny okrąg kurczy się — ciemne tło sekcji odsłania się
      gsap.fromTo(
        circleRef.current,
        { clipPath: "circle(150% at 50% 50%)" },
        {
          clipPath: "circle(0% at 50% 30%)",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portal-exit"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Jasna warstwa — kurczy się wraz ze scrollem, odsłaniając ciemne tło */}
      <div
        ref={circleRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #ffffff 0%, #f4f4f4 55%, #e8e8e8 100%)",
          clipPath: "circle(150% at 50% 50%)",
        }}
      />
    </section>
  );
}
