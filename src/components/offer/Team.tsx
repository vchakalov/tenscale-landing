import Image from "next/image";
import { Shout } from "@/components/offer/parts";

/**
 * The people behind the offer, in place of the screenshot wall. The cards,
 * bios and stats are Eleven Cloud's team section (elevencloud.ai,
 * components/landing/Team.tsx in that repo), drawn in this page's black,
 * white and chartreuse instead of its navy and cream. Tenscale goes by the
 * English names: Venelin is Ben and Radoslav is Ray (Ben, 2026-10-28). Alex's
 * bio leads with his generative AI work here, and Ray's figure is his own
 * ($7M+ in ad spend, not Eleven Cloud's $100M; Ben, 2026-10-28). The rest
 * match Eleven Cloud's, so change those in both places.
 */
type Person = { name: string; role: string; photo: string; bio: string };

const PEOPLE: Person[] = [
  {
    name: "Ben",
    role: "Founder",
    photo: "/images/team/venelin.jpg",
    bio: "Ben has built SaaS, ecommerce, and service businesses, three of which still run without him in the week. He has spent eight years putting AI into live operations at this size, first his own. Before that he shipped software inside a Fortune 500.",
  },
  {
    name: "Ray",
    role: "Head of Growth",
    photo: "/images/team/radoslav.jpg",
    bio: "Ray has managed over $7 million in ad spend. He scaled two education companies in Europe to eight figures, then rebuilt their acquisition so growth no longer sat on the founder. He runs customer acquisition and pricing.",
  },
  {
    name: "Alex",
    role: "CTO",
    photo: "/images/team/alex.jpg",
    bio: "Alex has been building generative AI since 2016, starting in Zurich: systems that create ad creatives, produce video and engineer audio, years before it went mainstream. He has spent ten years in production AI, not research, and put more than twenty systems live in 7- and 8-figure companies.",
  },
  {
    name: "Jasmine",
    role: "Head of Operations",
    photo: "/images/team/jasmine.jpg",
    bio: "Jasmine runs a $40 million operation with more than 80 people across continents. She put in the processes that keep it running without her in every decision. She has spent a decade inside operations of this size.",
  },
];

const STATS = [
  { n: "$7M+", label: "Ad spend managed" },
  { n: "$40M", label: "Operation across continents" },
  { n: "20+", label: "AI systems in production" },
];

export function Team() {
  return (
    <section className="w-full bg-white px-4 pb-20 sm:px-8 sm:pb-32">
      <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
        <Shout className="text-[clamp(32px,5.6vw,60px)] leading-[1.02] text-[#0b0b0c]">
          Say Hello To <span className="text-[#6a2cff]">Our Team</span>
        </Shout>
      </div>

      <ul className="mx-auto mt-12 grid w-full max-w-[1180px] gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {PEOPLE.map((person) => (
          <li key={person.name} className="min-w-0">
            <div className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-[#0b0b0c]">
                <h3 className="bg-[#0b0b0c] px-4 py-3.5 text-center text-[15px] leading-[20px] font-bold text-white">
                  {person.name}, <span className="text-[#e2f93b]">{person.role}</span>
                </h3>
                <div className="flex flex-1 flex-col items-center px-6 py-8">
                  <Image
                    src={person.photo}
                    alt={`${person.name}, ${person.role}`}
                    width={112}
                    height={112}
                    loading="lazy"
                    className="h-[112px] w-[112px] rounded-full object-cover ring-1 ring-[#0b0b0c] ring-offset-4 ring-offset-white"
                  />
                  <p className="mt-6 text-center text-[15px] leading-[23px] text-[#2e2e30]">{person.bio}</p>
                </div>
              </article>
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-4 w-full max-w-[1180px]">
        <dl className="grid gap-8 rounded-[20px] bg-[#0b0b0c] px-6 py-10 text-center sm:grid-cols-3 sm:gap-6 sm:px-10 sm:py-12">
          {STATS.map((stat) => (
            <div key={stat.n} className="flex flex-col items-center">
              <dt className="order-2 mt-2 text-[14px] leading-[20px] text-white/65">{stat.label}</dt>
              <dd className="order-1 text-[44px] leading-none font-black tracking-[-0.03em] text-[#e2f93b] sm:text-[56px]">{stat.n}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-8 text-center text-[13px] text-[#6a6a70]">Disclaimer: Results depend on your offer, traffic, and sales process.</p>
    </section>
  );
}
