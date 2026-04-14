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
    top: "15%",
    offsetX: 0,
  },
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    title: "Marketing Meta",
    desc: "Facebook & Instagram Ads z realnym ROI.",
    top: "55%",
    offsetX: 560,
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    title: "Automatyzacja AI",
    desc: "Chatboty i systemy oszczędzające czas.",
    top: "35%",
    offsetX: 1140,
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    title: "Branding",
    desc: "Tożsamość wizualna która zostaje w pamięci.",
    top: "10%",
    offsetX: 1720,
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          end: "+=8000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Background color transition on section entry
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#050505" },
        {
          backgroundColor: "#0d0518",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      // Background giant text — reveal reszta napisu podczas scrollowania
      if (bgTextRef.current) {
        const textEl = bgTextRef.current.firstElementChild as HTMLElement | null;
        const textWidth = textEl ? textEl.getBoundingClientRect().width : 0;
        const revealDistance = Math.max(0, textWidth - window.innerWidth * 0.6);
        gsap.to(bgTextRef.current, {
          x: -revealDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=8000",
            scrub: true,
          },
        });
      }

      // Fade-in reveal for each image+caption
      itemRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              containerAnimation: scrollTween,
              start: "left 95%",
              end: "left 55%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const trackExtraPx = 1720 + 300 + 600; // last offset + image width + tail padding

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Giant asymmetric background text */}
      <div
        ref={bgTextRef}
        className="absolute top-0 left-0 h-screen flex items-center whitespace-nowrap pointer-events-none z-0 select-none"
        style={{ paddingLeft: "8vw" }}
      >
        <span
          className="font-black uppercase leading-none"
          style={{
            fontSize: "45vw",
            color: "rgba(255,255,255,0.04)",
            transform: "rotate(-2deg) translateY(2vw)",
            transformOrigin: "left center",
            letterSpacing: "-0.03em",
            display: "inline-block",
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

      {/* Horizontal track — absolute positioning for asymmetric layout */}
      <div
        ref={trackRef}
        className="relative h-screen z-[1]"
        style={{ width: `calc(15vw + ${trackExtraPx}px)` }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="absolute"
            style={{
              left: `calc(15vw + ${item.offsetX}px)`,
              top: item.top,
              width: "300px",
            }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "25vh", maxHeight: "25vh" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-4 flex items-baseline gap-3 whitespace-nowrap">
              <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-[#999] tracking-wide">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
