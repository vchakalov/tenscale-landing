import Image from "next/image";

/**
 * What each bonus looks like when you have it, in place of book covers: the
 * weekly call, the support channel, the workflows, the market report and the
 * playbook.
 *
 * Generated with Gemini 3 Pro Image (2026-10-28) from the real material as
 * references: Ray's and Alex's own photos, the angle evaluator screenshot and
 * the creatives in tour-creatives.webp. The workflow's nodes are the engine's
 * actual steps and the playbook's checklist is the home page's Andromeda
 * rules. No other company's logo appears; addresses read app.tenscale.ai.
 *
 * The market report and the playbook are phone photos of a laptop screen
 * rather than clean renders, which read as AI. The report is the spreadsheet
 * the intel is kept in, open in Safari. The call is drawn in SVG instead, the
 * generated photo of it still read as AI (Ben, 2026-10-28): the shared screen
 * is the real angle evaluator and the camera tile is Ray's own photo.
 * Regenerate the photos rather than hand-edit: their text is in the picture.
 */
export type BonusVisualKind = "call" | "support" | "workflow" | "report" | "playbook";

const VISUALS: Record<BonusVisualKind, string> = {
  call: "A weekly 1-on-1 strategy call: Ray from Tenscale on camera, sharing the angle evaluator",
  support: "The client's private VIP support channel with Ray and Alex from Tenscale answering a launch question",
  workflow: "The lead gen engine as a workflow: offer, winning ads, AI angles, creatives, video and page copy, approval, launch, rules and the CRM",
  report: "The US Market Intel spreadsheet: this week's winning hooks by angle, format and niche, with CTR and CPA trend",
  playbook: "The Andromeda Execution Playbook: a checklist of the rules the engine runs on",
};

/** Pixel sizes of the files; the report is cropped above the keyboard. */
const SIZES: Partial<Record<BonusVisualKind, { width: number; height: number }>> = {
  report: { width: 1200, height: 800 },
};

const FRAME = "overflow-hidden rounded-[16px] bg-[#f3f3ef] shadow-[0_30px_60px_-34px_rgba(14,14,15,0.55)] ring-1 ring-black/[0.08]";

export function BonusVisual({ kind }: { kind: BonusVisualKind }) {
  if (kind === "call") {
    return (
      <div className={FRAME}>
        <CallWindow />
      </div>
    );
  }
  const size = SIZES[kind] ?? { width: 1200, height: 896 };
  return (
    <div className={FRAME}>
      <Image
        src={`/images/offer/bonus-${kind}.webp`}
        alt={VISUALS[kind]}
        width={size.width}
        height={size.height}
        loading="lazy"
        className="block h-auto w-full"
      />
    </div>
  );
}

