export type Transformation = {
  slug: string;
  number: string;
  /**
   * The situation, not the software. A reader should recognize their own week
   * in the title before they know what we built.
   */
  /**
   * What the system is, in plain words. Used wherever the entry is a link:
   * nav labels, card titles, related lists. `title` is the situation it came
   * from and stays as the page's own headline.
   */
  name: string;
  title: string;
  faqLine: string;
  result: string;
  body: string[];
  /**
   * The technical cut, shown on the project page.
   *
   * `trainedOn` is what the system actually learned from, which is the part
   * that decides whether a build works and the part nobody puts on a feature
   * list. `doesNotDo` is the line we deliberately did not cross, written as a
   * limit rather than a feature.
   */
  trainedOn: string;
  doesNotDo: string;
  /**
   * Anonymized client descriptor, e.g. "B2B distributor". Honest about the
   * shape of the business and deliberately silent about its scale.
   */
  client: string;
  /**
   * The operation the build replaced, used as the card and page eyebrow.
   * It names the function, not the industry, because the industry is already
   * carried by `client` and repeating it made every card say the same word
   * twice.
   */
  sector: string;
  /**
   * One or two headline numbers for the card. Only numbers the write-up
   * already supports; a project with one real number gets one card metric
   * rather than an invented second.
   */
  metrics: { value: string; label: string }[];
  /**
   * Labels for the split diagram on the project page.
   *
   * The diagram exists to show one thing prose cannot show as fast: the work
   * arrives on one pipe and leaves on one pipe, and in between it forks. The
   * standard path runs without a person. The exception path never does. Two
   * lines each, because SVG text does not wrap.
   */
  flow: {
    input: string;
    system: string[];
    human: string[];
    output: string;
  };
};

