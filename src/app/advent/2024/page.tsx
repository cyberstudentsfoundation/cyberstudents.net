import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import AnchoredHeading from "~/components/AnchoredHeading";
import TableOfContents from "./table-of-contents";

import countriesPieChart from "~/../public/advent-of-ctf-2024/countries-pie-chart.svg";
import countriesGeoChart from "~/../public/advent-of-ctf-2024/countries-geo-chart.png";
import schoolingStatusPieChart from "~/../public/advent-of-ctf-2024/schooling-status-pie-chart.svg";
import challengeCategoriesPieChart from "~/../public/advent-of-ctf-2024/challenge-categories-pie-chart.svg";

export const metadata: Metadata = {
  title: "CyberStudents’ Advent of CTF 2024 results and statistics",
  description:
    "Advent of CTF 2024 was a month-long cybersecurity capture-the-flag (CTF) competition from December 1st to December 31st, 2024 premiered last year by CyberStudents, an online organization and community focused on cybersecurity education. It featured beginner-oriented challenges from six popular categories with challenges releasing daily during the advent season. The event was open to everybody and we encouraged high school and college students from around the world to participate.",
  authors: [{ name: "CyberStudents" }],
};

const challengesData = [
  {
    day: 1,
    title: "Logical Exclusivity",
    author: "GodderE2D",
    category: "Cryptography",
    points: 30,
    attempts: 489,
    solves: 237,
  },
  {
    day: 2,
    title: "screaming",
    author: "Vip3r",
    category: "Reverse engineering",
    points: 40,
    attempts: 313,
    solves: 259,
  },
  {
    day: 3,
    title: "ElfTV",
    author: "Vip3r",
    category: "Reverse engineering",
    points: 55,
    attempts: 53,
    solves: 147,
  },
  {
    day: 4,
    title: "long gone",
    author: "Vip3r",
    category: "Forensics",
    points: 75,
    attempts: 33,
    solves: 44,
  },
  {
    day: 5,
    title: "Rusty Lock",
    author: "Logix",
    category: "Reverse engineering",
    points: 110,
    attempts: 164,
    solves: 31,
  },
  {
    day: 6,
    title: "Epochrypt",
    author: "Vip3r",
    category: "Cryptography",
    points: 70,
    attempts: 214,
    solves: 97,
  },
  {
    day: 7,
    title: "Apple Fanatic",
    author: "GodderE2D",
    category: "Web exploitation",
    points: 60,
    attempts: 124,
    solves: 116,
  },
  {
    day: 8,
    title: "vuln research",
    author: "Vip3r",
    category: "OSINT",
    points: 45,
    attempts: 138,
    solves: 122,
  },
  {
    day: 9,
    title: "resa?",
    author: "Vip3r",
    category: "Cryptography",
    points: 80,
    attempts: 110,
    solves: 101,
  },
  {
    day: 10,
    title: "flag from wish",
    author: "Kolmus",
    category: "Cryptography",
    points: 55,
    attempts: 95,
    solves: 93,
  },
  {
    day: 11,
    title: "Festive Encoding",
    author: "GodderE2D",
    category: "Binary exploitation",
    points: 90,
    attempts: 372,
    solves: 101,
  },
  {
    day: 12,
    title: "Letter To Santa",
    author: "Logix",
    category: "Forensics",
    points: 85,
    attempts: 31,
    solves: 27,
  },
  {
    day: 13,
    title: "Disoriented Santa",
    author: "GodderE2D",
    category: "OSINT",
    points: 100,
    attempts: 571,
    solves: 45,
  },
  {
    day: 14,
    title: "angry elf",
    author: "Vip3r",
    category: "Reverse engineering",
    points: 50,
    attempts: 82,
    solves: 76,
  },
  {
    day: 15,
    title: "JETS",
    author: "GodderE2D",
    category: "Web exploitation",
    points: 70,
    attempts: 177,
    solves: 113,
  },
  {
    day: 16,
    title: "Jingle Bell ROP",
    author: "Vip3r",
    category: "Binary exploitation",
    points: 105,
    attempts: 35,
    solves: 34,
  },
  {
    day: 17,
    title: "Santa's Plane",
    author: "Logix",
    category: "OSINT",
    points: 80,
    attempts: 391,
    solves: 65,
  },
  {
    day: 18,
    title: "trng",
    author: "Kolmus",
    category: "Reverse engineering",
    points: 120,
    attempts: 31,
    solves: 31,
  },
  {
    day: 19,
    title: "interns",
    author: "Vip3r",
    category: "Cryptography",
    points: 150,
    attempts: 51,
    solves: 9,
  },
  {
    day: 20,
    title: "Lost Santa",
    author: "Logix",
    category: "OSINT",
    points: 80,
    attempts: 321,
    solves: 43,
  },
  {
    day: 21,
    title: "hpjl",
    author: "Kolmus",
    category: "Binary exploitation",
    points: 125,
    attempts: 11,
    solves: 10,
  },
  {
    day: 22,
    title: "K.U.N.A.L Consulting",
    author: "GodderE2D",
    category: "Web exploitation",
    points: 115,
    attempts: 21,
    solves: 19,
  },
  {
    day: 23,
    title: "help",
    author: "Kolmus",
    category: "Binary exploitation",
    points: 150,
    attempts: 11,
    solves: 11,
  },
  {
    day: 24,
    title: "ELForms",
    author: "GodderE2D",
    category: "Web exploitation",
    points: 130,
    attempts: 13,
    solves: 13,
  },
  {
    day: 25,
    title: "House of Santa Claus",
    author: "Kolmus",
    category: "Binary exploitation",
    points: 200,
    attempts: 7,
    solves: 6,
  },
];

