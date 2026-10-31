import Image from "next/image";

/**
 * The "everything you get" picture Russell Brunson puts under every headline:
 * a monitor, a laptop and a tablet, here showing the product rather than a
 * book. Drawn in CSS around the real screenshots, so the screens stay sharp
 * and a new screenshot needs no new artwork.
 *
 * Centre: the creatives library, the most varied set of ads we have
 * (images/tenscale/features-creatives.png without the sidebar and the
 * breadcrumb, which still says "Agentica"). Right: the angles board, a 2x
 * screenshot of the app (dev.tenscale.ai, the Evelin SF account, 2026-10-31)
 * cut to the Winning and Testing columns so it reads at tablet size. Left: two ads
 * routed to their own rewritten pages, the last frame of
 * videos/tour-pages.mp4, sharpened and set on a 16:10 canvas so both pages
 * show in full, because the point is that they differ (Ben, 2026-10-31). It is
 * a file of its own so the home page's poster stays light.
 */
export function Bundle() {
  return (
    <div className="relative mx-auto w-full max-w-[1080px]">
      {/* the glow the devices sit in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] top-[18%] bottom-[-6%] rounded-full bg-[radial-gradient(closest-side,rgba(106,44,255,0.45),transparent)] blur-2xl"
      />

      <div className="relative pb-[4%]">
        {/* the monitor */}
        <div className="relative z-0 mx-auto w-[66%]">
          <div className="rounded-[clamp(8px,1.4vw,18px)] bg-[#1c1c1f] p-[1.3%] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <div className="relative aspect-[16/9.4] overflow-hidden rounded-[clamp(4px,0.7vw,9px)] bg-white">
              <Image
                src="/images/offer/hero-creatives.webp"
                alt="The creatives library: rows of ad creatives the engine made for one offer"
                width={1440}
                height={983}
                priority
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
          <div aria-hidden="true" className="mx-auto aspect-[1/0.55] w-[13%] bg-[linear-gradient(180deg,#9a9aa2,#d4d4da)]" />
          <div aria-hidden="true" className="mx-auto h-[clamp(4px,0.8vw,10px)] w-[30%] rounded-t-[6px] bg-[linear-gradient(180deg,#e2e2e6,#a8a8b0)]" />
        </div>

        <Laptop
          className="absolute bottom-0 left-0 z-10 w-[46%]"
          shot={{ src: "/images/offer/hero-pages.webp", width: 1280, height: 800 }}
          alt="Two ads for two angles, each routed to its own version of the landing page, with conversion rates up 322% and 313%"
        />
        <Tablet
          className="absolute right-[1%] bottom-[2%] z-10 w-[34%]"
          shot={{ src: "/images/offer/hero-angles.webp", width: 1200, height: 901 }}
          alt="The angles board: winning and testing angles with their cost per result, spend and results"
        />
      </div>
    </div>
  );
}

type Shot = { src: string; width: number; height: number };

function Laptop({ shot, alt, className }: { shot: Shot; alt: string; className: string }) {
  return (
    <div className={className}>
      <div className="mx-[6%] rounded-t-[clamp(6px,1vw,12px)] bg-[#1c1c1f] p-[2%] pb-[2.6%] ring-1 ring-white/10">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(2px,0.4vw,5px)] bg-white">
          <Image src={shot.src} alt={alt} width={shot.width} height={shot.height} className="h-full w-full object-cover object-left-top" />
        </div>
      </div>
      {/* the base, with the notch you open it by */}
      <div
        aria-hidden="true"
        className="relative h-[clamp(6px,1.3vw,16px)] rounded-b-[clamp(6px,1vw,14px)] bg-[linear-gradient(180deg,#ececf0_0%,#b4b4bc_60%,#8c8c94_100%)] shadow-[0_24px_40px_-20px_rgba(0,0,0,0.9)]"
      >
        <div className="absolute top-0 left-1/2 h-[45%] w-[16%] -translate-x-1/2 rounded-b-[6px] bg-[#a2a2aa]" />
      </div>
    </div>
  );
}

/** A tablet on its side: an even bezel all round and nothing else. */
function Tablet({ shot, alt, className }: { shot: Shot; alt: string; className: string }) {
  return (
    <div className={className}>
      <div className="rounded-[clamp(8px,1.6vw,20px)] bg-[#1c1c1f] p-[3%] shadow-[0_30px_50px_-24px_rgba(0,0,0,0.95)] ring-1 ring-white/15">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[clamp(4px,0.8vw,10px)] bg-white">
          <Image src={shot.src} alt={alt} width={shot.width} height={shot.height} className="h-full w-full object-cover object-left-top" />
        </div>
      </div>
    </div>
  );
}
