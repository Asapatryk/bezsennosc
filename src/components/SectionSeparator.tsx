"use client";

interface SectionSeparatorProps {
  fromColor?: string;
  toColor?: string;
  showDots?: boolean;
}

export default function SectionSeparator({
  fromColor = "#050505",
  toColor = "#050505",
  showDots = false,
}: SectionSeparatorProps) {
  return (
    <div
      className="relative h-[120px] md:h-[150px] overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
    >
      {/* Glowing animated line */}
      <div className="glow-line absolute inset-0" />

      {/* Floating dots */}
      {showDots && (
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: "3px",
                height: "3px",
                background: `rgba(139, 92, 246, ${0.2 + Math.random() * 0.3})`,
                left: `${15 + i * 18}%`,
                top: "60%",
                animation: `floatDot ${3 + i * 0.7}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
