"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";

/** The public copy of the template. Notion puts a Duplicate button on it. */
export const AI_BRAIN_TEMPLATE_URL = "https://tenscale.notion.site/AI-Brain-3fea5f5d6f158114a357ca3bec779cd0";

type Refusal = "invalid" | "disposable" | "no_mail";

const REFUSALS: Record<Refusal, string> = {
  invalid: "That doesn't look like an email address.",
  disposable: "Temporary inboxes can't get the template. Use your work or personal email.",
  no_mail: "That domain can't receive email. Check the spelling?",
};

/**
 * The email in front of the template. The Worker checks the address
 * (worker/signup.ts): a throwaway inbox or a domain that takes no mail is
 * turned away with the reason, a real one is filed in GHL and the template
 * opens here.
 *
 * If the check itself fails (the Worker errors, the network drops), the
 * reader still gets the template: the address is lost, the reader is not.
 */
export function TemplateGate({ resource, source }: { resource: "ai-brain"; source: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [refusal, setRefusal] = useState<Refusal | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRefusal("invalid");
      return;
    }
    setState("sending");
    setRefusal(null);
    let result: Refusal | "ok" | "error" = "error";
    try {
      const res = await fetch("/resources/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, resource, website: String(form.get("website") ?? "") }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: Refusal };
      if (body.ok) result = "ok";
      else if (res.status < 500 && body.reason && body.reason in REFUSALS) result = body.reason;
    } catch {
      // the network: fall through as an error
    }
    track("template_signup", { resource, source, result });
    if (result === "ok" || result === "error") {
      setState("done");
    } else {
      setRefusal(result);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="brain-in flex w-full max-w-[520px] flex-col items-center gap-3 lg:items-start">
        <p className="flex items-center gap-2 text-[15px] font-medium text-[#0e0e0f]">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#e2f93b] text-[#0b0b0c]">
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
              <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          It&apos;s yours.
        </p>
        <a
          href={AI_BRAIN_TEMPLATE_URL}
          target="_blank"
          rel="noopener"
          onClick={() => track("template_open", { resource, source })}
          className="group inline-flex h-14 items-center justify-between gap-4 rounded-full bg-[linear-gradient(180deg,#242424_0%,#000000_100%)] pr-2 pl-7 text-[17px] font-semibold whitespace-nowrap text-white ring-1 ring-white/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:ring-4 focus-visible:ring-[#e2f93b]/70 focus-visible:outline-none active:scale-[0.98]"
        >
          Open the template
          <Chip />
        </a>
        <p className="text-[13px] text-[#6b6b70]">It opens in Notion: press Duplicate to copy it into your workspace.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex w-full max-w-[520px] flex-col items-center gap-3 lg:items-start">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-[0_18px_40px_-28px_rgba(14,14,15,0.45)] sm:ring-1 sm:ring-black/[0.1] sm:focus-within:ring-2 sm:focus-within:ring-[#6a2cff]/45">
        <label htmlFor={`email-${source}`} className="sr-only">
          Your email
        </label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@agency.com"
          aria-invalid={refusal ? true : undefined}
          aria-describedby={`email-${source}-note`}
          onChange={() => refusal && setRefusal(null)}
          className="h-14 w-full min-w-0 rounded-full bg-white px-6 text-[16px] text-[#0e0e0f] ring-1 ring-black/[0.12] outline-none placeholder:text-[#9a9a9e] focus:ring-2 focus:ring-[#6a2cff]/45 sm:h-12 sm:flex-1 sm:bg-transparent sm:px-5 sm:ring-0 sm:focus:ring-0"
        />
        {/* No person sees or fills this; a bot that does is told yes and filed nowhere. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex h-14 shrink-0 items-center justify-between gap-4 rounded-full bg-[linear-gradient(180deg,#242424_0%,#000000_100%)] pr-2 pl-7 text-[17px] font-semibold whitespace-nowrap text-white ring-1 ring-white/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:ring-4 focus-visible:ring-[#e2f93b]/70 focus-visible:outline-none active:scale-[0.98] disabled:opacity-80 sm:h-12 sm:pl-6 sm:text-[15px]"
        >
          {state === "sending" ? "Checking…" : "Get the free template"}
          <Chip spinning={state === "sending"} />
        </button>
      </div>
      <p
        id={`email-${source}-note`}
        role={refusal ? "alert" : undefined}
        className={`text-center text-[13px] lg:text-left ${refusal ? "font-medium text-[#c4320a]" : "text-[#6b6b70]"}`}
      >
        {refusal ? (
          REFUSALS[refusal]
        ) : (
          <>
            Free. The template opens right here. See our{" "}
            <Link href="/privacy/" className="underline underline-offset-2 hover:text-[#0e0e0f]">
              privacy policy
            </Link>
            .
          </>
        )}
      </p>
    </form>
  );
}

function Chip({ spinning = false }: { spinning?: boolean }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e2f93b] text-[#0b0b0c] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-9 sm:w-9">
      {spinning ? (
        <span className="brain-spin h-4 w-4 rounded-full border-2 border-black/20 border-t-[#0b0b0c]" />
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="h-[46%] w-[46%]" aria-hidden="true">
          <path d="M7 17 17 7M17 7H8.5M17 7v8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}
