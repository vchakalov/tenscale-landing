import { CtaButton } from "./CtaButton";
import { ProofStats } from "./CtaBlock";
import { Logo } from "./Logo";
import { Vsl } from "./Vsl";

/**
 * The first fold: callout, headline, subhead, VSL, CTA, proof.
 *
 * Centred and large, the way the design source is. An earlier pass put the
 * copy and the player in two columns so that everything cleared a 900px
 * viewport; it cleared it and lost the thing worth keeping. The source's
 * headline is Libre Baskerville Bold at 110px, and at 40px in a column the
 * same font reads as body serif, not as a statement. Size and air are the
 * design here, so they win over the fold line.
 *
 * Everything the visitor needs in order to act has to clear the scroll line:
 * the promise, the player, the button and the proof. Height is therefore the
 * hard budget, and the fold spends its room sideways instead. On a wide screen
 * the measures widen so the copy holds fewer lines.
 *
 * The lines saved are not all spent on the player. A fold packed to its last
 * pixel reads as cramped however good the type is, so the player is capped
 * below what would fit and the difference goes into the gaps between blocks.
 * Air is a design element here, not what is left over.
 */

/**
 * The Hormozi shape, split across three type sizes rather than one headline.
 *
 * The agreed line is "Owners of $1M-$4M Marketing Lead Gen Agencies: We'll
 * Automate Your Client Fulfillment in 30 Days - And Make It Better. Or You
 * Don't Pay." Set whole at display size it runs five lines, so the audience
 * callout becomes an eyebrow and the risk reversal becomes its own accent
 * line. Not a word changes.
 */
/**
 * The audience callout.
 *
 * This is the line that has to answer "is this for me?" before anything else
 * is read, so it carries real weight. What it does not carry is a container:
 * as a filled navy chip it was the largest dark mass in the fold and competed
 * with the video for first attention.
 *
 * Weight without mass. Full-strength navy, set in the page's serif at sentence
 * size rather than as a tracked micro-label, because a small-caps label reads
 * as a category and a sentence reads as something addressed to you.
 *
 * The accent lands on the revenue band and nowhere else. That range is the
 * single fact that answers the question, so it is what the eye should catch
 * first, and colouring four characters costs almost no visual mass.
 *
 * "Marketing" is gone. It said nothing "Lead Gen" was not already saying, and
 * on a phone it was the word that pushed this line onto a second row.
 */
function Eyebrow({ className }: { className: string }) {
  return (
    <p className={className}>
      Owners of{" "}
      <span className="text-[#0158ff] whitespace-nowrap">$1M&ndash;$4M</span>{" "}
      Lead Gen Agencies
    </p>
  );
}

/**
 * One headline, not two.
 *
 * The risk reversal used to sit below as its own display line at a smaller
 * size, which made the promise read as two competing headlines. It is now the
 * closing phrase of the same sentence, at the same size, carrying the only
 * accent colour in the copy.
 *
 * Breaks are not hand-set: fixed at one width they wrap again at every other
 * one. The small words are bound with non-breaking spaces so a line can never
 * end on "in", "And" or "It", and `text-balance` evens out the rest.
 */
function Headline({ className }: { className: string }) {
  return (
    <h1 className={className}>
      We&apos;ll Automate Your Client Fulfillment in&nbsp;30&nbsp;Days
      And&nbsp;Make It&nbsp;Better.{" "}
      {/* Never allowed to split: the risk reversal is the half of the promise
          that closes the deal, and "Or" alone at the end of a line reads as a
          typo. It fits on one line at every size the clamp produces. */}
      <span className="text-[#0158ff] whitespace-nowrap">
        Or You Don&apos;t Pay.
      </span>
    </h1>
  );
}

function SubheadCopy() {
  return (
    <>
      We install a{" "}
      {/* Navy, not the accent. The blue is spent on the headline's closing
          phrase and on the button; a third mass of it here is what made the
          fold read as busy. */}
      <strong className="font-semibold text-[#001232]">
        Meta Ads Automation Engine
      </strong>{" "}
      that handles creative production, campaign setup, testing and scaling.
    </>
  );
}

