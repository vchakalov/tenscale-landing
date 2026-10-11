# tenscale-landing

The website at **https://tenscale.ai**: the Tenscale company page, the paid-traffic
landing pages, and the page a lead sees after booking a call. A Next.js static export,
served by a Cloudflare Worker that also does first-party tracking and sends events to
Meta's Conversions API.

## Pages

| Route | What it is | Indexed |
|---|---|---|
| `/` | Company page (`src/components/sections/`) | yes |
| `/landing` | Ad landing: VSL, benefits, objections, booking | no |
| `/landing-sp` | Same page with the proof wall moved right under the video. An A/B variant of `/landing`; that one section is the only difference | no |
| `/thank-you` | Where iClosed sends the lead after booking: Ben's video, add-to-calendar, save-my-number, prep for the call. No CTA on purpose | no |
| `/privacy` | Privacy policy and tracking notice | yes |

These three are in the brand's light theme (white, black and the lime) with the TS
mark. Each also exists in two more colours, with the same sections, copy and
tracking:

- `-blue`: the original cream, navy and blue (`/landing-blue`, `/landing-sp-blue`,
  `/thank-you-blue`)
- `-bl`: lime on near-black (`/landing-bl`, `/landing-sp-bl`, `/thank-you-bl`)

The theme is one class on the page's root (`ec-theme-light`, `ec-theme-black`, or
none for the original palette), which swaps the colour tokens in
`src/app/globals.css`. A booking from any of them lands on `/thank-you`, because the
redirect is a single setting in iClosed.

Every CTA opens the iClosed booking widget in a dialog (`BookingModal`). There is no
form of our own.

## Stack

- Next.js 16 (App Router) with `output: "export"`, React 19, TypeScript, Tailwind CSS v4
- Cloudflare Worker (`worker/`) in front of the static files in `out/`
- PostHog for product analytics, Meta Pixel + Conversions API for ads
- Vitest for the Worker and `src/lib` tests
- Node 24 (`.nvmrc`)

## Working on it

```bash
nvm use
npm ci
npm run dev          # Next.js only, http://localhost:3000
npm run preview:cf   # build, then run the real Worker locally with wrangler dev
```

`npm run dev` does not run the Worker, so `window.__ag` is missing: no Meta pixel, a
random PostHog id, and a booking widget without tracking parameters. Use
`preview:cf` when tracking matters. Local Worker secrets go in `.dev.vars`
(gitignored).

Before pushing:

