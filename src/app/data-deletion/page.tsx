import type { Metadata } from "next";
import { CONTACT_EMAIL, LegalPage, type LegalSection } from "@/components/ec/LegalPage";

export const metadata: Metadata = {
  title: "Tenscale: data deletion",
  alternates: { canonical: "/data-deletion/" },
  description:
    "How to remove the Tenscale app's access to your Meta account and have the data it holds about you or your business deleted.",
};

/**
 * The data deletion instructions.
 *
 * Meta requires every app that uses Facebook Login to give people a way to have
 * their data deleted, either as a callback or as a page with instructions. The
 * app has no callback, so this page is the route, and its URL is the one set as
 * "Data deletion instructions URL" in the Meta app settings.
 *
 * It covers both kinds of people the app holds data about: a business that
 * connected its Meta account, and a person who messaged, commented on or filled
 * in a form for one of those businesses.
 */
const LAST_UPDATED = "28 October 2026";

const MAIL = (
  <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
    {CONTACT_EMAIL}
  </a>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "If your business connected its Meta account",
    body: (
      <>
        <p>You can remove the Tenscale app&rsquo;s access yourself, at any time:</p>
        <ol>
          <li>
            Open{" "}
            <a
              className="underline"
              href="https://business.facebook.com/settings/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Meta Business settings
            </a>{" "}
            for your business portfolio.
          </li>
          <li>
            Under <strong>Integrations</strong>, open <strong>Connected apps</strong>,
            choose <strong>Tenscale LLC</strong> and remove it. Under{" "}
            <strong>Users &rsaquo; System users</strong>, you can also remove the
            &ldquo;Agentica System User&rdquo; the app created.
          </li>
        </ol>
        <p>
          From that moment the app can no longer read or change anything in your
          Meta account. To have the data it already holds deleted as well, write to{" "}
          {MAIL} from an address of a person who manages the business, and name
          the business portfolio. We delete the connection, its tokens, and the
          ad, Page, message, comment and lead data the app stored for your
          business within 30 days, and confirm by email when it is done.
        </p>
      </>
    ),
  },
  {
    heading: "If you messaged, commented on or filled in a form for a business we work for",
    body: (
      <>
        <p>
          Write to {MAIL} with the name of the business, the Facebook or Instagram
          name you used, and roughly when. We find the messages, comments and
          lead details the app holds about you, delete them within 30 days, and
          tell the business we have done so.
        </p>
        <p>
          The business itself, and Meta, may keep their own copies. You can ask
          them directly, and manage what Meta holds in your{" "}
          <a
            className="underline"
            href="https://accountscenter.facebook.com/your_information_and_permissions"
            rel="noopener noreferrer"
            target="_blank"
          >
            Meta Accounts Center
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "If you only visited this site or booked a call",
    body: (
      <p>
        Write to {MAIL} and we delete your contact details, booking and call
        recording. The <a className="underline" href="/privacy/">privacy policy</a>{" "}
        lists what that covers.
      </p>
    ),
  },
];

export default function Page() {
  return <LegalPage title="Data deletion" lastUpdated={LAST_UPDATED} sections={SECTIONS} />;
}