export function HeroFold() {
  return (
    <>
      {/* Desktop */}
      <section className="hidden bg-[#f4f1ea] px-[40px] pt-[38px] pb-[26px] min-[801px]:block">
        <div className="relative mx-auto w-full max-w-[1560px] text-center">
          {/*
            The wordmark sits in the corner of the content column, not of the
            window, so it lines up with everything else. It is out of the
            vertical flow: centred above the callout it read as a fourth stacked
            element and pushed the whole fold down.
          */}
          <Logo size={28} className="absolute top-0 left-0" />

          <div className="h-[74px]" />
          <Eyebrow className="font-[family-name:var(--font-pt-serif)] text-[clamp(19px,1.78vw,34px)] leading-[1.35] font-bold text-[#001232]" />

          <Headline className="mx-auto mt-[26px] max-w-[min(1560px,92vw)] text-balance font-[family-name:var(--font-libre-baskerville)] text-[clamp(30px,2.95vw,56px)] leading-[1.18] font-bold text-[#001232]" />

          <p className="mx-auto mt-[30px] max-w-[min(1400px,84vw)] text-pretty font-[family-name:var(--font-poppins)] text-[clamp(16px,1.1vw,21px)] leading-[1.55] font-normal text-[#001232]">
            <SubheadCopy />
          </p>

          <Vsl className="mx-auto mt-[46px] w-full max-w-[clamp(520px,36vw,760px)] text-left" />

          <div className="mt-[38px]">
            <CtaButton
              variant="blueRaised"
              className="px-[clamp(30px,2.6vw,46px)] py-[clamp(12px,1vw,17px)] text-[clamp(16px,1.25vw,21px)] leading-[1.5]"
            >
              Book Free Demo
            </CtaButton>
            <div className="mt-[26px]">
              <ProofStats
                gapClass="gap-[clamp(48px,5vw,92px)]"
                valueClass="font-[family-name:var(--font-libre-baskerville)] text-[clamp(22px,1.7vw,31px)] leading-[1.28] font-bold text-[#001232]"
                labelClass="mt-[3px] font-[family-name:var(--font-inter)] text-[clamp(12px,0.95vw,16px)] leading-[1.4] text-[rgba(0,18,50,0.65)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/*
        Mobile.

        No wordmark. The fold has to carry the promise, the player, the button
        and the proof above a line that a real phone draws at about 700px, and
        the mark plus its margin was 49 of those pixels for a brand the visitor
        has just clicked an ad for. Everything else here is measured against
        that budget too: the gaps, the two type sizes and the top padding were
        all cut once the words had been cut as far as they could go.
      */}
      <section className="flex flex-col items-center bg-[#f4f1ea] px-[14px] pt-[24px] pb-[12px] text-center min-[801px]:hidden">
        <Eyebrow className="text-balance font-[family-name:var(--font-pt-serif)] text-[18px] leading-[1.4] font-bold text-[#001232]" />

        <Headline className="mt-[14px] text-balance font-[family-name:var(--font-pt-serif)] text-[29px] leading-[1.2] font-bold text-[#001232]" />

        <p className="mt-[20px] text-pretty font-[family-name:var(--font-inter)] text-[17px] leading-[26px] font-normal text-[#001232]">
          <SubheadCopy />
        </p>

        <Vsl className="mt-[20px] w-full text-left" />

        <div className="mt-[20px]" data-hero-cta>
          <CtaButton
            variant="blueRaised"
            className="rounded-[50px] px-[32px] text-[16px] leading-[24px]"
          >
            Book Free Demo
          </CtaButton>
          <div className="mt-[18px] w-full">
            <ProofStats
              gapClass="gap-[22px]"
              valueClass="font-[family-name:var(--font-pt-serif)] text-[19px] leading-[25px] font-bold text-[#001232]"
              labelClass="mt-[2px] font-[family-name:var(--font-inter)] text-[11px] leading-[15px] text-[rgba(0,18,50,0.65)]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
