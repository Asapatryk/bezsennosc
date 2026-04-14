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
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const imageWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Wejście: każdy wiersz fade in z translateY 30px, stagger 0.15s
      gsap.from(rowRefs.current, {
        opacity: 0,
        y: 30,
        ease: "power3.out",
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Hover — reveal zdjęcia z clip-path
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const img = imageWrapRefs.current[i];
        const title = titleRefs.current[i];
        const right = rightRefs.current[i];

        const tl = gsap.timeline({ paused: true });
        if (img) {
          tl.fromTo(
            img,
            { clipPath: "inset(50% 50% 50% 50%)", opacity: 0 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 0.4,
              duration: 0.8,
              ease: "power3.out",
            },
            0
          );
        }
        if (title) {
          tl.to(title, { x: 10, color: "#ffffff", duration: 0.5, ease: "power2.out" }, 0);
        }
        if (right) {
          tl.to(right, { x: -10, color: "#ffffff", duration: 0.5, ease: "power2.out" }, 0);
        }

        row.addEventListener("mouseenter", () => tl.play());
        row.addEventListener("mouseleave", () => tl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="navigation"
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col"
      style={{ background: "#050505" }}
    >
      {links.map((link, i) => (
        <a
          key={i}
          ref={(el) => { rowRefs.current[i] = el; }}
          href={link.href}
          className="group relative flex-1 w-full overflow-hidden flex items-center"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Zdjęcie tła — reveal na hover */}
          <div
            ref={(el) => { imageWrapRefs.current[i] = el; }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0 }}
          >
            <Image
              src={link.image}
              alt={link.title}
              fill
              className="object-cover"
              unoptimized
            />
            {/* Ciemny overlay, żeby tekst był czytelny */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Treść wiersza */}
          <div className="relative z-10 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 gap-6">
            {/* Lewa strona: numer + tytuł */}
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#444]">
                {link.num}
              </span>
              <h2
                ref={(el) => { titleRefs.current[i] = el; }}
                className="text-6xl md:text-8xl font-light uppercase tracking-tight leading-none"
                style={{ color: "#ffffff" }}
              >
                {link.title}
              </h2>
            </div>

            {/* Prawa strona: opis + strzałka */}
            <div
              ref={(el) => { rightRefs.current[i] = el; }}
              className="hidden md:flex items-center gap-6 text-sm tracking-wider"
              style={{ color: "#666" }}
            >
              <span className="max-w-xs text-right">{link.desc}</span>
              <span className="text-2xl leading-none">→</span>
            </div>
          </div>
        </a>
      ))}
    </section>
  );
}
