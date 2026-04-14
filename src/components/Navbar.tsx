"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "O nas", href: "/o-nas" },
  { label: "Usługi", href: "/uslugi" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const hiddenRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (!navRef.current) return;

      if (y > lastScrollY.current && y > 120) {
        if (!hiddenRef.current) {
          hiddenRef.current = true;
          gsap.to(navRef.current, { y: -100, duration: 0.4, ease: "power2.inOut" });
        }
      } else if (y < lastScrollY.current) {
        if (hiddenRef.current) {
          hiddenRef.current = false;
          gsap.to(navRef.current, { y: 0, duration: 0.4, ease: "power2.inOut" });
        }
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Navbar zmienia motyw na jasny gdy user przechodzi przez jasną sekcję
    const attach = () => {
      const enter = document.getElementById("portal-enter");
      const exit = document.getElementById("portal-exit");
      if (!enter || !exit) return null;
      return ScrollTrigger.create({
        trigger: enter,
        start: "center top",
        endTrigger: exit,
        end: "center top",
        onToggle: (self) => setLight(self.isActive),
      });
    };
    let st = attach();
    // Spróbuj ponownie po hydracji jeśli portale jeszcze nie istnieją
    const retry = setTimeout(() => {
      if (!st) st = attach();
    }, 300);
    return () => {
      clearTimeout(retry);
      if (st) st.kill();
    };
  }, []);

  const bgClass = scrolled
    ? light
      ? "bg-[#f0f0f0]/70 backdrop-blur-md"
      : "bg-[#050505]/70 backdrop-blur-md"
    : "bg-transparent";

  const logoColor = light ? "text-[#111]" : "text-white";
  const linkColor = light
    ? "text-[#555] hover:text-[#111]"
    : "text-[#999] hover:text-white";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${bgClass}`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <a
          href="/"
          className={`text-xs uppercase tracking-widest font-bold transition-colors duration-500 ${logoColor}`}
        >
          Studio Bezsenność
        </a>

        <div className="flex items-center" style={{ gap: "32px" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs uppercase tracking-wider transition-colors duration-500 ${linkColor}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
