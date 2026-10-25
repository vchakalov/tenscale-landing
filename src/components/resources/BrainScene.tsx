"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrainOrb } from "@/components/resources/BrainOrb";

/**
 * The template at work, as a loop. Someone asks the brain a question and it
 * follows the index lines to the one page it needs. Then a call note lands in
 * the Inbox, the brain files it on the client's page and writes a line in the
 * Log.
 *
 * The pages, the example agency and the example client are the template's
 * own (Northstar Media, ACME), so what a reader watches here is what they
 * find when they open it. Nothing is fetched: it is a drawing that moves.
 */

const PAGES = [
  { id: "home", icon: "🧠", label: "AI Brain", note: "map" },
  { id: "company", icon: "🏢", label: "Company" },
  { id: "acquisition", icon: "🧲", label: "Acquisition" },
  { id: "fulfillment", icon: "🚚", label: "Fulfillment" },
  { id: "clients", label: "Clients", child: true },
  { id: "onboarding", label: "Onboarding", child: true },
  { id: "inbox", icon: "📥", label: "Inbox (raw)" },
  { id: "log", icon: "📓", label: "Log" },
] as const;
type PageId = (typeof PAGES)[number]["id"];

/** One sidebar row, in pixels: the highlight and the call note move in rows. */
const ROW = 34;
const ROW_OF = (id: PageId) => PAGES.findIndex((page) => page.id === id);
const TYPE_MS = 45;

const QUESTION = "How do we onboard a new client?";
const COMMAND = "Organize the inbox";
const ASK = ["Reading AI Brain, the map", "Reading the Fulfillment index", "Opening Onboarding"];
const UPDATE = ["Reading the Inbox: 1 call note", "Updating Clients › ACME", "Adding a line to the Log"];
const TO_ONBOARDING = ["AI Brain", "Fulfillment", "Onboarding"];
const TO_ACME = ["AI Brain", "Fulfillment", "Clients", "ACME"];

type Step = {
  /** How long the step holds; a typing step lasts as long as its text takes. */
  ms: number;
  scene: "ask" | "update";
  typing?: string;
  sent?: boolean;
  /** Progress lines on screen, and how many of them are done. */
  shown?: number;
  done?: number;
  at?: PageId;
  trail?: string[];
  thinking?: boolean;
  /** The Fulfillment index card: 1 open, 2 with the Onboarding line lit. */
  index?: 1 | 2;
  answer?: boolean;
  note?: "rest" | "fly";
  diff?: boolean;
  log?: boolean;
  fade?: boolean;
};

