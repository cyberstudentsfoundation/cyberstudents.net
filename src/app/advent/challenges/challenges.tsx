"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { api } from "~/trpc/react";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import type { Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { toast } from "sonner";
import { Prose } from "~/lib/renderMarkdoc";
import Countdown from "~/components/Countdown";
import { CgBrowser } from "react-icons/cg";
import { FaTableCellsRowLock, FaMagnifyingGlassChart, FaGear, FaCheck, FaClock } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";
import { BiNetworkChart } from "react-icons/bi";
import {
  HiChevronLeft,
  HiFlag,
  HiLink,
  HiMiniCalendar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCubeTransparent,
} from "react-icons/hi2";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";

const CATEGORY_COLOR_MAP: Record<string, string> = {
  "Web exploitation": "blue",
  Cryptography: "lime",
  Forensics: "yellow",
  "Binary exploitation": "red",
  "Reverse engineering": "pink",
  OSINT: "fuchsia",
};

const CATEGORY_ICON_MAP: Record<string, JSX.Element> = {
  "Web exploitation": <CgBrowser className="h-full w-full" />,
  Cryptography: <FaTableCellsRowLock className="h-full w-full" />,
  Forensics: <FaMagnifyingGlassChart className="h-full w-full" />,
  "Binary exploitation": <LuBinary className="h-full w-full" />,
  "Reverse engineering": <FaGear className="h-full w-full" />,
  OSINT: <BiNetworkChart className="h-full w-full" />,
};

// Ensure all colors are defined by Tailwind's compiler
const _allColors = (
  <div className="bg-blue-900 bg-blue-950 bg-fuchsia-900 bg-fuchsia-950 bg-lime-900 bg-lime-950 bg-pink-900 bg-pink-950 bg-red-900 bg-red-950 bg-yellow-900 bg-yellow-950" />
);

