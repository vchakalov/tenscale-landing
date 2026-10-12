import { BrandMark } from "@/components/ec/BrandMark";
import { BookCallButton } from "@/components/v2/CtaButtons";

export function Header() {
  return (
    <header className="w-full pt-4 px-4 sticky top-0 z-20 pb-15 sm:pb-25">
      <nav aria-label="Global" className="mx-auto flex items-center justify-center">
        <div className="w-auto max-w-full flex items-center justify-between gap-4 sm:gap-6 p-1.5 pl-5 bg-white rounded-full border-[1.5px] border-(--ec-ink)">
          <a className="shrink-0 flex items-center gap-2.5" href="/v2/">
            <BrandMark className="h-5 w-auto" />
            <span className="font-[family-name:var(--font-libre-baskerville)] text-[19px] font-bold tracking-tight">
              Tenscale
            </span>
          </a>
          <BookCallButton size="sm" />
        </div>
      </nav>
    </header>
  );
}
