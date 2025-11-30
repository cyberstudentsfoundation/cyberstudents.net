"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import Image from "next/image";
import { api } from "~/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";
import { registerSchema } from "~/lib/schemas";
import { HiCheckCircle } from "react-icons/hi2";
import { FaDiscord, FaLinkedin } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import CountrySelect from "~/components/CountrySelect";
import ctftimeLogo from "~/../public/ctftime-logo.png";
import { Separator } from "~/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "~/components/ui/input-group";

export default function RegisterForm({
  session,
  user,
}: {
  session: Session | null;
  user: inferRouterOutputs<AppRouter>["user"]["me"] | null;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isRegistered = user?.events.includes("aoc2025");

  const [accessCode, setAccessCode] = useState<string>("");
  const [acceptedAccessCode, setAcceptedAccessCode] = useState<boolean>(false);

  const preferredEmailRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState<string | undefined>(user?.country ?? undefined);
  const [schoolingStatus, setSchoolingStatus] = useState<string | undefined>(user?.schoolingStatus ?? undefined);
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState<string | undefined>(
    user?.howDidYouHearAboutUs ?? undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(isRegistered ?? false);
  const [allowSponsorContact, setAllowSponsorContact] = useState<boolean>(user?.allowSponsorContact ?? false);
  const [error, setError] = useState<string>("");

  const [leaderboardPreferencesShown, setLeaderboardPreferencesShown] = useState<string | undefined>();

  const adventRegisterMutation = api.event.adventRegister.useMutation({
    onError: (error) => {
      setLoading(false);
      setError(error.message);
    },
  });

  const adventUpdateRegistrationMutation = api.event.adventUpdateRegistration.useMutation({
    onError: (error) => {
      setLoading(false);
      setError(error.message);
    },
  });

  const checkAccessCodeMutation = api.event.checkAccessCode.useMutation();

  useEffect(() => {
    if (searchParams.get("showError") === "true") {
      toast.error("You must be registered to the event to do that.", { position: "top-center" });
      router.replace("/advent/2025/register");
    }
  }, [router, searchParams]);

  useEffect(() => {
    // this is bypassable, yes, but idc, there's another check when actually registering
    const localStorageAccessCode = localStorage.getItem("accessCode");

    if (localStorageAccessCode) {
      setAccessCode(localStorageAccessCode);
      setAcceptedAccessCode(true);
      setTimeout(() => toast.info("Access code detected; please login with Google.", { position: "top-center" }));
    }
  }, []);

  return (
    <div>
      <h1 className="mt-8 mb-4 text-2xl font-bold">Registration</h1>
      {isRegistered && (
        <>
          <Alert className="mb-4 bg-green-500/50! dark:bg-green-500">
            <HiCheckCircle className="h-5 w-5" />
            <AlertTitle>You are registered for CyberStudents&rsquo; Advent of CTF 2025.</AlertTitle>
            <AlertDescription>
              Some of your registration details can be updated below. If you have any issues, please contact an
              administrator. Happy hacking!
            </AlertDescription>
          </Alert>
        </>
      )}
      <p className="mb-2">
        {session?.user ? (
          !isRegistered ? (
            <>
              You&rsquo;re almost done! Please answer the questions below to complete your registration for Advent of
              CTF 2025.
            </>
          ) : null
        ) : (
          <>
            Registering for Advent of CTF is free and open to everyone. To get started, please sign in with one of the
            options below. Only your name and profile picture will be visible to other players.
          </>
        )}
      </p>
      {/* <p className="mb-3.5">This event has ended.</p> */}
      {session?.user ? (
        <>
          <div className="mt-4 mb-8 flex items-center gap-2">
            <Image
              src={session?.user?.image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
              width={128}
              height={128}
              alt="Profile Picture"
              className="h-12 w-12 rounded-full"
            />
            <div>
              <div className="text-lg">
                Logged in as <strong className="">{session?.user?.name}</strong>.&emsp;&emsp;Not you?{" "}
                <button
                  className="underline"
                  onClick={() => signOut({ callbackUrl: "/advent/2025/register#registration" })}
                >
                  Sign out.
                </button>
              </div>
              <div className="text-sm leading-4 text-gray-400">
                {user?.accounts
                  .map(
                    (account) =>
                      ({
                        discord: "Discord",
                        google: "Google",
                        ctftime: "CTFtime",
                      })[account.provider],
                  )
                  .join(", ") ?? "Unknown login method"}
              </div>
            </div>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();

              setLoading(true);

              if (!acceptTerms) {
                setError("You must agree to the competition guidelines and other aforementioned information");
                return setLoading(false);
              }

              const parsed = registerSchema.safeParse({
                preferredEmail: preferredEmailRef.current?.value,
                country: country,
                schoolingStatus: schoolingStatus,
                accessCode: accessCode || undefined,
                howDidYouHearAboutUs: howDidYouHearAboutUs || undefined,
                displayName:
                  // this is so that if their discord/google names are weird,
                  // the ascii & char limit filter will still accept their provider names
                  displayNameRef.current?.value === session.user.name ? undefined : displayNameRef.current?.value,
                linkedin: linkedinRef.current?.value || undefined,
                allowSponsorContact: allowSponsorContact,
              });

              if (!parsed.success) {
                setError(parsed.error.issues[0]?.message ?? "Invalid form data");
                return setLoading(false);
              }

              if (isRegistered) {
                await adventUpdateRegistrationMutation.mutateAsync(parsed.data);

                setLoading(false);

                // I believe that we don't need this? otherwise isError is delayed by one request
                // if (!adventUpdateRegistrationMutation.isError) {
                setError("");
                toast.success("Registration updated successfully", { position: "top-center" });
                // }
              } else {
                await adventRegisterMutation.mutateAsync(parsed.data);

                setLoading(false);

                // if (!adventRegisterMutation.isError) {
                setError("");
                router.push("/advent/2025");
                toast.success("Registration complete; happy hacking!", { position: "top-center", duration: 20_000 });
                // }
              }
            }}
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Account email</Label>
              <Input
                type="email"
                className="bg-gray-200 text-gray-900"
                disabled
                defaultValue={session.user.email ?? ""}
              />
              <span className="text-xs text-gray-400">
                This is the email address associated with your Discord or Google account when you signed up.
              </span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Preferred email</Label>
              <Input
                type="email"
                id="preferred-email"
                ref={preferredEmailRef}
                className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                defaultValue={user?.preferredEmail ?? session.user.email ?? ""}
              />
              <span className="text-xs text-gray-400">
                We will attempt to contact you using this email address if you are unreachable via Discord.
              </span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="country">Country of residence</Label>
              <CountrySelect country={country} setCountry={setCountry} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="country">Current/incoming schooling status</Label>
              <Select
                value={schoolingStatus}
                onValueChange={(status) => setSchoolingStatus(status)}
                disabled={isRegistered}
              >
                <SelectTrigger className="w-full bg-gray-200! text-gray-900!">
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="hs1">9th grade (high school or equivalent)</SelectItem>
                    <SelectItem value="hs2">10th grade (high school or equivalent)</SelectItem>
                    <SelectItem value="hs3">11th grade (high school or equivalent)</SelectItem>
                    <SelectItem value="hs4">12th grade (high school or equivalent)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="-ml-2">
                      <hr />
                    </SelectLabel>
                    <SelectItem value="college1">College freshman (1st year or equivalent)</SelectItem>
                    <SelectItem value="college2">College sophomore (2nd year or equivalent)</SelectItem>
                    <SelectItem value="college3">College junior (3rd year or equivalent)</SelectItem>
                    <SelectItem value="college4">College senior (4th year or equivalent)</SelectItem>
                    <SelectItem value="college5">Attending postgraduate school</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="-ml-2">
                      <hr />
                    </SelectLabel>
                    <SelectItem value="other">Other high school or college (or equivalent)</SelectItem>
                    <SelectItem value="none">None of the above</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="text-xs text-gray-400">
                We need this information to determine which division you will be competing in for the event.
                {isRegistered
                  ? " You need to contact an administrator if you wish to change your schooling status."
                  : ""}
              </span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="country">
                How did you hear about Advent of CTF? <span className="text-gray-400">(Optional)</span>
              </Label>
              <Select value={howDidYouHearAboutUs} onValueChange={(option) => setHowDidYouHearAboutUs(option)}>
                <SelectTrigger className="w-full bg-gray-200! text-gray-900!">
                  <SelectValue placeholder="Select an option..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="csd-discord">CyberStudents Discord server</SelectItem>
                    <SelectItem value="other-ctf-discord">
                      Other cybersecurity Discord servers or communities
                    </SelectItem>
                    <SelectItem value="ctftime">CTFtime</SelectItem>
                    <SelectItem value="sponsor">One of our sponsors</SelectItem>
                    <SelectItem value="google-social-media">Google or social media</SelectItem>
                    <SelectItem value="friend">A friend told me about it</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Accordion
              type="single"
              collapsible
              value={leaderboardPreferencesShown}
              onValueChange={setLeaderboardPreferencesShown}
              className="mb-4"
            >
              <AccordionItem value="show-leaderboard-preferences" className="border-gray-600">
                <AccordionTrigger className="pt-2 pb-4">
                  {leaderboardPreferencesShown ? "Hide" : "Show"} leaderboard preferences
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="display-name">Name to appear on leaderboards</Label>
                    <Input
                      type="text"
                      id="display-name"
                      ref={displayNameRef}
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={user?.displayName ?? session.user.name ?? ""}
                      maxLength={32}
                    />
                    <span className="text-xs text-gray-400">
                      You can only change your display name every hour. Max 32 characters.
                    </span>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="linkedin">
                      LinkedIn profile to appear beside name <span className="text-gray-400">(Optional)</span>
                    </Label>
                    <InputGroup className="border-gray-900! bg-gray-200! text-gray-900! ring-gray-200! ring-offset-gray-900">
                      <InputGroupInput
                        type="text"
                        id="linkedin"
                        ref={linkedinRef}
                        className="text-gray-900! ring-offset-0!"
                        defaultValue={user?.linkedin ?? ""}
                        placeholder="your-linkedin-username"
                        maxLength={100}
                      />
                      <InputGroupAddon>
                        <FaLinkedin className="text-gray-500" />
                        <InputGroupText className="mt-0.5 text-gray-500!">linkedin.com/in/</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <span className="text-xs text-gray-400">
                      Providing your LinkedIn profile can help other players, sponsors, and recruiters connect with you.
                    </span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(state) => setAcceptTerms(state === "indeterminate" ? false : state)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the competition guidelines and other aforementioned information.
                <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allow-sponsor-contact"
                checked={allowSponsorContact}
                onCheckedChange={(state) => setAllowSponsorContact(state === "indeterminate" ? false : state)}
              />
              <label
                htmlFor="allow-sponsor-contact"
                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow Advent of CTF 2025 sponsors to contact me regarding recruitment and other opportunities.{" "}
                <span className="text-gray-400">(Optional)</span>
              </label>
            </div>

            <div className="text-red-500">{error}</div>
            <Button type="submit" className="mb-4 self-start" disabled={loading}>
              {isRegistered ? "Update registration" : "Complete registration"}
            </Button>
          </form>
        </>
      ) : (
        <div className="mt-4">
          <div className="flex w-fit flex-col gap-2">
            <div className="flex items-center gap-3">
              <Button
                className="flex w-52 items-center bg-[#5865f2]! font-bold text-gray-200! hover:bg-[#5865f2]/70!"
                onClick={() => {
                  signIn("discord", { callbackUrl: "/advent/2025/register#registration" });
                }}
              >
                <FaDiscord className="h-6! w-6!" />
                <span>Login with Discord</span>
              </Button>
              <em className="text-gray-400">recommended</em>
            </div>
            <div className="flex w-52 items-center gap-4">
              <Separator className="flex-1 bg-gray-500!" />
              <span className="text-gray-400">or</span>
              <Separator className="flex-1 bg-gray-500!" />
            </div>
            {/* <Button
              className="flex w-52 items-center bg-[#e3000b]! font-bold text-gray-200! hover:bg-[#e3000b]/70!"
              onClick={() => {
                signIn("ctftime", { callbackUrl: "/advent/2025/register#registration" });
              }}
            >
              <Image src={ctftimeLogo} alt="CTFtime Logo" className="h-6! w-6!" />
              <span>Login with CTFtime</span>
            </Button>
            <div className="flex w-52 items-center gap-4">
              <Separator className="flex-1 bg-gray-500!" />
              <span className="text-gray-400">or</span>
              <Separator className="flex-1 bg-gray-500!" />
            </div> */}
            <Button
              className="flex w-52 items-center font-bold text-gray-900"
              onClick={() => {
                signIn("google", { callbackUrl: "/advent/2025/register#registration" });
              }}
            >
              <FcGoogle className="h-6! w-6!" />
              <span>Login with Google</span>
            </Button>
            <div className="flex w-52 items-center gap-4">
              <Separator className="flex-1 bg-gray-500!" />
              <span className="text-gray-400">or</span>
              <Separator className="flex-1 bg-gray-500!" />
            </div>
            <p className="text-gray-200">Or if you&rsquo;ve been given an access code by a staff member:</p>
            {!acceptedAccessCode ? (
              <div className="flex items-center gap-2">
                <Input
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Access code"
                  className="max-w-xs border-gray-400 bg-gray-900 text-gray-200"
                />
                <Button
                  className="bg-gray-200 font-bold text-gray-900"
                  onClick={async () => {
                    if (!accessCode?.trim()) return;

                    const result = await checkAccessCodeMutation.mutateAsync({ code: accessCode });

                    if (result) {
                      localStorage.setItem("accessCode", accessCode);
                      setAcceptedAccessCode(true);
                      toast.success("Access code accepted; please login with Google.", { position: "top-center" });
                    } else {
                      toast.error("Invalid access code.", { position: "top-center" });
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            ) : (
              <Button
                className="mt-2 flex items-center font-bold text-gray-900"
                onClick={() => {
                  signIn("google", { callbackUrl: "/advent/2025/register#registration" });
                }}
              >
                <FcGoogle className="h-5! w-5!" />
                <span>Login with Google with my access code</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