```bash
npm run check   # lint + typecheck + build
npm test
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, tests and the build on every
push and pull request to `main`. It does not deploy.

## Deploying

Deploys are manual, from a machine logged in to the Cloudflare account
(`npx wrangler login`):

```bash
npm run deploy:cf    # next build && wrangler deploy
```

The Worker is `agentica-landing` (the name predates the rename to Tenscale; see
below). It answers four custom domains. `tenscale.ai` is canonical; `www.tenscale.ai`,
`agenticalab.io` and `www.agenticalab.io` get a 301 to the same path and query on
`tenscale.ai`, so old ad links keep their `fbclid` and UTMs.

Secrets, set with `npx wrangler secret put <NAME>`:

| Secret | Value | Without it |
|---|---|---|
| `META_PIXEL_ID` | Meta dataset `1656511732818609` | no pixel, no CAPI; the site still works |
| `META_CAPI_TOKEN` | system-user token for that dataset | no CAPI |
| `META_TEST_EVENT_CODE` | optional, from Events Manager → Test events | events go to the live dataset |

Remove `META_TEST_EVENT_CODE` after testing, or every event keeps landing in Test events.

**Adding a page an ad can land on:** add it to `assets.run_worker_first` in
`wrangler.jsonc`. A page that is not listed is served straight from the asset edge,
the Worker never runs, and the first-party cookie is never written.

## Tracking

The Worker runs on every HTML response (`worker/index.ts`):

1. Reads or creates the `ag_ctx` cookie (HttpOnly, 400 days): `fbclid`, `fbc`, `fbp`,
   UTMs (latest and first-touch), landing URL, first-seen time, and `externalId`, a
   random id that names the visitor everywhere. Written by the server, because Safari
   caps a cookie written from JavaScript to 24 hours on an ad click.
2. Writes `_fbp` and `_fbc` itself (90 days), so they exist even when the pixel is
   blocked.
3. Injects `window.__ag` into the page (ids, UTMs, `pixelId`, the PageView event id).
4. Sends `PageView` to the Conversions API with the same event id the pixel uses, so
   Meta keeps one copy.

The same `externalId` is the PostHog distinct id, Meta's `external_id` (SHA-256), and
is passed to iClosed as `external_id`, from where it reaches GoHighLevel. One visitor is
one person across all three.

Two more Worker routes:

- `POST /booking/prep`: engagement events from the page, forwarded to CAPI with the
  visitor's IP, user agent and stored ids. Only the names and values listed in
  `worker/events.ts` get through. The path is deliberately not `/collect` or
  `/track`, which ad blockers drop.
- `/relay/*`: a proxy to PostHog (US cloud, project 657030), for the same reason.

Events sent from the browser go to the pixel and to `/booking/prep` with one shared
id (`metaEvent` in `src/lib/analytics.ts`):

| Meta event | When | Params |
|---|---|---|
| `PageView` | every page (pixel + Worker) | |
| `VideoProgress` | 25/50/75/95% of a video, with sound only | `video_id`: `vsl` or `thank_you`, `percent` |
| `ViewContent` | half the landing VSL with sound, once per visitor | `content_name: vsl` |
| `ButtonClick` | a CTA with a `trackId` | `button_id`: `hero_desktop`, `hero_mobile`, `after_benefits`, `after_objections`, `sticky_mobile` |
| `Schedule` | `/thank-you`, pixel only, once per call | id `booked-<callId>` |

The server side of `Schedule`, and everything after the booking (`Contact` for showed
and qualified, `Purchase` with the deal value), is sent by **integration-bridge**
(github.com/Agentica-io/integration-bridge) from the iClosed and GoHighLevel webhooks.
`Schedule` uses the same `booked-<callId>` id there, so Meta deduplicates the two.

PostHog gets the video funnel (`vsl_preview`, `vsl_unmute`, `vsl_progress` every 10%
split by sound on/off, `vsl_chapter`, `vsl_seek`, `vsl_speed`, `vsl_pause`,
`vsl_fullscreen`), `booking_open`, and `booked`. On `booked` the lead is identified by
email. Heatmaps and session recordings are on, with inputs masked.

## Booking and the thank-you page

1. A CTA opens the iClosed widget (`app.iclosed.io/e/agentica/meet`) with the UTMs,
   `fbc`, `fbp` and `external_id` from `window.__ag` (`src/lib/booking.ts`).
2. iClosed redirects to `/thank-you` with the booking in the query string: start and
   end time, time zone, the invitee's name and email, the call id
   (`src/lib/appointment.ts`).
3. `AppointmentCard` draws the booking and the calendar buttons (Google, Outlook,
   `.ics`). It asks integration-bridge (`GET /booking?email=&id=`) for the Google Meet
   link, which the bridge has a few seconds after iClosed's webhook
   (`src/lib/booking-links.ts`).
4. The contact card downloads `public/contact/ben-tenscale.vcf`.

## Media

- **Landing VSL**: one 1080p MP4 on Cloudflare R2 at `media.tenscale.ai`. File name
  and chapter times: `VSL_SOURCE` and `VSL_CHAPTERS` in `src/components/ec/Vsl.tsx`.
- **Ben's thank-you video**: `tenscale-thank-you.mp4` on the same R2 bucket (`media`),
  remuxed to faststart. `THANK_YOU_VIDEO` and `THANK_YOU_CHAPTERS` in
  `src/components/ec/ThankYouFold.tsx`. Its subtitles are
  `public/captions/thank-you.en.vtt`, on by default with a CC button to turn them off.
  They are served from this site rather than R2, because a `<track>` on another origin
  needs CORS. Upload a new cut with
  `npx wrangler r2 object put media/<file> --file <path> --content-type video/mp4 --remote`.
- **Four answer videos** on `/thank-you`: `BREAKOUTS` in
  `src/components/ec/BreakoutVideos.tsx`. An empty `src` shows the card as text only.
- Client screenshots for the proof wall: `public/proof/`.

## Code map

```
src/app/                 routes (see Pages)
src/components/ec/       landing + thank-you sections (ported from the Eleven Cloud layout)
src/components/sections/ company page sections
src/components/MetaPixel.tsx, Analytics.tsx   pixel + PostHog bootstrap
src/lib/analytics.ts     PostHog, pixel and CAPI helpers
src/lib/booking*.ts      iClosed widget, Meet link lookup
src/lib/appointment.ts   reads the booking from the thank-you URL
worker/                  Cloudflare Worker: cookie, CAPI, /booking/prep, /relay, redirects
public/_headers          cache and content-type rules for the asset server
```

## Names that still say Agentica, on purpose

Tenscale was called Agentica until September 2026.

- iClosed booking slug `/e/agentica/meet`: it changes only when it is changed in
  iClosed, and then in `src/lib/booking.ts`, `src/components/ec/CtaButton.tsx` and
  `src/components/sections/CtaButtons.tsx` at the same time, or booking breaks.
- The `ag_ctx` cookie and `window.__ag`: renaming the cookie would give every returning
  visitor a new id and cut their history.
- `agenticalab.io`: the old domain, kept live as a redirect.

## Open items at handover (2026-10-11)

- The four answer videos on `/thank-you` are not filmed yet.
- The company page footer links to `/terms` and `/impressum`, which do not exist yet.
- Code comments cite specs under `docs/superpowers/specs/`. Those live in the internal
  planning repo, not here.

## License

Started from [JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template),
MIT. `LICENSE` is that project's and stays, as the MIT terms require.
