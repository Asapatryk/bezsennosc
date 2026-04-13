"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { title: "O nas", desc: "Poznaj nas", href: "#" },
  { title: "Usługi", desc: "Zobacz co robimy", href: "#" },
  { title: "Kontakt", desc: "Napisz do nas", href: "#" },
];

export default function Navigation() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
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
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ background: "#050505" }}
    >
      <div className="max-w-7xl mx-auto">
        {links.map((link, i) => (
          <a
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            href={link.href}
            className="group block border-t py-10 md:py-14 transition-all duration-500"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white transition-all duration-500 group-hover:translate-x-5 group-hover:text-[#8b5cf6]">
                {link.title}{" "}
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-3">
                  →
                </span>
              </span>
              <span className="hidden md:block text-sm text-[#666] tracking-wider transition-colors duration-500 group-hover:text-white/40">
                {link.desc}
              </span>
            </div>
          </a>
        ))}
        {/* Bottom border */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        />
      </div>
    </section>
  );
}
