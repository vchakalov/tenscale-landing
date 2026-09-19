const ARROW_SRC =
  "/images/arrow-down.svg";

/**
 * ArrowDivider, a purely decorative down-arrow glyph used as the vertical
 * rhythm separator between sections. Static: no hover, no scroll trigger.
 *
 * Desktop and mobile render the same asset at different boxes, toggled at the
 * single 800px breakpoint used across this site.
 */
export function ArrowDivider() {
  return (
    <>
      {/* ---------- Desktop (>= 801px) ---------- */}
      <div className="mt-[135px] hidden min-[801px]:block">
        <section className="px-[40px] py-[50px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ARROW_SRC}
            alt=""
            width={18}
            height={34}
            className="mx-auto h-[34px] w-[18px] object-contain"
          />
        </section>
      </div>

      {/* ---------- Mobile (<= 800px) ---------- */}
      <div className="mt-[80px] max-[800px]:block min-[801px]:hidden">
        <section className="p-[5px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ARROW_SRC}
            alt=""
            width={13}
            height={24}
            className="mx-auto h-[24px] w-[13px] object-contain"
          />
        </section>
      </div>
    </>
  );
}
