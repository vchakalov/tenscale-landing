import { BookCallButton, WhatsAppButton } from "@/components/agentica/CtaButtons";

export function Header() {
  return (
    <header className="w-full pt-4 px-4 sticky top-0 z-20 pb-15 sm:pb-25">
      <nav aria-label="Global" className="mx-auto flex items-center justify-center">
        <div className="w-auto max-w-full flex items-center justify-between gap-3 sm:gap-5 p-2 pl-6 bg-white rounded-full border border-gray-300">
          <a className="shrink-0" href="/">
            <span className="sr-only">Agentica</span>
            <span className="text-xl font-bold tracking-tight text-foreground">Agentica</span>
          </a>
          <div className="flex items-center gap-2">
            <WhatsAppButton size="sm" variant="outline" />
            <BookCallButton size="sm" />
          </div>
        </div>
      </nav>
    </header>
  );
}
