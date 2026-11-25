import type { Metadata } from "next";
import Link from "next/link";
import { site } from "~/data/site";

export const metadata: Metadata = {
  title: "Terms of Service · CyberStudents",
};

export default function TermsOfService() {
  return (
    <main className="mx-4 mt-10 mb-12 flex justify-center sm:mx-8 sm:mt-16 sm:mb-24 md:mx-10">
      <div className="w-full max-w-(--breakpoint-lg)">
        <div className="prose prose-gray prose-invert">
          <h1>Terms of Service</h1>
          <p>Last updated: November 22, 2026</p>
          <p>
            These terms apply to cyberstudents.net and the competitions hosted on it. By using the site you agree to
            them. Our Discord server has its own <Link href="/server-rules">server rules</Link>.
          </p>

          <h2>Who can use the site</h2>
          <p>
            You must meet the minimum age for your country, listed on our{" "}
            <Link href="/age-requirements">age requirements</Link> page. Each person may have one account.
          </p>

          <h2>Fair play</h2>
          <ul>
            <li>
              Only attack what a challenge asks you to attack. Do not attack the competition website, scoring system,
              Discord bot, Discord server, or other players.
            </li>
            <li>Do not try to make the site or challenge infrastructure unavailable, or escape challenge sandboxes.</li>
            <li>Do not share accounts, or use files, links or instances created for another player.</li>
            <li>
              Each event may have additional rules, published on its rules page. Those rules apply during that event.
            </li>
          </ul>
          <p>
            If you find a real vulnerability in this site rather than in a challenge, please report it to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> instead of exploiting it.
          </p>

          <h2>Prizes</h2>
          <p>
            Prize eligibility, divisions and amounts are set by each event&rsquo;s rules. Winners may be asked to verify
            their identity and student status before receiving a prize. Event administrators may disqualify players who
            break the rules, and their decisions on scoring and prizes are final.
          </p>

          <h2>Content</h2>
          <p>
            Challenges and write-ups published in our public GitHub repositories are licensed under{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. When you submit a write-up, you allow
            us to publish it under the same license with credit to you.
          </p>

          <h2>Accounts</h2>
          <p>
            We may suspend accounts that break these terms or an event&rsquo;s rules. You can ask us to delete your
            account at any time; see our <Link href="/privacy">privacy policy</Link>.
          </p>

          <h2>No warranty</h2>
          <p>
            CyberStudents is run by volunteers. The site and its challenges are provided as they are, without any
            warranty, and may change or go offline. To the extent the law allows, we are not liable for any loss that
            comes from using them.
          </p>

          <h2>Changes</h2>
          <p>
            If we change these terms, we will update the date at the top of this page. Questions go to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
