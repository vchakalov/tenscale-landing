<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# tenscale-landing

The tenscale.ai website. Read `README.md` first: pages, tracking, deploy, secrets.

## Rules

- **This repository is public.** No keys, tokens or `.env` contents in code, comments
  or commits. Secrets live in Cloudflare (`wrangler secret put`) and in `.env.local` /
  `.dev.vars`, both gitignored. The PostHog `phc_` key in `src/lib/analytics.ts` is
  public by design; a `phx_` key is not.
- The site is a static export (`output: "export"`). No server components that need a
  server at request time, no API routes. Anything dynamic belongs in `worker/`.
- A new page that ads can land on must be added to `assets.run_worker_first` in
  `wrangler.jsonc`, or tracking silently stops on it.
- A new Meta event name or value must be added to `worker/events.ts` (and, for a CTA,
  to `CtaTrackId` in `src/components/ec/CtaButton.tsx`). The Worker drops anything
  else.
- Tracking must never break the page: every analytics call is wrapped and swallows
  its errors. Keep it that way.
- Copy on the landing and thank-you pages is Ben's. Propose wording changes, do not
  rewrite them on your own.

## Commands

- `npm run dev`: Next.js dev server (no Worker)
- `npm run preview:cf`: build and run the Worker locally
- `npm run check`: lint + typecheck + build
- `npm test`: Vitest
- `npm run deploy:cf`: build and deploy to Cloudflare

## Style

TypeScript strict, named exports, Tailwind utility classes, 2-space indentation.
Comments explain why a thing is the way it is, in plain sentences; match that.