/** The weekly call as a video call window: Ray on camera, sharing the angle evaluator. */
function CallWindow() {
  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full select-none" role="img" aria-label={VISUALS.call}>
      <defs>
        <clipPath id="bv-call-share">
          <rect x="14" y="48" width="306" height="171" rx="8" />
        </clipPath>
        <clipPath id="bv-call-ray">
          <rect x="330" y="48" width="136" height="104" rx="8" />
        </clipPath>
      </defs>
      <rect width="480" height="300" fill="#141417" />

      {/* title bar */}
      <circle cx="18" cy="17" r="4.5" fill="#ff5f57" />
      <circle cx="32" cy="17" r="4.5" fill="#febc2e" />
      <circle cx="46" cy="17" r="4.5" fill="#28c840" />
      <text x="64" y="21" fill="#ffffff" fontSize="11" fontWeight="700">Weekly strategy call</text>
      <text x="183" y="21" fill="#ffffff" fillOpacity="0.45" fontSize="10">Tenscale × Your agency</text>
      <rect x="402" y="8" width="64" height="18" rx="9" fill="#ff3b30" fillOpacity="0.16" />
      <circle cx="414" cy="17" r="3.5" fill="#ff3b30" />
      <text x="422" y="20.5" fill="#ff7b73" fontSize="9" fontWeight="700">REC 32:14</text>
      <line x1="0" y1="34" x2="480" y2="34" stroke="#ffffff" strokeOpacity="0.06" />

      {/* the shared screen: the real angle evaluator */}
      <rect x="14" y="48" width="306" height="171" rx="8" fill="#ffffff" />
      <image
        href="/images/tenscale/offer-angle-evaluator.webp"
        x="14"
        y="48"
        width="306"
        height="171"
        preserveAspectRatio="xMidYMin slice"
        clipPath="url(#bv-call-share)"
      />
      <rect x="22" y="199" width="124" height="14" rx="7" fill="#0b0b0c" fillOpacity="0.82" />
      <circle cx="31" cy="206" r="2.5" fill="#e2f93b" />
      <text x="38" y="209.5" fill="#ffffff" fontSize="8" fontWeight="600">Ray is sharing his screen</text>

      {/* Ray on camera, speaking */}
      <rect x="330" y="48" width="136" height="104" rx="8" fill="#26262c" />
      <image
        href="/images/team/radoslav.jpg"
        x="330"
        y="48"
        width="136"
        height="104"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#bv-call-ray)"
      />
      <rect x="331" y="49" width="134" height="102" rx="7.5" fill="none" stroke="#e2f93b" strokeWidth="2" />
      <rect x="337" y="134" width="66" height="13" rx="6.5" fill="#0b0b0c" fillOpacity="0.8" />
      <text x="344" y="143.5" fill="#ffffff" fontSize="7.5" fontWeight="600">Ray · Tenscale</text>
      <rect x="446" y="134" width="14" height="13" rx="6.5" fill="#e2f93b" />
      <path d="M450 143v-3M453 143v-6M456 143v-4" stroke="#0b0b0c" strokeWidth="1.4" strokeLinecap="round" />

      {/* the client's own tile */}
      <rect x="330" y="160" width="136" height="59" rx="8" fill="#26262c" />
      <circle cx="398" cy="183" r="11" fill="#3a3a42" />
      <circle cx="398" cy="180" r="4" fill="#8a8a94" />
      <path d="M391 189.5a7 7 0 0114 0" fill="#8a8a94" />
      <rect x="337" y="201" width="28" height="13" rx="6.5" fill="#0b0b0c" fillOpacity="0.8" />
      <text x="344" y="210.5" fill="#ffffff" fontSize="7.5" fontWeight="600">You</text>

      {/* agenda strip under the share */}
      <rect x="14" y="228" width="452" height="22" rx="7" fill="#1d1d22" />
      <text x="24" y="242.5" fill="#ffffff" fillOpacity="0.45" fontSize="8" fontWeight="700" letterSpacing="0.8">TODAY</text>
      <text x="62" y="242.5" fill="#ffffff" fillOpacity="0.85" fontSize="8.5">Audit last week · Cut 2 losing angles · Scale “Gas &amp; Bloating 50+”</text>

      {/* controls */}
      <circle cx="194" cy="274" r="12" fill="#2a2a30" />
      <rect x="191.5" y="267" width="5" height="9" rx="2.5" fill="none" stroke="#ffffff" strokeWidth="1.4" />
      <path d="M188.5 273.5a5.5 5.5 0 0011 0M194 279v2.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="224" cy="274" r="12" fill="#2a2a30" />
      <rect x="217.5" y="270" width="9" height="8" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.4" />
      <path d="M226.5 272.5l4-2v7l-4-2" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="254" cy="274" r="12" fill="#6a2cff" />
      <path d="M254 278.5v-8M250.5 273.5l3.5-3.5 3.5 3.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="274" y="263" width="32" height="22" rx="11" fill="#ff3b30" />
      <path d="M282 276c4.5-3.6 11.5-3.6 16 0" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
