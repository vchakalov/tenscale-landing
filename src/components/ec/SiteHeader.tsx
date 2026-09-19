import Link from "next/link";
import { CtaButton } from "./CtaButton";
import { Logo } from "./Logo";

/**
 * Primary header: a pill holding the logo and the single CTA.
 *
 * The design source carries a three-panel mega menu behind a `NAV_MENUS_VISIBLE`
 * flag that is switched off, so the shipped header is exactly this. The panel
 * machinery is not ported; this landing has no other pages to point at yet.
 */
export function SiteHeader() {
  return (
    <div className="sticky top-0 z-[3] w-full bg-[#f4f2f0]">
      {/* Desktop pill. */}
      <section className="flex max-[1080px]:hidden px-[100px] py-[15px]">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="mt-[15px] flex h-[89px] items-center justify-between gap-[24px] rounded-[1000px] bg-[rgba(12,10,8,0.03)] px-[50px]">
            <Link href="/" className="shrink-0" aria-label="Agentica, home">
              <Logo size={28} />
            </Link>

            <CtaButton variant="blue" className="shrink-0">
              Let&apos;s talk
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Compact header. */}
      <div className="min-[1081px]:hidden">
        <section className="flex h-[81px] items-center justify-between bg-[rgba(0,0,0,0.05)] px-[20px]">
          <Link href="/" aria-label="Agentica, home">
            <Logo size={20} />
          </Link>
          <CtaButton
            variant="blue"
            className="shrink-0 px-[20px] py-[8px] text-[14px] leading-[20px]"
          >
            Let&apos;s talk
          </CtaButton>
        </section>
      </div>
    </div>
  );
}