const STEPS: Step[] = [
  { ms: 800, scene: "ask" },
  { ms: 0, scene: "ask", typing: QUESTION },
  { ms: 1000, scene: "ask", sent: true, shown: 1, done: 0, at: "home", trail: ["AI Brain"], thinking: true },
  { ms: 1000, scene: "ask", sent: true, shown: 2, done: 1, at: "fulfillment", trail: ["AI Brain", "Fulfillment"], thinking: true, index: 1 },
  { ms: 1000, scene: "ask", sent: true, shown: 3, done: 2, at: "onboarding", trail: TO_ONBOARDING, thinking: true, index: 2 },
  { ms: 3800, scene: "ask", sent: true, shown: 3, done: 3, at: "onboarding", trail: TO_ONBOARDING, answer: true },
  { ms: 900, scene: "ask", sent: true, shown: 3, done: 3, at: "onboarding", trail: TO_ONBOARDING, answer: true, fade: true, note: "rest" },
  { ms: 0, scene: "update", typing: COMMAND, note: "rest" },
  { ms: 1000, scene: "update", sent: true, shown: 1, done: 0, at: "inbox", trail: ["Inbox (raw)"], thinking: true, note: "rest" },
  { ms: 1300, scene: "update", sent: true, shown: 2, done: 1, at: "clients", trail: TO_ACME, thinking: true, note: "fly" },
  { ms: 1300, scene: "update", sent: true, shown: 3, done: 2, at: "clients", trail: TO_ACME, thinking: true, diff: true },
  { ms: 3800, scene: "update", sent: true, shown: 3, done: 3, at: "log", trail: ["Log"], diff: true, log: true },
  { ms: 900, scene: "update", sent: true, shown: 3, done: 3, at: "log", trail: ["Log"], diff: true, log: true, fade: true },
];
/** The frame shown, still, to a reader who asked for less motion. */
const STILL = 5;

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export function BrainScene() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [running, setRunning] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(REDUCE).matches, () => false);

  // Plays only while on screen and in a visible tab.
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let onScreen = false;
    const update = () => setRunning(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!running || reduced) return;
    const text = STEPS[step].typing;
    const typer = text ? window.setInterval(() => setTyped((n) => Math.min(text.length, n + 1)), TYPE_MS) : 0;
    const timer = window.setTimeout(
      () => {
        setTyped(0);
        setStep((i) => (i + 1) % STEPS.length);
      },
      text ? text.length * TYPE_MS + 550 : STEPS[step].ms,
    );
    return () => {
      window.clearInterval(typer);
      window.clearTimeout(timer);
    };
  }, [step, running, reduced]);

  const s = reduced ? STEPS[STILL] : STEPS[step];
  const lines = s.scene === "ask" ? ASK : UPDATE;
  const asked = s.scene === "ask" ? QUESTION : COMMAND;
  const prompt = s.typing ? s.typing.slice(0, typed) : "";
  const at = s.at ? ROW_OF(s.at) : -1;
  const trail = s.trail ?? ["AI Brain"];

  return (
    <div ref={root} className="brain-enter relative mx-auto w-full max-w-[680px] lg:mr-0" aria-hidden="true">
      {/* The ground: a dot grid fading out, a lime light behind the brain, a violet one opposite. */}
      <div className="brain-grid pointer-events-none absolute -inset-x-8 -inset-y-14" />
      <div className="pointer-events-none absolute -top-16 -right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(226,249,59,0.32),transparent_68%)]" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(106,44,255,0.11),transparent_68%)]" />

      {/* The brain, floating over the window's corner. */}
      <div className="brain-float absolute -top-11 -right-2 z-20 sm:-top-14 sm:-right-7">
        <BrainOrb thinking={!!s.thinking} className="h-[84px] w-[84px] sm:h-[112px] sm:w-[112px]" />
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-medium whitespace-nowrap text-[#0e0e0f] shadow-[0_8px_20px_-12px_rgba(14,14,15,0.5)] ring-1 ring-black/[0.06]">
          {s.thinking ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6a2cff]" />
              Reading
            </span>
          ) : (
            "AI Brain"
          )}
        </span>
      </div>

      {/* The window, in its tray. */}
      <div className="relative rounded-[2rem] bg-black/[0.035] p-1.5 shadow-[0_50px_90px_-56px_rgba(14,14,15,0.5)] ring-1 ring-black/[0.06]">
        <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]">
          <div className="flex h-11 items-center gap-3 border-b border-black/[0.05] px-4">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-black/[0.1]" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/[0.1]" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/[0.1]" />
            </span>
            <span className="truncate text-[12.5px] text-[#3a3a3d]">
              🧠 AI Brain <span className="text-[#9a9a9e]">· Northstar Media</span>
            </span>
          </div>

          <div className="flex">
            {/* The template's sidebar. A phone keeps only the trail above the chat. */}
            <div className="relative hidden w-[196px] shrink-0 border-r border-black/[0.05] bg-[#fafaf8] px-2 py-3 sm:block">
              <p className="px-2.5 pb-2 text-[10px] font-medium tracking-[0.16em] text-[#8a8a8e] uppercase">Pages</p>
              <div className="relative">
                <div
                  className="absolute inset-x-0 top-0 rounded-[10px] bg-white shadow-[0_6px_16px_-10px_rgba(14,14,15,0.35)] ring-1 ring-black/[0.07] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ height: ROW, transform: `translateY(${Math.max(at, 0) * ROW}px)`, opacity: at < 0 ? 0 : 1 }}
                />
                <ul className="relative">
                  {PAGES.map((page, i) => (
                    <li
                      key={page.id}
                      style={{ height: ROW }}
                      className={`flex items-center gap-2 pr-2 text-[13px] transition-colors duration-500 ${"child" in page ? "pl-8" : "pl-2.5"} ${
                        i === at ? "font-medium text-[#0e0e0f]" : "text-[#55555a]"
                      }`}
                    >
                      {"icon" in page ? (
                        <span className="w-4 text-center text-[13px]">{page.icon}</span>
                      ) : (
                        <span className="h-1 w-1 rounded-full bg-black/25" />
                      )}
                      <span className="truncate">{page.label}</span>
                      {"note" in page && (
                        <span className="rounded-full bg-black/[0.05] px-1.5 text-[10px] leading-[16px] text-[#6b6b70]">{page.note}</span>
                      )}
                      {i === at && s.thinking && <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[#6a2cff]" />}
                      {page.id === "log" && s.log && (
                        <span className="brain-in ml-auto rounded-full bg-[#e2f93b] px-1.5 font-mono text-[10px] leading-[16px] text-[#0b0b0c]">+1</span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* The call note: it lands in the Inbox, then travels to the client's page. */}
                <div
                  className="absolute left-[112px] z-10 flex h-6 items-center gap-1 rounded-md bg-white px-1.5 text-[10.5px] whitespace-nowrap text-[#3a3a3d] shadow-[0_8px_18px_-8px_rgba(14,14,15,0.45)] ring-1 ring-black/[0.08]"
                  style={{
                    top: ROW_OF("inbox") * ROW + (ROW - 24) / 2,
                    opacity: s.note === "rest" ? 1 : 0,
                    transform:
                      s.note === "fly"
                        ? `translate(-8px, ${(ROW_OF("clients") - ROW_OF("inbox")) * ROW}px) scale(0.9)`
                        : s.note === "rest"
                          ? "none"
                          : "translateY(-6px) scale(0.85)",
                    transition:
                      s.note === "fly"
                        ? "transform 0.9s var(--home-ease), opacity 0.35s var(--home-ease) 0.75s"
                        : s.note === "rest"
                          ? "transform 0.5s var(--home-ease), opacity 0.4s var(--home-ease)"
                          : "none",
                  }}
                >
                  📄 call-notes
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-10 items-center gap-1.5 overflow-hidden border-b border-black/[0.04] px-4 text-[12px] whitespace-nowrap text-[#6b6b70]">
                {trail.map((part, i) => (
                  <span key={`${i}-${part}`} className="brain-in flex shrink-0 items-center gap-1.5">
                    {i > 0 && <span className="text-[#b4b4b8]">›</span>}
                    <span className={i === trail.length - 1 ? "font-medium text-[#0e0e0f]" : ""}>{part}</span>
                  </span>
                ))}
              </div>

              <div className="relative h-[372px] px-4 pt-4 sm:h-[340px]">
                <div
                  className={`flex flex-col gap-3 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    s.fade ? "-translate-y-2 opacity-0 blur-[3px]" : ""
                  }`}
                >
                  {s.sent && (
                    <div key={asked} className="brain-in max-w-[88%] self-end rounded-2xl rounded-br-md bg-[#0e0e0f] px-3.5 py-2 text-[13px] leading-[18px] text-white">
                      {asked}
                    </div>
                  )}
                  {s.sent && (
                    <ul className="flex flex-col gap-2">
                      {lines.slice(0, s.shown).map((line, i) => (
                        <li key={line} className="brain-in flex items-center gap-2.5 text-[12.5px] text-[#2e2e30]">
                          {i < (s.done ?? 0) ? <Tick /> : <Spinner />}
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.answer && <Answer />}
                  {s.diff && <Diff />}
                  {s.log && (
                    <div className="brain-in flex items-center gap-2 rounded-xl bg-[#0e0e0f] px-3 py-2 text-[12px] text-white/80">
                      <span>📓</span>
                      <span className="font-mono text-[#e2f93b]">Log</span>
                      <span className="truncate">Today · ACME updated from the call notes</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-3 pb-3">
                <div className="flex h-11 items-center gap-2 rounded-full bg-[#f6f6f4] pr-1.5 pl-4 ring-1 ring-black/[0.06]">
                  <span className="min-w-0 flex-1 truncate text-[13px] text-[#0e0e0f]">
                    {prompt || (s.typing ? "" : <span className="text-[#9a9a9e]">Ask the brain anything</span>)}
                    {s.typing && <span className="brain-caret ml-px inline-block h-[15px] w-px translate-y-[3px] bg-[#0e0e0f]" />}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-white transition-colors duration-300 ${
                      prompt ? "bg-[#0e0e0f]" : "bg-black/[0.12]"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Fulfillment index, lifted out over the chat while the brain reads it; the answer takes its place. */}
      <div
        className={`absolute bottom-[92px] left-1/2 z-10 w-[min(300px,calc(100%-40px))] -translate-x-1/2 transition-[opacity,translate,rotate,scale] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] sm:right-8 sm:left-auto sm:translate-x-0 ${
          s.index ? "translate-y-0 -rotate-2 scale-100 opacity-100" : "translate-y-5 rotate-0 scale-95 opacity-0"
        }`}
      >
        <div className="rounded-[1.25rem] bg-black/[0.04] p-1 ring-1 ring-black/[0.06]">
          <div className="rounded-[calc(1.25rem-0.25rem)] bg-white p-3.5 shadow-[0_24px_48px_-28px_rgba(14,14,15,0.5)]">
            <p className="text-[11px] font-medium text-[#3a3a3d]">🚚 Fulfillment · index</p>
            <div className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 text-[11px] leading-[15px]">
              <span className="pb-1 font-medium text-[#8a8a8e]">Page</span>
              <span className="pb-1 font-medium text-[#8a8a8e]">Read it when…</span>
              {[
                ["Clients", "the question is about a client"],
                ["Onboarding", "a new client signs"],
                ["Support", "a client asks for help"],
              ].map(([page, when]) => (
                <div
                  key={page}
                  className={`col-span-2 grid grid-cols-subgrid rounded-md px-1.5 py-1.5 transition-colors duration-500 ${
                    page === "Onboarding" && s.index === 2 ? "bg-[#e2f93b]" : ""
                  }`}
                >
                  <span className="font-medium text-[#0e0e0f]">{page}</span>
                  <span className="text-[#4a4a4e]">{when}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Answer() {
  return (
    <div className="brain-in rounded-2xl bg-[#f6f6f4] p-3.5 ring-1 ring-black/[0.05]">
      <span className="inline-flex items-center rounded-full bg-[#e2f93b] px-2 py-0.5 font-mono text-[10.5px] text-[#0b0b0c]">
        3 pages read, not all 50
      </span>
      <p className="mt-2.5 text-[13px] font-medium text-[#0e0e0f]">When a client signs:</p>
      <ol className="mt-1.5 flex flex-col gap-1 text-[12.5px] leading-[18px] text-[#3a3a3d]">
        <li>1. Kickoff call within 24 hours</li>
        <li>2. Ad account, pixel and brand files shared</li>
        <li>3. First ads live on day 3</li>
      </ol>
      <p className="mt-2.5 text-[11px] text-[#8a8a8e]">Source: Fulfillment › Onboarding</p>
    </div>
  );
}

function Diff() {
  return (
    <div className="brain-in rounded-2xl bg-white p-3.5 shadow-[0_16px_32px_-24px_rgba(14,14,15,0.4)] ring-1 ring-black/[0.07]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12.5px] font-medium text-[#0e0e0f]">Clients › ACME</span>
        <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[10.5px] text-[#5c5c60]">2 lines added</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1.5 font-mono text-[11.5px] text-[#0b0b0c]">
        <li className="brain-in rounded-md bg-[#e2f93b]/50 px-2 py-1 [animation-delay:250ms]">+ Never use stock photos</li>
        <li className="brain-in rounded-md bg-[#e2f93b]/50 px-2 py-1 [animation-delay:600ms]">+ Optimize for leads, not likes</li>
      </ul>
      <p className="mt-2 text-[11px] text-[#8a8a8e]">From today&apos;s call notes</p>
    </div>
  );
}

function Spinner() {
  return <span className="brain-spin h-4 w-4 shrink-0 rounded-full border-2 border-black/[0.12] border-t-[#0e0e0f]" />;
}

function Tick() {
  return (
    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#e2f93b] text-[#0b0b0c]">
      <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5">
        <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
