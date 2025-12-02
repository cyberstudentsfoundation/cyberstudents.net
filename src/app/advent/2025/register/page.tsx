import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { HiArrowUpRight, HiExclamationCircle, HiLightBulb } from "react-icons/hi2";
import RegisterForm from "./form";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

export default async function Register() {
  const session = await getServerAuthSession();

  let user = null;
  if (session?.user) {
    user = await api.user.me();
  }

  return (
    <main className="mb-12 sm:mb-24">
      <div className="flex justify-center">
        <div className="w-full max-w-(--breakpoint-2xl)">
          <div className="flex flex-col items-center justify-between gap-16 xl:flex-row xl:items-start xl:gap-8">
            <div className="mx-4 mt-24 max-w-prose xl:mb-32">
              {/* <Link href="/advent/2024" className="mb-4 flex items-center gap-2 text-sm text-gray-300 hover:underline">
                    <HiChevronLeft className="mb-px h-4 w-4" />
                    <span className="">Back to Advent of CTF</span>
                  </Link> */}
              <Button asChild>
                <a
                  href="#form"
                  className="mb-8 flex items-center gap-2 text-sm text-gray-300 hover:underline xl:hidden"
                >
                  <span>Jump to registration</span>
                  <HiArrowUpRight className="mb-px h-4 w-4 stroke-1" />
                </a>
              </Button>
              <p className="mb-1 text-xl font-bold text-gray-200">CyberStudents&rsquo;</p>
              <h1 className="mb-8 font-mono text-4xl font-bold">
                advent of ctf<span className="ml-5 font-sans font-light text-cyan-300">2025</span>
              </h1>
              <div className="prose prose-gray prose-invert">
                <p>
                  This event will run from <strong>December 1, 2025 8:00 PM</strong> to{" "}
                  <strong>December 31, 2025 11:59 PM</strong> (EST). You can register anytime before the event ends.
                </p>
                <p>
                  <strong>The following competition guidelines are subject to change ahead of the event.</strong>
                </p>
                <h2>Challenges</h2>
                <p>
                  <strong>A new challenge is released every day at 8 PM EST until December 25.</strong> To solve a
                  challenge, you need to obtain a flag (which is always in the format{" "}
                  <strong className="font-mono font-medium">{"csd{example_flag}"}</strong>). Knowing this format may be
                  useful when attempting certain challenges.
                </p>
                <Alert className="my-2 bg-cyan-600/50! text-gray-100! dark:bg-cyan-600">
                  <HiLightBulb className="h-5 w-5" />
                  <AlertTitle className="font-semibold">CTF Tip</AlertTitle>
                  <AlertDescription className="mt-2 text-base text-gray-200">
                    Flags can be obtained in a variety of ways, depending on the category. For example, you may need to
                    reverse engineer or exploit a vulnerability in a web application or binary, or decrypt a ciphertext.
                    Each challenge will have its own set of instructions and clues to help you get started. Before
                    figuring out how to <em>capture the flag</em>, make sure you have an idea of where it&rsquo;s
                    located!
                  </AlertDescription>
                </Alert>
                <p>
                  There will be a variety of challenges released every day, covering all six of the following
                  categories: web exploitation, reverse engineering, binary exploitation, forensics, cryptography, and
                  miscellaneous. The challenges will progressively get harder as the month goes on, but we will always
                  have help and resources available for everyone.
                </p>
                <p>
                  Challenges can be solved in any order and at any time. You do not need to solve previous challenges
                  before attempting later-released challenges.
                </p>
                <h2>Hints</h2>
                <p>
                  Each challenge has two hints designed to point you in the right direction and help you progress. Hints{" "}
                  <strong>do not cost points</strong> and you will not be penalized for viewing them.
                </p>
                <ul>
                  <li>
                    The <strong>first hint</strong> is released 12 hours after each challenge is released at 8 AM EST.
                  </li>
                  <li>
                    The <strong>second hint</strong> is released 24 hours after each challenge is released at 8 PM EST.
                  </li>
                </ul>
                <p>
                  If you ever get stuck on a challenge, it might be helpful to come back to it later once a hint has
                  been released. If you still need help after viewing both hints, feel free to come chat with us in our{" "}
                  <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
                    Discord server
                  </a>
                  !
                </p>
                <h2>Scoring</h2>
                <p>
                  Each challenge starts at <strong>500 points</strong>, and the points will decrease over time as the
                  challenge is solved by other players.
                </p>
                <p>
                  Please note that the updated points will retroactively apply to all teams who have solved the
                  challenge, meaning you will not be at a disadvantage if you solve a challenge later in the event.
                </p>
                <p>
                  In case of a tiebreaker between points, however, the player who has solved their most recent challenge
                  the earliest will be placed first.
                </p>
                <h2>Help and collaboration</h2>
                <p>
                  <strong>We encourage collaboration and teamwork!</strong> CTFs are most enjoyable when you work with
                  others to solve challenges together. Even though Advent of CTF is an individual event, we allow
                  collaboration between players as long as you follow these guidelines:
                </p>
                <ul>
                  <li>
                    You may collaborate only after the challenge has been solved by at least five other players. This is
                    to keep the leaderboard fair and competitive.
                  </li>
                  <li>
                    Some challenges have unique flags generated for each player. Do not submit another player&rsquo;s
                    flag or use another player&rsquo;s instance or environment.
                  </li>
                  <li>
                    Using generative AI tools such as ChatGPT is allowed, but remember that understanding the challenge
                    and solution is fundamental to learning. We may not offer assistance if it appears that you&rsquo;re
                    solely relying on others without genuine effort.
                  </li>
                </ul>
                <h2>Technical requirements</h2>
                <p>
                  Many Advent of CTF 2025 challenges can be solved without any special software that needs to be
                  installed on your computer.
                </p>
                <p>
                  However, some challenges may require you to download files, use command-line tools, or write code to
                  solve them. For those challenges, you will need a computer that can run and install the necessary
                  software. Don&rsquo;t worry if you&rsquo;re not sure how to use certain tools or programming. There
                  are many resources available, and we&rsquo;re always here to help you get started!
                </p>
                <p>
                  Some challenges involving binaries or virtual machine images may only be compatible with computers
                  with x86_64 (AMD64) architecture. If you have a computer with ARM architecture (e.g., Apple Silicon,
                  Chromebooks), you may need to use virtualization software or emulators to run those challenges.
                  We&rsquo;re happy to help you set this up if needed.
                </p>
                <h2>Prizes and divisions</h2>
                <p>
                  The prize pool for this event will be over <strong>$12,000 USD</strong> for all divisions and the
                  raffle, including non-monetary items like APIsec certifications and CTFGuide Pro subscriptions.
                </p>
                <p>
                  We will also host a raffle for all participants who solve at least one challenge to win up to{" "}
                  <strong>$5,000</strong> worth of APIsec certifications! More details about the raffle will be
                  announced during the event.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Division</th>
                      <th>Placement</th>
                      <th>Prize (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={3}>
                        Student
                        <br />
                        (HS & College)
                      </td>
                      <td>1st</td>
                      <td>
                        <strong>$225</strong> + ASCP, CASA, ACP (APIsec) + CTFGuide Pro (1 year)
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">2nd</td>
                      <td>
                        <strong>$125</strong> + ASCP, CASA, ACP (APIsec) + CTFGuide Pro (3 mo)
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">3rd</td>
                      <td>
                        <strong>$75</strong> + ASCP, CASA, ACP (APIsec) + CTFGuide Pro (1 mo)
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={3}>High School</td>
                      <td>1st</td>
                      <td>ASCP, CASA, ACP (APIsec) + CTFGuide Pro (1 year)</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">2nd</td>
                      <td>ASCP, CASA, ACP (APIsec) + CTFGuide Pro (3 mo)</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">3rd</td>
                      <td>ASCP, CASA, ACP (APIsec) + CTFGuide Pro (1 mo)</td>
                    </tr>
                    <tr>
                      <td rowSpan={3}>Write-Up</td>
                      <td>Best well-written</td>
                      <td>
                        <strong>$25</strong> + CASA, ACP (APIsec) + CTFGuide Pro (3 mo)
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">Best technical</td>
                      <td>
                        <strong>$25</strong> + CASA, ACP (APIsec) + CTFGuide Pro (3 mo)
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">Best unintended solution</td>
                      <td>
                        <strong>$25</strong> + CASA, ACP (APIsec) + CTFGuide Pro (3 mo)
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={1}>Raffle</td>
                      <td></td>
                      <td>
                        Win up to <strong>$5,000</strong> worth of APIsec certifications
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>
                    Only full-time <strong>high school</strong> students (or the international equivalent) and full-time{" "}
                    <strong>undergraduate</strong> college/university students at an accredited institution are eligible
                    to win prizes for the High School & College division.
                  </li>
                  <li>
                    <strong>All monetary prizes will be awarded in USD.</strong> (This is a change from previous years.)
                    Certain non-monetary prizes are subject to availability and may vary based on location and other
                    factors; please contact the event administrators for more information.
                  </li>
                  <li>
                    Any registered player is allowed to participate in the Write-Up Division. We will open submissions
                    near the end of the event; they will be judged by the event administrators and challenge developers.
                    More details regarding write-up submissions will be announced later.
                  </li>
                </ul>
                <h2>Additional guidelines</h2>
                <ul>
                  <li>
                    Individuals must be 13 years old or above by the time they begin registration. Participants living
                    in certain countries or regions may have a higher age requirement. Please see the full list{" "}
                    <a href="/age-requirements" target="_blank" rel="noopener noreferrer">
                      here
                    </a>
                    .
                  </li>
                  <li>
                    Individuals under 18 years old or the age of majority in their country must have consent from their
                    parent or guardian.
                  </li>
                  <li>
                    Individuals who have not yet begun 9th grade (or the equivalent in their country) cannot participate
                    in the High School and College division without first obtaining permission from an event
                    administrator. Students are <strong>not considered</strong> to be in high school during the summer
                    before they begin 9th grade.
                  </li>
                  <li>
                    Inaccurate or false information provided during registration may result in disqualification from the
                    event.
                  </li>
                  <li>
                    Participants should always show sportsmanship and be respectful towards other players and event
                    administrators.
                  </li>
                  <li>
                    Flag hoarding (i.e., waiting to submit many flags near the end) is discouraged, but not prohibited.
                    Waiting to submit flags may result in a longer verification process at the end of the event.
                  </li>
                  <li>
                    Sharing or accepting flags or any other type of disallowed collaboration (see &ldquo;Help and
                    collaboration&rdquo; above) to other players during the event is prohibited.
                  </li>
                  <li>
                    Negligently making flags or any other type of disallowed collaboration accessible to other players
                    (e.g., on social media, forums, public Discord channels, by sharing an account on ChatGPT with other
                    players) may result in disqualification.
                  </li>
                  <li>
                    Write-ups to be submitted for the Write-Up Division must not be publicly shared or published before
                    the submission period ends.
                    {/* Certain write-ups which players may be restricted from being discussed or
                    published for some period after the event ends (&ldquo;embargoed&rdquo;). Until we announce which
                    challenges are embargoed and for how long, participants may not discuss or publish write-ups for any
                    challenges. */}
                  </li>
                  <li>
                    Using automated tools (e.g., DirBuster, sqlmap) blindly to scrape or fuzz challenges extensively
                    (e.g., with a large, generic wordlist) to the degree where it may cause performance issues is
                    prohibited, unless specified otherwise.
                  </li>
                  <li>
                    Players should observe notes or code comments regarding out-of-scope functionality or behavior
                    within a challenge which were obviously and seriously written by challenge developers (e.g.,
                    &ldquo;online mode is just for fun and is not part of the challenge, seriously!&rdquo;).
                  </li>
                  <li>
                    Using commercial-level computing resources (e.g., AWS, school or university clusters, renting GPUs
                    or other hardware) specifically for the competition without prior permission from an event
                    administrator is prohibited.
                  </li>
                  {/* <li>
                    Participants may not use any performance-enhancing or similar substances, including but not limited
                    to, amphetamine sulfate (Evekeo), dextroamphetamine (Adderall and Adderall XR), dexedrine
                    (ProCentra, Zenzedi), dexmethylphenidate (Focalin and Focalin XR), lisdexamfetamine (Vyvanse), and
                    methylphenidate (Concerta, Daytrana, Metadate CD and Metadate ER, Methylin and Methylin ER, Ritalin,
                    Ritalin SR, Ritalin LA, Quillivant XR) during the event unless they have a justifiable medical
                    condition and have obtained express permission from an event administrator.
                  </li> */}
                  <li>Do not repeatedly spam or attempt to render the server or infrastructure inaccessible.</li>
                  <li>Do not use files, links, or instances that were created for another player.</li>
                  <li>
                    Do not perform or attempt to perform attacks on the competition website, scoring system, Discord
                    bot, or Discord server.
                  </li>
                  <li>Do not attempt to perform attacks on or attempt to sabotage other players.</li>
                  <li>Do not attempt to circumvent sandboxes for challenges.</li>
                  {/* <li>
                    All team members must register with their own account and join their team as soon as possible.
                  </li> */}
                  <li>
                    Each person can only register with one account. Account sharing is prohibited and is a bad practice.
                  </li>
                  <li>
                    Information about participants&rsquo; devices, including IP addresses, user agents, and other
                    patterns may be collected to ensure competitive integrity. Any attempts to circumvent this
                    collection or its accuracy may result in disqualification (excluding regular and common privacy
                    practices such as ad blockers or VPNs). These data will be deleted after competition results are
                    finalized.
                  </li>
                  <li>
                    Challenge developers and Advent of CTF event administrators are not allowed to participate in the
                    event.
                  </li>
                  <li>
                    Participants must not be currently banned from the Discord server or have been disqualified from
                    previous Advent of CTF events.{" "}
                    <em>Please appeal prior bans or disqualifications before registering.</em>
                  </li>
                  <li>
                    The competition guidelines will still apply to all participants after the event ends until the event
                    administrators announce the winner(s) for all divisions.
                  </li>
                  {/* <li>
                    The entire team may be disqualified if any team member or associated parties are found to be in
                    violation of the competition guidelines. Exceptions may be made at the discretion of the event
                    administrators based on the severity of the violation and involvement of other parties.
                  </li> */}
                  <li>
                    The event administrators reserve the right to disqualify and revoke recognition from any player at
                    any time, including after the competition.
                  </li>
                  <li>
                    <em>Did you know that we used to have an arbitration clause here for fun :)</em>
                  </li>
                  {/* <li>
                    <p>
                      Any dispute, controversy, or claim arising out of or relating to this Agreement, including its
                      breach, termination, enforcement, interpretation, or validity, shall be resolved by binding
                      arbitration conducted in the United States. The arbitration shall be administered by an
                      arbitration provider or individual arbitrator selected solely by CyberStudents. The arbitration
                      shall be conducted in English, in accordance with procedures agreed upon by the parties or, if no
                      agreement is reached, as determined by the appointed arbitrator. Judgment on the arbitral award
                      may be entered in any court having jurisdiction.
                    </p>
                    <p>
                      To the fullest extent permitted by applicable law, all disputes shall be resolved on an individual
                      basis. Neither party shall bring or participate in any class, collective, or representative action
                      or proceeding against the other, whether in arbitration or otherwise. The arbitrator shall not
                      have authority to consolidate claims or award relief on a class, collective, or representative
                      basis.
                    </p>
                    <p>
                      Notwithstanding the foregoing, either party may opt out of this arbitration agreement and the
                      class action waiver by providing written notice of such election to the other party within thirty
                      (30) days of entering into this Agreement. The opt-out notice must include the party&rsquo;s full
                      legal name, username used during registration, and a clear statement of the intent to opt out. If
                      no such notice is provided within that time period, this arbitration clause and class action
                      waiver will be binding.
                    </p>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="-mt-2 h-[calc(100vh-5rem)] w-full max-w-prose pt-1.5 pb-4 xl:sticky xl:top-24 xl:max-w-2xl xl:self-start">
              <ScrollArea
                className="h-full w-full rounded-t-none rounded-b-none bg-gray-800/50 px-8 shadow-lg sm:rounded-t-lg sm:rounded-b-lg xl:rounded-t-none"
                thumbClassName="dark:bg-gray-600"
              >
                <a id="form" className="scroll-mt-26" />
                <RegisterForm session={session} user={user} />
                {/* <h1 className="mt-8 mb-4 text-2xl font-bold">Registration</h1>
                <Alert className="my-2 bg-red-500/50! text-gray-100! dark:bg-red-500">
                  <HiExclamationCircle className="h-5 w-5" />
                  <AlertTitle>Registration for this event has not opened yet.</AlertTitle>
                  <AlertDescription className="mt-2 text-gray-300">
                    Registration for Advent of CTF 2025 will open later today. Please join our{" "}
                    <a
                      href="https://discord.com/invite/cyberstudents-916144903686336513"
                      target="_blank"
                      className="underline"
                    >
                      Discord server
                    </a>{" "}
                    for updates.
                  </AlertDescription>
                </Alert> */}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
