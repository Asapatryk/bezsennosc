"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "hero", num: "01" },
  { id: "claim", num: "02" },
  { id: "showcase", num: "03" },
  { id: "navigation", num: "04" },
];

export default function SectionIndicator() {
  const [current, setCurrent] = useState("01");

  useEffect(() => {
    const triggers = sections.map(({ id, num }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrent(num),
        onEnterBack: () => setCurrent(num),
      });
    });

    return () => {
      triggers.forEach((st) => st?.kill());
    };
  }, []);

  return (
    <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 mix-blend-difference pointer-events-none hidden md:block">
      <span className="text-xs tracking-[0.3em] text-white/30 font-light">
        {current}
      </span>
    </div>
  );
}
