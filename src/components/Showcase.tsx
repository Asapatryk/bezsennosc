"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    title: "Strony internetowe",
    desc: "Szyte na miarę, szybkie, konwertujące.",
    alignSelf: "flex-start",
    marginTop: "8vh",
  },
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    title: "Marketing Meta",
    desc: "Facebook & Instagram Ads z realnym ROI.",
    alignSelf: "flex-end",
    marginTop: "0",
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    title: "Automatyzacja AI",
    desc: "Chatboty i systemy oszczędzające czas.",
    alignSelf: "flex-start",
    marginTop: "12vh",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    title: "Branding",
    desc: "Tożsamość wizualna która zostaje w pamięci.",
    alignSelf: "flex-end",
    marginTop: "0",
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Background text parallax
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          x: -scrollWidth * 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: true,
          },
        });
      }

      // Clip-path reveal
      imageRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: img,
              containerAnimation: scrollTween,
              start: "left 90%",
              end: "left 45%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d0518 0%, #0a0520 40%, #0d0518 100%)",
      }}
    >
      {/* Giant background text */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-[5vw] whitespace-nowrap pointer-events-none z-0 select-none"
      >
        <span
          className="text-[25vw] font-black uppercase leading-none"
          style={{
            background: "linear-gradient(90deg, rgba(139,92,246,0.08), rgba(59,130,246,0.06), rgba(139,92,246,0.08))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          BEZSENNOŚĆ
        </span>
      </div>

      {/* Vertical label */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10">
        <span
          className="text-xs uppercase tracking-[0.3em] text-[#8b5cf6]/40 block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Co robimy
        </span>
      </div>

      {/* Horizontal track — asymmetric via padding */}
      <div
        ref={trackRef}
        className="flex items-center gap-14 md:gap-20 pl-24 md:pl-40 pr-[15vw] h-screen relative z-[1]"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[70vw] sm:w-[50vw] md:w-[32vw] lg:w-[26vw]"
            style={{
              alignSelf: item.alignSelf as "flex-start" | "flex-end",
              marginTop: item.marginTop,
              paddingBottom: item.alignSelf === "flex-end" ? "8vh" : "0",
            }}
          >
            <div
              ref={(el) => { imageRefs.current[i] = el; }}
              className="relative w-full overflow-hidden"
              style={{ height: "36vh", maxHeight: "380px" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0518]/50 to-transparent" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white mt-5 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-[#999] tracking-wide">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
