import { HiArrowUpRight, HiExclamationCircle } from "react-icons/hi2";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function Register() {
  return (
    <main className="mb-12 sm:mb-24">
      <div className="flex justify-center">
        <div className="w-full max-w-(--breakpoint-2xl)">
          <div className="flex flex-col items-center justify-between gap-16 xl:flex-row xl:items-start xl:gap-8">
            <div className="mx-4 mt-24 max-w-prose xl:mb-32">
              {/* <Link href="/advent" className="mb-4 flex items-center gap-2 text-sm text-gray-300 hover:underline">
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
              <div className="mb-2 flex items-center gap-6">
                <h2 className="font-mokoto mb-4 flex text-4xl font-bold tracking-widest">
                  <span className="absolute mx-auto box-content flex w-fit border bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent blur-xl select-none">
                    CSD<span className="tracking-[-0.1em]">&nbsp;</span>CTF
                  </span>
                  <span className="relative top-0 flex h-auto w-fit items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent select-auto">
                    CSD<span className="tracking-[-0.1em]">&nbsp;</span>CTF
                  </span>
                  <span className="ml-4 font-sans text-3xl font-light tracking-normal text-cyan-300 xl:pb-1.5">
                    2025
                  </span>
                </h2>
              </div>
              <div className="prose prose-gray prose-invert">
                <p>
                  The event lasts 48 hours and runs from 5:00 pm on August 8, 2025 until 5:00 pm on August 10, 2025
                  (Eastern Daylight Time). Registration remains open throughout the event.
                </p>
                <p>
                  <strong>The following competition guidelines are subject to change ahead of the event.</strong>
                </p>
                <h2>Teams</h2>
                <p>
                  This is a <strong>team competition</strong>. Each team can be composed of up to 5 members. Players are
                  allowed to play by themselves (as a solo team), but are encouraged to form teams with other players.
                </p>
                <p>
                  Each individual may only be on one team, and players may not switch teams after the competition begins
                  (unless they were on a solo team).
                </p>
                <p>
                  Each team member must register with their own account and join their team on this platform. Account
                  sharing is prohibited.
                </p>
                <h2>Challenges</h2>
                <p>
                  There will be a variety of challenges released during the event, covering all six of the following
                  categories: web exploitation, reverse engineering, binary exploitation, forensics, cryptography, and
                  miscellaneous. Each category will have challenges of varying difficulty.
                </p>
                <p>
                  Challenges can be solved in any order and at any time. You do not need to solve previous challenges
                  before attempting later-released challenges.
                </p>
                <p>
                  There will be <strong>4 total waves</strong> throughout the event. The first wave will be released at
                  the start of the event, and the final wave will be released 12 hours before the end of the event.
                </p>
                <p>Exact wave release times will be announced closer to the event date.</p>
                {/* <ul>
                  <li>
                    <strong>Wave 1</strong> releases and <strong>CTF starts</strong> on August 8, 5:00 pm (EDT)
                  </li>
                  <li>
                    <strong>Wave 2</strong> releases on August 9, 11:00 pm (EDT)
                  </li>
                  <li>
                    <strong>Wave 3</strong> releases on August 10, 11:00 am (EDT)
                  </li>
                  <li>
                    <strong>Wave 4</strong> releases on August 10, 11:00 pm (EDT)
                  </li>
                  <li>
                    <strong>CTF ends</strong> on August 10, 5:00 pm (EDT)
                  </li>
                </ul> */}
                <h2>Flags</h2>
                <p>
                  You need to obtain a flag that is always in the format{" "}
                  <strong className="font-mono">{"csd{example_flag}"}</strong>. Knowing the flag format may be useful
                  when attempting challenges. You do not need to solve previous challenges before attempting
                  later-released challenges.
                </p>
                <p>
                  Flags may be submitted at any time during the event, but cooldowns may be present after repeated
                  guesses.
                </p>
                <p>
                  There may be a limit imposed on certain challenges for the number of attempts you can make to submit
                  flags. If you reach this limit, you will not be able to submit flags for that challenge without the
                  assistance of an event administrator.
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
                  However, in case of a tiebreaker between points, the team with the earliest submission time for their
                  most recently solved challenge will win.
                </p>
                <p>
                  Flag hoarding (i.e., waiting to submit many flags near the end) is discouraged, but not prohibited.
                  Waiting to submit flags may result in a longer verification process at the end of the event.
                </p>
                <h2>Prizes and divisions</h2>
                <p>
                  The prize pool for this event will be announced closer to the event date. The minimum prize pool, as
                  of July 1, is <strong>$600</strong> (including non-monetary items) for all divisions.
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
                      <td rowSpan={4}>High School and College</td>
                      <td>1st</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">2nd</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">3rd</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">4th</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td rowSpan={4}>Open</td>
                      <td>1st</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">2nd</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">3rd</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">4th</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td rowSpan={4}>Write-Up</td>
                      <td>1st</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">2nd</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">3rd</td>
                      <td>TBD</td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>
                    Only full-time high school students (or the equivalent in the player&rsquo;s country) and full-time{" "}
                    <strong>undergraduate</strong> college/university students at an accredited institution are eligible
                    to win prizes for the High School & College division.
                  </li>
                  <li>
                    Students who have a bachelor&rsquo;s degree or higher are not eligible to compete in the High School
                    & College division.
                  </li>
                  <li>
                    All members of a team must meet the eligibility requirements for the High School & College division
                    to compete in that division.
                  </li>
                  <li>Teams may not compete in both the High School & College and Open divisions.</li>
                  <li>
                    Teams eligible to win prizes for the High School & College division may elect to compete in the Open
                    division instead by selecting the Open division during registration.
                  </li>
                  <li>
                    Teams may not change between the High School & College and Open divisions once they complete
                    registration.
                  </li>
                  <li>
                    Any registered players are allowed to participate in the write-up division. We will open submissions
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
                    in the High School & College division without first obtaining permission from an event
                    administrator. Students are <strong>not considered</strong> to be in high school during the summer
                    before they begin 9th grade.
                  </li>
                  <li>
                    Inaccurate or false information provided during registration may result in disqualification from the
                    event.
                  </li>
                  <li>
                    Participants should show sportsmanship and be respectful towards other players and event
                    administrators.
                  </li>
                  <li>
                    Sharing or accepting hints, methodologies, solutions, flags, resources, or any other type of
                    collusion to individuals outside of their team during the event is prohibited.
                  </li>
                  <li>
                    Negligently making hints, methodologies, solutions, flags, or resources accessible to other players
                    (e.g., on social media, forums, public Discord channels, by sharing an account on ChatGPT with other
                    players) may result in disqualification.
                  </li>
                  <li>
                    Certain challenges and their associated write-ups may be restricted from being discussed or
                    published for some period after the event ends (&ldquo;embargoed&rdquo;). Until we announce which
                    challenges are embargoed and for how long, participants may not discuss or publish write-ups for any
                    challenges.
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
                    with services like Vast.ai) specifically for the competition without prior permission from an event
                    administrator is prohibited.
                  </li>
                  <li>
                    Participants may not use any performance-enhancing or similar substances, including but not limited
                    to, amphetamine sulfate (Evekeo), dextroamphetamine (Adderall and Adderall XR), dexedrine
                    (ProCentra, Zenzedi), dexmethylphenidate (Focalin and Focalin XR), lisdexamfetamine (Vyvanse), and
                    methylphenidate (Concerta, Daytrana, Metadate CD and Metadate ER, Methylin and Methylin ER, Ritalin,
                    Ritalin SR, Ritalin LA, Quillivant XR) during the event unless they have a justifiable medical
                    condition and have obtained express permission from an event administrator.
                  </li>
                  <li>Do not repeatedly spam or attempt to render the server or infrastructure inaccessible.</li>
                  <li>Do not use files, links, or instances that were created for another team.</li>
                  <li>
                    Do not perform attacks on the competition website, scoring system, Discord bot, or Discord server.
                  </li>
                  <li>Do not attempt to perform attacks on or attempt to sabotage other players.</li>
                  <li>Do not attempt to circumvent sandboxes for challenges.</li>
                  <li>
                    All team members must register with their own account and join their team as soon as possible.
                  </li>
                  <li>Each person can only register with one account.</li>
                  <li>
                    Information about participants&rsquo; devices, including IP addresses, user agents, and other
                    patterns may be collected to ensure competitive integrity. Any attempts to circumvent this
                    collection or its accuracy may result in disqualification.
                  </li>
                  <li>
                    Challenge developers and CSD CTF event administrators are not allowed to participate in the event.
                  </li>
                  <li>
                    Participants must not be currently banned from the Discord server or have been disqualified from
                    previous CyberStudents events.
                  </li>
                  <li>
                    The competition guidelines will still apply to all participants after the event ends until the event
                    administrators announce the winner(s) for all divisions.
                  </li>
                  <li>
                    The entire team may be disqualified if any team member or associated parties are found to be in
                    violation of the competition guidelines. Exceptions may be made at the discretion of the event
                    administrators based on the severity of the violation and involvement of other parties.
                  </li>
                  <li>
                    The event administrators reserve the right to disqualify and revoke recognition from any team or
                    individual at any time, including after the competition.
                  </li>
                  <li>
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
                  </li>
                </ul>
              </div>
            </div>
            <div className="-mt-2 h-[calc(100vh-5rem)] w-full max-w-prose pt-1.5 pb-4 xl:sticky xl:top-24 xl:max-w-2xl xl:self-start">
              <ScrollArea
                className="h-full w-full rounded-t-none rounded-b-none bg-gray-800/50 px-8 shadow-lg sm:rounded-t-lg sm:rounded-b-lg xl:rounded-t-none"
                thumbClassName="dark:bg-gray-600"
              >
                <a id="form" className="scroll-mt-26" />
                <h1 className="mt-8 mb-4 text-2xl font-bold">Registration</h1>
                <Alert className="my-2 bg-red-500/50! text-gray-100! dark:bg-red-500">
                  <HiExclamationCircle className="h-5 w-5" />
                  <AlertTitle>Registration for this event has not opened yet.</AlertTitle>
                  <AlertDescription className="mt-2 text-gray-300">
                    Registration for CSD CTF 2025 will open soon. Please join our{" "}
                    <a
                      href="https://discord.com/invite/cyberstudents-916144903686336513"
                      target="_blank"
                      className="underline"
                    >
                      Discord server
                    </a>{" "}
                    for updates.
                  </AlertDescription>
                </Alert>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
