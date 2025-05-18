import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Rules · CyberStudents",
};

export default function ServerRules() {
  return (
    <main className="mx-4 mt-10 flex justify-center sm:mx-8 sm:mt-16 md:mx-10">
      <div className="w-full max-w-screen-lg">
        <div className="prose prose-gray prose-invert">
          <h1>Server Rules</h1>
          <p>Last updated: July 23, 2024</p>
          <p>
            Please refer to{" "}
            <a
              href="https://discord.com/channels/916144903686336513/1158407393856720926"
              target="_blank"
              className="not-prose text-nowrap rounded-sm bg-[rgba(88,101,242,0.3)] px-1 py-0.5 font-medium text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
            >
              #📒丨briefing
            </a>{" "}
            in the Discord server for the most up-to-date rules. These rules only apply to the{" "}
            <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
              Discord server
            </a>
            .
          </p>
          <ol>
            <li>
              <strong>Discriminatory, NSFW, or offensive content is not allowed.</strong>
              <br />
              This includes unnecessary drama, toxicity, or arguments.
            </li>
            <li>
              <strong>Controversial political topics or content is not allowed.</strong>
              <br />
              This includes all political content regardless of its origin.
            </li>
            <li>
              <strong>Illegal, malicious, doxxed, scammed, or advertised content is not allowed.</strong>
              <br />
              This includes any type of solicitation, or any mentions of illegal activities in this server, and DM
              advertising.
            </li>
            <li>
              <strong>Do not ping more than 3 members in a message, or spam ping random members.</strong>
              <br />
              If you need help with an issue, please contact{" "}
              <a
                href="https://discord.com/users/575252669443211264"
                target="_blank"
                className="not-prose text-nowrap rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
              >
                @ModMail
              </a>{" "}
              instead of repeatedly DMing or pinging staff.
            </li>
            <li>
              <strong>Make sure your Discord profile is appropriate.</strong>
              <br />
              If your username, profile picture, banner, status, about me, or another part of your profile has any type
              of rule-breaking content then you will be given a warning to change it. If you do not comply, you will be
              banned until it is changed.
            </li>
            <li>
              <strong>Mild profanity is allowed, but any slurs, NSFW, or offensive terms are banned.</strong>
              <br />
              This is due to avoiding offensive conflict and goes with breaking rule #1.
            </li>
            <li>
              <strong>No advertising/self promoting.</strong>
              <br />
              As mentioned in rule #3, advertisements or self-promotion is not allowed (including in DMs) unless
              approved by an administrator. Do not DM or solicit others
            </li>
            <li>
              <strong>Do not DM or solicit others without permission. </strong>
              <br />
              Do not DM people in this server asking for help, unless they gave you permission.
            </li>
            <li>
              <strong>Alt accounts must be approved by an administrator.</strong>
              <br />
              Unapproved alts may result in a ban for all accounts for that member. This is to prevent ban evasion and
              other forms of abuse. You can approve your alt by creating a ticket in{" "}
              <a
                href="https://discord.com/users/575252669443211264"
                target="_blank"
                className="not-prose text-nowrap rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
              >
                @ModMail
              </a>
              .
            </li>
            <li>
              <strong>Drugs or alcohol-related content is not allowed.</strong>
              <br />
              This includes both legal and illegal drugs, any form or type of smoking/vaping, and any type of alcohol.
            </li>
            <li>
              <strong>Follow the Discord Terms of Service and Community Guidelines.</strong>
              <br />
              These will be listed below:
              <ul>
                <li>
                  <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">
                    Discord Terms
                  </a>
                </li>
                <li>
                  <a href="https://discord.com/guidelines" target="_blank" rel="noopener noreferrer">
                    Discord Guidelines
                  </a>
                </li>
              </ul>
            </li>
          </ol>
          <h2>Remarks</h2>
          <ul>
            <li>Moderators issue punishments based on context, severity, and their discretion.</li>
            <li>
              If you believe a staff member is abusing their power or issuing unfair punishments, please DM{" "}
              <a
                href="https://discord.com/users/693224764587770038"
                target="_blank"
                className="not-prose text-nowrap rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
              >
                @vip3r
              </a>{" "}
              with evidence.
            </li>
            <li>
              If you are banned, you can appeal through the DM by Wick. Repeated denials of appeals may make your ban
              non-appealable.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
