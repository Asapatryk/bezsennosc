"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    // Image clip-path reveal
    gsap.fromTo(
      imageRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

    // Parallax on image
    gsap.to(imageRef.current.querySelector("img, .img-inner"), {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text enter from right
    const textChildren = textRef.current.children;
    gsap.fromTo(
      textChildren,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 md:px-12 py-24 md:py-0"
      style={{ background: "#050505" }}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image */}
        <div
          ref={imageRef}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <div
            className="img-inner absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: "url(/images/studio.jpg)" }}
          />
        </div>

        {/* Text */}
        <div ref={textRef}>
          <span className="text-xs uppercase tracking-[0.3em] text-[#666] block mb-6">
            Podejście
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-light text-white leading-snug mb-8">
            Nie śpimy, żebyś Ty mógł spać spokojnie.
          </h2>
          <p className="text-base leading-relaxed text-[#999] max-w-md">
            Łączymy design, technologię i marketing. Każdy projekt to
            doświadczenie które nie pozwala przejść obojętnie.
          </p>
        </div>
      </div>
    </section>
  );
}
