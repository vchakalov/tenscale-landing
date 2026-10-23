import { BookCallButton } from "@/components/home/BookButton";
import { Reveal } from "@/components/home/Reveal";

/**
 * The risk reversal, said plainly and said twice: once after the process,
 * once at the end. It is the offer the landing makes, word for word in
 * substance; change the two together.
 */
export function Guarantee() {
  return (
    <section className="w-full px-2 sm:px-4">
      <Reveal className="mx-auto w-full max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#e2f93b] px-6 py-16 text-center text-[#0b0b0c] sm:rounded-[2.5rem] sm:px-10 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(80% 120% at 50% -20%, rgba(255,255,255,0.55), transparent 60%), repeating-linear-gradient(-28deg, rgba(0,0,0,0) 0 46px, rgba(0,0,0,0.035) 46px 92px)",
            }}
          />
          <div className="relative mx-auto flex max-w-[820px] flex-col items-center">
            <span className="rounded-full bg-black/[0.06] px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-black/70 uppercase ring-1 ring-black/10 sm:text-[11px]">
              Guaranteed
            </span>
            <h2 className="mt-6 font-[family-name:var(--font-gelica)] text-[38px] leading-[1.05] font-light text-balance sm:text-[64px]">
              Automated In 30 Days. Or You Don&apos;t Pay.
            </h2>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[26px] text-black/75 sm:text-[18px] sm:leading-[28px]">
              We automate your client fulfillment in 30 days and make it better. If we don&apos;t, you don&apos;t pay.
              Period.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
              <BookCallButton size="lg">
                Book a demo
              </BookCallButton>
              <p className="text-[14px] text-black/70">
                <a href="#results" className="underline decoration-black/30 underline-offset-4 hover:text-black">
                  See results
                </a>
                <span className="mx-2" aria-hidden="true">·</span>
                <a href="#faq" className="underline decoration-black/30 underline-offset-4 hover:text-black">
                  Read the FAQ
                </a>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
