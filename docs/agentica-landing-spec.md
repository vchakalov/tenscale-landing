# Agentica Landing — Content & Design Spec (source of truth)

Repurpose of a jace.ai-style layout into a **premium light Ramp-style** marketing page for **Agentica**.

## Design system (already in `src/app/globals.css` — use these, do NOT hardcode hex)
- Palette: white canvas, `text-foreground` (#171717), `text-foreground-secondary` (#52525b), `text-foreground-tertiary` (#9ca3af), borders `border-border`/`border-border-strong`. ONE accent: `bg-[var(--color-accent)]` red #E5484D (sparingly), `text-[var(--color-accent)]`. Success green `var(--color-success)`. Dark sections use `bg-[var(--color-ink)]` (#0a0a0a) with white text.
- Fonts: sans = Plus Jakarta Sans (default). Metrics/eyebrows = `.mono` (JetBrains Mono) or `font-mono`. Eyebrows use the `.eyebrow` utility (uppercase mono tracked, tertiary).
- Primitives: `.container-default` (max 1200, px-32/20), `.section-full`, `.device-frame` (framed screenshot: rounded-16, border, shadow-lg), `.eyebrow`, `.mono`.
- Radius: cards `rounded-[14px]` (or `rounded-2xl`), pills `rounded-full`. Shadows: `shadow-[var(--shadow-sm)]` / `--shadow-md`. Generous whitespace, section vertical padding ~`py-24 sm:py-28`.
- CTAs: import `{ BookCallButton, WhatsAppButton }` from `@/components/agentica/CtaButtons`. Primary = `<BookCallButton />` (red). Secondary = `<WhatsAppButton variant="outline" />`. Never invent other CTA styles.
- Voice: confident, plain-English, premium. Explain marketing concepts so BOTH savvy and non-savvy get it (e.g. "~100 landing variations + 100 automatic ads"). No hype-slop, no emojis. Real European data (€, ROAS 2.7×, CPL €18.40).
- Honesty guardrails: creatives start from a library of **proven winning ad structures** (don't claim "clones YOUR live winner"). Personalization is **per angle/persona segment** (that's the "one funnel per buyer" promise). "+300%" is a positioning claim — phrase as "up to 3× the conversion rate".

## Product truth (all verified BUILT in the Agentica codebase)
Offering → **Angle** (the promise) → **Strategy** (who) → Creative + personalized Landing Page. Meta's **Andromeda** ML retrieval sends whoever the creative depicts, so a message-matched LP per angle lifts conversion. Features: AI angle generation, 4-step creative pipeline, message-matched landing pages (1-line install, Shopify/Webflow/GTM), 24/7 rules automation (pause/scale/recreate ads on metric conditions), Angle Evaluator (Winning/Testing/Losers buckets, auto-refills angle pool), Messenger AI sales bot (handles objections, books calls), deep Meta Ads API wiring.

## Demo images (in `public/images/agentica/`, all 2752×1536 16:9, light premium)
- `funnel-builder.png` — funnel: Ad→Landing→Instant form + Funnel Performance (ROAS 2.7×). **Used in Hero already.**
- `register-lp.png` — "Register a landing page" modal, one-line snippet, Shopify/Webflow/GTM.
- `angle-evaluator.png` — Winning/Testing/Losers kanban with ROAS/CPA/SPEND/PURCH.
- `creative-library.png` — Leads dashboard, lead-gen tools, WINNER creatives, LIVE STATS.
- `workflows.png` — automatic-rules builder (Spend/Results/Cost-per-result conditions).

## Sections to build (each is a named export in `src/components/agentica/<Name>.tsx`)

### ProofBar
Eyebrow-less slim strip under hero. Line: "Built for performance teams scaling past €100k/month." + a row of 3–4 muted metric chips using `.mono`: "3× conversion rate on message-matched pages", "24/7 ad automation", "50+ angles per product", "€ live spend managed". Keep it understated (muted text, hairline dividers). No fake company logos.

### HowItWorks (id="how")
Eyebrow "HOW IT WORKS". Heading "One engine, from first impression to repurchase." 5-stage horizontal pipeline (build as clean HTML/CSS, NO image): **Leads → Landing → Checkout → Convert → Nurture**, each a bordered card with a small monoline icon, mono "STAGE 1…5" in red, and the name. Thin connectors with a small red arrow between them. Sub-caption per stage (1 line): Leads="Angles + creatives that pull the right buyer", Landing="A page rewritten to match each angle", Checkout="Fewer fields, higher completion", Convert="A Messenger agent that closes & books", Nurture="Automatic follow-up that brings them back". Below: one line "Five stages. One engine. Every buyer gets their own path." Mobile: stack vertically.

### Features (id="features")
Section heading (eyebrow "THE ENGINE" + "Everything a growth team does — run by one engine."). Then **4 alternating feature blocks** (text left/image right, then flip), each: a small mono kicker, a serif-free bold heading, 2 short paragraphs, an optional 2–3 item check list, and the demo image in a `.device-frame`. Blocks:
1. **Personalized landing pages** — image `register-lp.png`. "Message-match, at scale." Body: each angle gets its own landing variation that mirrors the ad's exact promise — hero, benefits and CTA rewritten, facts/prices/structure untouched. Install is one line (works with Shopify, Webflow, GTM). Lift: up to 3× the conversion rate. List: "One-line install", "Rewrites copy, never facts or prices", "A variation per angle, automatically".
2. **Angle & persona engine** — image `angle-evaluator.png`. "Scale with angles, not budget." Body: Agentica proposes new angles, tests them, and sorts them into Winning / Testing / Losers by real ROAS — then auto-generates fresh angles as the pool thins. This is horizontal scaling: 50 angles in 50 funnels beats pouring budget into one. List: "Winning / Testing / Losers buckets", "Auto-refills the angle pool", "Promotes winners, kills losers".
3. **Winning creatives, generated** — image `creative-library.png`. "A creative for every angle." Body: the engine starts from proven winning ad structures and produces fresh creatives per angle and audience — volume × diversity is exactly what Meta's Andromeda rewards. List: "Built on proven structures", "Per-angle, per-audience", "Feeds the algorithm fresh creative".
4. **24/7 ad automation** — image `workflows.png`. "An operator that never sleeps." Body: set rules once — when spend passes a cap with no results, or cost-per-result climbs, Agentica pauses, scales or recreates the ad automatically. Constant freshness, which Meta rewards. List: "If-this-then-that on live metrics", "Pause / scale / recreate", "No sitting in Ads Manager".

### Results (id="results")
Eyebrow "RESULTS". Heading "Built to move the metric that matters." A featured result/testimonial (quote about personalized funnels lifting conversion / scaling past €100k) + 3 stat cards (mono big numbers): "Up to 3× conversion rate", "50+ angles live per product", "24/7 automated optimization". Keep testimonials plausible/generic (no real names/logos required — attribute to a role like "Performance lead, DTC skincare"). Understated, premium.

### HowWeStart (replaces pricing)
Eyebrow "GET STARTED". Heading "How we start working together." A 3-step process (numbered, mono): 1) **Book a call** — we look at your offer, angles and current funnel. 2) **We build your engine** — angles, creatives, personalized pages and automation, set up for your account. 3) **We scale horizontally** — new angles and funnels compound while automation trims the losers. Then a prominent **book-a-call band** (a full-width panel, could be `bg-[var(--color-ink)]` dark for contrast): "Ready to give every buyer their own funnel?" + `<BookCallButton size="lg" />` + `<WhatsAppButton />`. NO pricing tiers, NO numbers.

