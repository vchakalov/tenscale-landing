import Link from "next/link";
import { OfferButton } from "@/components/offer/OfferButton";
import { Tick } from "@/components/offer/parts";

/**
 * The last ask: the headline, Brunson's "Is This For Me?" list and the button
 * (Ben, 2026-10-31). It replaced the copywriter's call agenda, so what the
 * call covers is now only on the thank-you page (components/ec/CallPrep.tsx).
 */
const FOR_YOU: React.ReactNode[] = [
  <>You run Meta ads for clients (or for your own offers)</>,
  <>You&apos;ve tried AI tools that didn&apos;t really work</>,
  <>You want better results, with AI doing the heavy lifting</>,
  <>You want more clients without more payroll</>,
];

export function BookYourCall() {
  return (
    <section className="w-full bg-[#e2f93b] px-4 py-14 text-[#0b0b0c] sm:px-8 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
        {/* The second line is the one to remember, so it is the large one. It echoes The Core's headline (Ben, 2026-10-31). */}
        <h2 className="flex flex-col items-center font-black tracking-[-0.025em] text-balance">
          <span className="text-[clamp(18px,2.6vw,28px)] leading-[1.15] text-black/75">Ready To Let AI Do The Work Of</span>
          <span className="mt-1.5 text-[clamp(34px,5.4vw,60px)] leading-[0.95] uppercase">An Entire Marketing Team?</span>
        </h2>
        <div className="mt-8 flex w-full max-w-[620px] flex-col items-center sm:mt-10">
          <p className="text-[20px] leading-[1.15] font-black tracking-[-0.02em] sm:text-[24px]">This Call Is 1,000% For You If…</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-left sm:mt-5">
            {FOR_YOU.map((line, n) => (
              <li key={n} className="flex items-start gap-3">
                <Tick className="mt-[3px] h-6 w-6 bg-[#0b0b0c] text-[#e2f93b] sm:h-7 sm:w-7" />
                <span className="text-[16px] leading-[25px] font-semibold sm:text-[18px] sm:leading-[28px]">{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[17px] leading-[25px] font-black sm:mt-5 sm:text-[19px]">…Then grab a time below.</p>
        </div>

        <OfferButton source="offer_book" tone="ink" className="mt-8 sm:mt-10" sub="Takes 30 Seconds&nbsp;· No Obligation">
          Book my free <span className="whitespace-nowrap">30-min</span> <span className="whitespace-nowrap">AI growth</span> call now
        </OfferButton>
        <p className="mt-4 max-w-[760px] text-[14px] leading-[22px] text-balance text-black/65 sm:text-[15px]">
          Pick a time on the next screen · 100% Free · Backed by our 100% Money-Back Guarantee when you join.
        </p>
      </div>
    </section>
  );
}

// The same links and operator line as every other footer (ec/SiteFooter.tsx):
// Meta's App Review opens the terms and data deletion pages, and business
// verification looks for the company's name on the site.
const FOOTER_LINKS = [
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/terms/", label: "Terms of Service" },
  { href: "/data-deletion/", label: "Data Deletion" },
  { href: "mailto:team@tenscale.ai", label: "Contact" },
];

export function OfferFooter() {
  return (
    <footer className="w-full bg-[#0b0b0c] px-4 py-10 text-center text-white/55 sm:px-8">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 text-[13px] leading-[20px]">
        <Link href="/" className="text-[20px] font-bold tracking-tight text-white">
          Tenscale
        </Link>
        <p>
          We use cookies and tools from Meta to measure which of our ads bring visitors and bookings. You can opt out of
          personalised ads in your{" "}
          <a className="underline" href="https://accounts.meta.com/ad_preferences/" rel="noopener noreferrer" target="_blank">
            Meta ad settings
          </a>{" "}
          and block cookies in your browser. See our{" "}
          <a className="underline" href="/privacy">
            privacy policy
          </a>
          .
        </p>
        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="underline decoration-white/25 underline-offset-4 hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <p>© 2026 Tenscale. tenscale.ai is operated by “RePharma Health” Ltd.</p>
      </div>
    </footer>
  );
}
