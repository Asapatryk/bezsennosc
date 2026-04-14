"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOTS = Array.from({ length: 12 }, (_, i) => i);

// radius podawany w % rozmiaru tarczy (diameter wrappera orbity)
const PARTICLES = [
  { size: 3, radius: 104, duration: 22, delay: 0 },
  { size: 2, radius: 118, duration: 30, delay: -5 },
  { size: 2.5, radius: 96, duration: 18, delay: -10 },
  { size: 2, radius: 126, duration: 40, delay: -3 },
  { size: 3, radius: 110, duration: 26, delay: -15 },
  { size: 1.5, radius: 100, duration: 34, delay: -8 },
  { size: 2, radius: 122, duration: 28, delay: -20 },
];

export default function HeroClock() {
  const rootRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || !clockRef.current) return;
    const section = rootRef.current.closest("section");

    const ctx = gsap.context(() => {
      // Wejście: scale 0.8 + opacity 0 → scale 1 + opacity 0.3, delay 0.5s
      gsap.fromTo(
        clockRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 0.3,
          duration: 1.8,
          delay: 0.5,
          ease: "power2.out",
        }
      );

      // Parallax — zegar przesuwa się wolniej niż scroll
      if (section) {
        gsap.to(rootRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <div
        ref={clockRef}
        className="relative aspect-square w-[80vw] md:w-[50vw]"
        style={{ maxWidth: "80vh", opacity: 0 }}
      >
        {/* Tarcza */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 0 100px rgba(139,92,246,0.05)",
          }}
        />

        {/* 12 kropek co 5 minut */}
        {DOTS.map((i) => (
          <div
            key={`dot-${i}`}
            className="absolute inset-0"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "4%",
                width: "2px",
                height: "2px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}

        {/* Wskazówka godzinowa — 3:00 (90°) */}
        <div
          className="absolute"
          style={{
            left: "50%",
            bottom: "50%",
            width: "2px",
            height: "25%",
            background: "rgba(255,255,255,0.15)",
            transformOrigin: "50% 100%",
            transform: "translateX(-50%) rotate(90deg)",
          }}
        />

        {/* Wskazówka minutowa — 12 (0°) */}
        <div
          className="absolute"
          style={{
            left: "50%",
            bottom: "50%",
            width: "1px",
            height: "40%",
            background: "rgba(255,255,255,0.1)",
            transformOrigin: "50% 100%",
            transform: "translateX(-50%) rotate(0deg)",
          }}
        />

        {/* Wskazówka sekundowa — animowana 60s */}
        <div
          className="absolute hero-clock-second"
          style={{
            left: "50%",
            bottom: "50%",
            width: "0.5px",
            height: "45%",
            background: "#8b5cf6",
            transformOrigin: "50% 100%",
          }}
        />

        {/* Kropka środkowa */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "4px",
            height: "4px",
            background: "#ffffff",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Cząsteczki orbitujące */}
        {PARTICLES.map((p, i) => (
          <div
            key={`p-${i}`}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              width: `${p.radius}%`,
              height: `${p.radius}%`,
              marginLeft: `-${p.radius / 2}%`,
              marginTop: `-${p.radius / 2}%`,
              animation: `hero-clock-orbit ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "0",
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: "rgba(255,255,255,0.55)",
                borderRadius: "50%",
                boxShadow: "0 0 6px rgba(139,92,246,0.55)",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}

        {/* Label 03:00 pod tarczą */}
        <div
          className="absolute left-1/2"
          style={{
            top: "calc(100% + 18px)",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.08)",
            fontSize: "11px",
            letterSpacing: "0.3em",
          }}
        >
          03:00
        </div>
      </div>

      <style>{`
        .hero-clock-second {
          animation: hero-clock-second-spin 60s linear infinite;
          transform: translateX(-50%) rotate(0deg);
        }
        @keyframes hero-clock-second-spin {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes hero-clock-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