export default function Challenges({
  eventChallenges,
  session,
}: {
  eventChallenges: inferRouterOutputs<AppRouter>["challenge"]["fetch"] | null;
  session: Session | null;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  let initialChallengeId = searchParams.get("challenge");

  if (!eventChallenges?.challenges.some((c) => c.id === searchParams.get("challenge"))) {
    initialChallengeId = null;
  }

  const [focusedChallenge, setFocusedChallenge] = useState<string | null>(initialChallengeId);

  const submitFlagMutation = api.challenge.submitFlag.useMutation();

  const getLeaderboardQuery = api.event.getLeaderboard.useQuery(
    { event: "aoc2024", onlyShowCurrentUser: true },
    { refetchInterval: 10_000 },
  );

  if (!eventChallenges) {
    return <p className="text-red-500">No challenges found.</p>;
  }

  function challengeCallback(
    challengeId: string,
    callback: (challenge: inferRouterOutputs<AppRouter>["challenge"]["fetch"]["challenges"][0]) => React.ReactNode,
  ) {
    const challenge = eventChallenges!.challenges.find((c) => c.id === challengeId);

    if (!challenge) {
      return <p className="text-red-500">Challenge not found.</p>;
    }

    return callback(challenge);
  }

  return (
    <>
      <div className="mb-4 flex flex-col justify-between gap-2 lg:flex-row">
        <Link href="/advent" className="flex w-fit items-center gap-1 text-gray-300 hover:text-cyan-300">
          <HiChevronLeft className="mb-0.5 h-4 w-4" />
          <span>Back to calendar</span>
        </Link>
        {getLeaderboardQuery.data && (
          <div className="">
            <span>{getLeaderboardQuery.data.userPoints ?? 0} points</span>{" "}
            {getLeaderboardQuery.data.userMsHsCollegePlace ? (
              <span className="text-gray-400">
                (Open: #{getLeaderboardQuery.data.userPlace ?? "--"}; HS/College: #
                {getLeaderboardQuery.data.userMsHsCollegePlace ?? "--"})
              </span>
            ) : (
              <span className="text-gray-400">(Open: #{getLeaderboardQuery.data.userPlace ?? "--"})</span>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-full max-w-full lg:max-w-sm xl:max-w-md">
          <div className="flex h-[75vh] w-full max-w-full flex-col overflow-y-scroll shadow lg:max-w-sm xl:max-w-md">
            {eventChallenges.challenges.map((challenge, index) => (
              <button
                key={challenge.id}
                id={`${challenge.id}`}
                className="flex items-center bg-gray-900 text-left"
                onClick={() => {
                  router.push("/advent/challenges?challenge=" + challenge.id, { scroll: false });
                  setFocusedChallenge(challenge.id);
                }}
              >
                <div
                  className={`flex-0 flex h-full w-9 items-center bg-${CATEGORY_COLOR_MAP[challenge.category] ?? "zinc"}-950 bg-opacity-50 px-2`}
                >
                  {challenge.published ? (
                    challenge.challengeAttempt?.solvedAt && <FaCheck className="h-4 w-4 text-gray-200 lg:h-5 lg:w-5" />
                  ) : (
                    <FaClock className="h-4 w-4 text-gray-400 lg:h-5 lg:w-5" />
                  )}
                </div>
                <div
                  className={`flex-1 cursor-pointer bg-${CATEGORY_COLOR_MAP[challenge.category] ?? "zinc"}-900 bg-opacity-50 p-5 ${!challenge.published ? "opacity-60" : ""} transition-all hover:bg-opacity-80`}
                >
                  <div className="float-right">
                    <p className="mb-2 text-right text-gray-400">#{index + 1}</p>
                  </div>
                  <p className="mb-1 flex items-center gap-1 text-sm text-gray-300">
                    <HiMiniCalendar className="mb-0.5 h-4 w-4" />
                    <span>December {challenge.publishDate.getUTCDate()}</span>
                  </p>
                  <h2 className="flex items-center gap-1 text-sm text-gray-300 lg:gap-1.5 lg:text-base">
                    <span className="h-4 w-4">{CATEGORY_ICON_MAP[challenge.category]}</span>
                    <span>{challenge.category}</span>
                  </h2>
                  <h1
                    className={`mb-4 text-base lg:text-lg ${!challenge.title ? "font-mono font-medium" : "font-bold"}`}
                  >
                    {challenge.title ?? "???"}
                  </h1>
                  <div className="flex w-full justify-between text-sm">
                    <p className="font-medium">{challenge.points} points</p>
                    {challenge.published && (
                      <div className="flex gap-4">
                        <p className="text-gray-300">
                          {challenge.solvedPlayers?.length ?? 0}{" "}
                          {challenge.solvedPlayers?.length === 1 ? "solve" : "solves"}
                        </p>
                        <p className="text-gray-400">{challenge.hints.length}/2 hints released</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="z-10 w-full rounded-lg rounded-tl-none bg-gray-800">
          <div className="h-full">
            {focusedChallenge ? (
              challengeCallback(focusedChallenge, (challenge) => (
                <div className="h-full">
                  <div className="absolute -z-10 ml-4 mt-4 flex h-32 w-32 text-gray-400 opacity-10">
                    {CATEGORY_ICON_MAP[challenge.category]}
                  </div>
                  <div className="z-20 flex h-full flex-col justify-between p-8">
                    <div className="mb-8">
                      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row lg:gap-0">
                        <div className="flex-grow-0 basis-3/5">
                          <h1
                            className={`mb-4 flex items-center gap-3 text-2xl ${!challenge.title ? "font-mono font-medium" : "font-bold"}`}
                          >
                            <span>{challenge.title ?? "???"}</span>
                            {challenge.challengeAttempt?.solvedAt && (
                              <Badge className="bg-green-400 text-sm hover:bg-green-500">Solved</Badge>
                            )}
                          </h1>
                          <div className="grid w-fit grid-flow-col grid-rows-3 items-center gap-x-20">
                            <p className="font-bold tracking-wide text-gray-400">Category</p>
                            <p className="font-bold tracking-wide text-gray-400">Points</p>
                            <p className="font-bold tracking-wide text-gray-400">Author</p>
                            <p className="text-gray-200">{challenge.category}</p>
                            <p className="text-gray-200">{challenge.points}</p>
                            <div className="flex items-center gap-2 text-gray-200">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={challenge.author.image?.replace(".gif", ".png") ?? undefined} />
                                <AvatarFallback className="bg-gray-900 text-sm">
                                  {challenge.author.name?.slice(0, 1)}
                                </AvatarFallback>
                              </Avatar>
                              <p>{challenge.author.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-0 basis-2/5">
                          <h2 className="mb-1 text-xl font-bold text-gray-400">
                            Solves ({challenge.solvedPlayers?.length ?? 0})
                          </h2>
                          <div className="max-h-36 max-w-md overflow-y-auto rounded-md">
                            <table className="w-full rounded-lg">
                              <tbody>
                                {challenge.solvedPlayers?.map((attempt, index) => (
                                  <tr
                                    key={attempt.user.id + Math.random()}
                                    className="odd:bg-gray-600 even:bg-gray-700"
                                  >
                                    <td className="pl-4 text-gray-400">{index + 1}</td>
                                    <td className="flex items-center gap-2 py-1">
                                      <Image
                                        src={
                                          attempt.user.image?.replace(".gif", ".png") ??
                                          "https://cdn.discordapp.com/embed/avatars/5.png"
                                        }
                                        width={128}
                                        height={128}
                                        alt={`Profile Picture for ${attempt.user.name}`}
                                        className="h-5 w-5 rounded-full"
                                      />
                                      <span className="max-w-32 truncate text-gray-200">{attempt.user.name}</span>
                                    </td>
                                    <td className="pr-4 text-gray-400">
                                      {dayjs(attempt.solvedAt.getTime()).format("M/DD h:mm a")}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {challenge.published ? (
                        <div className="flex flex-col justify-between gap-12 md:flex-row">
                          <div className="flex-grow-0 basis-2/3">
                            <h2 className="mb-1 text-xl font-bold text-gray-400">Description</h2>
                            <Prose>{challenge.description ?? ""}</Prose>
                            {challenge.files?.length ? (
                              <h2 className="mb-2 text-xl font-bold text-gray-400">Attachments</h2>
                            ) : (
                              ""
                            )}
                            <div className="flex flex-col gap-2">
                              {challenge.files?.map((file) => (
                                <a
                                  key={file}
                                  href={file}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-fit"
                                >
                                  <Button
                                    size="sm"
                                    tabIndex={-1}
                                    className="flex w-72 items-center justify-start gap-2 bg-gray-300 text-gray-800 hover:bg-gray-300/80"
                                  >
                                    <HiLink className="h-5 w-5" />
                                    <span>{file.replace(/\/$/, "").split("/").at(-1)}</span>
                                  </Button>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className="flex-grow-0 basis-1/3">
                            <h2 className="mb-1 text-xl font-bold text-gray-400">Hint</h2>
                            <p className="mb-2 text-sm text-gray-400">
                              There are no penalties for viewing hints. Hints are released 12 hours and 24 hours after
                              the challenge releases.
                            </p>
                            <Tabs key={challenge.id}>
                              <TabsList className="bg-gray-900">
                                <TabsTrigger value="1" className="hover:bg-gray-800">
                                  1
                                </TabsTrigger>
                                <TabsTrigger value="2" className="hover:bg-gray-800">
                                  2
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="1">
                                {challenge.hints.find((h) => h.number === 1)?.content ? (
                                  <Prose>{challenge.hints.find((h) => h.number === 1)?.content ?? ""}</Prose>
                                ) : (
                                  <div>
                                    <span>This hint will be released in:</span>
                                    <Countdown
                                      variant="small"
                                      date={new Date(challenge.publishDate.getTime() + 4.32e7) /* 12 hours */}
                                    />
                                  </div>
                                )}
                              </TabsContent>
                              <TabsContent value="2">
                                {challenge.hints.find((h) => h.number === 2)?.content ? (
                                  <Prose>{challenge.hints.find((h) => h.number === 2)?.content ?? ""}</Prose>
                                ) : (
                                  <div>
                                    <span>This hint will be released in:</span>
                                    <Countdown
                                      variant="small"
                                      date={new Date(challenge.publishDate.getTime() + 8.64e7) /* 24 hours */}
                                    />
                                  </div>
                                )}
                              </TabsContent>
                            </Tabs>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-200">
                          <p className="text-xl font-bold text-gray-400">This challenge will release in:</p>
                          <Countdown variant="normal" date={challenge.publishDate} />
                        </div>
                      )}
                    </div>
                    {challenge.published && (
                      <div className="mt-8 text-gray-400 lg:mt-0">
                        <h2 className="mb-1.5 flex items-center gap-1.5 text-lg font-bold text-gray-400">
                          <HiFlag className="h-5 w-5" />
                          <span>{challenge.challengeAttempt?.solvedAt ? "Re-check flag" : "Submit flag"}</span>
                        </h2>
                        <form
                          className="flex w-full gap-3 rounded-md bg-gray-700 px-3 py-2"
                          onSubmit={async (e) => {
                            e.preventDefault();

                            const input = document.getElementById(`submit-flag-${challenge.id}`) as HTMLInputElement;

                            if (!input.value?.trim()) return;
                            const oldIsSolved = !!challenge.challengeAttempt?.solvedAt;

                            const result = await submitFlagMutation.mutateAsync(
                              {
                                challenge: challenge.id,
                                flag: input.value,
                              },
                              {
                                onError: (error) => {
                                  toast.error(error.message, { position: "top-center" });
                                },
                              },
                            );

                            if (result === true) {
                              if (oldIsSolved) {
                                toast.success(`That flag is correct.`, {
                                  position: "top-center",
                                });
                              } else {
                                toast.success(`Congratulations! You gained ${challenge.points} points.`, {
                                  position: "top-center",
                                });

                                router.refresh();
                              }
                            } else {
                              toast.error("Sorry, that flag is incorrect.", { position: "top-center" });
                            }
                          }}
                        >
                          <Input
                            key={challenge.id}
                            id={`submit-flag-${challenge.id}`}
                            required
                            disabled={!challenge.submissionsEnabled}
                            placeholder={
                              challenge.submissionsEnabled ? "csd{FLAG}" : "Flag submissions are temporarily disabled."
                            }
                            className="border-0 bg-gray-700 font-mono text-gray-200"
                          />
                          <Button type="submit" className="min-w-20 bg-gray-200 text-gray-800 hover:bg-gray-200/80">
                            {challenge.challengeAttempt?.solvedAt ? "Check" : "Submit"}
                          </Button>
                        </form>
                        <div className="mt-4 flex items-center gap-1.5 text-sm">
                          <HiOutlineChatBubbleLeftRight className="h-5 w-5 shrink-0 text-gray-400" />
                          <span>
                            Discuss this challenge with others in{" "}
                            <a
                              href="https://discord.com/channels/916144903686336513/1313285716666748990"
                              target="_blank"
                              className="text-nowrap rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
                            >
                              #🎄丨advent-of-ctf
                            </a>{" "}
                            on our{" "}
                            <a
                              href="https://discord.com/invite/cyberstudents-916144903686336513"
                              target="_blank"
                              className="underline transition-colors hover:text-gray-300"
                            >
                              Discord server.
                            </a>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-4 py-16 text-gray-400 lg:py-0">
                <HiOutlineCubeTransparent className="h-20 w-20 stroke-1" />
                <span className="text-lg font-semibold">Select a challenge to get started.</span>
                <div className="flex items-center gap-1.5 text-sm">
                  <HiOutlineChatBubbleLeftRight className="h-5 w-5 shrink-0 text-gray-400" />
                  <span>
                    Discuss challenges with others in{" "}
                    <a
                      href="https://discord.com/channels/916144903686336513/1313285716666748990"
                      target="_blank"
                      className="text-nowrap rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
                    >
                      #🎄丨advent-of-ctf
                    </a>{" "}
                    on our{" "}
                    <a
                      href="https://discord.com/invite/cyberstudents-916144903686336513"
                      target="_blank"
                      className="underline transition-colors hover:text-gray-300"
                    >
                      Discord server.
                    </a>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
