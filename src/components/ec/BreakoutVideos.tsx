/**
 * Short answers to the four things Ben wants every owner to know before the
 * call, each asked the way an owner would ask it.
 *
 * The first is the reason to buy at all (better results, from angles). The other three are the fears that most often stop an
 * owner: another tool nobody uses, losing control to the AI, and whether it
 * works on small local budgets.
 *
 * Every card works before its video exists. The question and the short answer
 * are the summary the video opens with, so a card with no `src` is still a
 * complete answer, and filming a video only adds a frame above it.
 */
type Breakout = {
  id: string;
  question: string;
  answer: string;
  minutes: string;
  /** Fill in when the video is cut. Empty hides the frame, not the card. */
  src: string;
  poster: string;
};

const BREAKOUTS: readonly Breakout[] = [
  {
    id: "results",
    question: "Why would this get my clients better results than we get now?",
    answer:
      "Meta now picks who sees an ad based on what the ad says, so one ad only ever finds one kind of buyer. Tenscale builds a separate angle for each buyer your client has, and Meta finds more of the right people on the same budget.",
    minutes: "3 min",
    src: "",
    poster: "",
  },
  {
    id: "adoption",
    question: "We've used AI tools before. Nobody on the team stuck with them. Why is this different?",
    answer:
      "Because we don't hand you a tool. We install a complete system that automates as much of your fulfillment as possible, with every part working together as one ecosystem, then train your team on it and keep it updated every month with 24/7 support.",
    minutes: "3 min",
    src: "",
    poster: "",
  },
  {
    id: "control",
    question: "Do I stay in control, or does the AI run on its own?",
    answer:
      "You do. You set the budgets, the limits and the rules for when an ad gets paused or scaled, and the system only acts inside them, through Meta's official API.",
    minutes: "3 min",
    src: "",
    poster: "",
  },
  {
    id: "small-budgets",
    question: "Will it work for clients with small budgets?",
    answer:
      "Yes. Most small-budget clients advertise locally, where the audience is small and the same people see your ads again and again, so creatives wear out fast. Tenscale replaces them before they do, which is why every dollar works harder, not less.",
    minutes: "3 min",
    src: "",
    poster: "",
  },
];

/**
 * Four equal cards in a 2x2 grid. A featured first card left the grid with an
 * empty cell once the list went from five questions to four, so every card now
 * has the same weight and the numbers carry the order.
 */
function BreakoutCard({ item, index }: { item: Breakout; index: number }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[16px] border-[1.5px] border-[#001232] bg-[#f4f1ea] shadow-[0_10px_0_0_rgba(0,18,50,0.12)]">
      {item.src !== "" && (
        <div className="aspect-video w-full border-b-[1.5px] border-[#001232] bg-[#001232]">
          <video
            className="h-full w-full object-cover"
            src={item.src}
            poster={item.poster || undefined}
            controls
            playsInline
            preload="none"
          />
        </div>
      )}
      <div className="flex flex-1 items-start gap-[clamp(16px,1.8vw,28px)] px-[clamp(20px,2.2vw,36px)] py-[clamp(22px,2.2vw,32px)] text-left">
        <span className="shrink-0 font-[family-name:var(--font-libre-baskerville)] text-[clamp(30px,2.4vw,40px)] leading-none font-bold text-[#0158ff] tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          {item.src !== "" && (
            <p className="mb-[10px] font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium tracking-[0.12em] text-[#0158ff] uppercase">
              Video · {item.minutes}
            </p>
          )}
          <h3 className="font-[family-name:var(--font-pt-serif)] text-[clamp(19px,1.5vw,26px)] leading-[1.28] font-bold text-[#001232]">
            {item.question}
          </h3>
          <p className="mt-[10px] text-pretty font-[family-name:var(--font-inter)] text-[clamp(17px,1.25vw,20px)] leading-[1.6] text-[rgba(0,18,50,0.75)]">
            {item.answer}
          </p>
        </div>
      </div>
    </article>
  );
}

export function BreakoutVideos() {
  return (
    <section className="bg-[#f4f1ea] px-[40px] pt-[130px] max-[800px]:px-[14px] max-[800px]:pt-[72px]">
      <div className="mx-auto w-full max-w-[1080px]">
        <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[clamp(30px,3vw,52px)] leading-[1.18] font-bold text-[#001232] max-[800px]:text-[32px] max-[800px]:leading-[38px]">
          What People Ask Before The Call.
        </h2>
        <div className="mt-[48px] grid grid-cols-2 gap-[26px] max-[800px]:mt-[28px] max-[800px]:grid-cols-1 max-[800px]:gap-[18px]">
          {BREAKOUTS.map((item, index) => (
            <BreakoutCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
