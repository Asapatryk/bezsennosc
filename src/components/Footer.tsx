"use client";

export default function Footer() {
  return (
    <footer className="relative px-6 md:px-12 pt-20 pb-10" style={{ background: "#0a0a0a" }}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
        {/* Logo */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-white mb-3">
            Bezsenność
          </h3>
          <p className="text-sm text-[#666] leading-relaxed max-w-xs">
            Kreatywne studio cyfrowe. Design, technologia, marketing — pod jednym dachem.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-[#666] mb-4">Nawigacja</h4>
          {[
            { label: "O nas", href: "/o-nas" },
            { label: "Usługi", href: "/uslugi" },
            { label: "Kontakt", href: "/kontakt" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm text-[#999] hover:text-[#8b5cf6] transition-colors duration-500 mb-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-[#666] mb-4">Social</h4>
          <div className="flex gap-6">
            {["Instagram", "Facebook", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-sm text-[#999] hover:text-[#8b5cf6] transition-colors duration-500">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative pt-8 text-center">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <p className="text-xs text-[#666] tracking-wider">
          © 2026 Studio Bezsenność · Wszystkie prawa zastrzeżone
        </p>
        <p className="text-xs text-[#444] tracking-wider mt-2">
          Made with <span className="text-[#8b5cf6]">&#9829;</span> by Studio Bezsenność
        </p>
      </div>
    </footer>
  );
}
