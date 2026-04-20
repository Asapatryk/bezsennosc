"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

type Question = {
  key: string;
  cmd: string;
  prompt: string;
  placeholder: string;
  type: "text" | "email" | "choice" | "textarea";
  choices?: string[];
  required?: boolean;
};

const questions: Question[] = [
  {
    key: "name",
    cmd: "query --01 name",
    prompt: "Jak się nazywasz? Imię albo nazwa firmy.",
    placeholder: "np. Jan Kowalski albo Firma XYZ",
    type: "text",
    required: true,
  },
  {
    key: "email",
    cmd: "query --02 contact",
    prompt: "Pod jaki email możemy się odezwać?",
    placeholder: "jan@example.com",
    type: "email",
    required: true,
  },
  {
    key: "service",
    cmd: "query --03 service",
    prompt: "Czego potrzebujesz? Wybierz jedno albo wpisz coś innego.",
    placeholder: "wpisz własną wersję albo kliknij sugestię ↑",
    type: "choice",
    choices: [
      "Strona internetowa",
      "Kampanie Meta",
      "Automatyzacja AI",
      "Branding",
      "Coś innego",
    ],
    required: true,
  },
  {
    key: "budget",
    cmd: "query --04 budget",
    prompt: "Jaki budżet orientacyjnie przewidujesz?",
    placeholder: "wybierz przedział albo wpisz swoją kwotę",
    type: "choice",
    choices: [
      "< 3 000 zł",
      "3 – 10 000 zł",
      "10 – 30 000 zł",
      "30 000 zł +",
      "Jeszcze nie wiem",
    ],
    required: true,
  },
  {
    key: "note",
    cmd: "query --05 note (optional)",
    prompt:
      "Cokolwiek jeszcze? Deadline, linki, inspiracje, pytania. Shift+Enter = nowa linia.",
    placeholder: "Opcjonalne — ale im więcej wiemy, tym lepsza wycena.",
    type: "textarea",
    required: false,
  },
];

const workingHours = [
  { days: "Pon — Czw", hrs: "14:00 — 22:00" },
  { days: "Piątek", hrs: "14:00 — 18:00" },
  { days: "Sob — Ndz", hrs: "12:00 — 18:00" },
];

const socials = [
  { label: "Instagram", short: "IG", href: "https://www.instagram.com/studiobezsennosc/" },
  {
    label: "Facebook",
    short: "FB",
    href: "https://www.facebook.com/profile.php?id=61576533071353&locale=pl_PL",
  },
];

const EEG_PATH =
  "M 0 55 Q 10 50 20 55 T 40 55 T 60 55 T 80 55 L 100 55 L 108 38 L 114 70 L 120 28 L 126 80 L 132 50 L 138 60 L 144 50 L 180 55 Q 195 51 210 55 T 240 55 L 270 55 L 276 47 L 282 62 L 288 44 L 294 60 L 300 50 L 340 55 Q 352 50 364 55 T 388 55 L 420 55 L 428 32 L 434 76 L 440 22 L 446 82 L 452 50 L 458 58 L 500 55 Q 515 50 530 55 T 560 55 T 590 55 L 600 55";

