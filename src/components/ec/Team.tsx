type Person = {
  name: string;
  role: string;
  initial: string;
  bio: string;
  photo?: string;
};

const PEOPLE: Person[] = [
  {
    name: "Venelin",
    role: "Founder",
    initial: "V",
    photo: "/images/team/venelin.jpg",
    bio: "Venelin has built SaaS, ecommerce, and service businesses, three of which still run without him in the week. He has spent eight years putting AI into live operations at this size, first his own. Before that he shipped software inside a Fortune 500.",
  },
  {
    name: "Radoslav",
    role: "Head of Growth",
    initial: "R",
    photo: "/images/team/radoslav.jpg",
    bio: "Radoslav has managed over $100 million in ad spend. He scaled two education companies in Europe to eight figures, then rebuilt their acquisition so growth no longer sat on the founder. He runs customer acquisition and pricing.",
  },
  {
    name: "Alex",
    role: "CTO",
    initial: "A",
    photo: "/images/team/alex.jpg",
    bio: "Alex has spent ten years in production AI, not research. He has put more than twenty systems live in 7- and 8-figure companies, replacing quoting, support, dispatch, and onboarding.",
  },
  {
    name: "Jasmine",
    role: "Head of Operations",
    initial: "J",
    photo: "/images/team/jasmine.jpg",
    bio: "Jasmine runs a $40 million operation with more than 80 people across continents. She put in the processes that keep it running without her in every decision. She has spent a decade inside operations of this size.",
  },
];

const STATS = [
  { n: "$100M+", label: "Put through paid ads" },
  { n: "$40M", label: "Operation across continents" },
  { n: "20+", label: "AI systems in production" },
] as const;

function PersonCard({ name, role, initial, bio, photo }: Person) {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#EDE8DF] bg-[#0A0908]">
      <div className="bg-[#EDE8DF] px-[16px] py-[12px] text-center font-[family-name:var(--font-pt-serif)] text-[14px] leading-[18px] font-bold text-[#0A0908]">
        {name}, {role}
      </div>
      <div className="flex flex-col items-center px-[18px] py-[28px]">
        <div className="relative h-[112px] w-[112px] overflow-hidden rounded-full border border-[#EDE8DF] bg-[#0A0908]">
          {photo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt={name}
                width={112}
                height={112}
                className="h-full w-full object-cover [filter:saturate(0.8)_brightness(0.97)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[#EDE8DF] opacity-[0.18]"
              />
            </>
          ) : (
            <span className="flex h-full w-full items-center justify-center font-[family-name:var(--font-pt-serif)] text-[28px] font-bold text-[#EDE8DF]">
              {initial}
            </span>
          )}
        </div>
        <p className="mt-[20px] text-center font-[family-name:var(--font-inter)] text-[13px] leading-[18px] text-[#EDE8DF]">
          {bio}
        </p>
      </div>
    </article>
  );
}

export function Team() {
  return (
    <>
      <div className="hidden min-[801px]:block">
        <section className="mt-[220px] px-[40px] py-[5px]">
          <div className="mx-auto w-full max-w-[1120px]">
            <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[48px] leading-[52px] font-bold text-[#EDE8DF]">
              Say Hello to Our team
            </h2>
          </div>
        </section>

        <section className="mt-[50px] px-[40px] py-[50px]">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="grid grid-cols-4 gap-[20px]">
              {PEOPLE.map((person) => (
                <PersonCard key={person.name} {...person} />
              ))}
            </div>
            <div className="mt-[40px] rounded-[12px] bg-[#EDE8DF] px-[40px] py-[48px]">
              <div className="grid grid-cols-3 gap-[24px] text-center">
                {STATS.map((stat) => (
                  <div key={stat.n}>
                    <div className="font-[family-name:var(--font-pt-serif)] text-[56px] leading-[64px] font-bold text-[#0A0908]">
                      {stat.n}
                    </div>
                    <p className="mt-[12px] font-[family-name:var(--font-inter)] text-[14px] leading-[20px] text-[rgba(10,9,8,0.7)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="max-[800px]:block min-[801px]:hidden">
        <section className="mt-[65px] px-[5px] py-[20px]">
          <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[40px] leading-[46px] font-bold text-[#EDE8DF]">
            Say Hello to
            <br />
            Our Team
          </h2>
        </section>
        <section className="mt-[40px] flex flex-col gap-[20px] px-[20px]">
          {PEOPLE.map((person) => (
            <PersonCard key={person.name} {...person} />
          ))}
          <div className="rounded-[12px] bg-[#EDE8DF] px-[20px] py-[32px]">
            <div className="flex flex-col gap-[28px] text-center">
              {STATS.map((stat) => (
                <div key={stat.n}>
                  <div className="font-[family-name:var(--font-pt-serif)] text-[40px] leading-[48px] font-bold text-[#0A0908]">
                    {stat.n}
                  </div>
                  <p className="mt-[8px] font-[family-name:var(--font-inter)] text-[14px] leading-[20px] text-[rgba(10,9,8,0.7)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
