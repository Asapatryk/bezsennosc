"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    image: images.work1,
    title: "Strony internetowe",
    desc: "Projektujemy i kodujemy od zera — szyte na miarę, szybkie, konwertujące.",
  },
  {
    image: images.work2,
    title: "Marketing Meta",
    desc: "Kampanie Facebook & Instagram Ads które przynoszą realny zwrot z inwestycji.",
  },
  {
    image: images.studio,
    title: "Automatyzacja AI",
    desc: "Inteligentne chatboty, automatyzacje procesów i systemy oszczędzające czas.",
  },
  {
    image: images.texture,
    title: "Branding",
    desc: "Tożsamość wizualna która wyróżnia i zostaje w pamięci na długo.",
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
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
        x: -scrollWidth * 0.25,
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
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: img,
            containerAnimation: scrollTween,
            start: "left 85%",
            end: "left 40%",
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
      id="showcase"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0d0518 0%, #0a0520 30%, #080418 60%, #0d0518 100%)",
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
            background:
              "linear-gradient(90deg, rgba(139,92,246,0.06), rgba(59,130,246,0.04), rgba(139,92,246,0.06))",
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
        className="flex items-center gap-16 md:gap-24 pl-24 md:pl-40 pr-[10vw] h-screen relative z-[1]"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw]"
          >
            <div
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="relative w-full aspect-[4/3] mb-6 overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0518]/70 via-transparent to-[#0d0518]/20" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-white mb-3">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-[#999] leading-relaxed max-w-md">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