function nowClock() {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function getStatus(d: Date): boolean {
  const day = d.getDay();
  const h = d.getHours();
  if (day === 0 || day === 6) return h >= 12 && h < 18;
  if (day === 5) return h >= 14 && h < 18;
  return h >= 14 && h < 22;
}

function getDayBlock(d: Date): number {
  const day = d.getDay();
  if (day === 5) return 1;
  if (day === 0 || day === 6) return 2;
  return 0;
}

export default function KontaktPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [typedCmd, setTypedCmd] = useState("");
  const [typedPrompt, setTypedPrompt] = useState("");
  const [current, setCurrent] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentDayBlock, setCurrentDayBlock] = useState(0);
  const [activity, setActivity] = useState(87);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const currentQ = questions[step];

  /* Live clock */
  useEffect(() => {
    setClock(nowClock());
    const id = setInterval(() => setClock(nowClock()), 1000);
    return () => clearInterval(id);
  }, []);

  /* Status + day */
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setIsAvailable(getStatus(d));
      setCurrentDayBlock(getDayBlock(d));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  /* Fake activity meter — drifts naturally */
  useEffect(() => {
    const id = setInterval(() => {
      setActivity((prev) => {
        const next = prev + Math.round((Math.random() - 0.5) * 6);
        return Math.max(72, Math.min(96, next));
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  /* Typewriter effect — command first, then prompt */
  useEffect(() => {
    if (done || !currentQ) return;
    setTypedCmd("");
    setTypedPrompt("");
    let cancelled = false;

    const typeText = (
      text: string,
      setter: (s: string) => void,
      speed: number
    ): Promise<void> =>
      new Promise((resolve) => {
        let i = 0;
        const tick = () => {
          if (cancelled) return resolve();
          i++;
          setter(text.substring(0, i));
          if (i >= text.length) return resolve();
          setTimeout(tick, speed);
        };
        tick();
      });

    (async () => {
      await typeText(currentQ.cmd, setTypedCmd, 22);
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 160));
      await typeText(currentQ.prompt, setTypedPrompt, 15);
      if (cancelled) return;
      setTimeout(() => inputRef.current?.focus(), 80);
    })();

    return () => {
      cancelled = true;
    };
  }, [step, done, currentQ]);

  /* Auto-scroll terminal */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [step, typedPrompt, sending, done]);

  const submitAnswer = useCallback(() => {
    if (currentQ.required && !current.trim()) return;
    const value = current.trim() || "—";
    const newAnswers = { ...answers, [currentQ.key]: value };
    setAnswers(newAnswers);
    setCurrent("");

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    // Last question — send
    setSending(true);
    const body = [
      `Imię / firma: ${newAnswers.name}`,
      `Email: ${newAnswers.email}`,
      `Potrzeba: ${newAnswers.service}`,
      `Budżet: ${newAnswers.budget}`,
      `Notatka: ${newAnswers.note || "—"}`,
      "",
      "— wysłane z formularza studiobezsennosc.pl/kontakt",
    ].join("\n");
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = `mailto:studiobezsennosc@gmail.com?subject=${encodeURIComponent(
          `Zapytanie od ${newAnswers.name}`
        )}&body=${encodeURIComponent(body)}`;
      }
      setSending(false);
      setDone(true);
    }, 1400);
  }, [current, answers, step, currentQ]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitAnswer();
    }
  };

  const typingCmd = typedCmd.length < (currentQ?.cmd.length ?? 0);
  const typingPrompt =
    !typingCmd && typedPrompt.length < (currentQ?.prompt.length ?? 0);
  const readyForInput = currentQ && !typingCmd && !typingPrompt;

  return (
    <main
      className="relative"
      style={{
        background: "#050505",
        color: "#fff",
        minHeight: "100vh",
        fontFeatureSettings: '"tnum"',
      }}
    >
      <Navbar />

      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(139,92,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, #000 0%, transparent 70%)",
        }}
      />
      {/* Purple glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          top: "20vh",
          right: "-10vw",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle, rgba(139,92,246,.12) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-[1600px] mx-auto"
        style={{
          padding: "clamp(140px, 16vh, 200px) clamp(20px, 4vw, 60px) 80px",
          zIndex: 1,
        }}
      >
        {/* ════ TERMINAL ════ */}
        <div className="lg:col-span-2">
          {/* Label above */}
          <div className="flex items-baseline gap-4 mb-6">
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.5em",
                color: "#8b5cf6",
              }}
            >
              / kontakt
            </span>
            <span
              className="flex-1 h-px"
              style={{ background: "rgba(139,92,246,.2)" }}
            />
            <span
              className="font-mono"
              style={{ fontSize: "11px", color: "#666" }}
            >
              session · {clock}
            </span>
          </div>

          <h1
            className="font-black uppercase mb-10"
            style={{
              fontSize: "clamp(44px, 6vw, 96px)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
          >
            Powiedz nam,
            <br />
            czego potrzebujesz.
          </h1>

          {/* Terminal window */}
          <div
            className="relative flex flex-col"
            style={{
              background: "#0a0a0a",
              border: "1px solid rgba(139,92,246,0.22)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.5), 0 0 120px rgba(139,92,246,0.08)",
              minHeight: "620px",
            }}
          >
            {/* Chrome */}
            <div
              className="flex items-center gap-4 px-5 py-3"
              style={{
                background: "#0f0f12",
                borderBottom: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              <div className="flex gap-2">
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ff5f57",
                  }}
                />
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#febc2e",
                  }}
                />
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#28c840",
                  }}
                />
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: "12px",
                  color: "#888",
                  letterSpacing: "0.05em",
                }}
              >
                studiobezsennosc ·{" "}
                <span style={{ color: "#8b5cf6" }}>contact</span> · bash
              </span>
              <span
                className="ml-auto font-mono"
                style={{ fontSize: "11px", color: "#555" }}
              >
                {String(Math.min(step + 1, questions.length)).padStart(2, "0")} /{" "}
                {String(questions.length).padStart(2, "0")}
              </span>
            </div>

            {/* Body */}
            <div
              ref={terminalRef}
              className="flex-1 p-5 md:p-8 font-mono overflow-auto"
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                maxHeight: "70vh",
              }}
            >
              {/* Intro */}
              <div style={{ color: "#666", marginBottom: "32px" }}>
                <div>
                  <span style={{ color: "#8b5cf6" }}>$</span> init
                </div>
                <div style={{ color: "#888" }}>
                  ── bezsenność / contact protocol / v1.0 ──
                </div>
                <div>
                  odpowiedz na {questions.length} pytań · ~ 90 sekund · Enter =
                  dalej
                </div>
              </div>

              {/* History */}
              {questions.slice(0, step).map((q) => (
                <div key={q.key} style={{ marginBottom: "26px" }}>
                  <div style={{ color: "#666" }}>
                    <span style={{ color: "#8b5cf6" }}>$</span> {q.cmd}
                  </div>
                  <div style={{ color: "#999", marginTop: "4px" }}>
                    <span style={{ color: "#8b5cf6" }}>›</span> {q.prompt}
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      marginTop: "10px",
                      paddingLeft: "16px",
                      borderLeft: "2px solid #8b5cf6",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {answers[q.key]}
                  </div>
                </div>
              ))}

              {/* Current question typewriter */}
              {!sending && !done && currentQ && (
                <div style={{ marginBottom: "18px" }}>
                  <div style={{ color: "#666" }}>
                    <span style={{ color: "#8b5cf6" }}>$</span> {typedCmd}
                    {typingCmd && <span className="term-cursor">▊</span>}
                  </div>
                  {typedCmd === currentQ.cmd && (
                    <div style={{ color: "#aaa", marginTop: "4px" }}>
                      <span style={{ color: "#8b5cf6" }}>›</span>{" "}
                      {typedPrompt}
                      {typingPrompt && <span className="term-cursor">▊</span>}
                    </div>
                  )}
                </div>
              )}

              {/* Input — after typewriter done */}
              {readyForInput && !sending && !done && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitAnswer();
                  }}
                >
                  {/* Choices */}
                  {currentQ.type === "choice" && currentQ.choices && (
                    <div
                      className="flex flex-wrap gap-2 mb-4"
                      style={{ paddingLeft: "18px" }}
                    >
                      {currentQ.choices.map((c) => {
                        const isActive = current === c;
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              setCurrent(c);
                              inputRef.current?.focus();
                            }}
                            className="transition-all"
                            style={{
                              padding: "8px 14px",
                              fontSize: "13px",
                              color: isActive ? "#0a0a0a" : "#aaa",
                              background: isActive
                                ? "#8b5cf6"
                                : "transparent",
                              border: `1px solid ${
                                isActive
                                  ? "#8b5cf6"
                                  : "rgba(139,92,246,.3)"
                              }`,
                              borderRadius: "6px",
                              cursor: "pointer",
                              letterSpacing: "0.02em",
                              fontWeight: isActive ? 600 : 400,
                            }}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Input line */}
                  <div
                    className="flex items-start gap-3"
                    style={{
                      paddingLeft: "18px",
                      borderLeft: "2px solid #8b5cf6",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    <span style={{ color: "#8b5cf6", paddingTop: "2px" }}>
                      {">"}
                    </span>
                    {currentQ.type === "textarea" ? (
                      <textarea
                        ref={(el) => {
                          inputRef.current = el;
                        }}
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder={currentQ.placeholder}
                        rows={3}
                        className="flex-1 bg-transparent outline-none font-mono resize-none"
                        style={{
                          fontSize: "15px",
                          color: "#fff",
                          lineHeight: 1.6,
                          caretColor: "#8b5cf6",
                        }}
                      />
                    ) : (
                      <input
                        ref={(el) => {
                          inputRef.current = el;
                        }}
                        type={currentQ.type}
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder={currentQ.placeholder}
                        autoComplete="off"
                        className="flex-1 bg-transparent outline-none font-mono"
                        style={{
                          fontSize: "15px",
                          color: "#fff",
                          caretColor: "#8b5cf6",
                        }}
                      />
                    )}
                  </div>

                  {/* Controls */}
                  <div
                    className="flex items-center justify-between flex-wrap gap-4 mt-5"
                    style={{ paddingLeft: "18px" }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#555",
                        letterSpacing: "0.08em",
                      }}
                    >
                      press{" "}
                      <kbd
                        style={{
                          color: "#8b5cf6",
                          padding: "2px 8px",
                          border: "1px solid rgba(139,92,246,.35)",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontFamily: "inherit",
                          marginLeft: "4px",
                          marginRight: "4px",
                        }}
                      >
                        ENTER
                      </kbd>{" "}
                      {step === questions.length - 1
                        ? "to send"
                        : "to continue"}
                      {currentQ.type === "textarea" && (
                        <span style={{ color: "#444", marginLeft: "8px" }}>
                          · shift+enter = new line
                        </span>
                      )}
                    </span>
                    <button
                      type="submit"
                      className="transition-all hover:bg-[#8b5cf6]/10"
                      style={{
                        padding: "8px 20px",
                        fontSize: "12px",
                        letterSpacing: "0.25em",
                        color: "#8b5cf6",
                        background: "transparent",
                        border: "1px solid rgba(139,92,246,.5)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      {step === questions.length - 1 ? "wyślij →" : "dalej →"}
                    </button>
                  </div>
                </form>
              )}

              {/* Sending */}
              {sending && (
                <div style={{ marginTop: "16px", color: "#8b5cf6" }}>
                  <div>
                    <span style={{ color: "#8b5cf6" }}>$</span> transmitting...
                  </div>
                  <div style={{ marginTop: "8px", color: "#aaa" }}>
                    <span className="term-dot">●</span>
                    <span className="term-dot">●</span>
                    <span className="term-dot">●</span>
                    &nbsp; packet → studiobezsennosc@gmail.com
                  </div>
                </div>
              )}

              {/* Done */}
              {done && (
                <div style={{ marginTop: "18px" }}>
                  <div
                    style={{
                      color: "#8b5cf6",
                      fontSize: "17px",
                      marginBottom: "14px",
                    }}
                  >
                    ✓ transmission complete
                  </div>
                  <div style={{ color: "#aaa", marginBottom: "8px" }}>
                    Otworzyliśmy Twój klient pocztowy — wystarczy kliknąć
                    &bdquo;wyślij&rdquo;.
                  </div>
                  <div style={{ color: "#888" }}>
                    Nie otworzył się? Napisz bezpośrednio:{" "}
                    <a
                      href="mailto:studiobezsennosc@gmail.com"
                      style={{
                        color: "#8b5cf6",
                        textDecoration: "underline",
                      }}
                    >
                      studiobezsennosc@gmail.com
                    </a>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setAnswers({});
                        setStep(0);
                        setDone(false);
                        setCurrent("");
                      }}
                      className="transition-all hover:bg-[#8b5cf6]/10"
                      style={{
                        padding: "8px 18px",
                        fontSize: "11px",
                        letterSpacing: "0.25em",
                        color: "#8b5cf6",
                        background: "transparent",
                        border: "1px solid rgba(139,92,246,.4)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      ↻ od nowa
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div
              className="relative"
              style={{ height: "3px", background: "rgba(139,92,246,0.08)" }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#8b5cf6",
                  width: `${
                    ((step + (done ? 1 : 0)) / questions.length) * 100
                  }%`,
                  transition: "width 0.6s cubic-bezier(.16,1,.3,1)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ════ SIDEBAR ════ */}
        <aside className="lg:col-span-1 flex flex-col gap-5">
          {/* 1. STATUS PANEL */}
          <section className="kontakt-card relative overflow-hidden p-6 md:p-7">
            <div className="kontakt-card-shine" aria-hidden />
            <div className="flex items-center justify-between mb-5 relative">
              <span className="kontakt-label">[ status systemu ]</span>
              <span
                className={`kontakt-pill ${
                  isAvailable ? "kontakt-pill-live" : "kontakt-pill-away"
                }`}
              >
                <span className="kontakt-pill-dot" />
                {isAvailable ? "LIVE" : "AWAY"}
              </span>
            </div>
            <div className="relative">
              <div
                className="font-black uppercase mb-1"
                style={{
                  fontSize: "clamp(28px, 3vw, 36px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {isAvailable ? "Available" : "Offline"}
              </div>
              <div style={{ fontSize: "13px", color: "#888" }}>
                {isAvailable
                  ? "Jesteśmy przy klawiaturze."
                  : "Wracamy w godzinach pracy. Odpowiedź < 24h."}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 relative">
              <div>
                <div className="kontakt-mini-label">local · pl</div>
                <div className="font-mono text-white tabular-nums" style={{ fontSize: "15px" }}>
                  {clock}
                </div>
              </div>
              <div>
                <div className="kontakt-mini-label">uptime</div>
                <div className="font-mono text-white" style={{ fontSize: "15px" }}>
                  ∞ d
                </div>
              </div>
            </div>
          </section>

          {/* 2. CONTACT */}
          <section className="kontakt-card p-6 md:p-7">
            <span
              className="kontakt-label"
              style={{ display: "block", marginBottom: "18px" }}
            >
              [ bezpośredni kontakt ]
            </span>
            <a href="tel:+48722744722" className="kontakt-contact">
              <span className="kontakt-contact-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="flex flex-col flex-1 min-w-0">
                <span className="kontakt-mini-label">telefon</span>
                <span
                  className="font-black text-white"
                  style={{ fontSize: "20px", letterSpacing: "-0.01em" }}
                >
                  +48 722 744 722
                </span>
              </span>
              <span className="kontakt-arrow" aria-hidden>
                →
              </span>
            </a>
            <a
              href="mailto:studiobezsennosc@gmail.com"
              className="kontakt-contact"
              style={{ marginTop: "12px" }}
            >
              <span className="kontakt-contact-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span className="flex flex-col flex-1 min-w-0">
                <span className="kontakt-mini-label">email</span>
                <span
                  className="text-white truncate"
                  style={{ fontSize: "14px" }}
                >
                  studiobezsennosc@gmail.com
                </span>
              </span>
              <span className="kontakt-arrow" aria-hidden>
                →
              </span>
            </a>
          </section>

          {/* 3. EEG / BRAIN MONITOR — animated */}
          <section className="kontakt-card p-6 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <span className="kontakt-label">[ studio.signal ]</span>
              <span className="kontakt-pill kontakt-pill-rec">
                <span className="kontakt-pill-dot" />
                REC
              </span>
            </div>
            <div className="kontakt-eeg-wrap" aria-hidden>
              <div className="kontakt-eeg-grid" />
              <div className="kontakt-eeg-track">
                <svg
                  viewBox="0 0 600 110"
                  preserveAspectRatio="none"
                  className="kontakt-eeg-svg"
                >
                  <path
                    d={EEG_PATH}
                    stroke="#8b5cf6"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  viewBox="0 0 600 110"
                  preserveAspectRatio="none"
                  className="kontakt-eeg-svg"
                >
                  <path
                    d={EEG_PATH}
                    stroke="#8b5cf6"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="kontakt-eeg-fade" />
              <div className="kontakt-eeg-scan" />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div>
                <div className="kontakt-mini-label">activity</div>
                <div
                  className="font-mono text-white tabular-nums"
                  style={{ fontSize: "13px" }}
                >
                  {activity}
                  <span style={{ color: "#555" }}>%</span>
                </div>
              </div>
              <div>
                <div className="kontakt-mini-label">caffeine</div>
                <div
                  className="font-mono text-white"
                  style={{ fontSize: "13px" }}
                >
                  ∞ <span style={{ color: "#555" }}>mg</span>
                </div>
              </div>
              <div>
                <div className="kontakt-mini-label">sleep</div>
                <div
                  className="font-mono text-white"
                  style={{ fontSize: "13px" }}
                >
                  0.0 <span style={{ color: "#555" }}>h</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. HOURS */}
          <section className="kontakt-card p-6 md:p-7">
            <span
              className="kontakt-label"
              style={{ display: "block", marginBottom: "18px" }}
            >
              [ godziny pracy ]
            </span>
            <div className="flex flex-col gap-3">
              {workingHours.map((w, i) => {
                const isToday = currentDayBlock === i;
                return (
                  <div
                    key={w.days}
                    className="flex items-center justify-between"
                    style={{
                      borderBottom: "1px dashed rgba(139,92,246,.1)",
                      paddingBottom: "9px",
                    }}
                  >
                    <span
                      className="flex items-center gap-2 uppercase"
                      style={{
                        fontSize: "12px",
                        color: isToday ? "#fff" : "#888",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {isToday ? (
                        <span className="kontakt-today-dot" />
                      ) : (
                        <span
                          style={{
                            width: "6px",
                            height: "1px",
                            background: "#333",
                            display: "inline-block",
                          }}
                        />
                      )}
                      {w.days}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "13px",
                        color: isToday ? "#8b5cf6" : "#aaa",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {w.hrs}
                    </span>
                  </div>
                );
              })}
            </div>
            <p
              className="italic mt-5"
              style={{ fontSize: "12px", color: "#666", lineHeight: 1.5 }}
            >
              Piszemy też poza godzinami. Odpowiedź do 24h.
            </p>
          </section>

          {/* 5. SOCIAL */}
          <section className="kontakt-card p-6 md:p-7">
            <span
              className="kontakt-label"
              style={{ display: "block", marginBottom: "18px" }}
            >
              [ social ]
            </span>
            <div className="grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="kontakt-social-card"
                >
                  <span className="kontakt-social-icon">
                    {s.label === "Instagram" ? (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    )}
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      color: "#aaa",
                    }}
                  >
                    {s.label}
                  </span>
                  <span className="kontakt-social-arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* 6. SIGNATURE */}
          <section className="px-2">
            <p
              className="italic"
              style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}
            >
              &bdquo;Odpowiadamy zawsze — w zaciszu nocy albo rano przy kawie.&rdquo;
            </p>
            <span
              className="font-mono uppercase block mt-3"
              style={{
                fontSize: "10px",
                color: "#444",
                letterSpacing: "0.3em",
              }}
            >
              — studio bezsennosc
            </span>
          </section>
        </aside>
      </div>

      <style>{`
        @keyframes term-cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .term-cursor {
          display: inline-block;
          animation: term-cursor-blink 0.7s steps(2) infinite;
          margin-left: 2px;
          color: #8b5cf6;
        }
        @keyframes term-dot-pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.9); }
          40% { opacity: 1; transform: scale(1.1); }
        }
        .term-dot {
          display: inline-block;
          color: #8b5cf6;
          font-size: 14px;
          margin-right: 2px;
          animation: term-dot-pulse 1.4s ease-in-out infinite;
        }
        .term-dot:nth-child(2) { animation-delay: 0.15s; }
        .term-dot:nth-child(3) { animation-delay: 0.3s; }
        .kontakt-social:hover {
          background: rgba(139,92,246,0.08);
          border-color: #8b5cf6 !important;
          color: #fff !important;
        }

        /* ─── card base ─── */
        .kontakt-card {
          background: #0a0a0a;
          border: 1px solid rgba(139,92,246,.15);
          border-radius: 12px;
          transition: border-color .4s ease, transform .4s cubic-bezier(.16,1,.3,1);
        }
        .kontakt-card:hover {
          border-color: rgba(139,92,246,.3);
        }
        .kontakt-card-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 85% 0%, rgba(139,92,246,.18), transparent 55%);
          pointer-events: none;
        }

        /* ─── labels ─── */
        .kontakt-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 0.35em;
          color: #8b5cf6;
        }
        .kontakt-mini-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 0.25em;
          color: #555;
          margin-bottom: 4px;
          display: block;
        }

        /* ─── status pills ─── */
        .kontakt-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid;
        }
        .kontakt-pill-live {
          color: #4ade80;
          border-color: rgba(74,222,128,.3);
          background: rgba(74,222,128,.06);
        }
        .kontakt-pill-away {
          color: #888;
          border-color: rgba(255,255,255,.1);
          background: rgba(255,255,255,.02);
        }
        .kontakt-pill-rec {
          color: #ef4444;
          border-color: rgba(239,68,68,.3);
          background: rgba(239,68,68,.06);
        }
        .kontakt-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: currentColor;
          box-shadow: 0 0 8px currentColor;
          animation: kontakt-pulse 1.6s ease-in-out infinite;
        }
        @keyframes kontakt-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* ─── contact rows ─── */
        .kontakt-contact {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          border: 1px solid rgba(139,92,246,.15);
          border-radius: 10px;
          background: rgba(139,92,246,.02);
          text-decoration: none;
          transition: all .4s cubic-bezier(.16,1,.3,1);
        }
        .kontakt-contact:hover {
          border-color: rgba(139,92,246,.5);
          background: rgba(139,92,246,.06);
          transform: translateY(-1px);
        }
        .kontakt-contact-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(139,92,246,.25);
          border-radius: 8px;
          color: #8b5cf6;
          flex-shrink: 0;
          transition: all .4s ease;
        }
        .kontakt-contact:hover .kontakt-contact-icon {
          background: rgba(139,92,246,.12);
          border-color: #8b5cf6;
          box-shadow: 0 0 16px rgba(139,92,246,.3);
        }
        .kontakt-arrow {
          color: #444;
          font-size: 16px;
          display: inline-block;
          transition: transform .4s cubic-bezier(.16,1,.3,1), color .4s;
        }
        .kontakt-contact:hover .kontakt-arrow {
          color: #8b5cf6;
          transform: translateX(4px);
        }

        /* ─── EEG monitor ─── */
        .kontakt-eeg-wrap {
          position: relative;
          height: 120px;
          background: #050505;
          border: 1px solid rgba(139,92,246,.12);
          border-radius: 8px;
          overflow: hidden;
        }
        .kontakt-eeg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139,92,246,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,.07) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .kontakt-eeg-track {
          display: flex;
          width: 200%;
          height: 100%;
          animation: kontakt-eeg-scroll 7s linear infinite;
        }
        .kontakt-eeg-svg {
          width: 50%;
          height: 100%;
          display: block;
          filter: drop-shadow(0 0 4px rgba(139,92,246,.7));
        }
        @keyframes kontakt-eeg-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .kontakt-eeg-fade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, #050505 0%, transparent 8%, transparent 92%, #050505 100%);
        }
        .kontakt-eeg-scan {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          right: 18%;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,.18), transparent);
          pointer-events: none;
          mix-blend-mode: screen;
          animation: kontakt-eeg-scan 3.5s ease-in-out infinite;
        }
        @keyframes kontakt-eeg-scan {
          0%, 100% { opacity: 0.3; transform: translateX(-30px); }
          50% { opacity: 0.7; transform: translateX(30px); }
        }

        /* ─── today highlight ─── */
        .kontakt-today-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
          display: inline-block;
          animation: kontakt-pulse 1.6s ease-in-out infinite;
        }

        /* ─── social cards ─── */
        .kontakt-social-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          padding: 18px 16px;
          border: 1px solid rgba(139,92,246,.15);
          border-radius: 10px;
          background: rgba(139,92,246,.02);
          color: #aaa;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all .4s cubic-bezier(.16,1,.3,1);
        }
        .kontakt-social-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,.18), transparent 40%);
          opacity: 0;
          transition: opacity .4s ease;
          pointer-events: none;
        }
        .kontakt-social-card:hover {
          border-color: #8b5cf6;
          background: rgba(139,92,246,.08);
          transform: translateY(-2px);
          color: #fff;
          box-shadow: 0 12px 30px -10px rgba(139,92,246,.3);
        }
        .kontakt-social-card:hover::before { opacity: 1; }
        .kontakt-social-icon {
          color: #8b5cf6;
          display: inline-flex;
          transition: transform .4s ease;
        }
        .kontakt-social-card:hover .kontakt-social-icon {
          transform: scale(1.12) rotate(-4deg);
        }
        .kontakt-social-arrow {
          position: absolute;
          top: 14px;
          right: 14px;
          color: #444;
          font-size: 14px;
          transition: all .4s cubic-bezier(.16,1,.3,1);
        }
        .kontakt-social-card:hover .kontakt-social-arrow {
          color: #8b5cf6;
          transform: translate(2px, -2px);
        }
      `}</style>
    </main>
  );
}
