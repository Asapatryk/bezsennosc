"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (!navRef.current) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down — hide
        if (!hidden.current) {
          hidden.current = true;
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.4,
            ease: "power2.inOut",
          });
        }
      } else {
        // Scrolling up — show
        if (hidden.current) {
          hidden.current = false;
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <span className="text-sm uppercase tracking-[0.3em] font-bold text-white">
          Bezsenność
        </span>
        <button className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300">
          Menu
        </button>
      </div>
    </nav>
  );
}
