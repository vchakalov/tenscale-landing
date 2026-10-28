import type { Metadata } from "next";
import { CONTACT_EMAIL, LegalPage, type LegalSection } from "@/components/ec/LegalPage";

export const metadata: Metadata = {
  title: "Tenscale: privacy policy",
  alternates: { canonical: "/privacy/" },
  description:
    "What Tenscale collects when you visit this site, book a call or connect a Meta account to the Tenscale app, why, who we share it with, and how to opt out or have it deleted.",
};

/**
 * The privacy policy.
 *
 * Written against what this funnel actually does, not from a template: the
 * first-party cookie the Worker writes, the Meta pixel and Conversions API, the
 * booking widget, the CRM, and the call recording. Meta's Business Tools terms
 * require a clear notice naming the tools and a route to opt out, and a page
 * that lists tools we do not use would be worse than none.
 *
 * The same holds for the Tenscale app (the Agentica platform behind the Meta app
 * "Tenscale LLC"). Meta's App Review reads this page against the permissions the
 * app asks for, so the section on connected Meta accounts names what the app
 * actually stores, not everything the permissions would allow.
 *
 * `LAST_UPDATED` is edited by hand. A date that moves on every deploy tells the
 * reader nothing about when the terms changed.
 */
const LAST_UPDATED = "28 October 2026";

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        Tenscale builds and runs Meta advertising systems for agencies. This site
        presents that service and lets you book a call with us, and the Tenscale
        app is the software we run those systems with. Both are operated by
        &ldquo;RePharma Health&rdquo; Ltd, which is responsible for the personal
        data described here. Questions about this policy or about your data go to{" "}
        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
  {
    heading: "What we collect when you visit",
    body: (
      <>
        <p>
          When you open a page, we store a small file in your browser (a cookie
          named <code>ag_ctx</code>) that holds:
        </p>
        <ul>
          <li>
            the advertising values in the address of the page you arrived on:
            <code> utm_source</code>, <code>utm_medium</code>,{" "}
            <code>utm_campaign</code>, <code>utm_term</code>,{" "}
            <code>utm_content</code>, and Meta&rsquo;s click identifier{" "}
            <code>fbclid</code>;
          </li>
          <li>the page you first landed on and the time of that visit;</li>
          <li>
            a random identifier for your browser. It is not your name and we
            cannot read it on any other website.
          </li>
        </ul>
        <p>
          The cookie lasts up to 400 days, and your browser sends it only to this
          site. We use it to know which advertisement brought a visitor who later
          books a call, and to recognise the same browser in the reports described
          below.
        </p>
        <p>
          We also write two cookies that Meta&rsquo;s advertising tools read:{" "}
          <code>_fbp</code>, a random identifier for your browser, and{" "}
          <code>_fbc</code>, which keeps Meta&rsquo;s click identifier when you
          arrive from one of our ads. Both last 90 days. The page also loads the
          Meta pixel, a script from Meta that reports the same events from your
          browser.
        </p>
        <p>
          Our server also sees what every web server sees: your IP address, your
          browser and the page you requested.
        </p>
      </>
    ),
  },
  {
    heading: "What we collect when you book a call",
    body: (
      <>
        <p>
          The booking form asks for your name, email address, phone number, your
          company website and a few questions about your agency. We need them to
          hold the appointment, to send you the details, and to prepare for the
          call.
        </p>
        <p>
          If the call happens, we record it and keep the recording and the
          transcript. We use them to remember what was agreed and to improve how
          we run calls. You are told at the start of the call, and you can ask us
          not to record.
        </p>
      </>
    ),
  },
  {
    heading: "What we collect when you take a free resource",
    body: (
      <>
        <p>
          A free template asks for your email address. We check that it can
          receive mail by looking up its domain, and we turn away temporary
          inboxes. We keep the address in GoHighLevel with the name of the
          resource and how you first found the site, and we may email you about
          it. Every email has an unsubscribe link.
        </p>
      </>
    ),
  },
  {
    heading: "What the Tenscale app receives from Meta",
    body: (
      <>
        <p>
          A business that works with us can connect its Meta business portfolio
          to the Tenscale app with Facebook Login for Business. The business
          chooses which ad accounts, Facebook Pages and Instagram accounts the app
          may use, and can remove that access at any time. The app then receives
          and keeps:
        </p>
        <ul>
          <li>
            the business portfolio&rsquo;s name and ID, and an access token for a
            system user the app creates in that portfolio. Tokens are stored
            encrypted and never shown in the app;
          </li>
          <li>
            the chosen ad accounts and their campaigns, ad sets, ads, creatives
            and performance reports, which the app reads and changes to run the
            business&rsquo;s advertising;
          </li>
          <li>
            the chosen Pages and their own access tokens, to publish ads from the
            Page and to receive its messages and comments;
          </li>
          <li>
            messages sent to the Page on Messenger and comments under its posts and
            ads on Facebook and Instagram: the text, the time, and the sender&rsquo;s
            name and the ID Meta gives them for that Page. The app uses them to
            answer in the business&rsquo;s name and to hide comments the business
            does not want on its ads;
          </li>
          <li>
            the instant forms the business runs with its ads and, when the
            business has the app collect them, the leads submitted through those
            forms (name, email address, phone number and form answers), so the
            business can follow up with those people.
          </li>
        </ul>
        <p>
          We use this data only to provide the service to the business that
          connected the account. We do not sell it, do not use it to advertise to
          the people in it, and do not combine it across businesses. The text of
          messages, comments and leads may be passed to an AI model to draft a
          reply or a call summary; the model provider processes it for that
          request only.
        </p>
        <p>
          The app&rsquo;s data is stored with <strong>Supabase</strong> and runs
          on <strong>Google Cloud</strong>. AI requests go through{" "}
          <strong>OpenRouter</strong> or <strong>Google</strong>, and are logged in{" "}
          <strong>Langfuse</strong> so we can check the quality of what the app
          writes.
        </p>
      </>
    ),
  },
  {
    heading: "Who else sees it",
    body: (
      <>
        <p>We use a small number of services, and each one sees only what it needs:</p>
        <ul>
          <li>
            <strong>Meta (Facebook, Instagram).</strong> We tell Meta what happens
            on this site and after it: that you viewed a page, how much of a video
            you watched with the sound on, that you pressed a booking button or
            booked a call, whether the call took place, and whether you became a
            client and for what amount. Meta uses these reports to measure our
            advertising and to show our ads to people like you. To match a report
            to your Meta account, we send your IP address and browser, the
            identifiers in the cookies above and Meta&rsquo;s click identifier.
            Once you book, we add your name, email address, phone number and
            country, each in a protected, unreadable form (a one-way hash). We do
            not send Meta your answers to the booking questions, your call
            recording or our notes.
          </li>
          <li>
            <strong>iClosed</strong> runs the booking calendar and the questions.
          </li>
          <li>
            <strong>PostHog</strong> measures how the site is used: which pages
            you open, how far you scroll, what you click, how much of our videos
            you watch, and a replay of the visit with anything you type hidden.
            We use it to see where the page is unclear. If you book a call, your
            email is attached to your visit so we can see what you read before it.
          </li>
          <li>
            <strong>GoHighLevel</strong> is the system where we keep your contact
            details, your booking and our notes.
          </li>
          <li>
            <strong>Google Meet</strong> hosts the call, and{" "}
            <strong>Fathom</strong> records and transcribes it.
          </li>
          <li>
            <strong>Google Cloud</strong> and <strong>Cloudflare</strong> host the
            site and the software that connects these services.
          </li>
        </ul>
        <p>
          We do not sell your data. Some US state laws, including
          California&rsquo;s, count the reports to Meta described above as
          &ldquo;sharing&rdquo; personal information for advertising. Meta&rsquo;s
          own controls for this are described below.
        </p>
      </>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <>
        <ul>
          <li>
            <strong>Advertising.</strong> You can turn off personalised ads in
            your{" "}
            <a
              className="underline"
              href="https://accountscenter.facebook.com/ad_preferences"
              rel="noopener noreferrer"
              target="_blank"
            >
              Meta ad preferences
            </a>{" "}
            and disconnect what businesses share with Meta in{" "}
            <a
              className="underline"
              href="https://accountscenter.facebook.com/info_and_permissions/off_facebook_activity"
              rel="noopener noreferrer"
              target="_blank"
            >
              your activity off Meta technologies
            </a>
            .
          </li>
          <li>
            <strong>Cookies.</strong> Your browser can block or delete cookies,
            including ours. The site keeps working; we simply stop knowing which
            advertisement brought you.
          </li>
          <li>
            <strong>Your data.</strong> Write to{" "}
            <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            and we will tell you what we hold about you, correct it, or delete it.
            Several US states, including California, give you these rights by law;
            we apply them to everyone who asks.
          </li>
          <li>
            <strong>Emails and messages.</strong> Every email has an unsubscribe
            link. Reply STOP to a text message and we stop.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        Contact details and booking records stay while we may still do business
        together, and for three years after our last contact. Call recordings and
        transcripts are deleted after twelve months. The visit cookie expires after
        400 days, or sooner if you delete it. Data the Tenscale app receives from
        Meta stays while the business uses the app; when it disconnects or asks us
        to, we delete it within 30 days. How to ask is on our{" "}
        <a className="underline" href="/data-deletion/">
          data deletion page
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Changes",
    body: (
      <p>
        If we change how we use your data, we change this page and the date at the
        top. This version is from {LAST_UPDATED}.
      </p>
    ),
  },
];

export default function Page() {
  return <LegalPage title="Privacy policy" lastUpdated={LAST_UPDATED} sections={SECTIONS} />;
}
