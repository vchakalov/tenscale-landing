import { cn } from "@/lib/utils";
import { CtaButton } from "./CtaButton";

const PULL_QUOTE =
  "We thought we needed more people. We actually needed better systems.";

const PARAGRAPHS = [
  "Going from $3 million to $10 million was exciting, but the business became much harder to run. Our margins were getting squeezed. Errors were becoming more common. Deliveries were getting delayed. There were problems everywhere, and too much of it still came back to us. It was becoming a nightmare.",
  "We thought we needed more people. Then Eleven Cloud came in and looked at how the business actually worked.",
  "They built an onboarding system that takes new customers through the process without our team having to manage every step. They built a customer support system that handles the common questions and sends the important ones to our team. They rebuilt parts of our order and production process so orders move without someone having to chase the next step. And they connected shipping with invoicing, so when an order goes out, the invoice goes out too.",
] as const;

const RESULTS_HEADING = "The results";

const RESULTS = [
  "Orders that used to sit for 1-2 days now move the same day.",
  "We cut order and document errors by around 30%.",
  "Customer response times went from hours to minutes.",
  "Invoices that used to go out days later now go out the same day as shipment.",
  "We can handle roughly 20% more volume with the same team.",
] as const;

const CLOSING = [
  "That means fewer mistakes, faster delivery, faster payments and more cash available to grow the business.",
  "We were lucky to find Eleven Cloud when we did.",
] as const;

const ATTRIBUTION = "Svet, CEO at Evelin29";

const PHOTO_SRC = "/images/testimonial-evelin29.jpg";
const PHOTO_CAPTION = "Svet and Zdravko, founders at Evelin29";

/**
 * Floor photograph of Evelin29's owners. Left in colour deliberately,
 * the point of it is that it is real and unstyled.
 */
function ClientPhoto({
  className,
  captionClass,
}: {
  className: string;
  captionClass: string;
}) {
  return (
    <figure className={className}>
      {/*
        Navy wash. The photograph is high-key, white shirts, pale wall, and
        reads as a hot rectangle on the #F5F5F5 card without it. Desaturating
        and laying navy over at 18% cools the whites into the card while
        leaving skin and kraft readable. Deliberately not a duotone: the whole
        value of this picture is that it looks unstyled.
      */}
      <div className="relative overflow-hidden rounded-[8px] border border-[rgba(11,11,11,0.15)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTO_SRC}
          alt={PHOTO_CAPTION}
          width={1478}
          height={814}
          className="aspect-[820/452] w-full object-cover [filter:saturate(0.8)_brightness(0.97)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#F5F5F5] opacity-[0.18]"
        />
      </div>
      <figcaption className={cn("mt-[16px] text-center", captionClass)}>
        {PHOTO_CAPTION}
      </figcaption>
    </figure>
  );
}

const SVET_SRC = "/images/team/svet.png";

function AttributionMark() {
  return (
    <span className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SVET_SRC}
        alt={ATTRIBUTION}
        width={56}
        height={56}
        className="h-full w-full object-cover [filter:saturate(0.8)_brightness(0.97)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#F5F5F5] opacity-[0.18]"
      />
    </span>
  );
}

export function Testimonial() {
  return (
    <>
      <section className="mt-[170px] hidden p-0 min-[801px]:block">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="rounded-[12px] bg-[#F5F5F5] py-0 pr-[200px] pl-[100px]">
            <blockquote className="max-w-[820px] pt-[97px] text-left font-[family-name:var(--font-pt-serif)] text-[68px] leading-[84px] font-bold text-[#0B0B0B]">
              {PULL_QUOTE}
            </blockquote>

            <ClientPhoto
              className="mt-[67px] w-[820px]"
              captionClass="font-[family-name:var(--font-inter)] text-[14px] leading-[20px] font-normal text-[rgba(11,11,11,0.6)]"
            />

            <div className="mt-[73px] flex max-w-[820px] flex-col gap-[41px]">
              {PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-left font-[family-name:var(--font-poppins)] text-[22px] leading-[36px] font-normal text-[rgba(11,11,11,0.6)]"
                >
                  {paragraph}
                </p>
              ))}
              <p className="text-left font-[family-name:var(--font-pt-serif)] text-[28px] leading-[36px] font-bold text-[#0B0B0B]">
                {RESULTS_HEADING}
              </p>
              {RESULTS.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-left font-[family-name:var(--font-poppins)] text-[22px] leading-[36px] font-normal text-[rgba(11,11,11,0.6)]"
                >
                  {paragraph}
                </p>
              ))}
              {CLOSING.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-left font-[family-name:var(--font-poppins)] text-[22px] leading-[36px] font-normal text-[rgba(11,11,11,0.6)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-[52px] flex items-center gap-[20px] pb-[100px]">
              <AttributionMark />
              <span className="font-[family-name:var(--font-poppins)] text-[20px] leading-[30px] font-normal text-[rgba(11,11,11,0.6)]">
                {ATTRIBUTION}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[75px] p-0 max-[800px]:block min-[801px]:hidden">
        <div className="mx-[15px]">
          <div className="rounded-[7px] bg-[#F5F5F5] px-[20px] py-[50px]">
            <blockquote className="text-left font-[family-name:var(--font-pt-serif)] text-[28px] leading-[34px] font-bold text-[#0B0B0B]">
              {PULL_QUOTE}
            </blockquote>

            <ClientPhoto
              className="mx-auto mt-[32px] w-[320px]"
              captionClass="font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-normal text-[rgba(11,11,11,0.5)]"
            />

            <div className="mt-[32px] flex flex-col gap-[24px]">
              {PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-left font-[family-name:var(--font-inter)] text-[16px] leading-[22px] font-normal text-[rgba(11,11,11,0.4)]"
                >
                  {paragraph}
                </p>
              ))}
              <p className="text-left font-[family-name:var(--font-pt-serif)] text-[20px] leading-[26px] font-bold text-[#0B0B0B]">
                {RESULTS_HEADING}
              </p>
              {RESULTS.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-left font-[family-name:var(--font-inter)] text-[16px] leading-[22px] font-normal text-[rgba(11,11,11,0.4)]"
                >
                  {paragraph}
                </p>
              ))}
              {CLOSING.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-left font-[family-name:var(--font-inter)] text-[16px] leading-[22px] font-normal text-[rgba(11,11,11,0.4)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-[32px] flex items-center gap-[14px]">
              <AttributionMark />
              <span className="font-[family-name:var(--font-inter)] text-[16px] leading-[22px] font-normal text-[rgba(11,11,11,0.6)]">
                {ATTRIBUTION}
              </span>
            </div>

            <div className="mt-[78px]">
              <CtaButton
                variant="cream"
                className="mx-auto block w-[250px] px-0 py-[15px] text-[16px] leading-[20px]"
              >
                Let&apos;s talk
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