export default function Advent2024Results() {
  return (
    <main className="mx-4 mt-8 flex justify-center gap-12 sm:mx-8 md:mx-10">
      <div className="w-full max-w-screen-sm xl:max-w-screen-lg">
        <article
          itemScope
          itemType="http://schema.org/Article"
          className="prose prose-gray prose-invert max-w-full prose-code:font-medium prose-code:before:hidden prose-code:after:hidden"
        >
          <h1 itemProp="name">CyberStudents&rsquo; Advent of CTF 2024 results and statistics</h1>
          <p>
            <time itemProp="datePublished" dateTime="2025-05-18">
              Sunday, May 18, 2025
            </time>
            <br />
            By <span itemProp="author">GodderE2D</span>, Head Administrator and CyberStudents Foundation Co-Founder
          </p>
          <div className="flex rounded-l-sm rounded-r-md border-l-4 border-red-500 bg-red-500/20">
            <div className="py-4 pl-6 pr-8">
              <AnchoredHeading
                level={3}
                id="a-note-on-the-delay-of-prizes"
                className="mt-0"
                buttonClassName="-left-20 pr-20"
              >
                A note on the delay of prizes
              </AnchoredHeading>
              <p className="text-gray-200">
                Unfortunately, our event sponsor ICSRED was unable to fulfill their share of $190 USD in prizes after
                we&rsquo;ve requested them for over two months. Due to this, the first, second, and third place winners
                for the High School/College Division received their prizes considerably late.
              </p>
              <p className="text-gray-200">
                <strong>These remaining prizes were personally funded by event organizers Vip3r and GodderE2D.</strong>{" "}
                The Antisyphon Course prize for the HS/College Division first place winner had to be excluded as we lost
                contact with the sponsor after February 2nd.
              </p>
              <p className="mb-0 text-gray-200">
                This was also ultimately the reason finalized winners and write-ups were not announced until now. We
                apologize for the inconvenience and thank the winners for their patience.
              </p>
            </div>
          </div>
          <p>
            Advent of CTF 2024 was a month-long cybersecurity capture-the-flag (CTF) competition from December 1st to
            December 31st, 2024 premiered last year by CyberStudents, an online organization and community focused on
            cybersecurity education. It featured beginner-oriented challenges from six popular categories with
            challenges releasing daily during the advent season. The event was open to everybody and we encouraged high
            school and college students from around the world to participate.
          </p>
          <p>
            The competition comprised of <strong>780 players</strong> from <strong>85 countries</strong> to attempt 25
            challenges of varying difficulties and categories. We encouraged players to discuss the challenges and share
            their progress in our Discord server through public channels and our private challenge support system, where
            challenge developers and community members were available to help players with guidance and resources.
          </p>
          <p>
            We offered a total prize pool of <strong>$280 USD</strong>, with $225 for high school and college students
            and $55 for write-up submissions open to all players. The prize pool was funded by event&rsquo;s organizers
            vip3r and GodderE2D, previous sponsorships/partnerships, <s>and the event&rsquo;s sponsor ICSRED.</s>{" "}
            <strong>(Please refer to the note above for issues regarding our sponsor.)</strong>
          </p>
          <p>
            In addition to the main leaderboard division, we also had a write-up division where all players were
            encouraged to submit write-ups for the challenges they solved. These community write-ups were reviewed by
            each challenge&rsquo;s creators and would be featured on the CyberStudents website as a resource for future
            visitors who wish to learn from the challenges and discover different perspectives. We looked for write-ups
            that were clear, complete, educational, creative, and explained every step of their challenge-solving and
            planning process.
          </p>
          <p>
            The event concluded on December 31st, 2024, and we are proud to announce the winners and some statistics
            regarding player demographics and challenges.
          </p>
          <AnchoredHeading level={2} id="final-leaderboard-high-school-college-division">
            Final leaderboard: High School/College Division
          </AnchoredHeading>
          <div className="overflow-x-auto">
            <table className="min-w-[51.25rem]">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Points (2270 max)</th>
                  <th>Completion</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st</td>
                  <td>
                    <strong>zarnex__</strong>
                  </td>
                  <td>United States</td>
                  <td>2270</td>
                  <td>25/25</td>
                  <td>
                    $100 USD +{" "}
                    <s>
                      <a
                        href="https://www.antisyphontraining.com/course-catalog/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Antisyphon Course
                      </a>{" "}
                      of choice (worth $600+)
                    </s>
                  </td>
                </tr>
                <tr>
                  <td>2nd</td>
                  <td>
                    <strong>minipif</strong>
                  </td>
                  <td>Romania</td>
                  <td>2270</td>
                  <td>25/25</td>
                  <td>$60 USD</td>
                </tr>
                <tr>
                  <td>3rd</td>
                  <td>
                    <strong>pligonstein</strong>
                  </td>
                  <td>Romania</td>
                  <td>2070</td>
                  <td>24/25</td>
                  <td>$30 USD</td>
                </tr>
                <tr>
                  <td>4th</td>
                  <td>
                    <strong>silence_</strong>
                  </td>
                  <td>India</td>
                  <td>1875</td>
                  <td>22/25</td>
                  <td>$20 USD</td>
                </tr>
                <tr>
                  <td>5th</td>
                  <td>
                    <strong>trixai</strong>
                  </td>
                  <td>Sweden</td>
                  <td>1830</td>
                  <td>22/25</td>
                  <td>$15 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            See the full leaderboard and the open division <Link href="/advent/leaderboard">here.</Link>
          </p>
          <AnchoredHeading level={2} id="final-leaderboard-open-write-up-division">
            Final leaderboard: Open - Write-Up Division
          </AnchoredHeading>
          <div className="overflow-x-auto">
            <table className="min-w-[36.125rem]">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Points</th>
                  <th>Winning write-ups</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st</td>
                  <td>
                    <strong>zarnex__</strong>
                  </td>
                  <td>United States</td>
                  <td>600</td>
                  <td>8/25</td>
                  <td>$40 USD</td>
                </tr>
                <tr>
                  <td>2nd</td>
                  <td className="flex items-center gap-1">
                    <span>
                      <strong>raul_26</strong> (Fl4gged)
                    </span>
                    <a href="https://github.com/raul-dunca" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="h-4 w-4 transition-opacity hover:opacity-75" />
                    </a>
                  </td>
                  <td>Austria</td>
                  <td>425</td>
                  <td>4/25</td>
                  <td>$15 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>All players who won a prize verified their identity and student status (if applicable).</p>
          <AnchoredHeading level={2} id="format">
            Format
          </AnchoredHeading>
          <p>
            A new challenge was released every day at 3 pm EST until December 25th. Players could earn points by solving
            challenges in these six categories: web exploitation, cryptography, forensics, binary exploitation, reverse
            engineering, and OSINT (open-source intelligence).
          </p>
          <p>
            To complete a challenge, players must find and submit a <strong>flag</strong>. A flag is a hidden piece of
            text or code always in the format <code>{"csd{example_flag}"}</code>, making it easy for players to
            identify. For example, for cryptography challenges, the flag may be included in the text after it has been
            decrypted or decoded. For web exploitation challenges, the flag may be hidden in a hidden file or is
            somewhere that is not visible to a regular user and the site must be exploited to obtain it. Knowing the
            flag format may be useful when attempting challenges, especially for cryptography and forensics challenges.
          </p>
          <p>
            Two sets of hints were also released for each challenge. The first hint was given 12 hours after the
            challenge releases (at 3 am EST) and the second hint was given 24 hours after the challenge releases (at 3
            pm EST the following day). Most importantly, hints do not cost points and players were not penalized for
            viewing them.
          </p>
          <p>
            Other than the challenges being released daily instead of all at once, this CTF followed the common
            Jeopardy-style format found in many other CTFs, preparing players for future CTFs and similar competitions.
            Challenges could be solved in any order and players could attempt challenges at any time during the event,
            including the six days that were given after the last challenge released on Christmas Day.
          </p>
          <p>
            Each challenge had a point value assigned to it relative to its difficulty. Tiebreakers were determined by
            the player who had kept their score the longest (i.e., whoever submitted their last flag first). You can
            find the competition guidelines <Link href="/advent/register">here.</Link>
          </p>
          <p>
            CyberStudents&rsquo; Advent of CTF is inspired by Eric Wastl&rsquo;s{" "}
            <a href="https://adventofcode.com" target="_blank" rel="noopener noreferrer">
              Advent of Code
            </a>
            , TryHackMe&rsquo;s{" "}
            <a href="https://tryhackme.com/r/christmas" target="_blank" rel="noopener noreferrer">
              Advent of Cyber
            </a>
            , and{" "}
            <a href="https://cyberstart.com" target="_blank" rel="noopener noreferrer">
              CyberStart
            </a>
            .
          </p>
          <AnchoredHeading level={2} id="write-ups">
            Write-ups
          </AnchoredHeading>
          <p>Write-ups for Advent of CTF 2024 will be published here soon.</p>
          <AnchoredHeading level={2} id="player-demographics">
            Player demographics
          </AnchoredHeading>
          <p>
            <strong>780 players</strong> registered to play in Advent of CTF 2024, representing{" "}
            <strong>85 countries</strong>. Players from the United States made up the largest portion of the player base
            at 23.3%, followed by India at 13.7%, and Indonesia at 7.0%. This was more diverse than the distribution of
            countries in the CyberStudents Discord server.
          </p>
          <figure>
            <Image src={countriesPieChart} alt="Pie chart of countries" className="rounded-md" />
            <figcaption>Self-reported countries of registered players</figcaption>
          </figure>
          <figure>
            <Image src={countriesGeoChart} alt="Geo chart of countries" className="rounded-md" />
            <figcaption>Geographical map of countries of registered players</figcaption>
          </figure>
          <p>
            Players were also asked whether they were attending high school or college/university, and if they were,
            which grade or year they were in. The majority of players were in college or university at 62.0%, with high
            school students following at 21.4%. Intriguingly, the Discord server had more members who identified as high
            school students than college students. Given the number of international players who could not be easily
            categorized under one of the allowed categories, this metric may not be entirely reflective of their age or
            experience. Middle school students were categorized as &ldquo;None&rdquo; in the data below.
          </p>
          <figure>
            <Image src={schoolingStatusPieChart} alt="Pie chart of schooling status" className="rounded-md" />
            <figcaption>Self-reported schooling status of registered players</figcaption>
          </figure>
          <AnchoredHeading level={2} id="challenge-statistics">
            Challenge statistics
          </AnchoredHeading>
          <p>
            Out of the 25 challenges released, <strong>3858 attempts</strong> (both correct and incorrect) were
            submitted. <strong>1850</strong> (48.0%) of those attempts were correct (i.e., solves). OSINT challenges had
            the highest attempts per solve rate, with an average of 6.83 attempts for every solve.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-[39.25rem]">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Challenge</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Points</th>
                  <th>Attempts</th>
                  <th>Solves</th>
                </tr>
              </thead>
              <tbody>
                {challengesData.map((challenge) => (
                  <tr key={challenge.title}>
                    <td>{challenge.day}</td>
                    <td>
                      <strong>{challenge.title}</strong>
                    </td>
                    <td>{challenge.category}</td>
                    <td>{challenge.author}</td>
                    <td>{challenge.points}</td>
                    <td>{challenge.attempts}</td>
                    <td>{challenge.solves}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The categories of challenges were mostly evenly spread, except for forensics with only 2 challenges. We aim
            to have a more balanced distribution of challenges in future events.
          </p>
          <figure>
            <Image src={challengeCategoriesPieChart} alt="Pie chart of challenge categories" className="rounded-md" />
            <figcaption>Distribution of challenge categories</figcaption>
          </figure>
          <p>
            Finally, we would like to thank all the players who participated in our inaugural event and those who
            provided feedback and reported technical and challenge issues to us. Furthermore, we would like to
            acknowledge the challenge creators Vip3r, Kolmus, GodderE2D, and Logix who worked throughout the holiday
            season to create challenges for the community.
          </p>
          <p>
            If you would like to try similar challenges, we recommend checking out the daily CTF in our{" "}
            <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
              Discord server
            </a>
            .
          </p>
          <p>
            If you&rsquo;re interested in sponsoring or partnering with CyberStudents, please reach out to us at{" "}
            <a href="mailto:admin@cyberstudents.net">admin@cyberstudents.net</a>.
          </p>
        </article>
      </div>
      <TableOfContents />
    </main>
  );
}
