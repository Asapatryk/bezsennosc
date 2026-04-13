"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techLabels = [
  { text: "Next.js", x: "15%", y: "25%", rotate: -12 },
  { text: "React", x: "75%", y: "20%", rotate: 8 },
  { text: "GSAP", x: "10%", y: "55%", rotate: -5 },
  { text: "Three.js", x: "80%", y: "60%", rotate: 15 },
  { text: "AI", x: "50%", y: "12%", rotate: -3 },
  { text: "TypeScript", x: "20%", y: "75%", rotate: 10 },
  { text: "Tailwind", x: "70%", y: "80%", rotate: -8 },
  { text: "Vercel", x: "85%", y: "40%", rotate: 5 },
];

export default function TechSphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Sphere parallax
      if (sphereRef.current) {
        gsap.fromTo(
          sphereRef.current,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 20%",
              scrub: true,
            },
          }
        );

        gsap.to(sphereRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Text content
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Tech labels float
      const labels = sectionRef.current!.querySelectorAll(".tech-label");
      labels.forEach((label, i) => {
        gsap.fromTo(
          label,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 0.3,
            scale: 1,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0d0520 40%, #100825 50%, #0d0520 60%, #050505 100%)",
      }}
    >
      {/* Sphere container */}
      <div className="relative flex items-center justify-center mb-16">
        {/* Sphere */}
        <div
          ref={sphereRef}
          className="relative"
          style={{
            width: "min(45vw, 500px)",
            height: "min(45vw, 500px)",
          }}
        >
          {/* Main sphere glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(200,160,255,0.12) 0%, rgba(139,92,246,0.08) 25%, rgba(80,60,200,0.05) 45%, rgba(59,130,246,0.03) 60%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          {/* Inner brighter core */}
          <div
            className="absolute inset-[15%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,230,250,0.1) 0%, rgba(180,140,255,0.06) 40%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          {/* Subtle edge ring */}
          <div
            className="absolute inset-[5%] rounded-full"
            style={{
              border: "1px solid rgba(139,92,246,0.08)",
            }}
          />

          {/* Tech labels scattered around sphere */}
          {techLabels.map((label, i) => (
            <span
              key={i}
              className="tech-label absolute text-xs md:text-sm text-white/0 tracking-wider font-light pointer-events-none select-none"
              style={{
                left: label.x,
                top: label.y,
                transform: `rotate(${label.rotate}deg)`,
              }}
            >
              {label.text}
            </span>
          ))}
        </div>
      </div>

      {/* Text content below sphere */}
      <div ref={contentRef} className="text-center px-6 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.4em] text-[#8b5cf6]/50 block mb-6">
          {"{ TECHNOLOGIE }"}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 leading-snug">
          Narzędzia przyszłości
        </h2>
        <p className="text-base text-[#999] leading-relaxed max-w-lg mx-auto">
          Używamy najnowszych technologii żeby Twoja strona była szybka,
          piękna i niezapomniana.
        </p>
      </div>
    </section>
  );
}
