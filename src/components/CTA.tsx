"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const split = new SplitType(headingRef.current, { types: "words" });

    const ctx = gsap.context(() => {
      gsap.set(split.words, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });
      gsap.set(emailRef.current, { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(split.words, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power2.out",
      })
        .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .to(emailRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
    }, sectionRef);

    return () => {
      split.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 md:px-12 flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0518 50%, #0a0a0a 100%)",
      }}
    >
      <div className="text-center max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-snug mb-12"
        >
          Nie śpimy. Napisz o każdej porze.
        </h2>

        <a
          ref={buttonRef}
          href="mailto:hello@studiobezsennosc.pl"
          className="inline-block px-10 py-4 text-sm uppercase tracking-[0.25em] text-white border border-[#8b5cf6]/50 hover:border-[#8b5cf6] hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-700 mb-8"
        >
          Skontaktuj się →
        </a>

        <div>
          <a
            ref={emailRef}
            href="mailto:hello@studiobezsennosc.pl"
            className="text-sm text-[#999] hover:text-[#8b5cf6] transition-colors duration-500 tracking-wider"
          >
            hello@studiobezsennosc.pl
          </a>
        </div>
      </div>
    </section>
  );
}
