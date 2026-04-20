"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   Dane — cenniki, treści kart
   ═══════════════════════════════════════════════════ */

const cards = [
  {
    id: "strony",
    no: "01",
    label: "Strony internetowe",
    tagline: "Premium web design · Next.js · Kraków",
    headline: "Cyfrowe biuro.\nOtwarte 24/7.",
    intro:
      "Strona internetowa to pierwszy dotyk z Twoją marką. Miejsce, gdzie decyzja o zakupie zapada szybciej niż Ty zdążysz wypić kawę. Dlatego każdy piksel, każdy milisekund czasu ładowania, każde zdanie w nagłówku — ma znaczenie.",
    pullQuote: {
      text: "Klient decyduje o Tobie w 50 milisekund.\nWięcej czasu nie masz.",
      attr: "— zasada projektowa numer jeden",
    },
    body: [
      "Projektujemy strony, które nie tylko dobrze wyglądają — konwertują. Budujemy je z myślą o celu biznesowym, nie o trendach. Strona ma sprzedawać, budować zaufanie, generować leady — a nie tylko wypełniać internet.",
      "Pracujemy z Next.js, TypeScript i nowoczesnym CSS. Każda strona ma Core Web Vitals w zielonym, działa na mobile, indexuje się w Google i nie wymaga płacenia za licencje. Kod jest Twój — hosting w dowolnym miejscu.",
      "Każdy projekt zaczyna się od briefu — nie od Photoshopa. Rozumiemy Twój biznes, definiujemy cel strony, mapujemy ścieżkę użytkownika. Potem projektujemy UI, budujemy frontend, wdrażamy CMS i oddajemy gotowy produkt z dokumentacją.",
      "Po oddaniu strony nie znikamy. Przez pierwsze 30 dni jesteśmy do dyspozycji — poprawki, drobne modyfikacje, szkolenie z panelu. Dobrze zrobione wdrożenie to dopiero początek. Strona musi żyć, mierzyć, reagować.",
    ],
    process: [
      { n: "01", title: "Brief & research", desc: "Rozmowa o celu biznesowym, analiza konkurencji, zdefiniowanie persony i mapy ścieżki użytkownika." },
      { n: "02", title: "Wireframe", desc: "Niski poziom detalu — decydujemy o strukturze, hierarchii informacji, flow. Logika przed designem." },
      { n: "03", title: "UI design", desc: "Projekt graficzny w Figmie — typografia, kolor, mikro-interakcje. Klient akceptuje przed kodem." },
      { n: "04", title: "Frontend", desc: "Next.js + TypeScript + Tailwind. Komponentowo, czytelnie, z myślą o performance." },
      { n: "05", title: "CMS + launch", desc: "Wdrożenie panelu, konfiguracja analytics, Pixel, Search Console. Domena podpięta, certyfikat działa." },
      { n: "06", title: "Support 30 dni", desc: "Poprawki, drobne modyfikacje, szkolenie zespołu. Potem opcjonalnie — stała opieka." },
    ],
    features: [
      { v: "100/100", l: "Core Web Vitals" },
      { v: "< 2s", l: "Ładowanie" },
      { v: "Mobile first", l: "Zawsze" },
      { v: "CMS", l: "Edytowalny" },
    ],
    stats: [
      { v: "100/100", l: "Core Web Vitals", d: "Każda strona w zielonym — performance, accessibility, SEO." },
      { v: "< 2s", l: "Średni load time", d: "Desktop i mobile. LCP < 2.5s, FID < 100ms." },
      { v: "320px+", l: "Responsywność", d: "Od najmniejszego iPhone po 4K monitor — payalnie." },
      { v: "0 zł", l: "Opłaty licencyjne", d: "Stack open-source. Kod jest Twój, hosting gdzie chcesz." },
    ],
    examples: [
      { title: "Landing z 12% konwersją", body: "Pojedyncza strona pod kampanię Meta dla studia fitness. Zoptymalizowana pod jedno działanie — zapis na trening próbny. CAC niższy o 41%." },
      { title: "Strona firmowa B2B", body: "8 podstron dla producenta mebli. Panel CMS, integracja z ERP. Średni czas na stronie wzrósł z 1:12 do 3:47." },
      { title: "Blog agencyjny", body: "System treści + newsletter dla startupu. Po 6 miesiącach 40+ odwiedzin dziennie z Google na 3 główne keywordy branżowe." },
    ],
    closing: {
      title: "Strona to nie wizytówka.",
      body:
        "To najlepszy sprzedawca Twojej firmy — pracuje 24/7, nie idzie na urlop, nie prosi o podwyżkę. Zrób go dobrze. Albo nie rób go wcale.",
    },
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
    tagline: "Facebook Ads · Instagram · Performance",
    headline: "3,8 miliarda\nludzi dziennie.",
    intro:
      "Facebook i Instagram to największy plac zabaw świata — 3,8 miliarda ludzi loguje się tam codziennie. Twoi klienci są tam. Pytanie: czy Ty też?",
    pullQuote: {
      text: "Nie puszczamy reklam.\nPuszczamy eksperymenty.",
      attr: "— filozofia performance marketingu",
    },
    body: [
      "Robimy kampanie Meta z jedną zasadą: jeśli nie przynosi ROI, nie puszczamy. Testujemy 5–10 wariantów kreatywy naraz, czytamy dane codziennie, optymalizujemy w locie. Nie obiecujemy cudów — obiecujemy proces.",
      "Twoja kampania to nie strategia „puszczamy i czekamy”. To stały dialog z algorytmem Meta: co tydzień świeże kreatywy, co miesiąc nowa audience, co kwartał przegląd strategii. Budżet reklamowy idzie bezpośrednio do Meta — Ty widzisz każdą złotówkę.",
      "Minimalny sensowny budżet reklamowy startuje od 1 500 zł/mies. Optymalnie działamy od 3 000 zł w górę — wtedy algorytm ma wystarczająco danych, żeby się uczyć i nie palić pieniędzy na przypadkowych odbiorców.",
      "Każdy miesiąc zaczyna się od hipotez — co ma zadziałać — a kończy na danych: co faktycznie zadziałało. Potem wybieramy zwycięzców, skalujemy, tworzymy kolejne warianty. Bez tego to nie marketing, tylko loteria.",
    ],
    process: [
      { n: "01", title: "Audyt i strategia", desc: "Persona, oferta, lejek, konkurencja. Mapa ścieżki od reklamy do konwersji." },
      { n: "02", title: "Pixel + CAPI", desc: "Konfiguracja Pixela, Conversions API, ominięcie ograniczeń iOS 14+." },
      { n: "03", title: "Kreatywy", desc: "5–10 wariantów miesięcznie — statyczne, wideo, karuzele. Hooki dopasowane do persony." },
      { n: "04", title: "Launch", desc: "Kampanie w 3 warstwach — prospecting, retargeting, lookalike. Budżety rozdane mądrze." },
      { n: "05", title: "Optymalizacja", desc: "Tygodniowy review danych, wyłączanie spadków, skalowanie zwycięzców, creative fatigue." },
      { n: "06", title: "Raport", desc: "Co 2 tygodnie — szczegółowy breakdown wydatku, konwersji, CAC, ROAS." },
    ],
    features: [
      { v: "5–10", l: "Kreatyw / miesiąc" },
      { v: "A/B", l: "Testowanie" },
      { v: "Tygodniowo", l: "Optymalizacja" },
      { v: "Twoje BM", l: "Pełna kontrola" },
    ],
    stats: [
      { v: "30–50%", l: "Niższy CAC", d: "W porównaniu z kampaniami prowadzonymi samodzielnie." },
      { v: "5–10", l: "Nowych kreatyw miesięcznie", d: "Bez zmęczenia materiałem. Algorytm uwielbia świeżość." },
      { v: "7 dni", l: "Cykl optymalizacji", d: "Tygodniowe przeglądy danych i reakcja w 24h." },
      { v: "100%", l: "Transparentność", d: "Business Manager po Twojej stronie. Każda złotówka widoczna." },
    ],
    examples: [
      { title: "E-commerce fashion", body: "ROAS 4,8× w 3. miesiącu. Skalowanie z 5k do 25k zł/mies budżetu bez spadku CPR." },
      { title: "Local service B2C", body: "150 leadów miesięcznie po 28 zł każdy. Studio urody — wcześniej płaciło 60 zł za lead u poprzednika." },
      { title: "Edukacja online", body: "Kurs dla 800 osób w 2 tygodnie. Campaign Budget Optimization + dynamic creative + 4 persony." },
    ],
    closing: {
      title: "Reklama to nie koszt.",
      body:
        "To inwestycja z mierzalnym zwrotem. Jeśli po 3 miesiącach nie widzisz konkretnych liczb — to nie reklama, to dotacja dla Facebooka.",
    },
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
    tagline: "n8n · Make · Node · OpenAI · Anthropic",
    headline: "Matematyka.\nNie magia.",
    intro:
      "Automatyzacja AI to nie magia — to matematyka. Masz powtarzalne zadanie? Można je zautomatyzować. Masz 100 leadów dziennie, z których 10 jest warto obsłużyć? AI je odfiltruje. Odpowiadasz na maile 4 godziny dziennie? AI odpowie za Ciebie — lepiej i szybciej.",
    pullQuote: {
      text: "Dobra automatyzacja jest niewidzialna.\nPo prostu rzeczy dzieją się same.",
      attr: "— definicja udanego wdrożenia",
    },
    body: [
      "Nie wciskamy AI gdzie popadnie. Zaczynamy od audytu Twoich procesów — gdzie tracisz najwięcej czasu, gdzie powtarzasz decyzje, gdzie zbierasz dane, których nikt nie analizuje. Potem wdrażamy 1–3 najważniejsze procesy, mierzymy efekt, skalujemy.",
      "Pracujemy głównie na trzech stackach: n8n (self-hosted workflow), Make.com (szybkie integracje bez kodu) oraz własne serwisy w Node/Python z API OpenAI, Anthropic lub lokalnymi modelami Ollama. Wybór zależy od skali, bezpieczeństwa i budżetu.",
      "Każde wdrożenie kończy się dokumentacją, szkoleniem Twojego zespołu i 30-dniowym supportem. Automat ma działać sam — nie jesteś uzależniony od nas po wdrożeniu. Przykłady: chatbot na stronie, kwalifikacja leadów, auto e-mail, generator treści, analiza danych CRM.",
      "AI nie zastępuje ludzi — zwalnia ich z nudy. Z robienia tego samego 50 razy dziennie. Twoja rola przesuwa się z operatora na strategię — od „odpowiadam na maile” do „planuję rozwój”. To jedna z lepszych rzeczy, jakie możesz dać swojemu zespołowi.",
    ],
    process: [
      { n: "01", title: "Audyt procesów", desc: "Mapowanie gdzie pracujesz ręcznie, gdzie tracisz czas, gdzie powtarzasz te same decyzje." },
      { n: "02", title: "Priorytetyzacja", desc: "Wybieramy 1–3 procesy o najwyższym ROI. Szybkie zwycięstwa przed dużymi projektami." },
      { n: "03", title: "Prototyp", desc: "W 3–5 dni lekki prototyp na n8n lub Make — sprawdzamy czy logika działa w rzeczywistości." },
      { n: "04", title: "Wdrożenie", desc: "Pełny workflow z integracjami, obsługą błędów, logami, powiadomieniami." },
      { n: "05", title: "Training", desc: "Szkolenie zespołu + dokumentacja + runbook co robić, gdy coś się zepsuje." },
      { n: "06", title: "Support 30 dni", desc: "Poprawki, drobne zmiany, dostrajanie promptów i reguł — bez dodatkowych kosztów." },
    ],
    features: [
      { v: "10–30h", l: "Oszczędność / tydzień" },
      { v: "10×", l: "Skalowalność" },
      { v: "30 dni", l: "Support" },
      { v: "100%", l: "Twoja kontrola" },
    ],
    stats: [
      { v: "10–30h", l: "Oszczędność tygodniowa", d: "Jeden proces. Rozłóż to na zespół — liczby robią się poważne." },
      { v: "< 10s", l: "Czas odpowiedzi AI", d: "Klient nie czeka na konsultanta. Odpowiedź natychmiast, 24/7." },
      { v: "10×", l: "Skala bez zatrudniania", d: "System obsłuży 10× więcej leadów bez jednej dodatkowej osoby." },
      { v: "99,5%", l: "Jakość klasyfikacji", d: "Po dostrojeniu na Twoich danych — lepiej niż człowiek po 12h." },
    ],
    examples: [
      { title: "Chatbot AI na stronie", body: "Odpowiada na 70–80% pytań klientów. Przekazuje tylko ciepłe leady do handlowca z pełnym kontekstem rozmowy." },
      { title: "Kwalifikacja leadów", body: "System ocenia leady wg prawdopodobieństwa zakupu. Handlowiec dzwoni najpierw do gotowych, nie marnuje czasu na zimne." },
      { title: "Auto-odpowiedzi e-mail", body: "AI czyta, klasyfikuje i generuje spersonalizowaną odpowiedź. Ty akceptujesz lub poprawiasz — 4 godziny do kieszeni." },
      { title: "Generator treści", body: "Opisy produktów, posty, meta tagi w Twoim tonie. Nie zastępuje copywritera — daje mu 10× wydajność." },
      { title: "Analiza danych CRM", body: "Co tydzień jeden PDF z kluczowymi liczbami, trendami i konkretną rekomendacją. Zamiast 5 dashboardów — jeden konkret." },
    ],
    closing: {
      title: "AI to nie hype.",
      body:
        "To narzędzie. Jeśli nie daje Ci konkretnego zwrotu (mniej czasu, więcej leadów, lepsze dane) — to nie jest wdrożenie, to kosmetyka.",
    },
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

const transitions = [
  {
    skyWord: "BEZSENNOŚĆ",
    quoteLines: ["Strona to zdjęcie.", "Marketing to film."],
    stat: { big: "3,8 mld", small: "ludzi dziennie na Meta" },
    process: ["strategia", "kreatywy", "ruch", "lead"],
  },
  {
    skyWord: "TWORZENIE",
    quoteLines: ["Reklamy pracują w dzień.", "AI pracuje w nocy."],
    stat: { big: "24/7", small: "obsługi bez snu" },
    process: ["audyt", "workflow", "integracja", "automat"],
  },
];

/* ═══════════════════════════════════════════════════
   ServiceCard — interaktywna karta usługi
   ═══════════════════════════════════════════════════ */

type CardData = (typeof cards)[number];

function ServiceCard({ card }: { card: CardData }) {
  const [activePkg, setActivePkg] = useState(0);

  const currentPkg = card.packages[activePkg];

  // Krótka statystyka meta z pierwszych statów (jeśli są) + packages
  const heroMeta = [
    { label: "Stack", value: card.tagline.split(" · ").slice(1, 3).join(" · ") || "Custom" },
    { label: "Pakiety", value: card.packages.length === 1 ? "1 plan" : `${card.packages.length} plany` },
    { label: "Cena od", value: card.packages[0].price.replace("od ", "") },
  ];

  return (
    <article
      className="relative w-full p-12 md:p-24 lg:p-32"
      style={{
        maxWidth: "1440px",
        minHeight: "150vh",
        background: "#0a0a0a",
        border: "1px solid rgba(139,92,246,.1)",
        borderRadius: "24px",
        boxShadow: "0 40px 100px rgba(0,0,0,.6)",
      }}
    >
      {/* ═════════════════════════════════════════════ */}
      {/* ── HERO — bardzo oddechowy, duże odstępy ── */}
      {/* ═════════════════════════════════════════════ */}
      <header className="reveal-group">
        {/* Top bar */}
        <div className="flex items-center gap-6 mb-20 md:mb-28">
          <span
            className="flex items-center justify-center font-mono rounded-full"
            style={{
              width: "52px",
              height: "52px",
              fontSize: "13px",
              letterSpacing: "0.08em",
              color: "#8b5cf6",
              border: "1px solid rgba(139,92,246,.35)",
              fontWeight: 700,
            }}
          >
            {card.no}
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: "12px", letterSpacing: "0.5em", color: "#8b5cf6" }}
          >
            {card.label}
          </span>
          <span
            className="flex-1 h-px"
            style={{ background: "rgba(139,92,246,.15)" }}
          />
          <span
            className="font-mono uppercase hidden lg:inline"
            style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#555" }}
          >
            {card.tagline}
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-black uppercase whitespace-pre-line"
          style={{
            fontSize: "clamp(56px, 8vw, 160px)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            marginBottom: "clamp(40px, 5vw, 80px)",
          }}
        >
          {card.headline}
        </h2>

        {/* Intro — ogromny line-height */}
        <p
          className="max-w-3xl"
          style={{
            fontSize: "clamp(18px, 1.5vw, 26px)",
            color: "#d5d5d5",
            lineHeight: 1.8,
            letterSpacing: "0.005em",
            marginBottom: "clamp(56px, 7vw, 100px)",
          }}
        >
          {card.intro}
        </p>

        {/* Meta chips */}
        <div
          className="flex flex-wrap gap-3 md:gap-4"
          style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}
        >
          {heroMeta.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-4 px-6 py-4"
              style={{
                border: "1px solid rgba(139,92,246,.2)",
                borderRadius: "999px",
                background: "rgba(139,92,246,.03)",
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  color: "#666",
                }}
              >
                {m.label}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* ═════════════════════════════════════════════ */}
      {/* ── VISUAL DIVIDER z dotted pattern ── */}
      {/* ═════════════════════════════════════════════ */}
      <div
        className="relative flex items-center gap-6"
        style={{ marginTop: "clamp(40px, 6vw, 80px)", marginBottom: "clamp(60px, 8vw, 120px)" }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.5em",
            color: "#444",
          }}
        >
          · · · · · · · · · · · · · · · · · · · ·
        </span>
        <span
          className="flex-1 h-px"
          style={{ background: "rgba(139,92,246,.15)" }}
        />
      </div>

      {/* ═════════════════════════════════════════════ */}
      {/* ── PROCES — pionowa oś (timeline) z dużymi odstępami ── */}
      {/* ═════════════════════════════════════════════ */}
      <section
        className="reveal-group"
        style={{ marginBottom: "clamp(80px, 10vw, 160px)" }}
      >
        {/* Section header */}
        <div
          className="flex items-baseline gap-6 md:gap-10"
          style={{ marginBottom: "clamp(48px, 6vw, 96px)" }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.5em", color: "#8b5cf6" }}
          >
            /01 · Proces
          </span>
          <h3
            className="font-extralight uppercase"
            style={{
              fontSize: "clamp(32px, 4.5vw, 72px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#fff",
            }}
          >
            Jak to robimy.
          </h3>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 hidden md:block"
            style={{
              left: "32px",
              width: "1px",
              background:
                "linear-gradient(180deg, rgba(139,92,246,.4) 0%, rgba(139,92,246,.1) 100%)",
            }}
          />

          {card.process.map((step, i) => (
            <div
              key={step.n}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
              style={{
                marginBottom:
                  i < card.process.length - 1 ? "clamp(48px, 6vw, 80px)" : 0,
              }}
            >
              {/* Number circle */}
              <div className="md:col-span-2 flex items-center md:items-start gap-4">
                <span
                  className="flex items-center justify-center rounded-full font-mono relative z-10"
                  style={{
                    width: "64px",
                    height: "64px",
                    fontSize: "15px",
                    letterSpacing: "0.08em",
                    background: "#0a0a0a",
                    color: "#8b5cf6",
                    border: "1px solid rgba(139,92,246,.4)",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {step.n}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-10">
                <h4
                  className="font-black uppercase"
                  style={{
                    fontSize: "clamp(22px, 2.4vw, 40px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    marginBottom: "clamp(16px, 2vw, 28px)",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  className="max-w-3xl"
                  style={{
                    fontSize: "clamp(15px, 1.2vw, 19px)",
                    color: "#b5b5b5",
                    lineHeight: 1.8,
                    letterSpacing: "0.005em",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════ */}
      {/* ── VISUAL DIVIDER ── */}
      {/* ═════════════════════════════════════════════ */}
      <div
        className="relative flex items-center gap-6"
        style={{ marginBottom: "clamp(60px, 8vw, 120px)" }}
      >
        <span
          className="flex-1 h-px"
          style={{ background: "rgba(139,92,246,.15)" }}
        />
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.5em",
            color: "#444",
          }}
        >
          · · · · · · · · · · · · · · · · · · · ·
        </span>
      </div>

      {/* ═════════════════════════════════════════════ */}
      {/* ── PAKIETY — clean tabs + ogromne oddechy ── */}
      {/* ═════════════════════════════════════════════ */}
      <section
        className="reveal-group"
        style={{ marginBottom: "clamp(80px, 10vw, 160px)" }}
      >
        <div
          className="flex items-baseline gap-6 md:gap-10"
          style={{ marginBottom: "clamp(48px, 6vw, 96px)" }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.5em", color: "#8b5cf6" }}
          >
            /02 · Cennik
          </span>
          <h3
            className="font-extralight uppercase"
            style={{
              fontSize: "clamp(32px, 4.5vw, 72px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Jasno. Bez gwiazdek.
          </h3>
        </div>

        {/* Tab buttons */}
        {card.packages.length > 1 && (
          <div
            className="flex flex-wrap gap-3 md:gap-5"
            style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}
          >
            {card.packages.map((pkg, i) => {
              const isActive = i === activePkg;
              return (
                <button
                  key={pkg.name}
                  type="button"
                  onClick={() => setActivePkg(i)}
                  className="relative px-6 md:px-8 py-5 md:py-6 transition-all duration-400 focus:outline-none"
                  style={{
                    background: isActive ? "rgba(139,92,246,.1)" : "transparent",
                    border: `1px solid ${isActive ? "#8b5cf6" : "rgba(139,92,246,.15)"}`,
                    borderRadius: "12px",
                    cursor: "pointer",
                    minWidth: "180px",
                  }}
                >
                  <span
                    className="font-mono uppercase block text-left"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.35em",
                      color: isActive ? "#8b5cf6" : "#555",
                      marginBottom: "10px",
                    }}
                  >
                    pakiet 0{i + 1}
                  </span>
                  <span
                    className="uppercase block text-left"
                    style={{
                      fontSize: "clamp(15px, 1.2vw, 19px)",
                      letterSpacing: "-0.005em",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#fff" : "#888",
                    }}
                  >
                    {pkg.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Package detail — 2 sekcje z dużą przerwą */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
          style={{ paddingTop: "clamp(32px, 4vw, 56px)" }}
        >
          {/* LEFT — price */}
          <div className="lg:col-span-5">
            <span
              className="font-mono uppercase block"
              style={{
                fontSize: "10px",
                letterSpacing: "0.4em",
                color: "#8b5cf6",
                marginBottom: "24px",
              }}
            >
              {currentPkg.name}
            </span>
            <div
              className="font-black"
              style={{
                fontSize: "clamp(48px, 6vw, 104px)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "32px",
              }}
            >
              {currentPkg.price}
            </div>
            <p
              className="italic"
              style={{
                fontSize: "clamp(16px, 1.3vw, 20px)",
                color: "#8b5cf6",
                lineHeight: 1.5,
                marginBottom: "40px",
              }}
            >
              {currentPkg.hook}
            </p>
            <p
              style={{
                fontSize: "clamp(15px, 1.2vw, 17px)",
                color: "#aaa",
                lineHeight: 1.8,
              }}
            >
              {currentPkg.desc}
            </p>
          </div>

          {/* RIGHT — lista cech + efekty */}
          <div className="lg:col-span-7 flex flex-col" style={{ gap: "clamp(48px, 5vw, 72px)" }}>
            {/* Includes */}
            <div>
              <div
                className="flex items-center gap-4"
                style={{ marginBottom: "clamp(24px, 3vw, 36px)" }}
              >
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#8b5cf6" }}
                >
                  Co dostajesz
                </span>
                <span
                  className="flex-1 h-px"
                  style={{ background: "rgba(139,92,246,.15)" }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: "10px", color: "#555" }}
                >
                  {currentPkg.includes.length}
                </span>
              </div>
              <ul className="flex flex-col" style={{ gap: "clamp(18px, 2vw, 24px)" }}>
                {currentPkg.includes.map((inc, i) => (
                  <li
                    key={inc}
                    className="grid grid-cols-[auto_1fr] gap-5 items-baseline"
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        color: "#8b5cf6",
                        fontWeight: 600,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(15px, 1.15vw, 17px)",
                        color: "#d0d0d0",
                        lineHeight: 1.65,
                      }}
                    >
                      {inc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Effects */}
            <div>
              <div
                className="flex items-center gap-4"
                style={{ marginBottom: "clamp(24px, 3vw, 36px)" }}
              >
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#8b5cf6" }}
                >
                  Efekty
                </span>
                <span
                  className="flex-1 h-px"
                  style={{ background: "rgba(139,92,246,.15)" }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: "10px", color: "#555" }}
                >
                  {currentPkg.effects.length}
                </span>
              </div>
              <ul className="flex flex-col" style={{ gap: "clamp(16px, 2vw, 22px)" }}>
                {currentPkg.effects.map((ef) => (
                  <li
                    key={ef}
                    className="grid grid-cols-[auto_1fr] gap-5 items-baseline"
                  >
                    <span
                      style={{
                        color: "#8b5cf6",
                        fontSize: "18px",
                        lineHeight: 1,
                      }}
                    >
                      →
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(15px, 1.15vw, 17px)",
                        color: "#e0e0e0",
                        lineHeight: 1.65,
                      }}
                    >
                      {ef}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════ */}
      {/* ── VISUAL DIVIDER ── */}
      {/* ═════════════════════════════════════════════ */}
      <div
        className="relative flex items-center gap-6"
        style={{ marginBottom: "clamp(60px, 8vw, 120px)" }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.5em",
            color: "#444",
          }}
        >
          · · · · · · · · · · · · · · · · · · · ·
        </span>
        <span
          className="flex-1 h-px"
          style={{ background: "rgba(139,92,246,.15)" }}
        />
        <span
          className="font-mono uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#555" }}
        >
          /finał
        </span>
      </div>

      {/* ═════════════════════════════════════════════ */}
      {/* ── CLOSING + CTA ── */}
      {/* ═════════════════════════════════════════════ */}
      <section className="reveal">
        <h3
          className="font-black uppercase max-w-4xl"
          style={{
            fontSize: "clamp(40px, 5.5vw, 104px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: "clamp(28px, 3.5vw, 48px)",
          }}
        >
          {card.closing.title}
        </h3>
        <p
          className="max-w-2xl"
          style={{
            fontSize: "clamp(17px, 1.4vw, 22px)",
            color: "#aaa",
            lineHeight: 1.75,
            marginBottom: "clamp(48px, 6vw, 80px)",
          }}
        >
          {card.closing.body}
        </p>
        <Link
          href="/kontakt"
          className="svc-cta inline-flex items-center gap-4 uppercase transition-all duration-400 group"
          style={{
            padding: "20px 40px",
            fontSize: "13px",
            letterSpacing: "0.3em",
            color: "#fff",
            border: "1px solid rgba(139,92,246,.5)",
            borderRadius: "12px",
          }}
        >
          <span>Porozmawiajmy o Twoim projekcie</span>
          <span className="transition-transform duration-400 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </section>
    </article>
  );
}

/* ═══════════════════════════════════════════════════
   Niebo — pure CSS chmury na jasnym błękicie
   ═══════════════════════════════════════════════════ */

const clouds = [
  { top: "6%",  width: 240, dur: 95,  delay: -10 },
  { top: "14%", width: 170, dur: 55,  delay: -25 },
  { top: "24%", width: 320, dur: 110, delay: -40 },
  { top: "36%", width: 200, dur: 65,  delay: 0 },
  { top: "48%", width: 280, dur: 85,  delay: -15 },
  { top: "60%", width: 150, dur: 45,  delay: -30 },
  { top: "72%", width: 240, dur: 75,  delay: -50 },
  { top: "84%", width: 300, dur: 100, delay: -20 },
];

function SkyBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background:
          "linear-gradient(180deg, #0c0820 0%, #1a1038 22%, #2a1d52 48%, #3d2a6e 72%, #2a1845 92%, #0f0820 100%)",
      }}
    >
      {/* Poświata księżyca w prawym górnym rogu */}
      <div
        style={{
          position: "absolute",
          top: "-10vh",
          right: "-5vw",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,180,230,0.12) 0%, rgba(139,92,246,0.05) 30%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      {/* Poświata fioletowa dolna — horyzont */}
      <div
        style={{
          position: "absolute",
          bottom: "-20vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Chmury */}
      {clouds.map((c, i) => (
        <div
          key={i}
          className="sky-cloud"
          style={{
            top: c.top,
            width: `${c.width}px`,
            height: `${c.width * 0.42}px`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
            opacity: 0.55 + (i % 3) * 0.1,
            filter: `blur(${6 + (i % 4) * 2}px)`,
          }}
        >
          <div className="sky-cloud-body" />
          <div className="sky-cloud-bump sky-cloud-bump-a" />
          <div className="sky-cloud-bump sky-cloud-bump-b" />
          <div className="sky-cloud-bump sky-cloud-bump-c" />
        </div>
      ))}

      {/* Vignette — zaciemnione rogi, skupienie na środku */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,5,10,0.55) 95%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtelny grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }}
      />

      <style>{`
        .sky-cloud {
          position: absolute;
          left: 0;
          animation-name: sky-cloud-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .sky-cloud-body {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 55%;
          background:
            radial-gradient(ellipse at center, rgba(185,170,210,0.85) 0%, rgba(140,120,170,0.6) 60%, rgba(90,70,130,0.3) 100%);
          border-radius: 9999px;
        }
        .sky-cloud-bump {
          position: absolute;
          background:
            radial-gradient(circle at 40% 30%, rgba(200,185,220,0.9) 0%, rgba(150,130,180,0.6) 55%, rgba(90,70,130,0.25) 100%);
          border-radius: 50%;
        }
        .sky-cloud-bump-a {
          left: 10%;
          top: 8%;
          width: 42%;
          height: 78%;
        }
        .sky-cloud-bump-b {
          left: 36%;
          top: -8%;
          width: 52%;
          height: 96%;
        }
        .sky-cloud-bump-c {
          left: 62%;
          top: 18%;
          width: 36%;
          height: 62%;
        }
        @keyframes sky-cloud-drift {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        /* Horizontal transition animations */
        @keyframes h-arrow-bob {
          0%, 100% { transform: translateX(0); opacity: 0.7; }
          50% { transform: translateX(8px); opacity: 1; }
        }
        .h-arrow {
          display: inline-block;
          animation: h-arrow-bob 1.4s ease-in-out infinite;
        }
        .h-arrow-slow {
          animation: h-arrow-bob 2.4s ease-in-out infinite;
        }
        @keyframes h-glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .h-glow-pulse {
          animation: h-glow-pulse 3.6s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes h-spark-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.85) rotate(0deg); }
          50% { opacity: 0.85; transform: scale(1.15) rotate(20deg); }
        }
        .h-spark {
          animation: h-spark-twinkle 2.4s ease-in-out infinite;
          will-change: opacity, transform;
        }
        /* ServiceCard — stat hover */
        .svc-stat:hover {
          background: rgba(139,92,246,0.08) !important;
          border-color: rgba(139,92,246,0.45) !important;
          transform: translateY(-4px);
        }
        .svc-stat:hover .svc-stat-underline {
          width: 100% !important;
        }
        /* ServiceCard — example hover tilt + arrow reveal */
        .svc-example {
          will-change: transform, border-color, background;
        }
        .svc-example:hover {
          background: rgba(139,92,246,0.07) !important;
          border-color: rgba(139,92,246,0.5) !important;
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 20px 50px rgba(139,92,246,0.15);
        }
        .svc-example:hover .svc-example-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        /* ServiceCard — CTA hover */
        .svc-cta:hover {
          background: rgba(139,92,246,0.15);
          border-color: #8b5cf6 !important;
          box-shadow: 0 0 40px rgba(139,92,246,0.3);
        }
      `}</style>
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
        const progress = sec.querySelector(".h-progress") as HTMLElement | null;

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
            onUpdate: (self) => {
              if (progress) progress.style.width = `${self.progress * 100}%`;
            },
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
        background: "#000000",
        color: "#ffffff",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Nocne niebo R3F — gradient, chmury, gwiazdy */}
      <SkyBackground />

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
          <section
            className="relative flex justify-center items-start px-2 md:px-4"
            style={{
              paddingTop: ci === 0 ? "8vh" : "2vh",
              paddingBottom: "10vh",
              minHeight: "170vh",
            }}
          >
            <ServiceCard card={card} />
            {/* placeholder — stary wrapper zastąpiony ServiceCard; zachowuję pusty article żeby nie zepsuć struktury */}
            {false && <article
              className="relative w-full p-10 md:p-20 lg:p-28"
              style={{
                maxWidth: "1680px",
                minHeight: "200vh",
                background: "linear-gradient(180deg,#111111 0%,#0d0d0d 60%,#0a0a0a 100%)",
                border: "1px solid rgba(139,92,246,.15)",
                borderRadius: "32px",
                boxShadow: "0 0 120px rgba(139,92,246,.06), 0 40px 80px rgba(0,0,0,.5)",
              }}
            >
              {/* ── HERO: header + ogromny numer ── */}
              <header className="reveal-group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24 md:mb-40 items-start">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-4 mb-10">
                    <span
                      className="font-mono uppercase"
                      style={{ fontSize: "11px", letterSpacing: "0.5em", color: "#8b5cf6" }}
                    >
                      {card.no} / {card.label}
                    </span>
                    <span
                      className="flex-1 h-px"
                      style={{ background: "linear-gradient(90deg, rgba(139,92,246,.4) 0%, transparent 100%)" }}
                    />
                  </div>
                  <span
                    className="font-mono uppercase block mb-8"
                    style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#666" }}
                  >
                    {card.tagline}
                  </span>
                  <h2
                    className="font-black uppercase whitespace-pre-line"
                    style={{
                      fontSize: "clamp(56px, 8.5vw, 180px)",
                      lineHeight: 0.88,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {card.headline}
                  </h2>
                </div>
                <div className="lg:col-span-5 relative lg:-mt-4">
                  <div
                    className="relative flex items-end justify-end"
                    style={{ minHeight: "clamp(200px, 30vw, 460px)" }}
                  >
                    <span
                      className="font-black"
                      style={{
                        fontSize: "clamp(220px, 32vw, 520px)",
                        lineHeight: 0.75,
                        letterSpacing: "-0.08em",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(139,92,246,0.25)",
                      }}
                    >
                      {card.no}
                    </span>
                    <span
                      className="absolute right-0 bottom-0 text-right font-mono uppercase"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.35em",
                        color: "rgba(139,92,246,0.6)",
                        transform: "translateY(24px)",
                      }}
                    >
                      / usługa
                      <br />
                      ————
                    </span>
                  </div>
                </div>
              </header>

              {/* ── INTRO: dropcap-like opening paragraph ── */}
              <section className="reveal mb-24 md:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-2">
                  <span
                    className="font-mono uppercase block"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.4em",
                      color: "#8b5cf6",
                      borderTop: "1px solid rgba(139,92,246,.4)",
                      paddingTop: "12px",
                    }}
                  >
                    [ wstęp ]
                  </span>
                </div>
                <p
                  className="lg:col-span-9 lg:col-start-4"
                  style={{
                    fontSize: "clamp(20px, 1.8vw, 30px)",
                    color: "#dcdcdc",
                    lineHeight: 1.55,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {card.intro}
                </p>
              </section>

              {/* ── PULL QUOTE — wielki editorial moment ── */}
              <section
                className="reveal mb-24 md:mb-40 py-16 md:py-24 relative"
                style={{
                  borderTop: "1px solid rgba(139,92,246,.25)",
                  borderBottom: "1px solid rgba(139,92,246,.25)",
                }}
              >
                <span
                  className="absolute top-0 left-0 font-black select-none pointer-events-none"
                  style={{
                    transform: "translateY(-38%)",
                    fontSize: "clamp(120px, 15vw, 280px)",
                    lineHeight: 1,
                    color: "#8b5cf6",
                    opacity: 0.12,
                  }}
                >
                  &ldquo;
                </span>
                <blockquote
                  className="font-black uppercase whitespace-pre-line text-center max-w-6xl mx-auto"
                  style={{
                    fontSize: "clamp(36px, 5.5vw, 96px)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.025em",
                    color: "#ffffff",
                  }}
                >
                  {card.pullQuote.text}
                </blockquote>
                <div className="text-center mt-10">
                  <span
                    className="font-mono uppercase italic"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.3em",
                      color: "#8b5cf6",
                    }}
                  >
                    {card.pullQuote.attr}
                  </span>
                </div>
              </section>

              {/* ── BODY: 4 akapity w 2-kolumnowym gridzie z numerowaniem ── */}
              <section className="reveal-group mb-24 md:mb-40">
                <div className="flex items-baseline gap-4 mb-12">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#8b5cf6" }}
                  >
                    [ filozofia ]
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{ background: "rgba(139,92,246,.2)" }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                  {card.body.map((p, i) => (
                    <div key={i} className="relative">
                      <span
                        className="font-mono block mb-4"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.35em",
                          color: "#8b5cf6",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")} / 0{card.body.length}
                      </span>
                      <p
                        style={{
                          fontSize: "clamp(15px, 1.1vw, 18px)",
                          color: "#bbb",
                          lineHeight: 1.7,
                        }}
                      >
                        {p}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── PROCESS — 6 kroków w horizontal-ish gridzie ── */}
              <section className="reveal-group mb-24 md:mb-40">
                <div className="flex items-baseline gap-6 mb-14">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#8b5cf6" }}
                  >
                    [ proces ]
                  </span>
                  <h3
                    className="font-extralight uppercase"
                    style={{
                      fontSize: "clamp(32px, 4.5vw, 72px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "#fff",
                    }}
                  >
                    {card.process.length} kroków.
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {card.process.map((step) => (
                    <div
                      key={step.n}
                      className="relative p-6 md:p-8"
                      style={{
                        background: "rgba(139,92,246,0.025)",
                        borderLeft: "2px solid rgba(139,92,246,0.35)",
                      }}
                    >
                      <span
                        className="font-black block mb-3"
                        style={{
                          fontSize: "clamp(36px, 3.8vw, 56px)",
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                          color: "#8b5cf6",
                        }}
                      >
                        {step.n}
                      </span>
                      <h4
                        className="font-black uppercase mb-3"
                        style={{
                          fontSize: "clamp(18px, 1.4vw, 24px)",
                          lineHeight: 1.05,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {step.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#999",
                          lineHeight: 1.6,
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── STATS — 4 duże liczby z opisami ── */}
              <section className="reveal-group mb-24 md:mb-40">
                <div className="flex items-baseline gap-6 mb-14">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#8b5cf6" }}
                  >
                    [ liczby ]
                  </span>
                  <h3
                    className="font-extralight uppercase"
                    style={{
                      fontSize: "clamp(32px, 4.5vw, 72px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Nie słowa. Dane.
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                  {card.stats.map((s, i) => (
                    <div
                      key={s.l}
                      className="flex items-start gap-6"
                      style={{
                        borderTop: "1px solid rgba(139,92,246,0.25)",
                        paddingTop: "20px",
                      }}
                    >
                      <span
                        className="font-mono"
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.3em",
                          color: "#666",
                          minWidth: "32px",
                          paddingTop: "8px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <div
                          className="font-black"
                          style={{
                            fontSize: "clamp(40px, 5vw, 88px)",
                            lineHeight: 1,
                            letterSpacing: "-0.03em",
                            color: "#8b5cf6",
                          }}
                        >
                          {s.v}
                        </div>
                        <span
                          className="uppercase block mt-2"
                          style={{
                            fontSize: "13px",
                            letterSpacing: "0.2em",
                            color: "#fff",
                            fontWeight: 700,
                          }}
                        >
                          {s.l}
                        </span>
                        <p
                          className="mt-3"
                          style={{
                            fontSize: "14px",
                            color: "#999",
                            lineHeight: 1.55,
                          }}
                        >
                          {s.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── EXAMPLES / CASE TEASERS ── */}
              <section className="reveal-group mb-24 md:mb-40">
                <div className="flex items-baseline gap-6 mb-14">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#8b5cf6" }}
                  >
                    [ przykłady ]
                  </span>
                  <h3
                    className="font-extralight uppercase"
                    style={{
                      fontSize: "clamp(32px, 4.5vw, 72px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Konkrety, nie obietnice.
                  </h3>
                </div>
                <div
                  className={`grid gap-6 md:gap-8 ${
                    card.examples.length > 3
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 md:grid-cols-3"
                  }`}
                >
                  {card.examples.map((ex, i) => (
                    <article
                      key={ex.title}
                      className="relative p-7 md:p-9"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(139,92,246,0.15)",
                        borderRadius: "16px",
                      }}
                    >
                      <span
                        className="font-mono block mb-4"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.35em",
                          color: "#8b5cf6",
                        }}
                      >
                        case / {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4
                        className="font-black uppercase mb-4"
                        style={{
                          fontSize: "clamp(20px, 1.8vw, 30px)",
                          lineHeight: 1.05,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {ex.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "14.5px",
                          color: "#aaa",
                          lineHeight: 1.6,
                        }}
                      >
                        {ex.body}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              {/* ── CENNIK + PAKIETY ── */}
              <section className="reveal-group mb-20 md:mb-32">
                <div className="flex items-baseline gap-6 mb-14">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#8b5cf6" }}
                  >
                    [ cennik ]
                  </span>
                  <h3
                    className="font-extralight uppercase"
                    style={{
                      fontSize: "clamp(32px, 4.5vw, 72px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Jasno. Bez gwiazdek.
                  </h3>
                </div>
                <div
                  className={`grid gap-8 ${
                    card.packages.length > 1
                      ? "grid-cols-1 md:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {card.packages.map((pkg, pi) => (
                    <div
                      key={pkg.name}
                      className="relative flex flex-col p-8 md:p-10"
                      style={{
                        background: "rgba(139,92,246,.035)",
                        border: "1px solid rgba(139,92,246,.22)",
                        borderRadius: "16px",
                      }}
                    >
                      <span
                        className="font-mono absolute"
                        style={{
                          top: "-11px",
                          left: "28px",
                          padding: "4px 12px",
                          fontSize: "10px",
                          letterSpacing: "0.35em",
                          color: "#8b5cf6",
                          background: "#0a0a0a",
                          border: "1px solid rgba(139,92,246,.3)",
                          borderRadius: "6px",
                        }}
                      >
                        pakiet {String(pi + 1).padStart(2, "0")}
                      </span>
                      <div
                        style={{
                          borderBottom: "1px solid rgba(139,92,246,.25)",
                          paddingBottom: "18px",
                          marginBottom: "22px",
                          marginTop: "6px",
                        }}
                      >
                        <span
                          className="uppercase font-mono block"
                          style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#8b5cf6" }}
                        >
                          {pkg.name}
                        </span>
                        <div
                          className="font-black mt-3"
                          style={{
                            fontSize: "clamp(28px,3.2vw,48px)",
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {pkg.price}
                        </div>
                      </div>

                      <p
                        className="italic mb-5"
                        style={{
                          fontSize: "15px",
                          color: "#8b5cf6",
                          letterSpacing: "0.01em",
                          lineHeight: 1.4,
                        }}
                      >
                        {pkg.hook}
                      </p>
                      <p
                        className="mb-7"
                        style={{ fontSize: "14.5px", color: "#bbb", lineHeight: 1.6 }}
                      >
                        {pkg.desc}
                      </p>

                      <div className="mb-6">
                        <span
                          className="uppercase font-mono block mb-3"
                          style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#666" }}
                        >
                          [ Co dostajesz ]
                        </span>
                        <ul className="space-y-2">
                          {pkg.includes.map((inc) => (
                            <li
                              key={inc}
                              className="flex gap-3 text-sm"
                              style={{ color: "#ccc", lineHeight: 1.5 }}
                            >
                              <span style={{ color: "#8b5cf6", flexShrink: 0 }}>+</span>
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto">
                        <span
                          className="uppercase font-mono block mb-3"
                          style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#666" }}
                        >
                          [ Efekty ]
                        </span>
                        <ul className="space-y-2">
                          {pkg.effects.map((ef) => (
                            <li
                              key={ef}
                              className="flex gap-3 text-sm"
                              style={{ color: "#999", lineHeight: 1.5 }}
                            >
                              <span style={{ color: "#8b5cf6", flexShrink: 0 }}>→</span>
                              <span>{ef}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── CLOSING STATEMENT ── */}
              <section
                className="reveal relative pt-16 md:pt-24"
                style={{ borderTop: "1px solid rgba(139,92,246,.25)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                  <div className="lg:col-span-8">
                    <h3
                      className="font-black uppercase mb-6"
                      style={{
                        fontSize: "clamp(40px, 5vw, 96px)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {card.closing.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(16px, 1.3vw, 20px)",
                        color: "#bbb",
                        lineHeight: 1.6,
                        maxWidth: "60ch",
                      }}
                    >
                      {card.closing.body}
                    </p>
                  </div>
                  <div className="lg:col-span-4 text-right">
                    <span
                      className="font-mono uppercase block"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.4em",
                        color: "#8b5cf6",
                      }}
                    >
                      — Studio Bezsenność
                    </span>
                    <span
                      className="font-mono uppercase block mt-2"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.35em",
                        color: "#555",
                      }}
                    >
                      {card.no} · {card.label}
                    </span>
                  </div>
                </div>
              </section>
            </article>}
          </section>

          {/* ── POZIOME PRZEJŚCIE — interludium między kartami ── */}
          {ci < cards.length - 1 && (
            <section className="h-transition relative w-full" style={{ height: "100vh" }}>
              {/* Licznik panelu + progress bar */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  top: "32px",
                  left: "32px",
                  right: "32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.5em",
                    color: "#8b5cf6",
                  }}
                >
                  {cards[ci].no} → {cards[ci + 1].no}
                </span>
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    color: "#666",
                  }}
                >
                  [ interludium · przewiń dalej ]
                </span>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
                style={{ height: "2px", background: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="h-progress"
                  style={{ height: "100%", background: "#8b5cf6", width: "0%" }}
                />
              </div>

              <div
                className="h-track flex items-center"
                style={{ width: "600vw", height: "100vh" }}
              >
                {/* Panel 1 — tranzycja numeryczna */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden px-6">
                  <div className="flex items-center gap-8 md:gap-16">
                    <span
                      className="font-black uppercase"
                      style={{
                        fontSize: "clamp(80px, 14vw, 240px)",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                      }}
                    >
                      {cards[ci].no}
                    </span>
                    <span
                      className="inline-block h-arrow"
                      style={{
                        fontSize: "clamp(48px, 7vw, 120px)",
                        color: "#8b5cf6",
                        fontWeight: 300,
                      }}
                    >
                      →
                    </span>
                    <span
                      className="font-black uppercase"
                      style={{
                        fontSize: "clamp(80px, 14vw, 240px)",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "#8b5cf6",
                      }}
                    >
                      {cards[ci + 1].no}
                    </span>
                  </div>
                </div>

                {/* Panel 2 — wielki outline word na niebie */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute pointer-events-none h-glow-pulse"
                    style={{
                      width: "60vw",
                      height: "60vw",
                      background:
                        "radial-gradient(circle,rgba(139,92,246,.25) 0%,transparent 60%)",
                      filter: "blur(80px)",
                    }}
                  />
                  <span
                    className="relative font-black uppercase text-center"
                    style={{
                      fontSize: "clamp(56px,14vw,260px)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.04em",
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(255,255,255,.18)",
                    }}
                  >
                    {transitions[ci].skyWord}
                  </span>
                  {/* Dekoratory */}
                  <span
                    className="absolute h-spark"
                    style={{
                      top: "18%",
                      left: "15%",
                      fontSize: "48px",
                      color: "#8b5cf6",
                      opacity: 0.5,
                    }}
                  >
                    ✦
                  </span>
                  <span
                    className="absolute h-spark"
                    style={{
                      bottom: "22%",
                      right: "18%",
                      fontSize: "32px",
                      color: "#8b5cf6",
                      opacity: 0.4,
                      animationDelay: "0.8s",
                    }}
                  >
                    ✦
                  </span>
                </div>

                {/* Panel 3 — cytat/teza (dwie linie, różne wagi) */}
                <div className="flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center relative px-12">
                  <span
                    className="font-mono uppercase mb-10"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.5em",
                      color: "#8b5cf6",
                    }}
                  >
                    [ teza ]
                  </span>
                  <div className="text-center max-w-6xl">
                    <div
                      className="italic font-light"
                      style={{
                        fontSize: "clamp(36px,6vw,110px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {transitions[ci].quoteLines[0]}
                    </div>
                    <div
                      className="font-black uppercase mt-4 md:mt-6"
                      style={{
                        fontSize: "clamp(48px,9vw,160px)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.03em",
                        color: "#ffffff",
                      }}
                    >
                      {transitions[ci].quoteLines[1]}
                    </div>
                  </div>
                </div>

                {/* Panel 4 — fakt / wielka liczba */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute pointer-events-none h-glow-pulse"
                    style={{
                      width: "55vw",
                      height: "55vw",
                      background:
                        "radial-gradient(circle,rgba(139,92,246,.18) 0%,transparent 60%)",
                      filter: "blur(70px)",
                      animationDelay: "1s",
                    }}
                  />
                  <div className="relative text-center">
                    <span
                      className="font-mono uppercase block mb-6"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.5em",
                        color: "#8b5cf6",
                      }}
                    >
                      [ fakt ]
                    </span>
                    <div
                      className="font-black"
                      style={{
                        fontSize: "clamp(80px,18vw,320px)",
                        lineHeight: 0.9,
                        letterSpacing: "-0.05em",
                        color: "#8b5cf6",
                      }}
                    >
                      {transitions[ci].stat.big}
                    </div>
                    <div
                      className="uppercase mt-8 italic"
                      style={{
                        fontSize: "clamp(14px,1.4vw,22px)",
                        letterSpacing: "0.3em",
                        color: "#bbb",
                      }}
                    >
                      {transitions[ci].stat.small}
                    </div>
                  </div>
                </div>

                {/* Panel 5 — proces (4 kroki w linii) */}
                <div className="flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center relative px-6">
                  <span
                    className="font-mono uppercase mb-16"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.5em",
                      color: "#8b5cf6",
                    }}
                  >
                    [ proces ]
                  </span>
                  <div className="flex items-center gap-4 md:gap-10 flex-wrap justify-center">
                    {transitions[ci].process.map((p, pi) => (
                      <div key={p} className="flex items-center gap-4 md:gap-10">
                        <div className="flex flex-col items-center">
                          <span
                            className="font-mono mb-3"
                            style={{
                              fontSize: "10px",
                              letterSpacing: "0.3em",
                              color: "#8b5cf6",
                            }}
                          >
                            {String(pi + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="font-black uppercase"
                            style={{
                              fontSize: "clamp(28px,4vw,64px)",
                              lineHeight: 1,
                              letterSpacing: "-0.02em",
                              color: "#ffffff",
                            }}
                          >
                            {p}
                          </span>
                        </div>
                        {pi < transitions[ci].process.length - 1 && (
                          <span
                            style={{
                              fontSize: "clamp(18px,2vw,32px)",
                              color: "rgba(139,92,246,0.6)",
                              fontWeight: 300,
                            }}
                          >
                            →
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel 6 — zapowiedź następnej karty */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width: "70vw",
                      height: "70vw",
                      background:
                        "radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 55%)",
                      filter: "blur(90px)",
                    }}
                  />
                  <div className="relative text-center">
                    <span
                      className="font-mono uppercase block mb-6"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.5em",
                        color: "#666",
                      }}
                    >
                      przed Tobą
                    </span>
                    <span
                      className="font-black uppercase block"
                      style={{
                        fontSize: "clamp(48px,8vw,140px)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.03em",
                        color: "#ffffff",
                      }}
                    >
                      {cards[ci + 1].label}
                    </span>
                    <span
                      className="font-mono uppercase inline-block mt-8 h-arrow-slow"
                      style={{
                        fontSize: "16px",
                        letterSpacing: "0.4em",
                        color: "#8b5cf6",
                      }}
                    >
                      {cards[ci + 1].no} →
                    </span>
                  </div>
                </div>
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
