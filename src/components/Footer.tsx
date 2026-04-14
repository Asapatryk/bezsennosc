"use client";

const navLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "Usługi", href: "/uslugi" },
  { label: "Kontakt", href: "/kontakt" },
];

const socials = [
  { label: "IG", href: "https://instagram.com", full: "Instagram" },
  { label: "FB", href: "https://facebook.com", full: "Facebook" },
  { label: "LI", href: "https://linkedin.com", full: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative px-6 md:px-12 pt-20 pb-10" style={{ background: "#030303" }}>
      {/* Separator: gradient fioletowy → transparent */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(139,92,246,0.2), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16 items-start">
        {/* Lewa: logo + podtytuł */}
        <div>
          <h3 className="text-2xl md:text-3xl uppercase tracking-[0.1em] font-bold text-white mb-3">
            Bezsenność
          </h3>
          <p className="text-sm text-[#666] tracking-wider">Studio kreatywne</p>
        </div>

        {/* Środek: linki */}
        <nav className="flex flex-col gap-3 md:items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm tracking-wider text-[#999] hover:text-white transition-colors duration-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Prawa: ikony social */}
        <div className="flex gap-6 md:justify-end">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.full}
              target="_blank"
              rel="noreferrer"
              className="text-sm tracking-[0.25em] uppercase text-[#999] hover:text-[#8b5cf6] transition-colors duration-500"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="relative pt-8 text-center">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <p className="text-xs tracking-wider" style={{ color: "#444" }}>
          © 2026 Studio Bezsenność
        </p>
      </div>
    </footer>
  );
}
