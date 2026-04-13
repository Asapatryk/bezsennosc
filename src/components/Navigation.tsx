"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    num: "01",
    title: "O nas",
    desc: "Poznaj zespół który nie śpi. Nasza historia, wartości i podejście do każdego projektu.",
    href: "#",
    image: images.studio,
  },
  {
    num: "02",
    title: "Usługi",
    desc: "Strony, marketing, AI i branding. Wszystko czego potrzebujesz pod jednym dachem.",
    href: "#",
    image: images.work1,
  },
  {
    num: "03",
    title: "Kontakt",
    desc: "Napisz o każdej porze — nie śpimy. Odpowiadamy szybciej niż myślisz.",
    href: "#",
    image: images.texture,
  },
];

export default function Navigation() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
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
      id="navigation"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #050505 0%, #0a0515 50%, #050505 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {links.map((link, i) => (
          <a
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            href={link.href}
            className="group relative block py-10 md:py-16 transition-all duration-700"
            style={{
              borderTop: "1px solid",
              borderImage:
                "linear-gradient(90deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05), transparent) 1",
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Hover background */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "rgba(139,92,246,0.03)" }}
            />

            <div className="relative flex items-center justify-between gap-8">
              {/* Left: number + title */}
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className="text-xs md:text-sm text-[#8b5cf6]/40 tracking-[0.2em] font-light">
                  {link.num}
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                  {link.title}
                </span>
              </div>

              {/* Right: desc + image + arrow */}
              <div className="flex items-center gap-6 md:gap-10">
                {/* Hover image */}
                <div className="hidden lg:block relative overflow-hidden w-0 h-0 group-hover:w-28 group-hover:h-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {hoveredIdx === i && (
                    <Image
                      src={link.image}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>

                <span className="hidden md:block text-sm text-[#666] max-w-[200px] leading-relaxed transition-colors duration-500 group-hover:text-[#999]">
                  {link.desc}
                </span>

                <span className="text-2xl md:text-3xl text-white/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#8b5cf6] group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
        {/* Bottom border */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05), transparent)",
          }}
        />
      </div>
    </section>
  );
}
