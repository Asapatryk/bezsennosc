"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-5%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            background: `rgba(${139 + Math.random() * 50}, ${
              92 + Math.random() * 40
            }, 246, ${0.2 + Math.random() * 0.4})`,
            animationDuration: `${8 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current) return;

    const split1 = new SplitType(line1Ref.current, { types: "chars" });
    const split2 = new SplitType(line2Ref.current, { types: "chars" });

    const tl = gsap.timeline({ delay: 0.5 });

    gsap.set([split1.chars, split2.chars], {
      y: "110%",
      opacity: 0,
    });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 10 });

    tl.to(split1.chars, {
      y: "0%",
      opacity: 1,
      duration: 1,
      stagger: 0.03,
      ease: "power3.out",
    })
      .to(
        split2.chars,
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.03,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

    return () => {
      split1.revert();
      split2.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-transparent" />

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="overflow-hidden">
          <h1
            ref={line1Ref}
            className="text-[14vw] md:text-[12vw] leading-[0.85] font-extralight uppercase tracking-wider text-white"
          >
            Studio
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={line2Ref}
            className="text-[12vw] md:text-[10vw] leading-[0.9] font-black uppercase tracking-wide text-white"
          >
            Bezsenność
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-10">
          <div className="w-16 h-[1px] mx-auto mb-5 bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent" />
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/50">
            Kreatywne studio cyfrowe · 2026
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>
        <div className="w-[1px] h-10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#8b5cf6]/60 to-transparent"
            style={{
              height: "100%",
              animation: "floatUp 2.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