export const TRANSFORMATIONS: Transformation[] = [
  {
    slug: "customer-support",
    number: "01",
    name: "Customer support system",
    title: "Three people on the same inbox",
    faqLine: "Customer support that carries the load of three people.",
    result: "Does the work of 3 agents.",
    body: [
      "A manufacturer had three people on inbox and chat all day. The same questions, the same policies, every day of the week.",
      "We built support on their own sent replies, their products, and the rules the team actually applies. It carries that load now. First reply went from hours to minutes, and the three people moved onto work a system cannot do.",
    ],
    trainedOn:
      "Their own sent replies, the product catalog, and the rules the team actually applies rather than the ones written in the help center.",
    doesNotDo:
      "Anything outside the stated policy goes to a person, and it steps out the moment a customer escalates.",
    client: "Manufacturer",
    sector: "Customer support",
    metrics: [
      { value: "3 people", label: "Inbox load the system carries" },
      { value: "Hours to minutes", label: "Time to first reply" },
    ],
    flow: {
      input: "A customer writes in",
      system: ["Answers from their", "own replies and rules"],
      human: ["Off-policy, or", "already escalated"],
      output: "Customer has an answer",
    },
  },
  {
    slug: "sales",
    number: "02",
    name: "Speed-to-lead system",
    title: "Inbound sitting for four hours",
    faqLine: "Inbound answered in 4 minutes instead of 4 hours.",
    result: "Time-to-lead 4 hours → 4 minutes. Close rate 19% → 28%.",
    body: [
      "A home services company got back to inbound in about four hours. Anything that came in after five sat until morning.",
      "The system qualifies and books while the lead is still on the page. Time to lead went from 4 hours to 4 minutes. Close rate went from 19% to 28%.",
    ],
    trainedOn:
      "Their qualifying criteria, their booking rules, and the inbound they had already won and lost.",
    doesNotDo:
      "It does not sell. It qualifies and it books. The conversation after that is a person's job.",
    client: "Home services company",
    sector: "Sales",
    metrics: [
      { value: "4h to 4min", label: "Time to first callback" },
      { value: "19% to 28%", label: "Close rate on inbound" },
    ],
    flow: {
      input: "An inbound lead lands",
      system: ["Qualifies and books", "in about 4 minutes"],
      human: ["The sales", "conversation"],
      output: "Booked, or passed on",
    },
  },
  {
    slug: "quoting",
    number: "03",
    name: "Quoting system",
    title: "Two days to send an estimate",
    faqLine: "Estimates out in 4 hours instead of two days.",
    result: "Two-day estimates now go out in 4 hours.",
    body: [
      "A B2B distributor wrote estimates by hand off price lists, freight tables, and a salesperson's memory. Two days was normal.",
      "The quoting system drafts from their catalog and their rules. Two-day estimates go out in 4 hours.",
    ],
    trainedOn:
      "Their catalog, their freight rules, and three years of quotes actually sent.",
    doesNotDo:
      "Nothing goes out on its own. Every estimate waits for a person to approve it, and it will not price below the margin floor.",
    client: "B2B distributor",
    sector: "Quoting",
    metrics: [{ value: "2 days to 4h", label: "Estimate turnaround" }],
    flow: {
      input: "A request to quote",
      system: ["Drafts off the catalog", "and the freight rules"],
      human: ["Approves every one,", "holds the floor"],
      output: "The estimate goes out",
    },
  },
  {
    slug: "onboarding",
    number: "04",
    name: "Client onboarding system",
    title: "Three days before delivery starts",
    faqLine: "A new client set up in 40 minutes instead of three days.",
    result: "A 3-day client setup now takes 40 minutes.",
    body: [
      "A professional services firm spent three days on every new client. Contracts, folders, tools, kickoff.",
      "We turned that checklist into a system. Setup takes 40 minutes. Delivery starts the same week instead of the next one.",
    ],
    trainedOn:
      "Their contract templates, their folder conventions, their tool provisioning steps, and the kickoff checklist they had been running by hand.",
    doesNotDo:
      "It does not run the kickoff conversation, and it will not touch a contract term that is off template.",
    client: "Professional services firm",
    sector: "Onboarding",
    metrics: [
      { value: "3 days to 40min", label: "New client setup" },
      { value: "Same week", label: "Delivery starts, instead of the next" },
    ],
    flow: {
      input: "A new client signs",
      system: ["Contracts, folders,", "tools, provisioning"],
      human: ["The kickoff call, and", "off-template terms"],
      output: "Delivery starts",
    },
  },
  {
    slug: "collections",
    number: "05",
    name: "Collections system",
    title: "Cash stuck in 60- and 90-day",
    faqLine: "Overdue invoices chased without a person sitting on the file.",
    result: "Overdue invoices chased without a collector on the file.",
    body: [
      "A wholesaler had cash sitting in 60- and 90-day. One person chased it when they had a spare hour, which was not often.",
      "The system sends the right chase on the right invoice, in their voice, and hands over the ones that need a human. Cash comes back about 12 days sooner.",
    ],
    trainedOn:
      "Their aging report, their payment terms, and the chase emails they had already been sending.",
    doesNotDo:
      "Disputed invoices are not its business, and it stops on any account somebody has flagged as a relationship worth protecting.",
    client: "Wholesaler",
    sector: "Collections",
    metrics: [{ value: "12 days", label: "Sooner the cash lands" }],
    flow: {
      input: "An invoice runs late",
      system: ["Chases on terms,", "in their voice"],
      human: ["Disputes, and", "flagged accounts"],
      output: "Paid, or a decision",
    },
  },
  {
    slug: "inbound-qualification",
    number: "06",
    name: "Lead qualification system",
    title: "The wrong appointments in the book",
    faqLine: "Inbound scored so sales only talks to people who fit.",
    result: "Sales only talks to fit.",
    body: [
      "A multi-location clinic was filling the book with the wrong appointments. The front desk said yes to whoever called.",
      "Inbound is scored against the patients they actually want more of. The book is denser, wrong-fit dropped, and the front desk spends the day on people who should be there.",
    ],
    trainedOn:
      "Their own appointment history and the mix of patients they said they wanted more of.",
    doesNotDo:
      "No clinical judgment of any kind. The scoring is administrative and it stops there.",
    client: "Multi-location clinic group",
    sector: "Intake",
    metrics: [{ value: "Every inquiry", label: "Scored before it reaches sales" }],
    flow: {
      input: "Someone calls the desk",
      system: ["Scores against the", "patients they want"],
      human: ["Anything clinical.", "All of it"],
      output: "Booked, or not",
    },
  },
  {
    slug: "job-dispatch",
    number: "07",
    name: "Job dispatch system",
    title: "One person on the board all day",
    faqLine:
      "Jobs assigned and tracked without a coordinator on the board all day.",
    result: "Work assigned without a coordinator on the board all day.",
    body: [
      "A field services company had one person on the board from open to close. Zones, skills, who was free, what had run long.",
      "Dispatch runs on their zones, their skills, and their job types. Jobs get assigned and tracked. That coordinator is off the board and back on the work they were hired for.",
    ],
    trainedOn:
      "Their zones, their skills matrix, their job types, and how clashes had actually been handled before.",
    doesNotDo:
      "Same-day emergencies still go to a person, and it hands back any job a customer has already complained about.",
    client: "Field services company",
    sector: "Dispatch",
    metrics: [{ value: "1 person", label: "Taken off the dispatch board" }],
    flow: {
      input: "A job comes in",
      system: ["Assigns on zones,", "skills, and job type"],
      human: ["Emergencies, and", "complaints"],
      output: "Assigned and tracked",
    },
  },
  {
    slug: "floor-knowledge",
    number: "08",
    name: "Floor knowledge system",
    title: "Forty questions a week to the owner",
    faqLine: "The floor pulls the SOP instead of asking the owner.",
    result: "The team pulls the SOP instead of pinging the owner.",
    body: [
      "A production company ran the same forty questions past the owner or the plant manager every week. Both of them answered from memory.",
      "We trained a system on their SOPs and on the answers those two had already given. The floor pulls it. The owner is off that loop.",
    ],
    trainedOn:
      "Their SOPs, and the answers the owner and the plant manager had already given over the previous years.",
    doesNotDo:
      "It does not answer anything the SOPs do not cover. Those go straight to the person who owns that area.",
    client: "Production company",
    sector: "Knowledge",
    metrics: [{ value: "40 a week", label: "Questions off the owner's desk" }],
    flow: {
      input: "The floor asks",
      system: ["Answers from the SOPs", "and past answers"],
      human: ["Anything the SOPs", "do not cover"],
      output: "Answered on the floor",
    },
  },
  {
    slug: "hiring-screen",
    number: "09",
    name: "Hiring screen system",
    title: "Screening as a manager's second job",
    faqLine: "Applicants scored against the role before a manager sees them.",
    result: "Applicants scored against the actual role.",
    body: [
      "An operations business of 80 people. First-pass screening had become a second job for the managers doing it.",
      "Applicants are scored against the role, using the job itself and the people already doing it well. Recruiter and manager hours on first pass dropped by more than half.",
    ],
    trainedOn:
      "The job itself, and the profiles of the people already doing it well.",
    doesNotDo:
      "It rejects nobody. It ranks and it summarizes. Every interview decision stays with the manager.",
    client: "Operations business, 80 people",
    sector: "Hiring",
    metrics: [{ value: "Over 50%", label: "Fewer first-pass screening hours" }],
    flow: {
      input: "An application arrives",
      system: ["Ranks against the", "role and the team"],
      human: ["Every interview", "decision"],
      output: "A ranked shortlist",
    },
  },
  {
    slug: "same-day-invoicing",
    number: "10",
    name: "Same-day invoicing system",
    title: "Invoicing the week after the work",
    faqLine: "The invoice goes out the day the job closes, not the week after.",
    result: "The invoice goes out when the job closes, not the week after.",
    body: [
      "A contractor finished the work and invoiced the following week, sometimes later than that. The cash sat in the gap.",
      "When the job is marked complete, the invoice goes out that day off their own line items and terms.",
    ],
    trainedOn:
      "Their line items, their payment terms, and the completed jobs they had already invoiced.",
    doesNotDo:
      "Above a set value it stops, and it will not touch a job carrying a variation. Both go to a person.",
    client: "Contractor",
    sector: "Invoicing",
    metrics: [{ value: "Same day", label: "Invoice out, instead of the next week" }],
    flow: {
      input: "A job is marked done",
      system: ["Builds off their own", "items and terms"],
      human: ["Big-ticket jobs,", "and any variation"],
      output: "Invoice out that day",
    },
  },
];
