import Link from "next/link";
import { SiteFooter } from "@/components/ec/SiteFooter";
import { landingFonts } from "@/app/landing-fonts";

export type LegalSection = { heading: string; body: React.ReactNode };

export const CONTACT_EMAIL = "team@tenscale.ai";

/**
 * The frame shared by the privacy policy, the terms and the data deletion page.
 *
 * Meta's reviewers open all three from the app settings, so they read as one
 * set: same width, same type, same footer naming the company behind the site.
 */
export function LegalPage({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <div className={`${landingFonts} ec-landing min-h-screen w-full overflow-x-hidden bg-[#f4f1ea]`}>
      <main className="mx-auto max-w-[760px] px-[40px] pt-[80px] max-[800px]:px-[20px] max-[800px]:pt-[48px]">
        <Link
          href="/"
          className="font-[family-name:var(--font-inter)] text-[15px] text-[rgba(0,18,50,0.6)] underline transition-colors hover:text-[#001232]"
        >
          ← Back to Tenscale
        </Link>

        <h1 className="mt-[24px] font-[family-name:var(--font-gelica)] text-[44px] leading-[52px] text-[#001232] max-[800px]:text-[32px] max-[800px]:leading-[40px]">
          {title}
        </h1>
        <p className="mt-[10px] font-[family-name:var(--font-inter)] text-[14px] text-[rgba(0,18,50,0.55)]">
          Last updated {lastUpdated}
        </p>

        <div className="mt-[40px] flex flex-col gap-[36px] font-[family-name:var(--font-inter)] text-[16px] leading-[26px] text-[rgba(0,18,50,0.82)] [&_code]:rounded-[4px] [&_code]:bg-[rgba(0,18,50,0.06)] [&_code]:px-[5px] [&_code]:py-[1px] [&_code]:text-[14px] [&_li]:mt-[8px] [&_ol]:mt-[10px] [&_ol]:list-decimal [&_ol]:pl-[22px] [&_ol+p]:mt-[14px] [&_p+p]:mt-[14px] [&_ul+p]:mt-[14px] [&_ul]:mt-[10px] [&_ul]:list-disc [&_ul]:pl-[22px]">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-[family-name:var(--font-gelica)] text-[24px] leading-[32px] text-[#001232] max-[800px]:text-[21px] max-[800px]:leading-[28px]">
                {section.heading}
              </h2>
              <div className="mt-[12px]">{section.body}</div>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
