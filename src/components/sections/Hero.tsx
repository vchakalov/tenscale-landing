import { BookCallButton, WhatsAppButton } from "@/components/agentica/CtaButtons";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <h1 className="font-[family-name:var(--font-gelica)] pb-5 text-[48px] sm:text-[88px] max-w-5xl text-center leading-[100%] font-light sm:font-light">
        Personalized AI marketing funnels.
      </h1>
      <p className="font-[family-name:var(--font-geist-sans)] font-normal text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] pb-10 sm:pb-14 text-center max-w-xl text-foreground-secondary">
        Agentica turns every winning angle into its own funnel — hundreds of creatives, a message-matched page, ads run 24/7 and swapped the second they stop selling.
      </p>
      <div className="relative mb-10 sm:mb-14 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <BookCallButton size="lg" />
          <WhatsAppButton size="lg" variant="outline" />
        </div>
        <div className="relative flex flex-row items-center justify-center gap-1">
          <div className="font-[family-name:var(--font-geist-sans)] font-normal text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] text-foreground-secondary">
            Runs on your own Meta account.
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 -mx-2">
        <button className="bg-white text-black px-3 py-2 rounded-full border border-gray-300 hover:bg-brand-lilac hover:border-brand-lilac cursor-pointer transition-colors group flex flex-row flex-nowrap items-center gap-2 no-shrink text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="inline-block flex-grow-0 flex-shrink-0 text-inherit w-icon-xs h-icon-xs stroke-[#8B1120] group-hover:stroke-black transition-all"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          Writes the angles
        </button>
        <button className="bg-white text-black px-3 py-2 rounded-full border border-gray-300 hover:bg-brand-lilac hover:border-brand-lilac cursor-pointer transition-colors group flex flex-row flex-nowrap items-center gap-2 no-shrink text-sm font-medium">
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#8B1120] group-hover:fill-black transition-all size-4 sm:size-5"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M7.2556 2.39892C7.72444 1.93008 8.36032 1.66669 9.02336 1.66669H14.1663C15.5471 1.66669 16.6663 2.78598 16.6663 4.16669V15.8334C16.6663 17.2136 15.5481 18.3334 14.167 18.3334H5.83069C4.44847 18.3334 3.33301 17.2126 3.33301 15.8334V7.35704C3.33301 6.694 3.5964 6.05812 4.06524 5.58928L7.2556 2.39892ZM10.833 4.16669C11.2932 4.16669 11.6663 4.53978 11.6663 5.00002V6.66669C11.6663 7.12692 11.2932 7.50002 10.833 7.50002C10.3728 7.50002 9.99967 7.12692 9.99967 6.66669V5.00002C9.99967 4.53978 10.3728 4.16669 10.833 4.16669ZM13.333 4.16669C13.7932 4.16669 14.1663 4.53978 14.1663 5.00002V6.66669C14.1663 7.12692 13.7932 7.50002 13.333 7.50002C12.8728 7.50002 12.4997 7.12692 12.4997 6.66669V5.00002C12.4997 4.53978 12.8728 4.16669 13.333 4.16669ZM8.34134 7.50002H8.33301C7.87277 7.50002 7.49967 7.12692 7.49967 6.66669C7.49967 6.20645 7.87277 5.83335 8.33301 5.83335H8.34134C8.80158 5.83335 9.17467 6.20645 9.17467 6.66669C9.17467 7.12692 8.80158 7.50002 8.34134 7.50002Z" />
          </svg>
          Generates the creatives
        </button>
        <button className="bg-white text-black px-3 py-2 rounded-full border border-gray-300 hover:bg-brand-lilac hover:border-brand-lilac cursor-pointer transition-colors group flex flex-row flex-nowrap items-center gap-2 no-shrink text-sm font-medium">
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#8B1120] group-hover:fill-black transition-all size-4 sm:size-5"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M7.2556 2.39892C7.72444 1.93008 8.36032 1.66669 9.02336 1.66669H14.1663C15.5471 1.66669 16.6663 2.78598 16.6663 4.16669V15.8334C16.6663 17.2136 15.5481 18.3334 14.167 18.3334H5.83069C4.44847 18.3334 3.33301 17.2126 3.33301 15.8334V7.35704C3.33301 6.694 3.5964 6.05812 4.06524 5.58928L7.2556 2.39892ZM10.833 4.16669C11.2932 4.16669 11.6663 4.53978 11.6663 5.00002V6.66669C11.6663 7.12692 11.2932 7.50002 10.833 7.50002C10.3728 7.50002 9.99967 7.12692 9.99967 6.66669V5.00002C9.99967 4.53978 10.3728 4.16669 10.833 4.16669ZM13.333 4.16669C13.7932 4.16669 14.1663 4.53978 14.1663 5.00002V6.66669C14.1663 7.12692 13.7932 7.50002 13.333 7.50002C12.8728 7.50002 12.4997 7.12692 12.4997 6.66669V5.00002C12.4997 4.53978 12.8728 4.16669 13.333 4.16669ZM8.34134 7.50002H8.33301C7.87277 7.50002 7.49967 7.12692 7.49967 6.66669C7.49967 6.20645 7.87277 5.83335 8.33301 5.83335H8.34134C8.80158 5.83335 9.17467 6.20645 9.17467 6.66669C9.17467 7.12692 8.80158 7.50002 8.34134 7.50002Z" />
          </svg>
          Builds the landing pages
        </button>
        <button className="bg-white text-black px-3 py-2 rounded-full border border-gray-300 hover:bg-brand-lilac hover:border-brand-lilac cursor-pointer transition-colors group flex flex-row flex-nowrap items-center gap-2 no-shrink text-sm font-medium">
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#8B1120] group-hover:fill-black transition-all size-4 sm:size-5"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M11.6008 2.74894C10.6737 1.97634 9.32698 1.97635 8.39987 2.74894L5.06653 5.52672C4.49655 6.00171 4.16699 6.70532 4.16699 7.44727V15.8333C4.16699 17.214 5.28628 18.3333 6.66699 18.3333H13.3337C14.7144 18.3333 15.8337 17.214 15.8337 15.8333V7.44727C15.8337 6.70532 15.5041 6.00171 14.9341 5.52672L11.6008 2.74894ZM10.0003 5.83331C9.54009 5.83331 9.16699 6.20641 9.16699 6.66665C9.16699 7.12689 9.54009 7.49998 10.0003 7.49998H10.0087C10.4689 7.49998 10.842 7.12689 10.842 6.66665C10.842 6.20641 10.4689 5.83331 10.0087 5.83331C10.0087 5.83331 10.4606 5.83331 10.0003 5.83331Z" />
          </svg>
          Runs the ads 24/7
        </button>
      </div>
      <div className="w-full aspect-[16/10] sm:aspect-[16/6] grid items-start max-w-7xl overflow-hidden">
        <div className="row-1 col-1 grid grid-cols-1 relative w-full aspect-[16/9] sm:aspect-[16/10]">
          <div className="grid gap-2" style={{ gridTemplateColumns: '2fr 1fr 2fr' }}>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 2fr 1fr 3fr 1fr' }}>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: '2fr 1fr 2fr 3fr 1fr' }}>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 3fr 2fr 2fr 1fr' }}>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_left,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: '3fr 1fr 2fr' }}>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
            <div className="h-full w-full bg-[linear-gradient(to_right,#F0EEE9,#E6E1DA,#D8D3C9,#CAC4B9)]"></div>
          </div>
          <div className="bg-[url(/images/noise.webp)] absolute inset-0 opacity-15"></div>
        </div>
        <div className="relative row-1 col-1 px-4 pt-8 sm:pt-16">
          <img
            alt="Agentica — a personalized funnel for every awareness stage"
            width="2752"
            height="1536"
            className="rounded-t-2xl border border-[#ECEAE4] shadow-[0_40px_90px_-40px_rgba(17,17,17,0.35)] mx-auto w-full max-w-5xl h-auto"
            src="/images/agentica/hero-awareness.png"
          />
        </div>
      </div>
    </div>
  );
}
