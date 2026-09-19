import { BookCallButton } from "@/components/agentica/CtaButtons";

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-white/80 backdrop-blur-md">
      <div className="container-default flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--color-ink)] text-white">
            <span className="mono text-[15px] font-bold leading-none">a</span>
          </span>
          <span className="text-[17px] font-bold tracking-tight text-foreground">Agentica</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <BookCallButton size="sm" />
        </div>
      </div>
    </header>
  );
}
