"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   Dane — cenniki, treści kart
   ═══════════════════════════════════════════════════ */

const cards = [
  {
    id: "strony",
    no: "01",
    label: "Strony internetowe",
    headline: "Cyfrowe biuro.\nOtwarte 24/7.",
    intro:
      "Strona internetowa to pierwszy dotyk z Twoją marką. Miejsce, gdzie decyzja o zakupie zapada szybciej niż Ty zdążysz wypić kawę. Dlatego każdy piksel, każdy milisekund czasu ładowania, każde zdanie w nagłówku — ma znaczenie.",
    body: [
      "Projektujemy strony, które nie tylko dobrze wyglądają — konwertują. Budujemy je z myślą o celu biznesowym, nie o trendach. Strona ma sprzedawać, budować zaufanie, generować leady — a nie tylko wypełniać internet.",
      "Pracujemy z Next.js, TypeScript i nowoczesnym CSS. Każda strona ma Core Web Vitals w zielonym, działa na mobile, indexuje się w Google i nie wymaga płacenia za licencje. Kod jest Twój — hosting w dowolnym miejscu.",
      "Każdy projekt zaczyna się od briefu — nie od Photoshopa. Rozumiemy Twój biznes, definiujemy cel strony, mapujemy ścieżkę użytkownika. Potem projektujemy UI, budujemy frontend, wdrażamy CMS i oddajemy gotowy produkt z dokumentacją.",
    ],
    features: [
      { v: "100/100", l: "Core Web Vitals" },
      { v: "< 2s", l: "Ładowanie" },
      { v: "Mobile first", l: "Zawsze" },
      { v: "CMS", l: "Edytowalny" },
    ],
    packages: [
      {
        name: "Landing page",
        price: "od 1 600 zł",
        hook: "Jedna strona. Jeden cel. Prosta matematyka.",
        desc:
          "Najszybszy sposób, żeby zamienić ruch z reklam Meta czy Google Ads w zapisy, zakupy albo telefony. Bez menu, bez bloga, bez dystraktorów — tylko jedna, jasna ścieżka do celu. Idealne pod konkretną ofertę, pojedynczy produkt albo zapisy na webinar.",
        includes: [
          "Projekt UX i UI pod jeden konkretny cel biznesowy",
          "Sekcje: hero, korzyści, dowody społeczne, CTA, FAQ",
          "Formularz kontaktowy z integracją mailową (lub CRM)",
          "Podstawowe SEO — meta tagi, alt, schema.org, sitemap",
          "Ładowanie poniżej 2s na desktopie, mobile-first",
          "Pixel Meta + Google Analytics 4 + Conversions API",
        ],
        effects: [
          "Średnio 2–3× wyższa konwersja niż z rozproszonej strony głównej",
          "Mierzalny ROI — wiesz dokładnie, ile kosztuje Cię jeden lead",
          "Gotowa pod kampanie Meta/Google — spójny przekaz",
        ],
      },
      {
        name: "Strona firmowa",
        price: "od 3 500 zł",
        hook: "Pełna cyfrowa wizytówka. Od hero po kontakt.",
        desc:
          "5–10 podstron, które razem opowiadają historię Twojej marki — od ogólnej oferty, przez konkretne usługi, po zespół i proces pracy. Panel CMS, dzięki któremu sam podmienisz tekst albo zdjęcie bez dzwonienia po programistów.",
        includes: [
          "5–10 podstron: home, o nas, usługi, portfolio, zespół, kontakt",
          "Panel CMS (Sanity / Payload / Contentful) do samodzielnej edycji",
          "Galeria, mapa, formularze, integracja z newsletterem",
          "Google Analytics 4, Tag Manager, Search Console",
          "SEO on-page — keyword research, meta, nagłówki, struktura",
          "Responsywność do każdego ekranu, szybkość w zielonych Core Web Vitals",
        ],
        effects: [
          "Kompleksowa obecność online — pełny obraz firmy na jednym adresie",
          "Wyższe zaufanie dzięki profesjonalnemu wyglądowi = wyższa konwersja",
          "Self-service — samodzielna aktualizacja treści bez programisty",
        ],
      },
      {
        name: "Strona z blogiem",
        price: "od 4 500 zł",
        hook: "Silnik do content marketingu pracujący latami.",
        desc:
          "Strona firmowa rozszerzona o system blogowy z kategoriami, tagami i wyszukiwarką. Blog to najlepsza długofalowa inwestycja w ruch organiczny — dobry artykuł pozyskuje odwiedzających przez lata, a Ty nie płacisz za każdy klik.",
        includes: [
          "Wszystko co w pakiecie Strona firmowa",
          "System blogowy: kategorie, tagi, autorzy, wyszukiwarka",
          "SEO on-page dla każdego artykułu — auto schema Article, sitemap",
          "Panel planowania publikacji (draft, scheduled, published)",
          "Integracja z newsletterem i pop-up z zapisem",
          "Powiązane artykuły, czytelne URL-e, Open Graph pod każdy wpis",
        ],
        effects: [
          "Rosnący ruch organiczny — 10–20+ dodatkowych odwiedzin dziennie",
          "Autorytet w branży w oczach Google i klientów",
          "Leady z contentu — odwiedzający mają ~5× wyższą intencję zakupową",
        ],
      },
    ],
  },
  {
    id: "meta",
    no: "02",
    label: "Marketing Meta",
    headline: "3,8 miliarda\nludzi dziennie.",
    intro:
      "Facebook i Instagram to największy plac zabaw świata — 3,8 miliarda ludzi loguje się tam codziennie. Twoi klienci są tam. Pytanie: czy Ty też?",
    body: [
      "Robimy kampanie Meta z jedną zasadą: jeśli nie przynosi ROI, nie puszczamy. Testujemy 5–10 wariantów kreatywy naraz, czytamy dane codziennie, optymalizujemy w locie. Nie obiecujemy cudów — obiecujemy proces.",
      "Twoja kampania to nie puszczamy i czekamy. To stały dialog z algorytmem Meta: co tydzień świeże kreatywy, co miesiąc nowa audience, co kwartał przegląd strategii. Budżet reklamowy idzie bezpośrednio do Meta — Ty widzisz każdą złotówkę.",
      "Minimalny sensowny budżet reklamowy startuje od 1 500 zł/mies. Optymalnie działamy od 3 000 zł w górę — wtedy algorytm ma wystarczająco danych, żeby się uczyć i nie palić pieniędzy na przypadkowych odbiorców.",
    ],
    features: [
      { v: "5–10", l: "Kreatyw / miesiąc" },
      { v: "A/B", l: "Testowanie" },
      { v: "Tygodniowo", l: "Optymalizacja" },
      { v: "Twoje BM", l: "Pełna kontrola" },
    ],
    packages: [
      {
        name: "Prowadzenie kampanii",
        price: "od 1 000 zł/mies",
        hook: "Strategia, kreatywy, optymalizacja, raporty — co miesiąc.",
        desc:
          "W tej cenie prowadzimy Twoje konto reklamowe od A do Z. Strategia, kreatywy (statyczne + wideo + karuzele), konfiguracja Pixel i Conversions API, testy A/B, optymalizacja tygodniowa i szczegółowy raport co 2 tygodnie. Business Manager jest po Twojej stronie — masz pełną kontrolę.",
        includes: [
          "Strategia kampanii — persona, oferta, lejek, mapa ścieżki klienta",
          "Kreatywy: statyczne, wideo, karuzele — 5–10 wariantów miesięcznie",
          "Konfiguracja Pixel + Conversions API (ominięcie iOS 14+)",
          "Pełne tagowanie UTM, integracja z GA4 i CRM",
          "Testy A/B oferty, nagłówków, grup odbiorców, creative fatigue monitoring",
          "Optymalizacja tygodniowa + raport szczegółowy co 2 tygodnie",
          "Dostęp do BM po Twojej stronie — pełna kontrola i transparentność",
        ],
        effects: [
          "CAC średnio 30–50% niższy niż przy kampanii self-made",
          "Skalowanie od 1k do 50k zł budżetu bez spadku efektywności",
          "Pełna przejrzystość wydatku — widzisz każdą złotówkę i jej efekt",
          "Świeże kreatywy — nie męczymy jednego wideo przez 3 miesiące",
          "Real-time reakcja — zła kampania wyłączana w 24h, nie w 3 tygodnie",
        ],
      },
    ],
  },
  {
    id: "ai",
    no: "03",
    label: "Automatyzacja AI",
    headline: "Matematyka.\nNie magia.",
    intro:
      "Automatyzacja AI to nie magia — to matematyka. Masz powtarzalne zadanie? Można je zautomatyzować. Masz 100 leadów dziennie, z których 10 jest warto obsłużyć? AI je odfiltruje. Odpowiadasz na maile 4 godziny dziennie? AI odpowie za Ciebie — lepiej i szybciej.",
    body: [
      "Nie wciskamy AI gdzie popadnie. Zaczynamy od audytu Twoich procesów — gdzie tracisz najwięcej czasu, gdzie powtarzasz decyzje, gdzie zbierasz dane, których nikt nie analizuje. Potem wdrażamy 1–3 najważniejsze procesy, mierzymy efekt, skalujemy.",
      "Pracujemy głównie na trzech stackach: n8n (self-hosted workflow), Make.com (szybkie integracje bez kodu) oraz własne serwisy w Node/Python z API OpenAI, Anthropic lub lokalnymi modelami Ollama. Wybór zależy od skali, bezpieczeństwa i budżetu.",
      "Każde wdrożenie kończy się dokumentacją, szkoleniem Twojego zespołu i 30-dniowym supportem. Automat ma działać sam — nie jesteś uzależniony od nas po wdrożeniu. Przykłady: chatbot na stronie, kwalifikacja leadów, auto e-mail, generator treści, analiza danych CRM.",
    ],
    features: [
      { v: "10–30h", l: "Oszczędność / tydzień" },
      { v: "10×", l: "Skalowalność" },
      { v: "30 dni", l: "Support" },
      { v: "100%", l: "Twoja kontrola" },
    ],
    packages: [
      {
        name: "Wdrożenie automatyzacji",
        price: "od 1 700 zł",
        hook: "Jeden proces, kompletne wdrożenie, 30 dni opieki.",
        desc:
          "Audyt procesów, projekt i wdrożenie workflow (n8n / Make / custom Node lub Python), integracja z Twoimi narzędziami — CRM, e-mail, Slack, arkusze, API. Training dla zespołu, pełna dokumentacja techniczna, 30 dni supportu po wdrożeniu bez dodatkowych kosztów.",
        includes: [
          "Audyt procesów — identyfikacja 2–3 miejsc do automatyzacji",
          "Projekt i wdrożenie workflow (n8n / Make / custom)",
          "Integracja z Twoimi narzędziami — CRM, e-mail, Slack, API",
          "Training dla zespołu + pełna dokumentacja techniczna",
          "30 dni supportu po wdrożeniu — poprawki bez dodatkowych kosztów",
        ],
        effects: [
          "Oszczędność 10–30 godzin tygodniowo po stronie Twojej lub zespołu",
          "Szybsza odpowiedź do klienta = mierzalnie wyższa konwersja",
          "Skalowanie obsługi bez zatrudniania — system obsłuży 10× więcej leadów",
          "Lepsza jakość danych — auto-wprowadzanie bez błędów literowych",
        ],
      },
    ],
  },
];

