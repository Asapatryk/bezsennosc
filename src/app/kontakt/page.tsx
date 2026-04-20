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

function nowClock() {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
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
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const currentQ = questions[step];

  /* Live clock */
  useEffect(() => {
    setClock(nowClock());
    const id = setInterval(() => setClock(nowClock()), 1000);
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
        <aside className="lg:col-span-1 flex flex-col gap-5 md:gap-7">
          {/* Block 1: direct */}
          <section
            className="p-6 md:p-8"
            style={{
              background: "#0a0a0a",
              border: "1px solid rgba(139,92,246,.15)",
              borderRadius: "12px",
            }}
          >
            <span
              className="font-mono uppercase block"
              style={{
                fontSize: "10px",
                letterSpacing: "0.35em",
                color: "#8b5cf6",
                marginBottom: "22px",
              }}
            >
              [ bezpośredni kontakt ]
            </span>
            <div style={{ marginBottom: "24px" }}>
              <span
                className="font-mono uppercase block"
                style={{
                  fontSize: "10px",
                  color: "#555",
                  letterSpacing: "0.3em",
                  marginBottom: "10px",
                }}
              >
                telefon
              </span>
              <a
                href="tel:+48722744722"
                className="font-black block transition-colors duration-300"
                style={{
                  fontSize: "clamp(20px, 2vw, 26px)",
                  letterSpacing: "-0.01em",
                  color: "#fff",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "#8b5cf6")
                }
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                +48 722 744 722
              </a>
            </div>
            <div>
              <span
                className="font-mono uppercase block"
                style={{
                  fontSize: "10px",
                  color: "#555",
                  letterSpacing: "0.3em",
                  marginBottom: "10px",
                }}
              >
                email
              </span>
              <a
                href="mailto:studiobezsennosc@gmail.com"
                className="block break-all transition-colors duration-300"
                style={{ fontSize: "15px", color: "#fff" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "#8b5cf6")
                }
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                studiobezsennosc@gmail.com
              </a>
            </div>
          </section>

          {/* Block 2: hours */}
          <section
            className="p-6 md:p-8"
            style={{
              background: "#0a0a0a",
              border: "1px solid rgba(139,92,246,.15)",
              borderRadius: "12px",
            }}
          >
            <span
              className="font-mono uppercase block"
              style={{
                fontSize: "10px",
                letterSpacing: "0.35em",
                color: "#8b5cf6",
                marginBottom: "22px",
              }}
            >
              [ godziny pracy ]
            </span>
            <div className="flex flex-col gap-3">
              {workingHours.map((w) => (
                <div
                  key={w.days}
                  className="flex items-baseline justify-between"
                  style={{
                    borderBottom: "1px dashed rgba(139,92,246,.1)",
                    paddingBottom: "8px",
                  }}
                >
                  <span
                    className="uppercase"
                    style={{
                      fontSize: "12px",
                      color: "#aaa",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {w.days}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "13px",
                      color: "#fff",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {w.hrs}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="italic mt-5"
              style={{
                fontSize: "12px",
                color: "#666",
                lineHeight: 1.5,
              }}
            >
              Piszemy też poza godzinami. Odpowiedź do 24h.
            </p>
          </section>

          {/* Block 3: social */}
          <section
            className="p-6 md:p-8"
            style={{
              background: "#0a0a0a",
              border: "1px solid rgba(139,92,246,.15)",
              borderRadius: "12px",
            }}
          >
            <span
              className="font-mono uppercase block"
              style={{
                fontSize: "10px",
                letterSpacing: "0.35em",
                color: "#8b5cf6",
                marginBottom: "22px",
              }}
            >
              [ social ]
            </span>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="kontakt-social flex items-center justify-between px-4 py-3 transition-all"
                  style={{
                    border: "1px solid rgba(139,92,246,.2)",
                    borderRadius: "8px",
                    color: "#aaa",
                  }}
                >
                  <span
                    className="uppercase"
                    style={{ fontSize: "13px", letterSpacing: "0.15em" }}
                  >
                    {s.label}
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        color: "#8b5cf6",
                      }}
                    >
                      {s.short}
                    </span>
                    <span style={{ color: "#8b5cf6" }}>→</span>
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Block 4: signature */}
          <section className="px-2">
            <p
              className="italic"
              style={{
                fontSize: "13px",
                color: "#666",
                lineHeight: 1.6,
              }}
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
      `}</style>
    </main>
  );
}
