import Image from "next/image";

/**
 * Proof, as screenshots rather than as quote cards.
 *
 * The visitor has booked, so this is not persuasion any more; it is the reason
 * to keep the slot. A five star card with a name under it proves that somebody
 * liked us. A screenshot of an account proves the number, which is the only
 * claim this business makes.
 *
 * Each shot carries one factual caption and nothing else. No stars, no verified
 * badges, no logos: the moment a screenshot needs a badge to be believed, the
 * screenshot was the wrong screenshot.
 *
 * Drop the files in `public/proof/` and fill `src`. An empty `src` renders the
 * frame with a note, so the layout can be judged before the assets exist.
 */
const SHOTS = [
  {
    id: "cpr",
    src: "",
    alt: "",
    caption: "Cost per result, before and after the install. Replace this line with the real numbers.",
  },
  {
    id: "volume",
    src: "",
    alt: "",
    caption: "Ads live in one account in a single week. Replace this line with the real numbers.",
  },
  {
    id: "spend",
    src: "",
    alt: "",
    caption: "Monthly spend one operator now runs alone. Replace this line with the real numbers.",
  },
  {
    id: "onboarding",
    src: "",
    alt: "",
    caption: "Signed to live campaigns, same day. Replace this line with the real numbers.",
  },
] as const;

function Shot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-[#1a1919]">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 800px) 100vw, 46vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-[24px]">
            <p className="text-center font-[family-name:var(--font-pt-serif)] text-[15px] leading-[22px] text-[rgba(244,242,240,0.45)]">
              Screenshot goes here. Drop the file in `public/proof/` and set
              `src` in ResultShots.tsx.
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-[14px] font-[family-name:var(--font-inter)] text-[clamp(15px,1.08vw,18px)] leading-[1.55] text-[rgba(12,10,8,0.78)] max-[800px]:text-[15px] max-[800px]:leading-[23px]">
        {caption}
      </figcaption>
    </figure>
  );
}

export function ResultShots() {
  return (
    <section className="mt-[150px] px-[40px] max-[800px]:mt-[72px] max-[800px]:px-[20px]">
      <div className="mx-auto w-full max-w-[1320px]">
        <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[clamp(34px,3vw,52px)] leading-[1.18] font-bold text-[#0c0a08] max-[800px]:text-[34px] max-[800px]:leading-[40px]">
          Accounts We Run Today.
        </h2>
        <p className="mx-auto mt-[18px] max-w-[720px] text-center text-pretty font-[family-name:var(--font-inter)] text-[clamp(16px,1.1vw,19px)] leading-[1.55] text-[rgba(12,10,8,0.65)] max-[800px]:text-[16px] max-[800px]:leading-[24px]">
          Every screenshot below is a live client account the engine runs.
        </p>

        <div className="mt-[56px] grid grid-cols-2 gap-x-[clamp(28px,3vw,56px)] gap-y-[clamp(36px,3.4vw,64px)] max-[800px]:mt-[34px] max-[800px]:grid-cols-1 max-[800px]:gap-y-[32px]">
          {SHOTS.map((shot) => (
            <Shot
              key={shot.id}
              src={shot.src}
              alt={shot.alt}
              caption={shot.caption}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