### Comparison
Eyebrow "WHY AGENTICA". Heading "One engine instead of a whole stack." A two-column "vs" comparison: LEFT card "The old way" (muted) — a stacked list: a media buyer, a designer, a CRO specialist, a landing-page tool, hours in Ads Manager, one funnel for everyone → "spend climbs, scaling stalls". RIGHT card "With Agentica" (accented, subtle red ring) — one engine: angles + creatives + personalized pages + automation → "scale with angles, not budget". A small "vs" divider between them. Keep it clean and factual.

### Trust (dark, id could be omitted)
A `bg-[var(--color-ink)]` dark section (white text) for contrast — "the science / safety". Heading "Powered by Andromeda. Governed by your rules." Body explaining plainly: Meta's Andromeda decides who sees each creative, so the job is feeding it volume × diversity and matching the landing page — that's what Agentica automates. Then 3–4 trust points (monoline icons): "Never rewrites facts, prices or claims", "Your Meta account, your data", "Human-approved before anything sends", "Deploys to Shopify, Webflow & more". This is the one dramatic dark moment on the page.

### Faq (id="faq")
Eyebrow "FAQ". Heading "Questions, answered." Client-component accordion (`'use client'` + useState, one open at a time). 6 Q&A (write plain-English answers, ~2–3 sentences each):
1. "What exactly does Agentica do?" — builds a personalized ad funnel per angle: creatives + a message-matched landing page, then runs and optimizes the ads.
2. "How is this different from an agency?" — it's an engine, not hours; it scales horizontally with angles and never stops testing/optimizing.
3. "Do I need to rebuild my landing page?" — no. One line of code lets Agentica read your page and rewrite only the persuasion copy per angle — never facts, prices or structure.
4. "Does it touch my ad account directly?" — yes, securely via the official Meta API; you stay in control and can approve or pause anything.
5. "What does '+300% conversion' actually mean?" — message-matched pages can lift conversion up to ~3× because the buyer feels the funnel was built for them; results vary by offer.
6. "How do we start?" — book a call or message on WhatsApp; we review your offer and set up your first funnels.
End with a soft line "Still have a question? " + WhatsApp link.

### FooterCta (dark) + Footer
Final dark `bg-[var(--color-ink)]` CTA card "Give every buyer their own funnel." + `<BookCallButton size="lg" />` + `<WhatsAppButton />`. Then a slim footer (dark or white): Agentica wordmark, a one-line tagline, minimal links (How it works / Features / FAQ / Privacy), © 2026 Agentica. No fake social logos unless simple monoline.

## page.tsx order
Header, Hero, ProofBar, HowItWorks, Features, Results, HowWeStart, Comparison, Trust, Faq, FooterCta.

## Rules for builders
- New files only under `src/components/agentica/`. One named export per section.
- TypeScript strict, no `any`. 2-space indent. Use `cn` from `@/lib/utils` when composing classes.
- Images: plain `<img src="/images/agentica/<file>.png" width={2752} height={1536} className="block h-auto w-full" />` inside `.device-frame`.
- Only `'use client'` where interactive (Faq). Everything else server components.
- Match the Hero's craft: balanced headings (`text-balance`), tight tracking on big headings (`tracking-[-0.03em]`), generous spacing, restrained red.
- Verify your file compiles: `npx tsc --noEmit --jsx preserve --module esnext --moduleResolution bundler --skipLibCheck <file>` (React import errors are fine to ignore).
