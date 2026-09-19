/**
 * The "unknown sender" warning.
 *
 * Google now holds calendar invitations from addresses the recipient has never
 * written to. The event is never declined and no error is shown; it simply does
 * not appear. A visitor who books, presses Add To Calendar, and then trusts the
 * emailed invite can end up with nothing in their calendar and no idea why. So
 * this block is not a footnote, it is the second most important thing on the
 * page after the card above it.
 *
 * It interrupts on purpose. The strip is a navy fill with cream type, which is
 * the only filled bar on the page and reads as a system notice rather than as
 * more selling. The reference this follows uses a full red bar; red is one
 * token away if it turns out people scroll past this one.
 *
 * The Gmail banner is drawn in HTML rather than pasted in as a screenshot. It
 * costs no asset, stays sharp, and reflows on a phone, where a screenshot of a
 * desktop banner would be four unreadable lines.
 *
 * Written to be scanned on the diagonal, not read. Four things carry weight and
 * nothing else does: the title in the strip, the email subject to recognise,
 * the button to find, and "Press this." Every sentence that only explained
 * the mechanism is gone, because a visitor who has to read a paragraph to learn
 * what to press will press nothing.
 */

/** The address the invitation is sent from. Must match the real sender. */
const SENDER_ADDRESS = "team@agenticalab.io";

function WarningIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3.6 1.8 20.4h20.4L12 3.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v4.4"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.4" r="1.15" fill="currentColor" />
    </svg>
  );
}

/** Points at the button. Rotated a quarter turn on a phone, where the caption
    sits under the button instead of beside it. */
function PointerArrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden="true">
      <path
        d="M47 12H8M8 12l9-7M8 12l9 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A reproduction of what Gmail shows, for recognition only. It is inert: the
 * button is a `div`, nothing here is clickable, and the visitor acts on the
 * real banner in their own inbox.
 */
function GmailBannerMock() {
  return (
    <div className="rounded-[10px] bg-[rgba(245,245,245,0.05)] px-[clamp(16px,1.6vw,24px)] py-[clamp(16px,1.6vw,22px)]">
      <p className="font-[family-name:var(--font-inter)] text-[clamp(14px,1.02vw,16px)] leading-[1.45] font-medium text-[rgba(245,245,245,0.85)]">
        Unknown sender: not added to Calendar yet
      </p>
      <p className="mt-[8px] font-[family-name:var(--font-inter)] text-[clamp(13px,0.95vw,15px)] leading-[1.55] text-[rgba(245,245,245,0.6)]">
        It looks like you&apos;ve never been in contact with this sender (
        <span className="font-medium text-[rgba(245,245,245,0.8)]">
          {SENDER_ADDRESS}
        </span>
        ).
      </p>

      <div className="mt-[18px] flex flex-wrap items-center gap-x-[18px] gap-y-[12px] max-[800px]:flex-col max-[800px]:items-start">
        <div
          aria-hidden="true"
          className="shrink-0 rounded-[5px] border border-[rgba(245,245,245,0.28)] bg-[#ffffff] px-[16px] py-[8px] font-[family-name:var(--font-inter)] text-[clamp(13px,0.95vw,15px)] leading-[20px] text-[rgba(245,245,245,0.8)]"
        >
          I know the sender
        </div>

        {/* Arrow and caption wrap as one piece. Loose, the caption dropped to
            its own line and left the arrow pointing at nothing. */}
        <span className="flex items-center gap-[12px]">
          <PointerArrow className="h-[20px] w-[40px] shrink-0 text-[#FFD100] max-[800px]:h-[24px] max-[800px]:w-[24px] max-[800px]:rotate-90" />
          <span className="font-[family-name:var(--font-inter)] text-[clamp(15px,1.15vw,18px)] leading-[1.4] font-bold text-[#FFD100]">
            Press this.
          </span>
        </span>
      </div>
    </div>
  );
}

export function GmailNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[16px] border-[1.5px] border-[#F5F5F5] bg-[#0B0B0B] text-left shadow-[0_10px_0_0_rgba(245,245,245,0.12)] ${className}`}
    >
      <div className="flex items-center justify-center gap-[10px] bg-[#F5F5F5] px-[20px] py-[clamp(11px,1vw,15px)]">
        <WarningIcon className="h-[19px] w-[19px] shrink-0 text-[#0B0B0B]" />
        <p className="text-center font-[family-name:var(--font-pt-serif)] text-[clamp(16px,1.2vw,21px)] leading-[1.35] font-bold text-[#0B0B0B]">
          This Google Update Could Affect Your Appointment
        </p>
      </div>

      <div className="px-[clamp(20px,2.2vw,36px)] py-[clamp(20px,2vw,30px)]">
        <p className="text-pretty font-[family-name:var(--font-inter)] text-[clamp(16px,1.2vw,19px)] leading-[1.6] text-[rgba(245,245,245,0.78)]">
          Google may email you{" "}
          <strong className="font-bold text-[#F5F5F5]">
            &ldquo;Invitation from an unknown sender&rdquo;
          </strong>
          . Until you answer it, the call is not in your calendar.
        </p>

        <div className="mt-[clamp(18px,1.8vw,26px)]">
          <GmailBannerMock />
        </div>
      </div>
    </div>
  );
}
