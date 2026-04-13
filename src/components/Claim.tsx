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
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12"
      style={{ background: "#050505" }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <p
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-relaxed text-white"
        >
          Tworzymy cyfrowe doświadczenia które{" "}
          <span className="text-[#8b5cf6] font-normal">hipnotyzują</span>,
          konwertują i zostają w głowie.
        </p>
      </div>
    </section>
  );
}
