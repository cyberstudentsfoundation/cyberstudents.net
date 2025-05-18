import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import RegisterForm from "./form";
import { HiExclamationCircle } from "react-icons/hi2";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";

export default async function Register() {
  const session = await getServerAuthSession();

  let user = null;
  if (session?.user) {
    user = await api.user.me();
  }

  return (
    <main className="mx-4">
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-screen-2xl">
          <div className="flex flex-col items-center justify-between gap-16 xl:flex-row xl:items-start xl:gap-8">
            <div className="max-w-prose">
              {/* <Link href="/advent" className="mb-4 flex items-center gap-2 text-sm text-gray-300 hover:underline">
                <HiChevronLeft className="mb-px h-4 w-4" />
                <span className="">Back to Advent of CTF</span>
              </Link> */}
              <p className="mb-1 text-xl font-bold text-gray-200">CyberStudents&rsquo;</p>
              <h1 className="mb-8 font-mono text-4xl font-bold">
                advent of ctf<span className="ml-5 font-sans font-light text-cyan-300">2024</span>
              </h1>
              <div className="prose prose-gray prose-invert">
                <p>
                  The event runs from 3:00 pm on December 1, 2024 until 11:59 pm on December 31, 2024 (EST).
                  Registration remains open throughout the event.
                </p>
                <h2>Challenges</h2>
                <p>
                  <strong>A new challenge is released every day at 3 pm EST until December 25.</strong> You need to
                  obtain a flag that is always in the format{" "}
                  <strong className="font-mono">{"csd{example_flag}"}</strong>. Knowing the flag format may be useful
                  when attempting challenges. You do not need to solve previous challenges before attempting
                  later-released challenges.
                </p>
                <p>
                  Each challenge has two hints. The first hint will be given 12 hours after the challenge releases (at 3
                  am EST) and the second hint will be given 24 hours after the challenge releases (at 3 pm EST). Hints{" "}
                  <strong>do not cost points</strong> and players will not be penalized for viewing them.
                </p>
                <p>
                  Flags may be submitted at any time during the event, but cooldowns may be present after repeated
                  guesses.
                </p>
                <h2>Scoring</h2>
                <p>
                  Each challenge has a point value assigned to it. For challenges with multiple parts, points will be
                  split and awarded after completing each part.
                </p>
                <p>
                  In case of a tiebreaker between points, the player who has kept their score the longest will be placed
                  first.
                </p>
                <p></p>
                <h2>Prizes</h2>
                <Alert className="my-2 !bg-yellow-600 !bg-opacity-50 !text-gray-100 dark:bg-yellow-600">
                  <HiExclamationCircle className="h-5 w-5" />
                  <AlertTitle>Middle school was removed from the MS/HS/College division</AlertTitle>
                  <AlertDescription className="mt-2 text-gray-300">
                    Due to legal issues, we had to remove middle school students from our main division in the
                    leaderboard. That division will now only consist of high school and college students (or
                    equivalent). Middle school players may still play in the Open - Write-up division.
                    <div className="mb-2" />
                    However, the prize pool has been extended to $280 USD as of December 2. For questions and further
                    information, please join our{" "}
                    <a
                      href="https://discord.com/invite/cyberstudents-916144903686336513"
                      target="_blank"
                      className="underline"
                    >
                      Discord server
                    </a>
                    .
                  </AlertDescription>
                </Alert>
                <p>
                  The prize pool for this event is <strong>$280 USD</strong>. Prizes sponsored by{" "}
                  <a href="https://www.ics.red/" target="_blank" rel="noopener noreferrer" className="underline">
                    ICSRED
                  </a>
                  .
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
                      <td rowSpan={5}>High School & College</td>
                      <td>1st</td>
                      <td>
                        $100 + 1x{" "}
                        <a
                          href="https://www.antisyphontraining.com/course-catalog/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Antisyphon Course
                        </a>{" "}
                        of choice (worth $600+)
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">2nd</td>
                      <td>$60</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">3rd</td>
                      <td>$30</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">4th</td>
                      <td>$20</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">5th</td>
                      <td>$15</td>
                    </tr>
                    <tr>
                      <td rowSpan={2}>Open - Write-up</td>
                      <td>1st</td>
                      <td>$40</td>
                    </tr>
                    <tr>
                      <td className="ps-[0.5714286em]">2nd</td>
                      <td>$15</td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>
                    Only high school students (or its equivalent in the player&apos;s country) and college/university
                    students are eligible to win prizes for the High School & College division.
                  </li>
                  <li>
                    Anyone is allowed to participate in the write-up division. We will accept submissions after the
                    event is over; they will be judged by the challenge developers.
                  </li>
                  <li>Only registered players are eligible to win prizes.</li>
                </ul>
                <h2>Competition Guidelines</h2>
                <ul>
                  <li>
                    All participants must be 13 years old or above. Individuals under 18 years old must have consent
                    from their parent or guardian.
                  </li>
                  <li>
                    All participants should show sportsmanship and be respectful towards other players and the event
                    staff.
                  </li>
                  <li>
                    This is an <strong>individual</strong> event. You may discuss challenges responsibly per the below
                    guidelines.
                  </li>
                  <li>
                    Giving hints or pointers to other players are allowed in the Discord server; however, sharing
                    answers, walkthroughs, or write-ups are prohibited. Write-ups can be published after the event is
                    over.
                  </li>
                  <li>
                    Players can DM Modmail on Discord for support from staff members; however, additional hints or
                    answers cannot be given.
                  </li>
                  <li>Do not repeatedly spam or attempt to crash the server.</li>
                  <li>Do not use files or links that were created for another player.</li>
                  <li>
                    Do not perform attacks on the competition website, scoring server, Discord bot, or Discord server.
                  </li>
                  <li>Do not perform attacks on or sabotage other players.</li>
                  <li>Do not attempt to circumvent sandboxes for each challenge.</li>
                  <li>
                    Each person can only register with one account. Challenge developers and administrators cannot
                    participate in the event.
                  </li>
                  <li>
                    Players must not be currently banned from the Discord server or be banned from participating in the
                    daily CTF.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex w-full max-w-prose justify-center xl:sticky xl:top-24 xl:max-w-xl xl:self-start">
              <RegisterForm session={session} user={user} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
