"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const services = ["Strony", "Kampanie Meta", "Systemy AI", "Branding"];

const rotatingWords = ["STRONY", "MARKI", "SYSTEMY", "MAGIĘ", "OBSESJE"];

const values = [
  {
    n: "01",
    title: "Obsesyjność",
    body: "Kerning, timing, mikro-animacja. Każdy piksel liczony w mikrosekundach.",
    x: "12%",
    rot: -1.5,
    tag: "[ detal ]",
  },
  {
    n: "02",
    title: "Uczciwość",
    body: "Mówimy wprost. Nawet gdy klient chciałby usłyszeć coś innego.",
    x: "28%",
    rot: 1.2,
    tag: "[ prawda ]",
  },
  {
    n: "03",
    title: "Cierpliwość",
    body: "Dobra rzecz potrzebuje czasu. Lepiej wolniej niż bylejakobyle.",
    x: "20%",
    rot: -0.8,
    tag: "[ czas ]",
  },
  {
    n: "04",
    title: "Ciekawość",
    body: "Codziennie nowe narzędzie, biblioteka, technika. Bezsenność ma swoje plusy.",
    x: "32%",
    rot: 1.8,
    tag: "[ głód ]",
  },
];

const nightShift = [
  { time: "23:47", event: "Pomysł", side: "left" as const, note: "— jedno zdanie na serwetce" },
  { time: "01:20", event: "Pierwszy szkic", side: "right" as const, note: "— wireframe w notatniku" },
  { time: "02:45", event: "Kawa numer trzy", side: "left" as const, note: "— bez cukru, żeby myśleć" },
  { time: "04:10", event: "Deployment", side: "right" as const, note: "— first commit: let there be light" },
  { time: "05:58", event: "Gotowe", side: "left" as const, note: "— wschód słońca, my do snu" },
];

function useLiveTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function ONasPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const interlude1Ref = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const negativesRef = useRef<HTMLDivElement>(null);
  const kodeksRef = useRef<HTMLDivElement>(null);
  const rotatingRef = useRef<HTMLDivElement>(null);
  const rotatingSlotRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const finalThoughtRef = useRef<HTMLDivElement>(null);
  const finalQuoteRef = useRef<HTMLParagraphElement>(null);

  // CTA refs
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaPinRef = useRef<HTMLDivElement>(null);
  const ctaCountdownRef = useRef<HTMLDivElement>(null);
  const ctaOverlayRef = useRef<HTMLDivElement>(null);
  const ctaGlowRef = useRef<HTMLDivElement>(null);
  const ctaWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const ctaTailRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introTimeRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const heartbeatRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const time = useLiveTime();

  useEffect(() => {
    if (!pageRef.current) return;
    const splits: SplitType[] = [];

    const ctx = gsap.context(() => {
      // ═ Scroll progress ═
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }

      // ═ INTRO LOADER — "03:00" morfuje do zegara w rogu ═
      if (introRef.current && introTimeRef.current) {
        const introTl = gsap.timeline({
          onComplete: () => setIntroDone(true),
        });
        introTl
          .from(introTimeRef.current.querySelectorAll(".intro-char"), {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          })
          .from(
            introTimeRef.current.querySelector(".intro-label"),
            { opacity: 0, y: -10, duration: 0.4 },
            "-=0.3"
          )
          .to({}, { duration: 1.2 })
          .to(introTimeRef.current, {
            scale: 0.12,
            x: () => window.innerWidth * 0.42,
            y: () => -window.innerHeight * 0.42,
            opacity: 0,
            duration: 0.9,
            ease: "power3.inOut",
          })
          .to(
            introRef.current,
            { opacity: 0, duration: 0.5, ease: "power2.inOut" },
            "-=0.5"
          );
      }

      // ═ Hero heartbeat pulse (purple glow oddycha) ═
      if (heartbeatRef.current) {
        gsap.to(heartbeatRef.current, {
          scale: 1.12,
          opacity: 0.9,
          duration: 0.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // ═ HERO split ═
      if (heroHeadingRef.current) {
        const split = new SplitType(heroHeadingRef.current, { types: "chars" });
        splits.push(split);
        gsap.set(split.chars, { y: "110%", opacity: 0 });
        gsap.to(split.chars, {
          y: "0%",
          opacity: 1,
          stagger: 0.045,
          duration: 0.95,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // ═ Interlude NOC horizontal drift ═
      const interWord = interlude1Ref.current?.querySelector(".interlude-word");
      if (interWord) {
        gsap.fromTo(
          interWord,
          { xPercent: 10 },
          {
            xPercent: -60,
            ease: "none",
            scrollTrigger: {
              trigger: interlude1Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // ═ Marquee ═
      const marqueeTrack = servicesRef.current?.querySelector(".marquee-track");
      if (marqueeTrack) {
        gsap.to(marqueeTrack, {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }

      // ═ 02 heading char stagger ═
      const servicesHeading = servicesRef.current?.querySelector(
        ".ch-heading"
      ) as HTMLElement | null;
      if (servicesHeading) {
        const split = new SplitType(servicesHeading, { types: "chars" });
        splits.push(split);
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ═ Czego nie robimy — scattered lines ═
      const negLines = negativesRef.current?.querySelectorAll(".neg-line");
      negLines?.forEach((line, i) => {
        const dir = i % 2 === 0 ? -160 : 160;
        gsap.fromTo(
          line,
          { opacity: 0, x: dir, rotate: i % 2 === 0 ? -3 : 3 },
          {
            opacity: 1,
            x: 0,
            rotate: (line as HTMLElement).dataset.rot
              ? parseFloat((line as HTMLElement).dataset.rot!)
              : 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ═ Kodeks — scattered lines with direction ═
      const kodeksLines = kodeksRef.current?.querySelectorAll(".kodeks-line");
      kodeksLines?.forEach((line, i) => {
        const dir = i % 2 === 0 ? -200 : 200;
        gsap.fromTo(
          line,
          { opacity: 0, x: dir, rotate: i === 1 ? 2 : -1 },
          {
            opacity: 1,
            x: 0,
            rotate: (line as HTMLElement).dataset.rot
              ? parseFloat((line as HTMLElement).dataset.rot!)
              : 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ═ Rotating word pinned cycle — wolniej + hold na OBSESJE ═
      if (rotatingRef.current && rotatingSlotRef.current) {
        const slot = rotatingSlotRef.current;
        const words = slot.querySelectorAll(".rw");
        const n = words.length;
        if (n > 0) {
          const pinDuration = window.innerHeight * 4; // 400vh — wolniejsze przewijanie
          ScrollTrigger.create({
            trigger: rotatingRef.current,
            start: "top top",
            end: `+=${pinDuration}`,
            pin: true,
            pinSpacing: true,
          });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rotatingRef.current,
              start: "top top",
              end: `+=${pinDuration}`,
              scrub: 1.5,
            },
          });
          for (let i = 0; i < n - 1; i++) {
            tl.to(slot, {
              yPercent: -((i + 1) * 100),
              duration: 1.2,
              ease: "power2.inOut",
            });
          }
          // Hold na ostatnim słowie (OBSESJE) — zostaje widoczne do końca pinu
          tl.to(slot, {
            yPercent: -((n - 1) * 100),
            duration: 1.5,
          });
        }
      }

      // ═ Timeline entries ═
      const entries = timelineRef.current?.querySelectorAll(".tl-entry");
      if (entries?.length) {
        entries.forEach((entry) => {
          const side = (entry as HTMLElement).dataset.side;
          gsap.fromTo(
            entry,
            { opacity: 0, x: side === "left" ? -80 : 80 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
      const line = timelineRef.current?.querySelector(".tl-line") as HTMLElement | null;
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              end: "bottom 55%",
              scrub: true,
            },
          }
        );
      }

      // ═ Wartości scattered cards ═
      const valueCards = valuesRef.current?.querySelectorAll(".value-card");
      valueCards?.forEach((card, i) => {
        const dir = i % 2 === 0 ? -100 : 100;
        const finalRot = parseFloat((card as HTMLElement).dataset.rot || "0");
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, x: dir, rotate: finalRot - 5 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotate: finalRot,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ═ Ostatnia myśl scale ═
      if (finalThoughtRef.current && finalQuoteRef.current) {
        gsap.fromTo(
          finalQuoteRef.current,
          { scale: 0.65, opacity: 0.25, letterSpacing: "0.15em" },
          {
            scale: 1,
            opacity: 1,
            letterSpacing: "-0.02em",
            ease: "none",
            scrollTrigger: {
              trigger: finalThoughtRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // ═══════════════════════════════════════════════
      // ═ CTA — WIELOFAZOWY REVEAL ═
      // ═══════════════════════════════════════════════
      if (
        ctaSectionRef.current &&
        ctaPinRef.current &&
        ctaOverlayRef.current &&
        ctaCountdownRef.current &&
        ctaGlowRef.current &&
        ctaButtonRef.current &&
        ctaTailRef.current
      ) {
        // Stan początkowy
        gsap.set(ctaOverlayRef.current, { clipPath: "inset(0 0 0 0)" });
        gsap.set(ctaGlowRef.current, { scale: 0.3, opacity: 0 });
        ctaWordRefs.current.forEach((w) => {
          if (!w) return;
          gsap.set(w, { opacity: 0 });
        });
        gsap.set(ctaButtonRef.current, { opacity: 0, scale: 0.85 });
        gsap.set(ctaTailRef.current, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top top",
            end: "+=" + window.innerHeight * 2.2,
            scrub: 1,
            pin: ctaPinRef.current,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // Faza 1 — odliczanie (widoczne 0-15%)
        tl.to(ctaCountdownRef.current, { opacity: 1, duration: 0.05 }, 0);
        tl.to(ctaCountdownRef.current, { opacity: 0, duration: 0.05 }, 0.2);

        // Faza 2 — overlay kurczy się (clip-path circle) + glow pulsuje
        tl.to(
          ctaOverlayRef.current,
          {
            clipPath: "inset(50% 50% 50% 50%)",
            duration: 0.25,
            ease: "power3.inOut",
          },
          0.15
        );
        tl.to(
          ctaGlowRef.current,
          { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
          0.2
        );

        // Faza 3 — słowa wlatują z różnych kierunków z rotacją
        const wordAnims = [
          { fromX: -500, fromY: -180, fromRot: -12, delay: 0.45 },
          { fromX: 400, fromY: -140, fromRot: 10, delay: 0.5 },
          { fromX: -350, fromY: 200, fromRot: 8, delay: 0.55 },
          { fromX: 450, fromY: 180, fromRot: -14, delay: 0.6 },
        ];
        ctaWordRefs.current.forEach((w, i) => {
          if (!w || !wordAnims[i]) return;
          const a = wordAnims[i];
          tl.fromTo(
            w,
            { opacity: 0, x: a.fromX, y: a.fromY, rotate: a.fromRot, scale: 1.3 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.3,
              ease: "power3.out",
            },
            a.delay
          );
        });

        // Faza 4 — przycisk i email
        tl.to(
          ctaButtonRef.current,
          { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(1.6)" },
          0.88
        );
        tl.to(
          ctaTailRef.current,
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          0.95
        );
      }

      // ═ Parallax numerów ═
      const chapters = pageRef.current!.querySelectorAll(".chapter-no");
      chapters.forEach((ch) => {
        gsap.to(ch, {
          y: -140,
          ease: "none",
          scrollTrigger: {
            trigger: ch,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, pageRef);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  // ═ Mouse spotlight — fioletowa aureola podąża za kursorem (tylko gdy hero widoczny) ═
  useEffect(() => {
    const spot = spotlightRef.current;
    const hero = heroSectionRef.current;
    if (!spot || !hero) return;

    let visible = true;
    const onMove = (e: MouseEvent) => {
      if (!visible) return;
      gsap.to(spot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.7,
        ease: "power2.out",
      });
    };
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight * 0.6;
      if (inView !== visible) {
        visible = inView;
        gsap.to(spot, {
          opacity: inView ? 1 : 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative w-full overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1a1a1a 0%, #141414 20%, #0f0f0f 50%, #0a0a0a 75%, #050505 100%)",
        color: "#ffffff",
      }}
    >
      {/* ══ NAVBAR ══ */}
      <Navbar />

      {/* ══ INTRO LOADER — "03:00" morfuje do zegara ══ */}
      <div
        ref={introRef}
        className="fixed inset-0 z-[60] flex items-center justify-center"
        style={{
          background: "#050505",
          pointerEvents: introDone ? "none" : "auto",
        }}
      >
        <div
          ref={introTimeRef}
          className="text-center"
          style={{ transformOrigin: "center center" }}
        >
          <span
            className="intro-label block uppercase mb-4"
            style={{
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "#555",
            }}
          >
            Czas warszawski · noc
          </span>
          <div
            className="font-mono flex items-center justify-center"
            style={{
              fontSize: "clamp(80px, 16vw, 240px)",
              color: "#8b5cf6",
              letterSpacing: "0.1em",
              fontFeatureSettings: '"tnum"',
              lineHeight: 1,
            }}
          >
            <span className="intro-char inline-block">0</span>
            <span className="intro-char inline-block">3</span>
            <span
              className="intro-char inline-block"
              style={{ animation: "intro-blink 0.9s steps(2) infinite" }}
            >
              :
            </span>
            <span className="intro-char inline-block">0</span>
            <span className="intro-char inline-block">0</span>
            <span
              className="inline-block ml-3"
              style={{
                width: "0.08em",
                height: "0.9em",
                background: "#8b5cf6",
                animation: "intro-blink 0.6s steps(2) infinite",
              }}
            />
          </div>
          <span
            className="block uppercase mt-6 italic"
            style={{
              fontSize: "13px",
              letterSpacing: "0.2em",
              color: "#777",
            }}
          >
            — Bezsenność, załoga nocna.
          </span>
        </div>
      </div>

      {/* ══ Mouse spotlight — fioletowa aureola w hero ══ */}
      <div
        ref={spotlightRef}
        className="fixed pointer-events-none z-30"
        style={{
          top: 0,
          left: 0,
          width: "520px",
          height: "520px",
          marginLeft: "-260px",
          marginTop: "-260px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.08) 30%, transparent 60%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />

      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 w-px h-screen z-40 pointer-events-none"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div
          ref={progressRef}
          className="w-full h-full origin-top"
          style={{
            background:
              "linear-gradient(180deg, #8b5cf6 0%, rgba(139,92,246,0.3) 100%)",
          }}
        />
      </div>

      {/* Zegar — przesunięty pod navbar */}
      <div
        className="fixed right-6 z-40 pointer-events-none select-none hidden md:block"
        style={{ top: "130px", fontFeatureSettings: '"tnum"' }}
      >
        <div
          className="uppercase mb-1"
          style={{ color: "#555", fontSize: "10px", letterSpacing: "0.35em" }}
        >
          Czas warszawski
        </div>
        <div
          style={{
            color: "#8b5cf6",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.2em",
          }}
        >
          {time || "--:--:--"}
        </div>
      </div>

      {/* ╔═ 01 — MANIFEST ═╗ */}
      <section
        ref={heroSectionRef}
        className="relative h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Pulsujący heartbeat glow za tekstem */}
        <div
          ref={heartbeatRef}
          className="absolute pointer-events-none origin-center"
          style={{
            width: "min(80vw, 900px)",
            height: "min(80vw, 900px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.07) 35%, transparent 65%)",
            filter: "blur(60px)",
            opacity: 0.6,
          }}
        />

        <span
          className="chapter-no absolute top-[8vh] left-4 md:left-12 pointer-events-none select-none"
          style={{
            fontSize: "clamp(180px, 30vw, 500px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(255,255,255,0.035)",
            letterSpacing: "-0.04em",
          }}
        >
          01
        </span>

        {/* Mrugające gwiazdki rozsypane po hero */}
        <span
          className="star absolute top-[22vh] right-[12vw] text-[#8b5cf6] select-none pointer-events-none"
          style={{ fontSize: "48px", transform: "rotate(18deg)", animationDelay: "0s" }}
        >
          ✦
        </span>
        <span
          className="star absolute bottom-[22vh] left-[14vw] text-[#8b5cf6] select-none pointer-events-none"
          style={{ fontSize: "32px", transform: "rotate(-12deg)", animationDelay: "1.4s" }}
        >
          ✦
        </span>
        <span
          className="star absolute top-[30vh] left-[10vw] text-[#8b5cf6] select-none pointer-events-none"
          style={{ fontSize: "18px", animationDelay: "0.6s" }}
        >
          ✦
        </span>
        <span
          className="star absolute bottom-[35vh] right-[18vw] text-[#8b5cf6] select-none pointer-events-none"
          style={{ fontSize: "22px", animationDelay: "2.1s" }}
        >
          ✦
        </span>
        <span
          className="star absolute top-[48vh] right-[8vw] text-[#8b5cf6] select-none pointer-events-none"
          style={{ fontSize: "14px", animationDelay: "1.1s" }}
        >
          ✦
        </span>
        <span
          className="star absolute bottom-[18vh] left-[40vw] text-[#8b5cf6] select-none pointer-events-none"
          style={{ fontSize: "12px", animationDelay: "2.8s" }}
        >
          ✦
        </span>

        <div className="relative z-10 text-center">
          <span className="block text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#666] mb-8">
            Chapter 01 — Manifest
          </span>
          <h1
            ref={heroHeadingRef}
            className="hero-heading font-black uppercase"
            style={{
              fontSize: "clamp(80px, 17vw, 280px)",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
            }}
          >
            NIE ŚPIMY.
          </h1>
          <p
            className="mt-10 text-sm md:text-base uppercase"
            style={{
              letterSpacing: "0.35em",
              color: "#999",
              transform: "rotate(-1deg)",
              display: "inline-block",
            }}
          >
            Pracujemy gdy inni śpią
          </p>
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] flex flex-col items-center gap-2"
          style={{ color: "#555" }}
        >
          <span>↓ Scroll</span>
          <span className="scroll-line inline-block w-[1px] h-8 bg-[#8b5cf6]/40" />
        </div>
      </section>

      {/* Interlude NOC */}
      <section
        ref={interlude1Ref}
        className="relative h-[90vh] flex items-center overflow-hidden"
      >
        <div
          className="interlude-word font-black uppercase whitespace-nowrap"
          style={{
            fontSize: "clamp(200px, 40vw, 700px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.25)",
            letterSpacing: "-0.04em",
            transform: "rotate(-1deg)",
          }}
        >
          NOC · NOC · NOC
        </div>
      </section>

      <div className="h-[30vh]" />

      {/* ╔═ 02 — MARQUEE ═╗ */}
      <section
        ref={servicesRef}
        className="relative py-32 md:py-56 overflow-hidden"
      >
        <span
          className="chapter-no absolute top-0 right-4 md:right-12 pointer-events-none select-none"
          style={{
            fontSize: "clamp(180px, 30vw, 500px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(139,92,246,0.045)",
            letterSpacing: "-0.04em",
          }}
        >
          02
        </span>

        {/* Heading split: 2 parts, chaotic placement */}
        <div className="relative z-10 px-6 md:px-16 mb-20 md:mb-32">
          <span className="block text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#666] mb-6">
            Chapter 02 — Co robimy
          </span>
          <div className="relative">
            <h2
              className="ch-heading font-extralight uppercase text-white"
              style={{
                fontSize: "clamp(48px, 7vw, 130px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              Narzędzia
            </h2>
            <h2
              className="font-black uppercase italic"
              style={{
                fontSize: "clamp(48px, 7vw, 130px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#8b5cf6",
                textAlign: "right",
                transform: "translateX(-6vw)",
              }}
            >
              nocy.
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden whitespace-nowrap">
          <div
            className="marquee-track inline-flex"
            style={{ willChange: "transform" }}
          >
            {[...services, ...services, ...services, ...services].map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center mr-12 md:mr-20 font-black uppercase"
                style={{
                  fontSize: "clamp(80px, 13vw, 200px)",
                  letterSpacing: "-0.02em",
                  color: i % 3 === 1 ? "transparent" : "#ffffff",
                  WebkitTextStroke: i % 3 === 1 ? "1px #8b5cf6" : "none",
                  lineHeight: 1,
                }}
              >
                {s}
                <span
                  className="ml-12 md:ml-20 inline-block rounded-full"
                  style={{
                    width: "clamp(14px, 1.8vw, 28px)",
                    height: "clamp(14px, 1.8vw, 28px)",
                    background: "#8b5cf6",
                  }}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 px-6 md:px-16 mt-20 md:mt-32 flex flex-col md:flex-row md:items-end md:justify-end gap-12 md:gap-20">
          <div className="md:w-1/2 max-w-md">
            <span
              className="block uppercase font-mono mb-4"
              style={{
                fontSize: "10px",
                letterSpacing: "0.5em",
                color: "#8b5cf6",
              }}
            >
              ◦ Proces ◦
            </span>
            <p
              className="text-base md:text-lg italic"
              style={{ color: "#999", lineHeight: 1.7 }}
            >
              Strony internetowe, kampanie Meta, systemy AI, branding. Każda
              usługa szyta w nocnej ciszy — kiedy świat śpi, a my rysujemy
              piksel po pikselu.
            </p>
          </div>
          <div
            className="md:w-1/3 flex flex-col gap-3 border-l border-[#8b5cf6]/30 pl-6"
            style={{ transform: "translateX(4vw) rotate(-1deg)" }}
          >
            <span
              className="uppercase font-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.5em",
                color: "#666",
              }}
            >
              ◦ Średni czas ◦
            </span>
            <span
              className="font-black uppercase"
              style={{
                fontSize: "clamp(32px, 4vw, 64px)",
                lineHeight: 1,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              3—6 tygodni
            </span>
            <span
              className="italic"
              style={{
                fontSize: "13px",
                color: "#777",
              }}
            >
              od briefu do wdrożenia.
            </span>
          </div>
        </div>
      </section>

      <div className="h-[40vh]" />

      {/* ╔═ CZEGO NIE ROBIMY — rozsypane ═╗ */}
      <section
        ref={negativesRef}
        className="relative py-32 md:py-56 px-6 md:px-16 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="block text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#666] mb-16">
            Interlude — czego nie robimy
          </span>

          {/* Row 1 */}
          <div className="flex items-baseline gap-6 mb-6 md:mb-10">
            <span
              className="text-[#666] font-mono"
              style={{ fontSize: "12px", letterSpacing: "0.3em" }}
            >
              [—]
            </span>
            <div
              className="neg-line font-extralight uppercase"
              data-rot="-1"
              style={{
                fontSize: "clamp(32px, 5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Nie robimy
            </div>
          </div>
          <div className="flex items-end gap-6 md:gap-10 mb-14 md:mb-24">
            <div
              className="neg-line font-black uppercase"
              data-rot="-1"
              style={{
                fontSize: "clamp(64px, 11vw, 180px)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                marginLeft: "14vw",
              }}
            >
              tanio.
            </div>
            <div
              className="hidden md:block italic ml-auto max-w-[220px]"
              style={{
                fontSize: "14px",
                color: "#777",
                lineHeight: 1.5,
                transform: "rotate(-2deg) translateY(-1.5vw)",
                borderLeft: "1px solid #8b5cf6",
                paddingLeft: "14px",
              }}
            >
              — taniocha to droga w jedną stronę. Wybieramy inną.
            </div>
          </div>

          {/* Row 2 — right */}
          <div
            className="flex items-baseline justify-end gap-6 mb-6 md:mb-10"
            style={{ marginRight: "4vw" }}
          >
            <div
              className="neg-line font-extralight uppercase text-right"
              data-rot="2"
              style={{
                fontSize: "clamp(32px, 5vw, 80px)",
                lineHeight: 0.95,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Nie robimy
            </div>
            <span
              className="text-[#666] font-mono"
              style={{ fontSize: "12px", letterSpacing: "0.3em" }}
            >
              [—]
            </span>
          </div>
          <div className="flex items-end gap-6 md:gap-10 mb-14 md:mb-24 justify-end">
            <div
              className="hidden md:block italic max-w-[240px]"
              style={{
                fontSize: "14px",
                color: "#777",
                lineHeight: 1.5,
                transform: "rotate(1.5deg) translateY(-2vw)",
                borderRight: "1px solid #8b5cf6",
                paddingRight: "14px",
                textAlign: "right",
                marginLeft: "6vw",
              }}
            >
              niech się spieszą ci, którzy nie wiedzą co robią —
            </div>
            <div
              className="neg-line font-black uppercase text-right"
              data-rot="1.5"
              style={{
                fontSize: "clamp(64px, 11vw, 180px)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "transparent",
                WebkitTextStroke: "1px #ffffff",
                marginRight: "16vw",
              }}
            >
              szybko.
            </div>
          </div>

          {/* Row 3 */}
          <div
            className="flex items-baseline gap-6 mb-6 md:mb-10"
            style={{ marginLeft: "18vw" }}
          >
            <span
              className="text-[#666] font-mono"
              style={{ fontSize: "12px", letterSpacing: "0.3em" }}
            >
              [—]
            </span>
            <div
              className="neg-line font-extralight uppercase"
              data-rot="-1.5"
              style={{
                fontSize: "clamp(32px, 5vw, 80px)",
                lineHeight: 0.95,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Nie robimy
            </div>
          </div>
          <div className="flex items-end gap-6 md:gap-10 mb-16 md:mb-28">
            <div
              className="neg-line font-black uppercase"
              data-rot="-0.5"
              style={{
                fontSize: "clamp(64px, 11vw, 180px)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                marginLeft: "16vw",
              }}
            >
              średnio.
            </div>
            <div
              className="hidden md:flex flex-col gap-2 ml-auto mr-[4vw]"
              style={{
                transform: "translateY(-2vw)",
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.4em",
                  color: "#8b5cf6",
                }}
              >
                [ Error 404 ]
              </span>
              <span
                className="italic"
                style={{
                  fontSize: "14px",
                  color: "#777",
                  lineHeight: 1.5,
                  maxWidth: "200px",
                  transform: "rotate(-1deg)",
                }}
              >
                średnio nie zostaje w pamięci
              </span>
            </div>
          </div>

          {/* Hit line — centered, purple, larger */}
          <div
            className="neg-line font-black uppercase text-center"
            data-rot="0"
            style={{
              fontSize: "clamp(80px, 13vw, 220px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "#8b5cf6",
            }}
          >
            Robimy dobrze.
          </div>
        </div>
      </section>

      <div className="h-[40vh]" />

      {/* ╔═ 03 — KODEKS (rozsypane) ═╗ */}
      <section
        ref={kodeksRef}
        className="relative py-32 md:py-56 px-6 md:px-16 overflow-hidden"
      >
        <span
          className="chapter-no absolute top-8 left-4 md:left-12 pointer-events-none select-none"
          style={{
            fontSize: "clamp(180px, 30vw, 500px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(255,255,255,0.035)",
            letterSpacing: "-0.04em",
          }}
        >
          03
        </span>

        {/* Pionowy label na prawej krawędzi */}
        <div
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg) translateY(50%)",
          }}
        >
          <span
            className="uppercase font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "#8b5cf6",
            }}
          >
            Codex · MMXXVI
          </span>
          <span
            className="uppercase"
            style={{
              fontSize: "9px",
              letterSpacing: "0.4em",
              color: "#444",
            }}
          >
            Bezsenność · internal
          </span>
        </div>

        {/* Dekoratory po prawej */}
        <span
          className="absolute top-[30%] right-[8vw] text-[#8b5cf6]/30 select-none hidden md:block"
          style={{ fontSize: "56px", transform: "rotate(24deg)" }}
        >
          ✦
        </span>
        <span
          className="absolute bottom-[25%] right-[14vw] text-[#8b5cf6]/20 select-none hidden md:block"
          style={{ fontSize: "80px", transform: "rotate(-14deg)" }}
        >
          ✦
        </span>
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="block text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#666] mb-16 md:mb-24">
            Chapter 03 — Kodeks
          </span>

          {/* Line 1 — ZERO (left huge), KOMPROMISÓW (right offset) + whisper prawy */}
          <div className="mb-20 md:mb-32 relative">
            <div className="flex items-start gap-8">
              <div
                className="kodeks-line font-black uppercase"
                data-rot="-1"
                style={{
                  fontSize: "clamp(72px, 14vw, 260px)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.04em",
                  color: "#ffffff",
                  marginLeft: "10vw",
                }}
              >
                Zero.
              </div>
              <div
                className="hidden md:flex flex-col gap-2 ml-auto mr-[10vw] pt-6"
                style={{ maxWidth: "260px" }}
              >
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.4em",
                    color: "#8b5cf6",
                  }}
                >
                  [ Artykuł I ]
                </span>
                <p
                  className="italic"
                  style={{
                    fontSize: "15px",
                    color: "#888",
                    lineHeight: 1.55,
                    transform: "rotate(-1deg)",
                  }}
                >
                  żadnego &bdquo;wystarczy&rdquo;. Żadnego &bdquo;jakoś to&rdquo;.
                </p>
              </div>
            </div>
            <div
              className="kodeks-line font-extralight uppercase"
              data-rot="1"
              style={{
                fontSize: "clamp(32px, 5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.55)",
                marginLeft: "28vw",
                marginTop: "-2vw",
              }}
            >
              kompromisów.
            </div>
          </div>

          {/* Line 2 — DETAL (right), JAK OBSESJA (left-indent stroke) */}
          <div className="mb-20 md:mb-32" style={{ marginRight: "12vw" }}>
            <div
              className="kodeks-line font-black uppercase text-right"
              data-rot="1.5"
              style={{
                fontSize: "clamp(72px, 14vw, 260px)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                color: "transparent",
                WebkitTextStroke: "1px #8b5cf6",
              }}
            >
              Detal.
            </div>
            <div
              className="kodeks-line font-light italic"
              data-rot="-2"
              style={{
                fontSize: "clamp(28px, 4.5vw, 72px)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.7)",
                marginRight: "14vw",
                textAlign: "right",
                marginTop: "-1vw",
              }}
            >
              jak obsesja →
            </div>
          </div>

          {/* Line 3 — KAŻDY PROJEKT massive, 100% as small-caps below */}
          <div className="relative">
            <div
              className="kodeks-line font-black uppercase"
              data-rot="0.5"
              style={{
                fontSize: "clamp(80px, 15vw, 280px)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                marginLeft: "14vw",
              }}
            >
              Każdy projekt —
            </div>
            <div
              className="kodeks-line uppercase"
              data-rot="-0.5"
              style={{
                fontSize: "clamp(36px, 6vw, 100px)",
                lineHeight: 0.9,
                letterSpacing: "0.05em",
                color: "#8b5cf6",
                fontWeight: 900,
                marginLeft: "28vw",
                marginTop: "-0.5vw",
              }}
            >
              sto procent.
            </div>
            {/* Podpis-stempel po prawej */}
            <div
              className="hidden md:flex absolute bottom-0 right-0 flex-col items-end gap-2"
              style={{
                transform: "translateY(100%) rotate(-3deg)",
                paddingTop: "24px",
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.4em",
                  color: "#8b5cf6",
                }}
              >
                [ Artykuł III ]
              </span>
              <div
                className="border border-[#8b5cf6]/40 px-4 py-2 font-mono uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "#ccc",
                }}
              >
                Podpisano — załoga nocna
              </div>
              <span
                className="italic"
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "4px",
                }}
              >
                — 99% to dla innych.
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[50vh]" />

      {/* ╔═ Tworzymy [X] ═╗ */}
      <section
        ref={rotatingRef}
        className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <span
          className="absolute top-[15vh] right-[10vw] text-[#8b5cf6]/40 select-none"
          style={{ fontSize: "40px", transform: "rotate(22deg)" }}
        >
          ✦
        </span>
        <span
          className="absolute bottom-[18vh] left-[8vw] text-[#8b5cf6]/30 select-none"
          style={{ fontSize: "28px", transform: "rotate(-18deg)" }}
        >
          ✦
        </span>
        <span className="block text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#666] mb-8">
          Interlude — tworzymy
        </span>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <h3
            className="font-light uppercase"
            style={{
              fontSize: "clamp(56px, 10vw, 180px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Tworzymy
          </h3>
          <div
            className="relative overflow-hidden"
            style={{ height: "clamp(64px, 12vw, 200px)" }}
          >
            <div ref={rotatingSlotRef}>
              {rotatingWords.map((w, i) => (
                <div
                  key={i}
                  className="rw font-black uppercase"
                  style={{
                    fontSize: "clamp(56px, 10vw, 180px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "#8b5cf6",
                    height: "clamp(64px, 12vw, 200px)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ╔═ 04 — TIMELINE zigzag ═╗ */}
      <section
        ref={timelineRef}
        className="relative py-32 md:py-56 px-6 md:px-16 overflow-hidden"
      >
        <span
          className="chapter-no absolute top-8 right-4 md:right-12 pointer-events-none select-none"
          style={{
            fontSize: "clamp(180px, 30vw, 500px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(139,92,246,0.045)",
            letterSpacing: "-0.04em",
          }}
        >
          04
        </span>
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="block text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#666] mb-6">
            Chapter 04 — Nocna zmiana
          </span>
          <h2
            className="font-extralight uppercase mb-24"
            style={{
              fontSize: "clamp(40px, 6vw, 90px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Jedna noc.
            <br />
            <span style={{ marginLeft: "4vw", color: "#8b5cf6" }}>
              Jeden projekt.
            </span>
          </h2>

          <div className="relative">
            <div
              className="tl-line absolute left-1/2 -translate-x-1/2 top-2 bottom-2"
              style={{
                width: "1px",
                background:
                  "linear-gradient(180deg, transparent, #8b5cf6, transparent)",
                transformOrigin: "top",
              }}
            />
            {nightShift.map((item, i) => (
              <div
                key={i}
                data-side={item.side}
                className="tl-entry relative grid items-baseline mb-12 md:mb-20"
                style={{
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: "2rem",
                }}
              >
                {item.side === "left" ? (
                  <>
                    <div className="text-right">
                      <span
                        className="block font-light text-white"
                        style={{
                          fontSize: "clamp(22px, 3vw, 42px)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item.event}
                      </span>
                    </div>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "clamp(14px, 1.6vw, 22px)",
                        color: "#8b5cf6",
                        fontFeatureSettings: '"tnum"',
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.time}
                    </span>
                    <div className="hidden md:block">
                      <span
                        className="italic"
                        style={{
                          fontSize: "13px",
                          color: "#666",
                          transform: "rotate(-1deg)",
                          display: "inline-block",
                        }}
                      >
                        {item.note}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block text-right">
                      <span
                        className="italic"
                        style={{
                          fontSize: "13px",
                          color: "#666",
                          transform: "rotate(1deg)",
                          display: "inline-block",
                        }}
                      >
                        {item.note}
                      </span>
                    </div>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "clamp(14px, 1.6vw, 22px)",
                        color: "#8b5cf6",
                        fontFeatureSettings: '"tnum"',
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.time}
                    </span>
                    <div className="text-left">
                      <span
                        className="block font-light text-white"
                        style={{
                          fontSize: "clamp(22px, 3vw, 42px)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item.event}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[50vh]" />

      {/* ╔═ 05 — WARTOŚCI scattered cards ═╗ */}
      <section
        ref={valuesRef}
        className="relative py-32 md:py-56 px-6 md:px-16 overflow-hidden"
      >
        <span
          className="chapter-no absolute top-8 left-4 md:left-12 pointer-events-none select-none"
          style={{
            fontSize: "clamp(180px, 30vw, 500px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(255,255,255,0.035)",
            letterSpacing: "-0.04em",
          }}
        >
          05
        </span>

        {/* Pionowa szyna po prawej — numerki filarów */}
        <div
          className="hidden md:flex absolute right-6 top-32 flex-col gap-6 pointer-events-none"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          <span
            className="uppercase font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "#8b5cf6",
            }}
          >
            Filary · 01 · 02 · 03 · 04
          </span>
        </div>

        {/* Dekoratory po prawej */}
        <span
          className="absolute top-[20%] right-[6vw] text-[#8b5cf6]/25 select-none hidden md:block"
          style={{ fontSize: "64px", transform: "rotate(18deg)" }}
        >
          ✦
        </span>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-20 md:mb-32">
            <span className="block text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#666] mb-6">
              Chapter 05 — Wartości
            </span>
            <h2
              className="font-extralight uppercase"
              style={{
                fontSize: "clamp(48px, 8vw, 130px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                transform: "rotate(-1deg)",
                display: "inline-block",
              }}
            >
              Cztery filary.
            </h2>
          </div>

          <div className="space-y-16 md:space-y-28">
            {values.map((v) => (
              <article
                key={v.n}
                className="value-card"
                data-rot={v.rot}
                style={{
                  transform: `translateX(${v.x}) rotate(${v.rot}deg)`,
                  maxWidth: "620px",
                }}
              >
                <div
                  className="flex items-baseline gap-6 mb-4"
                  style={{
                    borderBottom: "1px solid rgba(139,92,246,0.3)",
                    paddingBottom: "14px",
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      color: "#8b5cf6",
                      fontSize: "12px",
                      letterSpacing: "0.3em",
                    }}
                  >
                    {v.n}
                  </span>
                  <h3
                    className="font-black uppercase"
                    style={{
                      fontSize: "clamp(36px, 5vw, 84px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {v.title}
                  </h3>
                  <span
                    className="ml-auto font-mono uppercase"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.35em",
                      color: "#666",
                    }}
                  >
                    {v.tag}
                  </span>
                </div>
                <p
                  className="mt-6"
                  style={{
                    color: "#a8a8a8",
                    fontSize: "clamp(16px, 1.3vw, 22px)",
                    lineHeight: 1.55,
                    maxWidth: "52ch",
                  }}
                >
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[40vh]" />

      {/* ╔═ Ostatnia myśl ═╗ */}
      <section
        ref={finalThoughtRef}
        className="relative min-h-[120vh] flex items-center justify-center px-6 py-40 overflow-hidden"
      >
        <p
          ref={finalQuoteRef}
          className="text-center italic font-light max-w-5xl"
          style={{
            fontSize: "clamp(28px, 4vw, 64px)",
            lineHeight: 1.25,
            color: "#e5e5e5",
          }}
        >
          &bdquo;Cisza w nocy to najgłośniejsza inspiracja.{" "}
          <span
            style={{
              color: "#8b5cf6",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            Tam rodzą się rzeczy,
          </span>{" "}
          które potem budzą cały dzień.&rdquo;
        </p>
      </section>

      <div className="h-[30vh]" />

      {/* ╔═ CTA — WIELOFAZOWY REVEAL (bez czarnego ogona) ═╗ */}
      <section ref={ctaSectionRef} className="relative">
        <div
          ref={ctaPinRef}
          className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        >
          {/* Glow */}
          <div
            ref={ctaGlowRef}
            className="absolute pointer-events-none origin-center z-0"
            style={{
              width: "100vw",
              height: "100vw",
              maxWidth: "1400px",
              maxHeight: "1400px",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.06) 35%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />

          {/* Countdown (Faza 1) — nad overlayem */}
          <div
            ref={ctaCountdownRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            style={{ opacity: 0 }}
          >
            <div className="text-center">
              <span
                className="block uppercase mb-4"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.5em",
                  color: "#666",
                }}
              >
                Odliczanie do finału
              </span>
              <span
                className="block font-mono"
                style={{
                  fontSize: "clamp(48px, 8vw, 140px)",
                  color: "#8b5cf6",
                  letterSpacing: "0.2em",
                  fontFeatureSettings: '"tnum"',
                }}
              >
                03:00
              </span>
            </div>
          </div>

          {/* Treść CTA */}
          <div className="relative z-10 text-center px-6">
            <div
              className="font-black uppercase"
              style={{
                fontSize: "clamp(56px, 10vw, 180px)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
              }}
            >
              <div
                className="flex flex-wrap items-baseline justify-center"
                style={{ gap: "0.25em" }}
              >
                <span
                  ref={(el) => {
                    ctaWordRefs.current[0] = el;
                  }}
                  className="inline-block"
                  style={{ color: "#ffffff" }}
                >
                  Gotowy
                </span>
                <span
                  ref={(el) => {
                    ctaWordRefs.current[1] = el;
                  }}
                  className="inline-block font-extralight italic"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  na
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-center mt-2">
                <span
                  ref={(el) => {
                    ctaWordRefs.current[2] = el;
                  }}
                  className="inline-block"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px #8b5cf6",
                  }}
                >
                  bezsenną
                </span>
                <span
                  ref={(el) => {
                    ctaWordRefs.current[3] = el;
                  }}
                  className="inline-block ml-4"
                  style={{ color: "#8b5cf6" }}
                >
                  noc?
                </span>
              </div>
            </div>

            <div
              ref={ctaButtonRef}
              className="mt-14 inline-block"
              style={{ opacity: 0 }}
            >
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center gap-4 px-10 py-5 border text-white uppercase transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  borderColor: "rgba(139,92,246,0.6)",
                }}
              >
                <span className="relative z-10">Porozmawiajmy</span>
                <span className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>

            <div
              ref={ctaTailRef}
              className="mt-14 flex flex-col items-center gap-2"
              style={{ opacity: 0 }}
            >
              <span
                className="uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.4em",
                  color: "#555",
                }}
              >
                Lub od razu
              </span>
              <a
                href="mailto:hello@studiobezsennosc.pl"
                className="uppercase hover:text-[#8b5cf6] transition-colors duration-500"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.3em",
                  color: "#999",
                }}
              >
                hello@studiobezsennosc.pl
              </a>
            </div>
          </div>

          {/* Czarna osłona (Faza 2) — kurczy się circle do zera */}
          <div
            ref={ctaOverlayRef}
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: "#050505",
              clipPath: "inset(0 0 0 0)",
            }}
          />
        </div>
      </section>

      {/* ══ Style: keyframes + hover liter ══ */}
      <style>{`
        @keyframes intro-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.9); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        .star {
          animation: twinkle 3.2s ease-in-out infinite;
          will-change: opacity, transform;
        }
        .hero-heading .char {
          display: inline-block;
          transition: color 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
          cursor: default;
        }
        .hero-heading .char:hover {
          color: #8b5cf6;
          transform: translateY(-10px) scale(1.06);
        }
        .scroll-line {
          animation: scroll-line-pulse 1.8s ease-in-out infinite;
        }
        @keyframes scroll-line-pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1.4); transform-origin: top; }
        }
      `}</style>
    </main>
  );
}
