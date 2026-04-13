"use client";

export default function Marquee() {
  const text =
    "BEZSENNOŚĆ · DESIGN · MARKETING · AI · BEZSENNOŚĆ · DESIGN · MARKETING · AI · ";

  return (
    <section
      className="py-8 overflow-hidden border-y"
      style={{
        background: "#050505",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-6xl sm:text-7xl md:text-8xl font-bold uppercase text-white/[0.04] pr-4">
          {text}
        </span>
        <span className="text-6xl sm:text-7xl md:text-8xl font-bold uppercase text-white/[0.04] pr-4">
          {text}
        </span>
      </div>
    </section>
  );
}