const skyWords = [
  "BEZSENNOŚĆ",
  "TWORZENIE",
  "NOCNA ZMIANA",
];

/* ═══════════════════════════════════════════════════
   Gwiazdy — mały komponent CSS
   ═══════════════════════════════════════════════════ */

function Stars() {
  const starCount = 80;
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;
    const el = starsRef.current;
    const children = el.children;
    for (let i = 0; i < children.length; i++) {
      const s = children[i] as HTMLElement;
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 100}%`;
      s.style.width = `${1 + Math.random() * 2}px`;
      s.style.height = s.style.width;
      s.style.animationDelay = `${Math.random() * 4}s`;
      s.style.animationDuration = `${2 + Math.random() * 3}s`;
    }
  }, []);

  return (
    <div ref={starsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: starCount }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full star-dot"
          style={{ background: i % 8 === 0 ? "#8b5cf6" : "#ffffff" }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Główny komponent strony
   ═══════════════════════════════════════════════════ */

export default function UslugiPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current!;

      /* ── Horizontal przejścia między kartami ── */
      const hSections = wrapper.querySelectorAll(".h-transition");
      hSections.forEach((sec) => {
        const inner = sec.querySelector(".h-track") as HTMLElement;
        if (!inner) return;

        gsap.to(inner, {
          x: () => -(inner.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => `+=${inner.scrollWidth - window.innerWidth}`,
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          },
        });
      });

      /* ── Fade-in elementy ── */
      const reveals = wrapper.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ── Stagger na grupach ── */
      const staggerGroups = wrapper.querySelectorAll(".reveal-group");
      staggerGroups.forEach((g) => {
        gsap.fromTo(
          g.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: g,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #12061f 0%, #0a0414 40%, #050505 100%)",
        color: "#ffffff",
      }}
    >
      {/* Stałe gwieździste niebo za wszystkim */}
      <Stars />

      {/* ══ HERO ══ */}
      <section className="relative flex items-center justify-center px-6" style={{ height: "100vh" }}>
        <div
          className="absolute pointer-events-none"
          style={{
            width: "min(80vw,1000px)",
            height: "min(80vw,1000px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle,rgba(139,92,246,.2) 0%,transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative z-10 text-center">
          <span
            className="block text-[11px] uppercase tracking-[0.5em] mb-8"
            style={{ color: "#8b5cf6" }}
          >
            [ usługi · studio bezsenność ]
          </span>
          <h1
            className="font-black uppercase"
            style={{
              fontSize: "clamp(72px,16vw,280px)",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
            }}
          >
            USŁUGI.
          </h1>
          <p className="mt-10 max-w-lg mx-auto text-base md:text-lg" style={{ color: "#aaa", lineHeight: 1.6 }}>
            Trzy obszary. Jedna filozofia — robimy dobrze albo wcale.
          </p>
        </div>
      </section>

      {/* ══ KARTY + PRZEJŚCIA ══ */}
      {cards.map((card, ci) => (
        <div key={card.id}>
          {/* ── KARTA ── */}
          <section className="relative flex justify-center px-4 md:px-8 py-16 md:py-24">
            <article
              className="relative w-full max-w-[1200px] p-8 md:p-16 lg:p-20"
              style={{
                background: "linear-gradient(180deg,#111111 0%,#0d0d0d 60%,#0a0a0a 100%)",
                border: "1px solid rgba(139,92,246,.15)",
                borderRadius: "24px",
                boxShadow: "0 0 120px rgba(139,92,246,.06), 0 40px 80px rgba(0,0,0,.5)",
              }}
            >
              {/* Numer i label */}
              <div className="reveal mb-6">
                <span
                  className="uppercase font-mono"
                  style={{ fontSize: "11px", letterSpacing: "0.5em", color: "#8b5cf6" }}
                >
                  {card.no} / {card.label}
                </span>
              </div>

              {/* Nagłówek */}
              <h2
                className="reveal font-black uppercase whitespace-pre-line mb-10"
                style={{
                  fontSize: "clamp(48px,8vw,140px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                }}
              >
                {card.headline}
              </h2>

              {/* Intro + body */}
              <div className="reveal mb-14">
                <p className="text-lg md:text-xl mb-8" style={{ color: "#d5d5d5", lineHeight: 1.65 }}>
                  {card.intro}
                </p>
                {card.body.map((p, i) => (
                  <p key={i} className="text-base md:text-lg mb-6" style={{ color: "#999", lineHeight: 1.65 }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Feature grid */}
              <div className="reveal-group grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-16 md:mb-24">
                {card.features.map((f) => (
                  <div key={f.l} style={{ borderTop: "1px solid rgba(139,92,246,.3)", paddingTop: "14px" }}>
                    <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#8b5cf6" }}>
                      ◦
                    </span>
                    <div
                      className="font-black uppercase mt-2"
                      style={{ fontSize: "clamp(22px,2.8vw,40px)", lineHeight: 1, letterSpacing: "-0.02em" }}
                    >
                      {f.v}
                    </div>
                    <span className="uppercase mt-1 block" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#666" }}>
                      {f.l}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cennik label */}
              <div className="reveal mb-6">
                <span
                  className="uppercase font-mono"
                  style={{ fontSize: "11px", letterSpacing: "0.4em", color: "#8b5cf6" }}
                >
                  [ Cennik ]
                </span>
              </div>

              {/* Pakiety */}
              <div
                className={`reveal-group grid gap-8 ${
                  card.packages.length > 1 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 max-w-3xl"
                }`}
              >
                {card.packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="flex flex-col p-7 md:p-9"
                    style={{
                      background: "rgba(139,92,246,.04)",
                      border: "1px solid rgba(139,92,246,.2)",
                      borderRadius: "12px",
                    }}
                  >
                    <div style={{ borderBottom: "1px solid rgba(139,92,246,.25)", paddingBottom: "14px", marginBottom: "16px" }}>
                      <span className="uppercase font-mono block" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#8b5cf6" }}>
                        {pkg.name}
                      </span>
                      <div
                        className="font-black mt-3"
                        style={{ fontSize: "clamp(26px,3vw,42px)", lineHeight: 1, letterSpacing: "-0.02em" }}
                      >
                        {pkg.price}
                      </div>
                    </div>

                    <p className="italic mb-4" style={{ fontSize: "14px", color: "#8b5cf6" }}>
                      {pkg.hook}
                    </p>
                    <p className="mb-6" style={{ fontSize: "14.5px", color: "#bbb", lineHeight: 1.6 }}>
                      {pkg.desc}
                    </p>

                    <div className="mb-5">
                      <span className="uppercase font-mono block mb-3" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#666" }}>
                        [ Co dostajesz ]
                      </span>
                      <ul className="space-y-2">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex gap-3 text-sm" style={{ color: "#ccc", lineHeight: 1.5 }}>
                            <span style={{ color: "#8b5cf6", flexShrink: 0 }}>+</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <span className="uppercase font-mono block mb-3" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#666" }}>
                        [ Efekty ]
                      </span>
                      <ul className="space-y-2">
                        {pkg.effects.map((ef) => (
                          <li key={ef} className="flex gap-3 text-sm" style={{ color: "#999", lineHeight: 1.5 }}>
                            <span style={{ color: "#8b5cf6", flexShrink: 0 }}>→</span>
                            <span>{ef}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          {/* ── POZIOME PRZEJŚCIE (niebo) — między kartami, nie po ostatniej ── */}
          {ci < cards.length - 1 && (
            <section className="h-transition relative w-full" style={{ height: "100vh" }}>
              <div
                className="h-track flex items-center"
                style={{ width: `${100 + 300}vw`, height: "100vh" }}
              >
                {/* Panel 1: pusty — ucieczka obecnej karty */}
                <div className="flex-shrink-0 w-screen h-screen" />

                {/* Panel 2: wielki napis na niebie */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width: "60vw",
                      height: "60vw",
                      background: "radial-gradient(circle,rgba(139,92,246,.2) 0%,transparent 60%)",
                      filter: "blur(80px)",
                    }}
                  />
                  <span
                    className="relative font-black uppercase text-center"
                    style={{
                      fontSize: "clamp(56px,14vw,240px)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.04em",
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(255,255,255,.15)",
                    }}
                  >
                    {skyWords[ci]}
                  </span>
                </div>

                {/* Panel 3: wjazd następnej karty */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center">
                  <span
                    className="uppercase font-mono"
                    style={{ fontSize: "12px", letterSpacing: "0.5em", color: "#8b5cf6" }}
                  >
                    {cards[ci + 1].no} / {cards[ci + 1].label} →
                  </span>
                </div>

                {/* Panel 4: dopełnienie */}
                <div className="flex-shrink-0 w-screen h-screen" />
              </div>
            </section>
          )}
        </div>
      ))}

      {/* ══ CTA ══ */}
      <section className="relative flex items-center justify-center px-6 py-40 md:py-56" style={{ minHeight: "100vh" }}>
        <div
          className="absolute pointer-events-none"
          style={{
            width: "min(90vw,1200px)",
            height: "min(90vw,1200px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle,rgba(139,92,246,.15) 0%,rgba(139,92,246,.04) 35%,transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative z-10 text-center max-w-5xl">
          <span className="reveal block text-[11px] uppercase tracking-[0.5em] text-[#666] mb-10">
            [ koniec listy · początek rozmowy ]
          </span>
          <h2
            className="reveal font-black uppercase"
            style={{ fontSize: "clamp(56px,10vw,180px)", lineHeight: 0.88, letterSpacing: "-0.03em" }}
          >
            Masz projekt?
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px #8b5cf6" }}>
              Mamy noc.
            </span>
          </h2>
          <p className="reveal mt-10 text-base md:text-lg max-w-xl mx-auto" style={{ color: "#999", lineHeight: 1.6 }}>
            Krótka rozmowa. Bez zobowiązań. Powiesz co chcesz zrobić — my powiemy, czy umiemy, ile to zajmie i ile będzie kosztować.
          </p>
          <div className="reveal mt-14">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-4 px-12 py-5 border text-white uppercase transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,.5)]"
              style={{ fontSize: "13px", letterSpacing: "0.3em", borderColor: "rgba(139,92,246,.5)" }}
            >
              <span>Porozmawiajmy</span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
            </Link>
          </div>
          <p className="reveal mt-16 text-xs uppercase" style={{ letterSpacing: "0.3em", color: "#444" }}>
            hello@studiobezsennosc.pl
          </p>
        </div>
      </section>

      {/* Animacje CSS */}
      <style>{`
        @keyframes star-twinkle {
          0%,100% { opacity:.1; transform:scale(.8); }
          50% { opacity:.8; transform:scale(1.2); }
        }
        .star-dot {
          animation: star-twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
