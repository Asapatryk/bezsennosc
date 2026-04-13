"use client";

export default function Footer() {
  return (
    <footer className="relative px-6 md:px-12 pt-20 pb-10" style={{ background: "#0a0a0a" }}>
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
        {/* Logo */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-white mb-2">
            Bezsenność
          </h3>
          <p className="text-sm text-[#666]">Studio kreatywne</p>
        </div>

        {/* Contact */}
        <div>
          <a
            href="mailto:hello@studiobezsennosc.pl"
            className="block text-sm text-[#999] hover:text-[#8b5cf6] transition-colors duration-500 mb-2"
          >
            hello@studiobezsennosc.pl
          </a>
          <a
            href="tel:+48000000000"
            className="block text-sm text-[#999] hover:text-[#8b5cf6] transition-colors duration-500"
          >
            +48 000 000 000
          </a>
        </div>

        {/* Social */}
        <div className="flex gap-6 md:justify-end">
          {["Instagram", "Facebook", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-sm text-[#999] hover:text-[#8b5cf6] transition-colors duration-500"
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative pt-8 text-center">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <p className="text-xs text-[#666] tracking-wider">
          © 2026 Studio Bezsenność · Wszystkie prawa zastrzeżone
        </p>
      </div>
    </footer>
  );
}
