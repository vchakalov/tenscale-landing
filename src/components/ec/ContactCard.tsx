/**
 * The number the texts come from, and one button that saves it.
 *
 * The iMessage reminders go out from a US number the lead has never seen. An
 * unknown number is the first thing a busy owner ignores and the first thing
 * iOS files under "Unknown Senders", so the page shows it before the phone
 * does and offers a contact card that puts a name on it.
 *
 * The number is the largest thing in the card, set in the serif at heading
 * size, because recognising it later is the whole job. The button downloads a
 * static vCard; on a phone that opens "Add to Contacts" directly.
 *
 * Keep all three values in step with the real senders: the GHL sender address,
 * the iMessage phone, and `public/contact/ben-tenscale.vcf`.
 */
const CONTACT = {
  phoneDisplay: "+1 (305) 589-2275",
  phoneHref: "tel:+13055892275",
  email: "ben@tenscale.ai",
  /** Must match `SENDER_ADDRESS` in GmailNotice.tsx. */
  inviteEmail: "team@tenscale.ai",
  vcard: "/contact/ben-tenscale.vcf",
};

function PersonIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle
        cx="12"
        cy="8.5"
        r="3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContactCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-[16px] border-[1.5px] border-[#001232] bg-[#f4f1ea] px-[clamp(24px,2.6vw,44px)] py-[clamp(26px,2.6vw,38px)] text-left shadow-[0_10px_0_0_rgba(0,18,50,0.12)] ${className}`}
    >
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium tracking-[0.12em] text-[rgba(0,18,50,0.5)] uppercase">
          Texts come from
        </p>
        <a
          href={CONTACT.phoneHref}
          className="mt-[8px] block font-[family-name:var(--font-pt-serif)] text-[clamp(28px,2.6vw,46px)] leading-[1.15] font-bold whitespace-nowrap text-[#001232] tabular-nums"
        >
          {CONTACT.phoneDisplay}
        </a>
        <p className="mt-[10px] text-pretty font-[family-name:var(--font-inter)] text-[clamp(17px,1.25vw,20px)] leading-[1.6] text-[rgba(0,18,50,0.7)]">
          That&apos;s me, Ben. Reply to it any time, it reaches me directly.
          Emails come from{" "}
          <span className="font-medium text-[#001232]">{CONTACT.email}</span>{" "}
          and the calendar invite from{" "}
          <span className="font-medium text-[#001232]">
            {CONTACT.inviteEmail}
          </span>
          . You may also hear from Peter on my team.
        </p>
        <a
          href={CONTACT.vcard}
          download="Ben - Tenscale.vcf"
          className="mt-[24px] inline-flex items-center gap-[12px] rounded-[100px] bg-[#0158ff] px-[clamp(26px,2.2vw,38px)] py-[clamp(12px,1vw,15px)] font-[family-name:var(--font-inter)] text-[clamp(16px,1.15vw,19px)] leading-[25px] font-medium whitespace-nowrap text-[#f4f1ea] shadow-[0_8px_1px_0_rgba(0,0,0,0.1)] transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]"
        >
          <PersonIcon className="h-[20px] w-[20px] shrink-0" />
          Save My Contact
        </a>
      </div>
    </div>
  );
}
