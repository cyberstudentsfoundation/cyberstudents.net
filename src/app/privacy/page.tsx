import type { Metadata } from "next";
import Link from "next/link";
import { site } from "~/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy · CyberStudents",
};

// Written from what the code actually stores. Update it whenever the data we collect changes.
export default function PrivacyPolicy() {
  return (
    <main className="mx-4 mt-10 mb-12 flex justify-center sm:mx-8 sm:mt-16 sm:mb-24 md:mx-10">
      <div className="w-full max-w-(--breakpoint-lg)">
        <div className="prose prose-gray prose-invert">
          <h1>Privacy Policy</h1>
          <p>Last updated: November 22, 2026</p>
          <p>
            This page explains what information cyberstudents.net collects, why, and what you can do about it. It covers
            this website only. Our Discord server is also governed by Discord&rsquo;s own privacy policy.
          </p>

          <h2>Browsing without an account</h2>
          <p>
            You can read every page and every challenge on this site without signing in. We use PostHog to collect basic
            usage analytics, such as which pages are visited and from what kind of device. We do not sell this
            information or use it for advertising.
          </p>

          <h2>Accounts</h2>
          <p>
            You can sign in with Discord or Google. When you do, we store the name, email address and profile picture
            that the provider shares with us, and a session so you stay signed in.
          </p>

          <h2>Registering for an event</h2>
          <p>When you register for an event such as Advent of CTF, we also store what you enter in the form:</p>
          <ul>
            <li>your schooling status and country, to place you in the right division</li>
            <li>a display name and, if you choose, a LinkedIn profile, which are shown on leaderboards</li>
            <li>how you heard about us</li>
            <li>whether you agree to let event sponsors contact you</li>
          </ul>
          <p>
            We also record your challenge attempts and solves, which are used for scoring. Your display name, profile
            picture and solves are public on leaderboards and challenge pages. Your email address and the name from your
            sign-in provider are not shown publicly.
          </p>
          <p>
            During an event, we may collect information about your device, such as your IP address and user agent, to
            keep the competition fair. This information is deleted after competition results are finalized.
          </p>

          <h2>Prize verification</h2>
          <p>
            Prize winners are asked to verify their identity and, for student divisions, their student status. This can
            include your full name, date of birth, country, school, a school email address, and an uploaded document. We
            use this only to decide prize eligibility and send prizes. It is visible only to event administrators and is
            never published.
          </p>

          <h2>Sharing</h2>
          <p>
            We do not sell personal information. We share it only with the services we use to run the site (hosting, our
            database, and PostHog for analytics), with prize sponsors when you have agreed to sponsor contact or need to
            receive a sponsor&rsquo;s prize, or when the law requires it.
          </p>

          <h2>Children</h2>
          <p>
            You must meet the minimum age for your country to use this site. See our{" "}
            <Link href="/age-requirements">age requirements</Link>.
          </p>

          <h2>Your choices</h2>
          <p>
            Registered players can change their display name and LinkedIn profile by signing in and opening the event
            registration page. To see, correct or delete the information we hold about you, or to delete your account,
            email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>Changes</h2>
          <p>If we change this policy, we will update the date at the top of this page.</p>
        </div>
      </div>
    </main>
  );
}
