"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    image: "/images/work1.jpg",
    title: "Strony internetowe",
    desc: "Projektujemy i kodujemy od zera",
  },
  {
    image: "/images/work2.jpg",
    title: "Marketing Meta",
    desc: "Facebook & Instagram Ads",
  },
  {
    image: "/images/studio.jpg",
    title: "Automatyzacja AI",
    desc: "Inteligentne systemy i chatboty",
  },
  {
    image: "/images/texture.jpg",
    title: "Branding",
    desc: "Tożsamość wizualna marki",
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth;

    // Horizontal scroll
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

    // Clip-path reveal for each image
    imageRefs.current.forEach((img) => {
      if (!img) return;
      gsap.fromTo(
        img,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: img,
            containerAnimation: scrollTween,
            start: "left 80%",
            end: "left 30%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Vertical label */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10">
        <span
          className="text-xs uppercase tracking-[0.3em] text-[#666] block"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Co robimy
        </span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-16 md:gap-24 pl-24 md:pl-40 pr-20 h-screen"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[70vw] md:w-[45vw] lg:w-[35vw]"
          >
            <div
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="relative w-full aspect-[4/3] bg-cover bg-center mb-6"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              {/* Dark gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-[#666] tracking-wider">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
