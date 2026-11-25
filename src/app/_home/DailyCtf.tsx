import DailyCTFImages from "~/app/daily-ctf-images";
import { dailyCtfChallenges } from "~/data/daily-ctf";
import { site } from "~/data/site";
import { CountUp } from "./motion";
import { Heading, PrimaryButton, TextLink, Wide } from "./ui";

export function DailyCtf() {
  const authors = new Set(dailyCtfChallenges.flatMap((c) => c.author.split(" and "))).size;
  const figures = [
    { value: "6", label: "Rounds" },
    { value: String(dailyCtfChallenges.length), label: "Challenges" },
    { value: String(authors), label: "Challenge Authors" },
  ];

  return (
    <section
      id="daily-ctf"
      aria-labelledby="daily-ctf-title"
      className="scroll-mt-28 overflow-x-clip border-y border-white/8 bg-[#050911] text-gray-200"
    >
      <Wide className="grid gap-14 py-20 sm:py-28 xl:grid-cols-[0.7fr_1.3fr] xl:items-center xl:gap-16">
        <div className="max-w-xl">
          <Heading id="daily-ctf-title" className="text-white">
            Daily CTF
          </Heading>
          <p className="mt-2 text-gray-400">January to August 2024</p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            When CyberStart closed, we started writing challenges of our own. The Daily CTF ran in six rounds from
            January to August 2024, with new challenges every few days and a fresh leaderboard to climb each round.
            Players swapped ideas in our Discord server, and the top five of every round earned stars toward a CTF Star
            role. Each challenge got an official write-up once its round was over for everyone to learn from.
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Behind the scenes, a Discord bot we built ourselves took care of publishing challenges, checking flags,
            trading hints for points, and keeping the leaderboard up to date.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {figures.map((f) => (
              <div key={f.label} className="flex flex-col border-t-2 border-cyan-300/60 pt-2">
                <dt className="order-2 text-sm text-gray-400">{f.label}</dt>
                <dd className="order-1 text-3xl font-bold text-white">
                  <CountUp value={f.value} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrimaryButton href={site.repos.dailyCtfArchive}>Browse the archive</PrimaryButton>
            <TextLink href={site.repos.dailyCtfBot}>Bot source code</TextLink>
          </div>
        </div>
        {/* On desktop the screenshots sit in a panel that runs to the container's right edge and the full height of the
            text, so the dark Discord screenshots don't fade into the page and leave the row looking left-heavy. The
            ring on each image gives the dark screenshots a visible edge. DailyCTFImages is shared with /advent/2025,
            so it is styled from here rather than edited. */}
        <div className="min-w-0 pb-8 [&_img]:shadow-2xl [&_img]:ring-1 [&_img]:shadow-black/60 [&_img]:ring-white/15 xl:flex xl:items-center xl:justify-center xl:self-stretch xl:overflow-hidden xl:rounded-3xl xl:bg-[radial-gradient(110%_80%_at_100%_0%,rgb(34_211_238/0.10),transparent_60%),radial-gradient(90%_70%_at_0%_100%,rgb(99_102_241/0.10),transparent_60%),linear-gradient(180deg,#0c1626,#080f1c)] xl:px-10 xl:pt-16 xl:pb-12 xl:ring-1 xl:ring-white/10">
          <DailyCTFImages />
        </div>
      </Wide>
    </section>
  );
}
