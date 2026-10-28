import Link from "next/link";
import { OfferButton } from "@/components/offer/OfferButton";

/**
 * The last ask, with what the call covers, in the copywriter's words. The
 * call is about how the agency delivers today, not about an ad account: the
 * same ground the thank-you page sets out (components/ec/CallPrep.tsx).
 */
const AGENDA = [
  {
    label: "Your Current Onboarding:",
    body: "How a new client goes from signed contract to live ads today, and how to shrink that to under 5 hours.",
  },
  {
    label: "Your Team’s Time Audit:",
    body: "Where your media buyers, designers, and account managers lose hours every month as you grow.",
  },
  {
    label: "Your Custom Automation Priority:",
    body: "The exact bottlenecks we would automate first so you can take on more clients immediately without hiring.",
  },
];

export function BookYourCall() {
  return (
    <section className="w-full bg-[#e2f93b] px-4 py-20 text-[#0b0b0c] sm:px-8 sm:py-32">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
        {/* "Scaling with AI" is the line to remember, so it is the large one. */}
        <h2 className="flex flex-col items-center font-black tracking-[-0.025em] text-balance">
          <span className="text-[clamp(22px,3.6vw,38px)] leading-[1.15] text-black/75">Ready To Stop Scaling With Payroll And</span>
          <span className="mt-2 text-[clamp(44px,9.6vw,104px)] leading-[0.92] uppercase">Start Scaling With AI?</span>
        </h2>
        <p className="mt-8 max-w-[720px] text-[17px] leading-[28px] text-black/75 sm:text-[19px] sm:leading-[31px]">
          Book your Free 30-Minute Agency Automation Call below. We won’t waste your time with a generic software demo.
          Instead, we’ll look directly at your business:
        </p>

        <ol className="mt-10 flex w-full max-w-[880px] flex-col gap-3 text-left sm:mt-12">
          {AGENDA.map((item, i) => (
            <li key={item.label} className="flex items-start gap-5 rounded-[20px] bg-white/60 px-5 py-5 ring-1 ring-black/[0.08] sm:px-7 sm:py-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0b0b0c] text-[18px] font-black text-[#e2f93b] sm:h-12 sm:w-12 sm:text-[20px]">
                {i + 1}
              </span>
              <span className="text-[17px] leading-[26px] sm:text-[19px] sm:leading-[29px]">
                <span className="font-black">{item.label}</span> {item.body}
              </span>
            </li>
          ))}
        </ol>

        <OfferButton source="offer_book" tone="ink" className="mt-12 sm:mt-14" sub="Takes 30 Seconds · No Obligation">
          Book my free <span className="whitespace-nowrap">30-min</span> automation call now
        </OfferButton>
        <p className="mt-5 max-w-[600px] text-[15px] leading-[23px] text-black/65">
          Pick a time on the next screen · 100% Free · Backed by our 30-Day Money-Back Guarantee when you join.
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
