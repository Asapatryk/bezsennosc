"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !sectionRef.current) return;

    const split1 = new SplitType(line1Ref.current, { types: "chars" });
    const split2 = new SplitType(line2Ref.current, { types: "chars" });

    gsap.set([split1.chars, split2.chars], { y: "110%", opacity: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(scrollRef.current, { opacity: 0, y: 10 });
    gsap.set(sphereRef.current, { scale: 0.8, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(sphereRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    })
      .to(
        split1.chars,
        { y: "0%", opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out" },
        "-=1"
      )
      .to(
        split2.chars,
        { y: "0%", opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out" },
        "-=0.6"
      )
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");

    // Parallax sphere on scroll
    gsap.to(sphereRef.current, {
      yPercent: 30,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      split1.revert();
      split2.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #111111 40%, #050505 100%)",
      }}
    >
      {/* Glowing sphere behind text */}
      <div
        ref={sphereRef}
        className="absolute pointer-events-none"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,220,240,0.15) 0%, rgba(180,130,255,0.08) 30%, rgba(100,80,200,0.04) 55%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

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
        <div ref={subtitleRef} className="mt-10">
          <div className="w-16 h-[1px] mx-auto mb-5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/40">
            Kreatywne studio cyfrowe · 2026
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
