"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current) return;

    const split1 = new SplitType(line1Ref.current, { types: "chars" });
    const split2 = new SplitType(line2Ref.current, { types: "chars" });

    const tl = gsap.timeline({ delay: 0.5 });

    // Set initial states
    gsap.set([split1.chars, split2.chars], {
      y: "100%",
      opacity: 0,
    });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 10 });

    tl.to(split1.chars, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
      ease: "power3.out",
    })
      .to(
        split2.chars,
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

    return () => {
      split1.revert();
      split2.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="overflow-hidden">
          <h1
            ref={line1Ref}
            className="text-[12vw] leading-[0.9] font-extralight uppercase tracking-wider text-white"
          >
            Studio
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={line2Ref}
            className="text-[10vw] leading-[0.95] font-bold uppercase tracking-wide text-white"
          >
            Bezsenność
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-8">
          <div className="w-12 h-[1px] bg-white/30 mx-auto mb-4" />
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/60">
            Kreatywne studio cyfrowe · 2026
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/60 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
