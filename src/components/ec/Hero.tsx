import { cn } from "@/lib/utils";
import { ClientLogos } from "./ClientLogos";
import { CtaButton } from "./CtaButton";

function SubheadCopy() {
  return (
    <>
      We create a faster, leaner, and more profitable system for 7- and 8-figure
      companies using AI, allowing you to get{" "}
      <strong className="font-bold">
        better delivery, lower operating costs, and higher margins
      </strong>
      .
    </>
  );
}

function Headline({ className }: { className: string }) {
  return (
    <h1 className={className}>
      We Find Your Most Expensive Operation
      <br />
      And We Replace It{" "}
      <span className="text-[#C6A660]">With AI</span>
    </h1>
  );
}

export function Hero() {
  return (
    <>
      <section
        className={cn(
          "hidden bg-[#0A0908] px-[40px] pt-[63px] pb-[20px] min-[801px]:flex",
          "mt-[20px]",
        )}
      >
        <div className="mx-auto w-full max-w-[1120px] text-center">
          <Headline className="font-[family-name:var(--font-libre-baskerville)] text-[110px] leading-[135px] font-bold text-[#EDE8DF]" />

          <p className="mx-auto mt-[54px] max-w-[913px] font-[family-name:var(--font-poppins)] text-[22px] leading-[32px] font-normal text-[#EDE8DF]">
            <SubheadCopy />
          </p>

          <div className="mt-[90px]">
            <CtaButton variant="blueRaised">Let&apos;s Talk</CtaButton>
            <p className="mt-[16px] font-[family-name:var(--font-pt-serif)] text-[14px] leading-[20px] text-[#EDE8DF]">
              A fit call. If we can help, we run the assessment.
            </p>
          </div>

          <p className="mt-[190px] font-[family-name:var(--font-pt-serif)] text-[14px] leading-[20px] font-bold text-[#EDE8DF]">
            A Few of The Giants and Businesses We Have Worked With...
          </p>

          <div className="mt-[49px]">
            <ClientLogos />
          </div>
        </div>
      </section>

      <div className="block min-[801px]:hidden">
        <section className="mt-[35px] flex flex-col items-center bg-[#0A0908] px-[5px] pt-[7px] pb-[12px] text-center">
          <Headline className="max-w-[340px] font-[family-name:var(--font-pt-serif)] text-[54px] leading-[56px] font-bold text-[#EDE8DF]" />

          <p className="mt-[32px] max-w-[310px] font-[family-name:var(--font-inter)] text-[16px] leading-[22px] font-normal text-[#000011]">
            <SubheadCopy />
          </p>

          <div className="mt-[44px]">
            <CtaButton
              variant="blueRaised"
              className="rounded-[50px] px-[35px] text-[15px] leading-[22px]"
            >
              Let&apos;s Talk
            </CtaButton>
            <p className="mt-[12px] font-[family-name:var(--font-inter)] text-[13px] leading-[18px] text-[#000011]">
              A fit call. If we can help, we run the assessment.
            </p>
          </div>
        </section>

        <div className="mt-[50px] flex flex-col items-center p-[5px] text-center">
          <p className="font-[family-name:var(--font-pt-serif)] text-[12px] leading-[16px] font-bold text-[#000011]">
            A Few of The Giants and Businesses We Have Worked With...
          </p>

          <div className="mt-[28px]">
            <ClientLogos mobile />
          </div>
        </div>
      </div>
    </>
  );
}
