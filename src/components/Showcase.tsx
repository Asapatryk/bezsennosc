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
    image: "/images/marketing-meta.png",
    title: "Marketing Meta",
    desc: "Facebook & Instagram Ads z realnym ROI.",
    top: "55%",
    offsetX: 800,
  },
  {
    image: "/images/automatyzacja-ai.png",
    title: "Automatyzacja AI",
    desc: "Chatboty i systemy oszczędzające czas.",
    top: "35%",
    offsetX: 1600,
  },
];

// Lead (pozycja startowa pierwszego zdjęcia) i tail (ogon po ostatnim) — zero pustego tła
const LEAD_VW = 0;
const TAIL_PX = 0;
// Track: lead + ostatni offset (1600) + szerokość zdjęcia (300) + ogon
const TRACK_EXTRA_PX = 1600 + 300 + TAIL_PX;

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const trackScrollDistance = track.scrollWidth - window.innerWidth;

      // Zmierz szerokość napisu BEZSENNOŚĆ, żeby obliczyć pełny reveal
      const textEl = bgTextRef.current?.firstElementChild as HTMLElement | null;
      const textWidth = textEl ? textEl.getBoundingClientRect().width : 0;
      // Przesunięcie tak, żeby ostatnia litera mogła być widoczna na lewym brzegu viewportu
      const textRevealDistance = Math.max(0, textWidth - window.innerWidth * 0.3);

      // Długość scrolla = pełny reveal napisu + 1500px oddechu po ostatniej literze
      const scrollEnd = textRevealDistance + 1500;

      const scrollTween = gsap.to(track, {
        x: -trackScrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollEnd}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Parallax napisu — kończy się przed końcem pinu (2000px oddechu)
      if (bgTextRef.current && textRevealDistance > 0) {
        gsap.to(bgTextRef.current, {
          x: -textRevealDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${textRevealDistance}`,
            scrub: true,
          },
        });
      }

      // Fade-in dla każdego zdjęcia w horizontal scroll
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

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      {/* OGROMNY napis w tle — min 300vw, bez overflow-hidden na kontenerze */}
      <div
        ref={bgTextRef}
        className="absolute top-0 left-0 h-screen flex items-center whitespace-nowrap pointer-events-none z-0 select-none"
        style={{
          paddingLeft: "8vw",
          paddingRight: "8vw",
          minWidth: "320vw",
          overflow: "visible",
        }}
      >
        <span
          className="font-black uppercase leading-none"
          style={{
            fontSize: "30vw",
            color: "rgba(0,0,0,0.04)",
            transform: "rotate(-2deg) translateY(1.5vw)",
            transformOrigin: "left center",
            letterSpacing: "-0.03em",
            display: "inline-block",
          }}
        >
          BEZSENNOŚĆ
        </span>
      </div>

      {/* Pionowa etykieta */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10">
        <span
          className="text-xs uppercase tracking-[0.3em] text-[#666] block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Co robimy
        </span>
      </div>

      {/* Horizontal track — absolute positioning dla asymetrycznego layoutu */}
      <div
        ref={trackRef}
        className="relative h-screen z-[1]"
        style={{ width: `calc(${LEAD_VW}vw + ${TRACK_EXTRA_PX}px)` }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="absolute"
            style={{
              left: `calc(${LEAD_VW}vw + ${item.offsetX}px)`,
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
              <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-[#111]">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-[#666] tracking-wide">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
