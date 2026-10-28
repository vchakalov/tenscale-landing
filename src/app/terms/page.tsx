import type { Metadata } from "next";
import { CONTACT_EMAIL, LegalPage, type LegalSection } from "@/components/ec/LegalPage";

export const metadata: Metadata = {
  title: "Tenscale: terms of service",
  alternates: { canonical: "/terms/" },
  description: "The terms for using tenscale.ai and the Tenscale app, including connecting a Meta account.",
};

/**
 * The terms of service.
 *
 * Meta's app settings require a Terms of Service URL. The commercial terms a
 * client signs (price, scope, the 30-day guarantee) are in the agreement made at
 * onboarding, not here; this page covers using the site and the app, and above
 * all what a client allows when it connects its Meta account. Where the two
 * differ, the signed agreement wins, and the page says so.
 */
const LAST_UPDATED = "28 October 2026";

const SECTIONS: LegalSection[] = [
  {
    heading: "Who you are dealing with",
    body: (
      <p>
        tenscale.ai and the Tenscale app are operated by &ldquo;RePharma
        Health&rdquo; Ltd (&ldquo;Tenscale&rdquo;, &ldquo;we&rdquo;). These terms
        apply to anyone who uses the site or the app. If your business has signed
        an agreement with us, that agreement applies first, and these terms fill in
        what it does not cover.
      </p>
    ),
  },
  {
    heading: "The service",
    body: (
      <p>
        Tenscale builds and runs Meta advertising for the businesses we work with:
        campaigns, creatives, landing pages, and replies to the messages and
        comments those ads bring. We do this through the Tenscale app, which
        works in your Meta account only with the access you give it.
      </p>
    ),
  },
  {
    heading: "Connecting your Meta account",
    body: (
      <>
        <p>
          When you connect your Meta business portfolio, you confirm that you are
          allowed to give that access for the business, and you allow the app to
          act on the ad accounts, Pages and Instagram accounts you choose: to
          create, change, pause and report on ads, to manage instant forms and
          their leads, and to answer messages and comments in the
          business&rsquo;s name.
        </p>
        <p>
          Changes that spend money or publish in your name follow the approval
          rules agreed with you. You can remove the app&rsquo;s access at any time
          in Meta Business settings; our{" "}
          <a className="underline" href="/data-deletion/">data deletion page</a>{" "}
          explains how, and how to have the data deleted.
        </p>
      </>
    ),
  },
  {
    heading: "Your responsibilities",
    body: (
      <ul>
        <li>Your ads, offers and pages must follow the law and Meta&rsquo;s advertising policies.</li>
        <li>You pay Meta for the ads you run; ad spend is never part of our fee unless agreed in writing.</li>
        <li>Keep the logins to the app to the people who should have them.</li>
      </ul>
    ),
  },
  {
    heading: "Data",
    body: (
      <p>
        The data your Meta account gives the app stays yours. We use it only to
        provide the service to you, as the{" "}
        <a className="underline" href="/privacy/">privacy policy</a> describes.
      </p>
    ),
  },
  {
    heading: "Meta",
    body: (
      <p>
        Tenscale is not part of Meta and is not endorsed by Meta. Meta can change
        or restrict its platform, and when it does, parts of the service may stop
        working until we adapt. Results from advertising vary and are not
        guaranteed beyond what a signed agreement says.
      </p>
    ),
  },
  {
    heading: "Liability",
    body: (
      <p>
        We provide the site and the app with reasonable care. To the extent the
        law allows, we are not liable for indirect losses, lost profit, or losses
        caused by Meta or other third-party services, and our total liability is
        limited to the fees you paid us in the three months before the claim.
      </p>
    ),
  },
  {
    heading: "Changes and contact",
    body: (
      <p>
        If we change these terms, we change this page and the date at the top.
        These terms are governed by the laws of Bulgaria. Questions go to{" "}
        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function Page() {
  return <LegalPage title="Terms of service" lastUpdated={LAST_UPDATED} sections={SECTIONS} />;
}
