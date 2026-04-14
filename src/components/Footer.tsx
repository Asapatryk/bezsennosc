"use client";

const navLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "Usługi", href: "/uslugi" },
  { label: "Kontakt", href: "/kontakt" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21.95v-8.3h2.78l.42-3.23H13.5V8.37c0-.93.26-1.57 1.6-1.57h1.7V3.9c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.23v2.36H7.4v3.23h2.8v8.36h3.3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 4.98 8.5a2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zM9 9.5h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V20.5h-4v-4.85c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.27-1.87 2.57V20.5H9v-11z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full" style={{ background: "#0a0a0a" }}>
      {/* Kompaktowy pasek */}
      <div
        className="flex items-center justify-between gap-6"
        style={{
          padding: "18px 40px",
          minHeight: "60px",
          maxHeight: "60px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Lewa: logo */}
        <div className="text-sm font-bold uppercase tracking-widest text-white">
          Bezsenność
        </div>

        {/* Środek: linki */}
        <nav className="hidden md:flex items-center" style={{ gap: "32px" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-wider text-[#666] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Prawa: ikony social */}
        <div className="flex items-center" style={{ gap: "16px" }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noreferrer"
              className="text-[#666] hover:text-white transition-colors duration-300 flex items-center"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center" style={{ padding: "12px" }}>
        <p className="text-xs tracking-wider" style={{ color: "#444" }}>
          © 2026 Studio Bezsenność
        </p>
      </div>
    </footer>
  );
}
