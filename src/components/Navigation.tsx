"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    num: "01",
    title: "O nas",
    desc: "Poznaj zespół który nie śpi. Nasza historia, wartości i podejście do każdego projektu.",
    href: "/o-nas",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    num: "02",
    title: "Usługi",
    desc: "Strony, marketing, AI i branding — wszystko czego potrzebujesz pod jednym dachem.",
    href: "/uslugi",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  },
  {
    num: "03",
    title: "Kontakt",
    desc: "Napisz o każdej porze — nie śpimy. Odpowiadamy szybciej niż myślisz.",
    href: "/kontakt",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&q=80",
  },
];

export default function Navigation() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="navigation"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-12"
      style={{ background: "#050505" }}
    >
      <div className="max-w-7xl mx-auto">
        {links.map((link, i) => (
          <a
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            href={link.href}
            className="group relative block py-12 md:py-16 transition-all duration-700"
            style={{
              borderTop: "1px solid",
              borderImage: "linear-gradient(90deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05), transparent) 1",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Hover bg */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.04), transparent)" }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              {/* Left: number + title */}
              <div>
                <span className="text-xs text-[#8b5cf6]/40 tracking-[0.25em] block mb-2">
                  {link.num}
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                  {link.title}
                </span>
              </div>

              {/* Right: desc + image + arrow */}
              <div className="flex items-center gap-6 md:gap-10 flex-shrink-0">
                {/* Hover image thumbnail */}
                <div className="hidden lg:block overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-0 h-0 group-hover:w-32 group-hover:h-24">
                  {hovered === i && (
                    <div className="relative w-32 h-24">
                      <Image src={link.image} alt="" fill className="object-cover" unoptimized />
                    </div>
                  )}
                </div>

                <p className="hidden md:block text-sm text-[#666] max-w-[220px] leading-relaxed group-hover:text-[#999] transition-colors duration-500">
                  {link.desc}
                </p>

                <span className="text-2xl text-white/20 group-hover:text-[#8b5cf6] group-hover:translate-x-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
        {/* Bottom border */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05), transparent)" }} />
      </div>
    </section>
  );
}
