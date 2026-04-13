"use client";

export default function Marquee() {
  const text =
    "BEZSENNOŚĆ · DESIGN · MARKETING · AI · BEZSENNOŚĆ · DESIGN · MARKETING · AI · ";

  return (
    <section
      className="py-10 overflow-hidden border-y"
      style={{
        background: "#050505",
        borderColor: "rgba(139, 92, 246, 0.08)",
      }}
    >
      <div className="animate-marquee whitespace-nowrap flex">
        {[0, 1].map((k) => (
          <span
            key={k}
            className="text-6xl sm:text-7xl md:text-8xl font-bold uppercase pr-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(139,92,246,0.08), rgba(59,130,246,0.06), rgba(139,92,246,0.08))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
