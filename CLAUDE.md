# Studio Bezsenność — Instrukcje dla Claude Code

## O firmie
Studio Bezsenność to kreatywne studio cyfrowe. Tworzymy strony internetowe, sklepy online, prowadzimy marketing w Meta (Facebook/Instagram Ads) i automatyzację AI. Nazwa odzwierciedla naszą filozofię — pracujemy z pasją, non-stop.

## Styl wizualny — WAŻNE
Styl inspirowany stroną lxtrendship.com:
- Ciemne tło ZAWSZE (#050505 lub #0a0a0a)
- Piękna, duża typografia — to jest GŁÓWNY element designu
- Animacje tekstu: litery wchodzące pojedynczo, słowa reveal na scroll, text split animations
- Smooth scroll (Lenis) — płynne, eleganckie przewijanie
- Parallax — subtelny, nie przesadzony, na tekstach i obrazach
- Minimalizm — mniej znaczy więcej, dużo przestrzeni, oddech między sekcjami
- Eleganckie animacje wejścia na scroll — fade, slide, reveal, clip-path
- Delikatne hover efekty — nie krzykliwe
- Opcjonalnie lekkie 3D jako akcent — nie jako główny element
- NIE przeładowane efektami — każdy efekt ma cel

## Typografia
- Font: League Spartan — nagłówki bold, duże (text-6xl do text-9xl)
- Nagłówki: uppercase, letter-spacing wider
- Animacje tekstu przez split-type + GSAP (każda litera osobno)
- Tekst body: lekki, czytelny, dużo line-height

## Paleta kolorów
- Tło: #050505 (główne), #0a0a0a, #111111
- Tekst: #ffffff (nagłówki), #999999 (body/secondary)
- Akcent: #8b5cf6 (fioletowy) — używać OSZCZĘDNIE, tylko na hover i detale
- Linie/bordery: rgba(255,255,255,0.1)

## Stack technologiczny
- Next.js z TypeScript i App Router
- Tailwind CSS
- GSAP + ScrollTrigger (scrub: true) — główna biblioteka animacji
- split-type — do dzielenia tekstu na litery/słowa
- Lenis — smooth scroll
- Framer Motion — proste animacje UI
- Three.js / React Three Fiber — TYLKO jako delikatny akcent, nie główny element
- Hosting: Vercel

## Zasady kodowania
- Komponenty w src/components/
- TypeScript, "use client" gdzie potrzebne
- KAŻDY komponent MUSI mieć ciemne tło — NIGDY białe
- Mobile-first, responsywny

## Zasady animacji
- Wszystko sterowane scrollem (ScrollTrigger scrub: true)
- Tekst: split na litery, reveal przez GSAP (stagger 0.03-0.05s)
- Obrazy: reveal z clip-path lub opacity+translate
- Sekcje: fade in z translate-y przy wejściu w viewport
- Przejścia PŁYNNE — nigdy ostre cięcia
- Animacje ELEGANCKIE i POWOLNE — nie szybkie i chaotyczne
- Parallax SUBTELNY — max 20-30% różnicy prędkości

## Czego NIE robić
- NIGDY białe tło
- NIGDY przeładowane 3D efektami
- NIGDY szybkie chaotyczne animacje
- NIGDY za dużo kolorów — max 2-3
- NIGDY za mały tekst — nagłówki muszą być DUŻE
- NIGDY bez smooth scroll
- Nie rób zmian bez sprawdzenia czy strona się renderuje

## MCP Servers
- Nano Banana 2 — generowanie obrazów/tekstur
- 21st.dev Magic — generowanie komponentów UI
- Google Stitch — generowanie designów

## Git
- Commit po KAŻDEJ ukończonej sekcji
- Opisowe commity po polsku
