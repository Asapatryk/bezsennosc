"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Claim() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const split = new SplitType(textRef.current, { types: "words" });

    gsap.set(split.words, {
      opacity: 0,
      y: 30,
    });

    gsap.to(split.words, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="claim"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden noise-overlay animated-gradient"
      style={{
        background:
          "linear-gradient(135deg, #050505 0%, #0d0518 25%, #050510 50%, #0a0520 75%, #050505 100%)",
      }}
    >
      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <p
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-relaxed text-white"
        >
          Tworzymy cyfrowe doświadczenia które{" "}
          <em className="text-[#8b5cf6] font-normal not-italic italic">
            hipnotyzują
          </em>
          , konwertują i zostają w głowie.
        </p>
      </div>
    </section>
  );
}
