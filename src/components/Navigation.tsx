"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { title: "O nas", desc: "Poznaj nas", href: "#", image: "/images/studio.jpg" },
  { title: "Usługi", desc: "Zobacz co robimy", href: "#", image: "/images/work1.jpg" },
  { title: "Kontakt", desc: "Napisz do nas", href: "#", image: "/images/texture.jpg" },
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
      id="navigation"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 animated-gradient overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050505 0%, #0a0518 30%, #050510 60%, #080515 100%)",
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
            className="group relative block border-t py-10 md:py-14 transition-all duration-700"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5 text-outline-hover">
                {link.title}{" "}
                <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                  →
                </span>
              </span>

              <div className="flex items-center gap-8">
                {/* Hover image thumbnail */}
                <div className="hidden lg:block w-0 group-hover:w-32 h-20 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div
                    className="w-32 h-20 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundImage: `url(${link.image})` }}
                  />
                </div>

                <span className="hidden md:block text-sm text-[#666] tracking-wider transition-colors duration-500 group-hover:text-[#8b5cf6]/60">
                  {link.desc}
                </span>
              </div>
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
