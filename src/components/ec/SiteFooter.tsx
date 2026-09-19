import Link from "next/link";

/**
 * The footer.
 *
 * A link row and the advertising disclaimer, nothing else. The ported footer
 * carried four columns of links to pages this site does not have, a legal line,
 * a copyright line and a second CTA, which put more below the close than above
 * it. A sales page ends on the button; what follows only has to be lawful.
 *
 * The Facebook disclaimer is not decoration. Meta requires advertisers not to
 * imply endorsement, and a results claim needs its own qualifier.
 */
const LINKS = [
  { href: "/", label: "Home" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Contact" },
] as const;

const DISCLAIMER =
  "This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc. Results shown are from real Agentica customers; individual results will vary depending on your offer, traffic and sales process.";

export function SiteFooter() {
  return (
    <footer className="mt-[150px] border-t border-[rgba(0,18,50,0.12)] px-[40px] pt-[38px] pb-[64px] max-[800px]:mt-[80px] max-[800px]:px-[20px] max-[800px]:pt-[30px] max-[800px]:pb-[48px]">
      <nav aria-label="Footer" className="flex justify-center">
        <ul className="flex flex-wrap items-center justify-center gap-x-[32px] gap-y-[10px] max-[800px]:gap-x-[22px]">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-[family-name:var(--font-inter)] text-[15px] leading-[22px] text-[rgba(0,18,50,0.75)] transition-colors duration-200 hover:text-[#001232] max-[800px]:text-[14px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mx-auto mt-[22px] max-w-[760px] text-center font-[family-name:var(--font-inter)] text-[13px] leading-[21px] text-[rgba(0,18,50,0.45)] max-[800px]:text-[12px] max-[800px]:leading-[19px]">
        {DISCLAIMER}
      </p>
    </footer>
  );
}
