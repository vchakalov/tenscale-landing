import { BookCallButton } from "@/components/home/BookButton";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQ" },
];

/**
 * A floating pill, not a bar: it never spans the screen, and the frosted
 * ground keeps it legible over the product shots as the page scrolls under
 * it. The section links are for a desktop reader skimming for the proof; a
 * phone keeps only the name and the button.
 */
export function HomeHeader() {
  return (
    <header className="pointer-events-none sticky top-0 z-20 w-full px-4 pt-4 pb-12 sm:pb-16">
      <nav aria-label="Global" className="pointer-events-auto mx-auto flex w-max max-w-full items-center justify-center">
        <div className="flex w-auto max-w-full items-center justify-between gap-3 rounded-full bg-white/80 p-1.5 pl-6 shadow-[0_12px_32px_-20px_rgba(14,14,15,0.35)] ring-1 ring-black/[0.07] backdrop-blur-xl sm:gap-6">
          <a className="shrink-0" href="/">
            <span className="sr-only">Tenscale</span>
            <span className="text-xl font-bold tracking-tight text-[#0e0e0f]" aria-hidden="true">
              Tenscale
            </span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-[14px] text-[#3a3a3d] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.04] hover:text-[#0e0e0f]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <BookCallButton size="sm" source="header">Book a demo</BookCallButton>
        </div>
      </nav>
    </header>
  );
}
