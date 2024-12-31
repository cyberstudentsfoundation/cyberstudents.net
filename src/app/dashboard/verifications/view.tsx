"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { api } from "~/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { VerificationPreview } from "./columns";
import { HiArrowUpRight, HiDocumentArrowDown, HiPencilSquare, HiPlus, HiPlusSmall, HiXMark } from "react-icons/hi2";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Prose } from "~/lib/renderMarkdoc";
import { getName } from "country-list";

export default function Edit({ row }: { row: Row<VerificationPreview> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const getVerificationQuery = api.dashboard.getVerification.useQuery({ id: row?.original.id });

  const schoolYearMap: Record<string, string> = {
    hs1: "9th grade (high school or equivalent)",
    hs2: "10th grade (high school or equivalent)",
    hs3: "11th grade (high school or equivalent)",
    hs4: "12th grade (high school or equivalent)",
    college1: "College freshman (1st year or equivalent)",
    college2: "College sophomore (2nd year or equivalent)",
    college3: "College junior (3rd year or equivalent)",
    college4: "College senior (4th year or equivalent)",
    college5: "Attending postgraduate school",
    other: "Other high school or college (or equivalent)",
  };

  const verificationMethodMap: Record<string, string> = {
    "verify-email": "Via school email",
    "verify-id": "Via ID or document",
    "verify-other": "Other (manually)",
  };

  const studentStatusConsistent =
    getVerificationQuery.data?.user.flags.includes("ms_hs_college_eligible") === getVerificationQuery.data?.isStudent;

  useEffect(() => {
    if (searchParams.get("id") === row.original.id) {
      setOpen(true);
    }
  }, [searchParams, row.original.id]);

  useEffect(() => {
    if (open) {
      router.push(`${pathname}?id=${row.original.id}`, { scroll: false });
    } else {
      router.push(pathname, { scroll: false });
    }
  }, [router, pathname, open, row.original.id]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant={"ghost"} className="flex items-center">
            <HiDocumentArrowDown className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-0 bg-gray-900 !px-0 text-gray-200 sm:max-w-screen-md">
          <ScrollArea className="pr-6">
            <SheetHeader className="pl-6">
              <SheetTitle className="text-gray-200">View identity verification application</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="my-8 pl-6">
              <div className="mb-8 flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
                <div className="flex items-center gap-2 py-1">
                  <Image
                    src={
                      row.original.user.image?.replace(".gif", ".png") ??
                      "https://cdn.discordapp.com/embed/avatars/5.png"
                    }
                    width={64}
                    height={64}
                    alt={`Profile Picture for ${row.original.user.name}`}
                    className="h-12 w-12 rounded-full"
                  />
                  <span className="text-lg">{row.original.user.name}</span>
                </div>
                <a href={`/advent/leaderboard#${row.original.user.name}`} target="_blank" rel="noopener noreferrer">
                  <Button className="flex w-fit items-center gap-2">
                    <span>See place on leaderboard</span>
                    <HiArrowUpRight className="mb-0.5 h-4 w-4" />
                  </Button>
                </a>
              </div>
              {getVerificationQuery.data ? (
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="full-name" className="text-base">
                      Full name
                    </Label>
                    <Input
                      id="full-name"
                      className="bg-gray-200 text-gray-900"
                      value={getVerificationQuery.data.fullName}
                      readOnly
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="full-name" className="text-base">
                      Date of birth
                    </Label>
                    <Input
                      id="full-name"
                      className="bg-gray-200 text-gray-900"
                      value={getVerificationQuery.data.birthdate.toLocaleDateString()}
                      readOnly
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="full-name" className="text-base">
                      Country of residence
                    </Label>
                    <Input
                      id="full-name"
                      className="bg-gray-200 text-gray-900"
                      value={getName(getVerificationQuery.data.country.toLowerCase())}
                      readOnly
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-400">Student</h2>
                  <p className={`${studentStatusConsistent ? "text-green-500" : "text-red-500"}`}>
                    Student status (not year) {studentStatusConsistent ? "is" : "is not"} consistent from registration.
                  </p>
                  {getVerificationQuery.data.isStudent ? (
                    <>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="full-name" className="text-base">
                          School or university name
                        </Label>
                        <Input
                          id="full-name"
                          className="bg-gray-200 text-gray-900"
                          value={getVerificationQuery.data.schoolName ?? ""}
                          readOnly
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="full-name" className="text-base">
                          School or university year
                        </Label>
                        <Input
                          id="full-name"
                          className="bg-gray-200 text-gray-900"
                          value={schoolYearMap[getVerificationQuery.data.schoolYear ?? "none"]}
                          readOnly
                        />
                      </div>
                    </>
                  ) : (
                    <div>This person selected that they were not a high school or university student.</div>
                  )}
                  <h2 className="text-xl font-bold text-gray-400">Identity</h2>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="full-name" className="text-base">
                      Verification method
                    </Label>
                    <Input
                      id="full-name"
                      className="bg-gray-200 text-gray-900"
                      value={verificationMethodMap[getVerificationQuery.data.verificationMethod]}
                      readOnly
                    />
                  </div>
                  {getVerificationQuery.data.verificationMethod === "verify-email" ? (
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="full-name" className="text-base">
                        School email address
                      </Label>
                      <Input
                        id="full-name"
                        className="bg-gray-200 text-gray-900"
                        value={getVerificationQuery.data.schoolEmail ?? ""}
                        readOnly
                      />
                    </div>
                  ) : getVerificationQuery.data.verificationMethod === "verify-id" ? (
                    <div className="grid w-full items-center gap-1.5">
                      <Label className="text-base">
                        <a
                          href={`/dashboard/verifications/uploaded-file?id=${row.original.id}`}
                          target="_blank"
                          className="underline"
                        >
                          Attached image
                        </a>
                      </Label>
                      <div className="relative h-96 w-96">
                        <Image
                          src={`/dashboard/verifications/uploaded-file?id=${row.original.id}`}
                          alt="Attached image"
                          fill={true}
                          className="ph-no-capture"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="comments" className="text-base">
                      Comments
                    </Label>
                    <Textarea
                      id="comments"
                      className="h-24 bg-gray-200 text-gray-900"
                      value={getVerificationQuery.data.comments ?? ""}
                      readOnly
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="full-name" className="text-base">
                      ID
                    </Label>
                    <Input
                      id="full-name"
                      className="bg-gray-200 text-gray-900"
                      value={getVerificationQuery.data.id}
                      readOnly
                    />
                  </div>
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </ScrollArea>
          <SheetFooter className="border-t border-gray-700 pt-6">
            <div className="px-4">
              <Button variant="ghost" className="text-gray-400" onClick={() => setOpen(false)}>
                Dismiss
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
