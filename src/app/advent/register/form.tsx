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
import { getCodeList } from "country-list";
import { toast } from "sonner";
import { registerSchema } from "~/lib/schemas";
import { HiCheckCircle } from "react-icons/hi2";
import { FaDiscord, FaGoogle } from "react-icons/fa6";
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

export default function RegisterForm({
  session,
  user,
}: {
  session: Session | null;
  user: inferRouterOutputs<AppRouter>["user"]["me"] | null;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [accessCode, setAccessCode] = useState<string>("");
  const [acceptedAccessCode, setAcceptedAccessCode] = useState<boolean>(false);

  const preferredEmailRef = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState<string>();
  const [schoolingStatus, setSchoolingStatus] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const adventRegisterMutation = api.event.adventRegister.useMutation();
  const checkAccessCodeMutation = api.event.checkAccessCode.useMutation();

  const isRegistered = user?.events.includes("aoc2024");

  useEffect(() => {
    if (searchParams.get("showError") === "true") {
      toast.error("You must be registered to the event to do that.", { position: "top-center" });
      router.replace("/advent/register");
    }
  }, [router, searchParams]);

  useEffect(() => {
    // this is bypassable, yes, but idc, there's another check when actually registering
    const localStorageAccessCode = localStorage.getItem("accessCode");

    if (localStorageAccessCode) {
      setAccessCode(localStorageAccessCode);
      setAcceptedAccessCode(true);
      setTimeout(() => toast.info("Access code detected; you can login with Google.", { position: "top-center" }));
    }
  }, []);

  return (
    <div>
      <h1 id="registration" className="mb-4 scroll-mt-12 text-3xl font-bold">
        Registration
      </h1>
      {isRegistered && (
        <>
          <Alert className="mb-4 bg-green-600 bg-opacity-50">
            <HiCheckCircle className="h-5 w-5" />
            <AlertTitle>You are registered for CyberStudents&rsquo; Advent of CTF 2024.</AlertTitle>
            <AlertDescription>
              If you need to update any details, please DM Modmail in our{" "}
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
        </>
      )}
      <p className="mb-2">
        You must register with your Discord account. Only your username and profile picture will be visible to other
        players. You&apos;ll be able to customize your preferred method of communication.
      </p>
      {session?.user ? (
        <>
          <div className="mb-8 mt-4 flex items-center gap-2">
            <Image
              src={session?.user?.image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
              width={128}
              height={128}
              alt="Profile Picture"
              className="h-12 w-12 rounded-full"
            />
            <span className="text-lg">
              Logged in as <strong className="">{session?.user?.name}</strong>.&emsp;&emsp;Not you?{" "}
              <button className="underline" onClick={() => signOut({ callbackUrl: "/advent/register#registration" })}>
                Sign out.
              </button>
            </span>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();

              setLoading(true);

              const parsed = registerSchema.safeParse({
                preferredEmail: preferredEmailRef.current?.value,
                country: country,
                schoolingStatus: schoolingStatus,
                accessCode: accessCode || undefined,
              });

              if (!parsed.success) {
                setError(parsed.error.issues[0]?.message ?? "Invalid form data");
                return setLoading(false);
              }

              await adventRegisterMutation.mutateAsync(parsed.data);

              setLoading(false);

              if (!adventRegisterMutation.isError) {
                setError("");
                router.push("/advent");
                toast.success("Registration complete; happy hacking!", { position: "top-center", duration: 20_000 });
              } else {
                setError(adventRegisterMutation.error.message);
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
                This is the email associated with your Discord account when you signed up.
              </span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Preferred email</Label>
              <Input
                type="email"
                id="preferred-email"
                ref={preferredEmailRef}
                className="bg-gray-200 text-gray-900"
                defaultValue={session.user.email ?? ""}
                disabled={isRegistered}
              />
              <span className="text-xs text-gray-400">
                We will attempt to contact you using this email if you are unreachable via Discord.
              </span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="country">Country of residence</Label>
              <Select value={country} onValueChange={(country) => setCountry(country)} disabled={isRegistered}>
                <SelectTrigger className="bg-gray-200 text-gray-900">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="US" /* uppercase to avoid collision with the one below */>
                      United States of America
                    </SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="-ml-2">
                      <hr />
                    </SelectLabel>
                    {Object.entries(getCodeList())
                      .sort(([, a], [, b]) => a.localeCompare(b))
                      .map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="country">Current/incoming schooling status</Label>
              <Select
                value={schoolingStatus}
                onValueChange={(status) => setSchoolingStatus(status)}
                disabled={isRegistered}
              >
                <SelectTrigger className="bg-gray-200 text-gray-900">
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None of the following</SelectItem>
                  <SelectGroup>
                    <SelectLabel className="-ml-2">
                      <hr />
                    </SelectLabel>
                    <SelectItem value="ms_disabled" disabled>
                      Middle school (removed as of 12/2&mdash;see Discord)
                    </SelectItem>
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
                    <SelectItem value="other">Other middle/high school or college (or equivalent)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="text-xs text-gray-400">
                We need this information to determine your eligibility for leaderboards and prizes.
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(state) => setAcceptTerms(state === "indeterminate" ? false : state)}
                disabled={isRegistered}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the competition guidelines and other aforementioned information.
              </label>
            </div>
            <Button type="submit" className="mt-4 self-start" disabled={!acceptTerms || loading}>
              Complete registration
            </Button>
            <div className="text-red-500">{error}</div>
          </form>
        </>
      ) : (
        <div>
          <Button
            className="flex items-center bg-[#5865f2] font-bold text-gray-200 hover:bg-[#5865f2]/70"
            onClick={() => {
              signIn("discord", { callbackUrl: "/advent/register#registration" });
            }}
          >
            <FaDiscord className="mr-2 h-6 w-6" />
            <span>Login with Discord</span>
          </Button>
          <p className="mb-3 mt-10 text-gray-200">Or if you have an access code:</p>
          {!acceptedAccessCode ? (
            <div className="flex items-center gap-2">
              <Input
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Access code"
                className="max-w-xs bg-gray-900 text-gray-200"
              />
              <Button
                className="bg-gray-200 font-bold text-gray-900"
                onClick={async () => {
                  if (!accessCode?.trim()) return;

                  const result = await checkAccessCodeMutation.mutateAsync({ code: accessCode });

                  if (result) {
                    localStorage.setItem("accessCode", accessCode);
                    setAcceptedAccessCode(true);
                    toast.success("Access code accepted; you can login with Google.", { position: "top-center" });
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
              className="mt-2 flex items-center bg-gray-200 font-bold text-gray-900"
              onClick={() => {
                signIn("google", { callbackUrl: "/advent/register#registration" });
              }}
            >
              <FaGoogle className="mr-3 h-5 w-5" />
              <span>Login with Google</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
