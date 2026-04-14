"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const codeLabels = [
  { text: "Next.js", radius: 3.2, speed: 0.28, offset: 0.0, incl: 0.2 },
  { text: "React", radius: 3.7, speed: 0.22, offset: 1.3, incl: 0.9 },
  { text: "GSAP", radius: 3.0, speed: 0.38, offset: 2.4, incl: 0.4 },
  { text: "AI", radius: 3.9, speed: 0.18, offset: 3.1, incl: 1.3 },
  { text: "Three.js", radius: 3.4, speed: 0.33, offset: 4.0, incl: 0.7 },
  { text: "<div>", radius: 3.1, speed: 0.44, offset: 5.2, incl: 0.3 },
  { text: "const", radius: 3.8, speed: 0.26, offset: 0.8, incl: 1.1 },
  { text: "{}", radius: 3.3, speed: 0.5, offset: 3.7, incl: 0.55 },
];

function Moon() {
  const meshRef = useRef<THREE.Mesh>(null);

  const bumpTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Bazowy noise
    const imgData = ctx.createImageData(size, size);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = 128 + (Math.random() * 80 - 40);
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    // Kratery — ciemne kropki z jasnym rantem
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 28 + 4;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(0,0,0,0.7)");
      g.addColorStop(0.7, "rgba(255,255,255,0.15)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#bcbcbc"
          roughness={0.95}
          metalness={0.05}
          bumpMap={bumpTexture ?? undefined}
          bumpScale={0.12}
        />
      </mesh>
      {/* Subtelny biało-srebrny glow — imitacja bloom */}
      <mesh>
        <sphereGeometry args={[2.18, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshBasicMaterial
          color="#c8c8e0"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function OrbitingText({
  text,
  radius,
  speed,
  offset,
  incl,
}: {
  text: string;
  radius: number;
  speed: number;
  offset: number;
  incl: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t + incl) * radius * 0.35,
      Math.sin(t) * radius
    );
  });
  return (
    <group ref={ref}>
      <Billboard>
        <Text fontSize={0.3} color="#ffffff" fillOpacity={0.5} anchorX="center" anchorY="middle">
          {text}
        </Text>
      </Billboard>
    </group>
  );
}

export default function TechSphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center py-24 md:py-32 px-6"
      style={{ background: "#050505" }}
    >
      <span className="text-xs uppercase tracking-[0.4em] text-[#666] block mb-10 text-center">
        {"{ TECHNOLOGIE }"}
      </span>

      <div className="w-full max-w-5xl" style={{ height: "60vh" }}>
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 9], fov: 42 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.08} />
            <directionalLight position={[5, 2, 3]} intensity={1.8} color="#ffffff" />
            <directionalLight position={[-5, -1, -3]} intensity={0.12} color="#c0c0e0" />
            <Moon />
            {codeLabels.map((label, i) => (
              <OrbitingText
                key={i}
                text={label.text}
                radius={label.radius}
                speed={label.speed}
                offset={label.offset}
                incl={label.incl}
              />
            ))}
          </Canvas>
        )}
      </div>

      <div ref={contentRef} className="text-center max-w-2xl mx-auto mt-10">
        <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-snug">
          Narzędzia przyszłości
        </h2>
        <p className="text-base text-[#999] leading-relaxed max-w-lg mx-auto mb-10">
          Używamy technologii które sprawiają że Twoja strona wyprzedza konkurencję.
        </p>
        <a
          href="mailto:hello@studiobezsennosc.pl"
          className="inline-block px-8 py-4 text-sm uppercase tracking-[0.25em] text-white border border-purple-500 hover:bg-purple-500/10 transition-colors duration-500"
        >
          Skontaktuj się →
        </a>
        <p className="mt-6 text-sm text-[#666] tracking-wider">
          hello@studiobezsennosc.pl
        </p>
      </div>
    </section>
  );
}
