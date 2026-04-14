"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    num: "01",
    title: "O nas",
    desc: "Poznaj zespół który nie śpi",
    href: "/o-nas",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
  },
  {
    num: "02",
    title: "Usługi",
    desc: "Strony, marketing, AI, branding",
    href: "/uslugi",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&q=80",
  },
  {
    num: "03",
    title: "Kontakt",
    desc: "Napisz o każdej porze",
    href: "/kontakt",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80",
  },
];

export default function Navigation() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      imageRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
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
      className="relative"
      style={{ background: "#050505" }}
    >
      {links.map((link, i) => (
        <a
          key={i}
          ref={(el) => {
            blockRefs.current[i] = el;
          }}
          href={link.href}
          className="group relative block h-screen w-full overflow-hidden"
        >
          {/* Image background with clip-path reveal */}
          <div
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0"
          >
            <Image
              src={link.image}
              alt={link.title}
              fill
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              unoptimized
            />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-700" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/50 mb-6">
              {link.num}
            </span>
            <h2 className="text-[15vw] leading-[0.9] font-bold uppercase tracking-wide text-white transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
              {link.title}
            </h2>
            <p className="mt-6 text-sm md:text-base text-[#999] tracking-wider uppercase">
              {link.desc}
            </p>
            <span className="mt-10 text-2xl text-white/30 group-hover:text-[#8b5cf6] group-hover:translate-y-1 transition-all duration-700">
              ↓
            </span>
          </div>

          {/* Bottom line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent" />
        </a>
      ))}
    </section>
  );
}
