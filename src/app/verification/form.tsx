"use client";

import { useEffect, useRef, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { api } from "~/trpc/react";
import type { Session } from "next-auth";
import Image from "next/image";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getCodeList } from "country-list";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { FaDiscord } from "react-icons/fa6";
import { z } from "zod";
import type { verificationSubmitSchema } from "~/lib/schemas";
import { toast } from "sonner";
import { HiCheckCircle } from "react-icons/hi2";

export default function VerificationForm({ session }: { session: Session | null }) {
  const schoolName = useRef<HTMLInputElement>(null);
  const fullName = useRef<HTMLInputElement>(null);
  const birthdate = useRef<HTMLInputElement>(null);
  const schoolEmail = useRef<HTMLInputElement>(null);
  const idFile = useRef<HTMLInputElement>(null);
  const comments = useRef<HTMLTextAreaElement>(null);

  const [isStudent, setIsStudent] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [schoolYear, setSchoolYear] = useState<string>();
  const [verificationMethod, setVerificationMethod] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    function beforeUnloadHandler(e: BeforeUnloadEvent) {
      if (isStudent && !isLoading) e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => window.removeEventListener("beforeunload", beforeUnloadHandler);
  }, [isStudent, isLoading]);

  if (!session) {
    return (
      <div>
        <p className="mb-2">To get started, please login:</p>
        <Button
          className="!hover:bg-[#5865f2]/70 flex items-center !bg-[#5865f2] font-bold !text-gray-200"
          onClick={() => {
            signIn("discord");
          }}
        >
          <FaDiscord className="!h-6 !w-6" />
          <span>Login with Discord</span>
        </Button>
      </div>
    );
  }

  const lastVerificationDateQuery = api.verification.fetchLastSubmissionDate.useQuery();

  const verificationSubmitMutation = api.verification.submit.useMutation({
    onError: (error) => {
      setIsLoading(false);
      toast.dismiss();
      toast.error(error.message, { position: "top-center" });
    },
  });

  return (
    <div>
      {lastVerificationDateQuery.data?.createdAt && (
        <Alert className="mb-8 max-w-2xl !bg-green-600 !bg-opacity-50 dark:bg-green-500">
          <HiCheckCircle className="h-5 w-5" />
          <AlertTitle>
            You submitted an identity verification application on{" "}
            {lastVerificationDateQuery.data.createdAt.toLocaleString()}.
          </AlertTitle>
          <AlertDescription>
            If that application was for a previous event, you may have to submit a new application.
            <br />
            If you need to update any details, please submit a new application.
          </AlertDescription>
        </Alert>
      )}
      <div className="mb-8 flex items-center gap-2">
        <Image
          src={session?.user?.image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
          width={128}
          height={128}
          alt="Profile Picture"
          className="h-12 w-12 rounded-full"
        />
        <span className="text-lg">
          Logged in as <strong>{session?.user?.name}</strong>.&emsp;&emsp;Not you?{" "}
          <button className="underline" onClick={() => signOut()}>
            Sign out.
          </button>
        </span>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          setIsLoading(true);
          toast.loading("Submitting identity verification application...", { position: "top-center" });

          const data: z.infer<typeof verificationSubmitSchema> = {
            isStudent: isStudent === "yes",
            schoolName: isStudent === "yes" ? schoolName.current?.value : undefined,
            schoolYear:
              isStudent === "yes" ? (schoolYear as z.infer<typeof verificationSubmitSchema>["schoolYear"]) : "none",
            fullName: isStudent === "yes" ? fullName.current?.value! : "none",
            birthdate: new Date(birthdate.current?.value!),
            country: country!,
            verificationMethod: verificationMethod as z.infer<typeof verificationSubmitSchema>["verificationMethod"],
            schoolEmail:
              isStudent === "yes" && verificationMethod === "verify-email" ? schoolEmail.current?.value : undefined,
            comments: comments.current?.value,
          };

          const file = idFile.current?.files?.[0];

          if (file) {
            if (file.size > 8e6) {
              return toast.error("The file you uploaded is too large. Please upload a file that is less than 8 MB.", {
                position: "top-center",
              });
            }

            if (!["image/jpeg", "image/png"].includes(file.type)) {
              return toast.error("The file you uploaded is not a valid image. Please upload a .jpg or .png file.", {
                position: "top-center",
              });
            }

            data.idFile = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = (error) => reject(error);
            });

            data.idFileType = file.type as "image/jpeg" | "image/png";
          }

          await verificationSubmitMutation.mutateAsync(data);

          toast.success(
            "Identity verification application submitted successfully. We will review your responses soon.",
            { position: "top-center" },
          );

          location.reload();
        }}
      >
        <div className="max-w-2xl space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="is-student-select" className="text-base">
              Are you a current high school (or equivalent) or university student?
            </Label>
            <RadioGroup
              required
              id="is-student-select"
              value={isStudent}
              onValueChange={(value) => setIsStudent(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="text-base">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="text-base">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>
          {isStudent && (
            <>
              {isStudent === "yes" ? (
                <>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="school-name" className="text-base">
                      School or university name
                    </Label>
                    <Input
                      id="school-name"
                      className="!border-gray-900 bg-gray-200 text-gray-900 !ring-gray-200 ring-offset-gray-900"
                      ref={schoolName}
                      required
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="country" className="text-base">
                      School or university year
                    </Label>
                    <Select value={schoolYear} onValueChange={(status) => setSchoolYear(status)} required>
                      <SelectTrigger className="!bg-gray-200 text-gray-900">
                        <SelectValue placeholder="Select your year" />
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
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : null}
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="full-name" className="text-base">
                  Full name
                </Label>
                <Input
                  id="full-name"
                  className="!border-gray-900 bg-gray-200 text-gray-900 !ring-gray-200 ring-offset-gray-900"
                  ref={fullName}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="birthdate" className="text-base">
                  Date of birth
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  className="!border-gray-900 bg-gray-200 text-gray-900 !ring-gray-200 ring-offset-gray-900"
                  ref={birthdate}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="country" className="text-base">
                  Country of residence
                </Label>
                <Select value={country} onValueChange={(country) => setCountry(country)} required>
                  <SelectTrigger className="!bg-gray-200 text-gray-900">
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
              <div className="grid w-full items-center gap-1.5 pt-4">
                <Label htmlFor="verify-identity-select" className="text-base">
                  How would you like to verify your identity?
                </Label>
                <RadioGroup
                  required
                  id="verify-identity-select"
                  value={verificationMethod}
                  onValueChange={(value) => setVerificationMethod(value)}
                >
                  {isStudent === "yes" ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="verify-email" id="verify-email" />
                        <Label htmlFor="verify-email" className="text-base">
                          Verify my school/university email address
                        </Label>
                      </div>
                    </>
                  ) : null}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="verify-id" id="verify-id" />
                    <Label htmlFor="verify-id" className="text-base">
                      {isStudent === "yes"
                        ? "Upload a photo of my student ID or another proof of enrollment"
                        : "Upload a photo of an acceptable ID or document"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="verify-other" id="verify-other" />
                    <Label htmlFor="verify-other" className="text-base">
                      Use another way to verify my identity
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {verificationMethod ? (
                <>
                  {verificationMethod === "verify-email" ? (
                    <>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="school-email" className="text-base">
                          Your school email address
                        </Label>
                        <Input
                          type="email"
                          id="school-email"
                          className="!border-gray-900 bg-gray-200 text-gray-900 !ring-gray-200 ring-offset-gray-900"
                          ref={schoolEmail}
                          required
                        />
                        <span className="text-sm text-gray-400">
                          This must be an email address managed by your school or university.
                        </span>
                      </div>
                      <div className="w-full rounded-lg bg-yellow-500 bg-opacity-30 px-6 py-4">
                        Please send an email using your school email address to{" "}
                        <a href="mailto:admin@cyberstudents.net" className="font-bold underline">
                          admin@cyberstudents.net
                        </a>{" "}
                        with the subject line &quot;CyberStudents identity verification&quot; and include your Discord
                        username in the body.
                        <p className="mt-2">We will not contact your school or university without your consent.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sent-email" required />
                        <label
                          htmlFor="sent-email"
                          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I have sent an email from my school email address to <strong>admin@cyberstudents.net</strong>.
                        </label>
                      </div>
                    </>
                  ) : verificationMethod === "verify-id" ? (
                    <>
                      <div className="w-full space-y-2 rounded-lg bg-yellow-500 bg-opacity-30 px-6 py-4">
                        <p className="font-bold">Please take a clear photo with both of these items:</p>
                        <ul className="ml-4 list-disc space-y-2">
                          {isStudent === "yes" ? (
                            <li>
                              One of the following: a school-issued student ID card, official/unofficial transcript,
                              enrollment letter on school letterhead, class schedule for the semester, receipt from
                              bursar, or scholarship/financial aid letter
                              <ul className="ml-10 mt-2 list-disc space-y-2">
                                <li>All documents, except for ID cards, must be dated</li>
                                <li>All documents must contain the same name as you specified above</li>
                                <li>
                                  If you are uploading an ID, it must show your full name and current academic year
                                </li>
                              </ul>
                            </li>
                          ) : (
                            <li>
                              A government-issued ID, such as a driver&apos;s license, state-issued ID, military ID,
                              passport, birth certificate <strong>OR</strong> a document from a bank, insurance company,
                              or other credible business/organization such as a bank statement or utility bill.
                              <ul className="ml-10 mt-2 list-disc space-y-2">
                                <li>This ID or document must include your full name and be dated</li>
                              </ul>
                            </li>
                          )}
                          <li>
                            A piece of paper with your Discord username, today&apos;s date, and
                            &quot;CyberStudents&quot; handwritten on it
                          </li>
                        </ul>
                        <p>You may censor any other personal information that is not stated above.</p>
                        {isStudent === "yes" && (
                          <p>We will not contact your school or university without your consent.</p>
                        )}
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="photo" className="text-base">
                          Upload a photo (.jpg or .png, max 8 MB)
                        </Label>
                        <input type="file" accept=".jpg,.jpeg,.png" id="photo" ref={idFile} required />
                      </div>
                    </>
                  ) : (
                    <div className="w-full rounded-lg bg-yellow-500 bg-opacity-30 px-6 py-4">
                      Please explain in the field below how you would like to verify your identity. An administrator
                      will reach out to you shortly.
                    </div>
                  )}
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="comments" className="text-base">
                      Comments regarding verification (optional)
                    </Label>
                    <Textarea
                      id="comments"
                      className="h-24 !border-gray-900 bg-gray-200 text-gray-900 !ring-gray-200 ring-offset-gray-900"
                      ref={comments}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms1" required />
                    <label htmlFor="terms1" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I affirm that the information I have provided is accurate and that I am the person in the
                      documentation I have submitted. I understand that providing false information may result in
                      forfeiture of my prize and disqualification from the event.
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 pb-2">
                    <Checkbox id="terms2" required />
                    <label htmlFor="terms2" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I have read, agreed, and adhered to the{" "}
                      <a href="/advent/register" target="_blank" className="font-bold underline">
                        competition guidelines
                      </a>{" "}
                      throughout the competition.
                    </label>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    Submit verification
                  </Button>
                  <p>
                    After submitting, an administrator will review your responses. We will not share any of the
                    information you have provided here; all information are encrypted during transit and at rest.
                  </p>
                </>
              ) : null}
            </>
          )}
        </div>
      </form>
    </div>
  );
}
