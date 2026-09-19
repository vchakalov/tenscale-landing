/**
 * Companies the team has worked at or for.
 *
 * Two kinds of entry. Coca-Cola and VMware exist as established marks, so they
 * are drawn from their own glyphs, recoloured to navy. SupShip.io, Evelin29 and
 * EnterpriseCore have no vector mark, so they are set as wordmarks in the site's
 * own serif. Mixing a real mark with a set wordmark is normal in a strip like
 * this and reads cleaner than a traced approximation.
 *
 * Sizing is optical, not boxed. The Coca-Cola script carries far less visual
 * weight per pixel than a bold wordmark, so it runs taller.
 */

type Mark =
  | { kind: "svg"; name: string; src: string; h: number; hMobile: number }
  | { kind: "word"; name: string; size: number; sizeMobile: number };

const MARKS: Mark[] = [
  {
    kind: "svg",
    name: "VMware",
    src: "/images/logo-vmware.svg",
    h: 26,
    hMobile: 17,
  },
  {
    kind: "svg",
    name: "Coca-Cola",
    src: "/images/logo-coca-cola.svg",
    h: 48,
    hMobile: 31,
  },
  {
    kind: "word",
    name: "SupShip.io",
    size: 42,
    sizeMobile: 27,
  },
  {
    kind: "word",
    name: "EnterpriseCore",
    size: 38,
    sizeMobile: 24,
  },
  {
    kind: "word",
    name: "Evelin29",
    size: 42,
    sizeMobile: 27,
  },
];
function Wordmark({
  name,
  size,
}: {
  name: string;
  size: number;
}) {
  return (
    <span
      className="font-[family-name:var(--font-pt-serif)] font-bold tracking-[-0.015em] text-[#0c0a08]"
      style={{ fontSize: size, lineHeight: 1 }}
    >
      {name}
    </span>
  );
}

/**
 * `compact` is the single-line variant used inside the first fold, where the
 * strip has to sit beside its label rather than under it. It is not the desktop
 * strip scaled down: a transform keeps the original layout box, and the full
 * strip wraps to three rows long before it is small enough to fit, so the marks
 * are drawn at their own small sizes and the row is told never to wrap.
 */
export function ClientLogos({
  mobile = false,
  compact = false,
}: {
  mobile?: boolean;
  compact?: boolean;
}) {
  const scale = compact ? 0.42 : mobile ? 1 : 1;

  return (
    <div
      className={
        compact
          ? "flex flex-nowrap items-center gap-x-[26px]"
          : mobile
            ? "mx-auto flex max-w-[320px] flex-wrap items-center justify-center gap-x-[28px] gap-y-[22px]"
            : "mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-x-[72px] gap-y-[48px]"
      }
    >
      {MARKS.map((m) =>
        m.kind === "word" ? (
          <Wordmark
            key={m.name}
            name={m.name}
            size={Math.round((mobile ? m.sizeMobile : m.size) * scale)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={m.name}
            src={m.src}
            alt={m.name}
            className="w-auto shrink-0 object-contain"
            style={{ height: Math.round((mobile ? m.hMobile : m.h) * scale) }}
          />
        ),
      )}
    </div>
  );
}
