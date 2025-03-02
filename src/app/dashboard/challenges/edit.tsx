"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { api } from "~/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Challenge } from "./columns";
import { HiPencilSquare, HiPlus, HiPlusSmall, HiXMark } from "react-icons/hi2";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Prose } from "~/lib/renderMarkdoc";

export default function Edit({ row, textButton }: { row?: Row<Challenge>; textButton: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const editChallengeMutation = api.dashboard.editChallenge.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteChallengeMutation = api.dashboard.deleteChallenge.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [open, setOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const areGlobalFlagsCaseSensitiveRef = useRef<HTMLButtonElement>(null);
  const publishDateRef = useRef<HTMLInputElement>(null);
  const submissionsEnabledRef = useRef<HTMLButtonElement>(null);

  const [authorId, setAuthorId] = useState(row?.original.author.id);
  const [category, setCategory] = useState(row?.original.category);
  const [description, setDescription] = useState(row?.original.description ?? "");
  const [hint1, setHint1] = useState(row?.original.hints[0]?.content ?? "");
  const [hint2, setHint2] = useState(row?.original.hints[1]?.content ?? "");
  const [files, setFiles] = useState<string[]>(row?.original.files ?? []);
  const [globalFlags, setGlobalFlags] = useState<string[]>(row?.original.globalFlags ?? []);
  const [globalRegexFlags, setGlobalRegexFlags] = useState<string[]>(row?.original.globalRegexFlags ?? []);

  const [status, setStatus] = useState<React.ReactNode>();
  const reactId = useId();

  const getAuthorsQuery = api.dashboard.getAuthors.useQuery();

  function getDateTimeLocalValue(date: Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, -1);
  }

  useEffect(() => {
    if (searchParams.get("id") === row?.original.id) {
      setOpen(true);
    }
  }, [searchParams, row?.original.id]);

  useEffect(() => {
    if (open && row?.original.id) {
      router.push(`${pathname}?id=${row.original.id}`, { scroll: false });
    } else {
      router.push(pathname, { scroll: false });
    }
  }, [router, pathname, open, row?.original.id]);

  useEffect(() => {
    setAuthorId(row?.original.author.id);
    setCategory(row?.original.category);
    setDescription(row?.original.description ?? "");
    setHint1(row?.original.hints[0]?.content ?? "");
    setHint2(row?.original.hints[1]?.content ?? "");
    setFiles(row?.original.files ?? []);
    setGlobalFlags(row?.original.globalFlags ?? []);
    setGlobalRegexFlags(row?.original.globalRegexFlags ?? []);
    setStatus(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!publishDateRef.current || !submissionsEnabledRef.current) return setStatus(undefined);

      if (submissionsEnabledRef.current.dataset.state !== "checked")
        return setStatus(<span className="text-red-400">Submissions disabled</span>);

      const publishDate = new Date(publishDateRef.current.value);

      if (publishDate.getTime() <= Date.now()) return setStatus(<span className="text-green-400">Published</span>);

      if (publishDate.getTime() > Date.now()) {
        return setStatus(
          <span className="text-yellow-400">Scheduled for {dayjs(publishDate).format("M/DD h:mm a")}</span>,
        );
      }

      return setStatus(<span className="text-orange-400">Unpublished</span>);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function processSheetClose(e?: Event) {
    if (e) e.preventDefault();

    if (deleteDialogOpen) return;

    if (
      row &&
      titleRef.current?.value === row.original.title &&
      pointsRef.current?.value === row.original.points.toString() &&
      areGlobalFlagsCaseSensitiveRef.current?.dataset.state ===
        (row.original.areGlobalFlagsCaseSensitive ? "checked" : "unchecked") &&
      new Date(publishDateRef.current?.value ?? 0).getTime() === row.original.publishDate.getTime() &&
      submissionsEnabledRef.current?.dataset.state === (row.original.submissionsEnabled ? "checked" : "unchecked") &&
      authorId === row.original.author.id &&
      category === row.original.category &&
      description === row.original.description &&
      hint1 === row.original.hints[0]?.content &&
      hint2 === row.original.hints[1]?.content &&
      files.length === row.original.files.length &&
      globalFlags.length === row.original.globalFlags.length &&
      globalRegexFlags.length === row.original.globalRegexFlags.length
    ) {
      return setOpen(false);
    }

    setConfirmationDialogOpen(true);
  }

  useEffect(() => {
    function beforeUnloadHandler(e: BeforeUnloadEvent) {
      if (
        !open ||
        (row &&
          titleRef.current?.value === row.original.title &&
          pointsRef.current?.value === row.original.points.toString() &&
          areGlobalFlagsCaseSensitiveRef.current?.dataset.state ===
            (row.original.areGlobalFlagsCaseSensitive ? "checked" : "unchecked") &&
          new Date(publishDateRef.current?.value ?? 0).getTime() === row.original.publishDate.getTime() &&
          submissionsEnabledRef.current?.dataset.state ===
            (row.original.submissionsEnabled ? "checked" : "unchecked") &&
          authorId === row.original.author.id &&
          category === row.original.category &&
          description === row.original.description &&
          hint1 === row.original.hints[0]?.content &&
          hint2 === row.original.hints[1]?.content &&
          files.length === row.original.files.length &&
          globalFlags.length === row.original.globalFlags.length &&
          globalRegexFlags.length === row.original.globalRegexFlags.length)
      ) {
        return;
      }

      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => window.removeEventListener("beforeunload", beforeUnloadHandler);
  }, [
    authorId,
    category,
    description,
    files.length,
    globalFlags.length,
    globalRegexFlags.length,
    hint1,
    hint2,
    row,
    open,
  ]);

  return (
    <>
      <AlertDialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>Your changes will be lost.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>Yes, discard changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete challenge?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete <strong>{row?.original.title}</strong>?{" "}
              {(row?.original.publishDate.getTime() ?? Infinity) <= Date.now() ? (
                <span className="text-orange-500">
                  This challenge has been published before and has {row?.original.challengeAttempts.length} attempt(s)
                  which will all be deleted.
                </span>
              ) : (
                ""
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async () => {
                if (!row) return toast.error("No challenge to delete");

                await deleteChallengeMutation.mutateAsync({ id: row.original.id });

                if (!editChallengeMutation.isError) {
                  toast.success("Challenge deleted successfully.", { position: "top-center" });
                  setDeleteDialogOpen(false);
                  location.reload();
                }
              }}
            >
              Delete challenge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant={textButton ? "default" : "ghost"}
            className={`flex items-center ${textButton ? "gap-1 text-gray-900" : "text-gray-400"}`}
          >
            {textButton ? (
              <>
                <HiPlus className="h-5 w-5" />
                <span>Create challenge</span>
              </>
            ) : (
              <HiPencilSquare className="h-5 w-5" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          className="flex flex-col gap-0 !bg-gray-900 !px-0 text-gray-200 sm:max-w-screen-md"
          onInteractOutside={processSheetClose}
          onEscapeKeyDown={processSheetClose}
          onPointerDownOutside={processSheetClose}
        >
          <ScrollArea className="pr-6">
            <SheetHeader className="pl-6">
              <SheetTitle className="text-gray-200">{textButton ? "Create" : "Edit"} challenge</SheetTitle>
              <SheetDescription>Changes will be lost if you close the drawer or refresh the page.</SheetDescription>
            </SheetHeader>
            <form
              id={`${row?.original.id ?? reactId}-edit-form`}
              onSubmit={async (e) => {
                e.preventDefault();

                const hints = [];
                if (hint1) hints.push({ number: 1, title: "Hint 1", content: hint1, points: 0 });
                if (hint2) hints.push({ number: 2, title: "Hint 2", content: hint2, points: 0 });

                await editChallengeMutation.mutateAsync({
                  id: row?.original.id,
                  authorId: authorId!,
                  title: titleRef.current!.value,
                  category: category!,
                  points: Number(pointsRef.current!.value),
                  description: description!,
                  hints,
                  files,
                  globalFlags,
                  areGlobalFlagsCaseSensitive: areGlobalFlagsCaseSensitiveRef.current!.dataset.state === "checked",
                  globalRegexFlags,
                  publishDate: new Date(publishDateRef.current!.value),
                  submissionsEnabled: submissionsEnabledRef.current!.dataset.state === "checked",
                });

                if (!editChallengeMutation.isError) {
                  toast.success("Challenge updated successfully.", { position: "top-center" });
                  location.reload();
                }
              }}
            >
              <div className="my-8 pl-6">
                <div className="flex flex-col gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="id">Challenge ID</Label>
                    <Input
                      id="id"
                      className="bg-gray-200 text-gray-900"
                      defaultValue={row?.original.id ?? "Generated after creation"}
                      disabled
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="event">Event</Label>
                    <Input
                      id="event"
                      className="bg-gray-200 text-gray-900"
                      defaultValue={row?.original.eventName ?? "aoc2024"}
                      disabled
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Author</Label>
                    <Select value={authorId} onValueChange={(id) => setAuthorId(id)} required>
                      <SelectTrigger className="!bg-gray-200 text-gray-900">
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAuthorsQuery.data?.map(({ id, name, image }) => (
                          <SelectItem key={id} value={id}>
                            <div className="flex items-center gap-2 py-1">
                              <Image
                                src={image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
                                width={64}
                                height={64}
                                alt={`Profile Picture for ${name}`}
                                className="h-6 w-6 rounded-full"
                              />
                              <span className="max-w-52 truncate">{name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      className="bg-gray-200 text-gray-900"
                      defaultValue={row?.original.title}
                      ref={titleRef}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={(c) => setCategory(c)} required>
                      <SelectTrigger className="!bg-gray-200 text-gray-900">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Web exploitation">Web exploitation</SelectItem>
                          <SelectItem value="Cryptography">Cryptography</SelectItem>
                          <SelectItem value="Forensics">Forensics</SelectItem>
                          <SelectItem value="Binary exploitation">Binary exploitation</SelectItem>
                          <SelectItem value="Reverse engineering">Reverse engineering</SelectItem>
                          <SelectItem value="OSINT">OSINT</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="points">Points</Label>
                    <Input
                      id="points"
                      type="number"
                      className="bg-gray-200 text-gray-900"
                      defaultValue={row?.original.points}
                      ref={pointsRef}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Tabs defaultValue="edit">
                      <TabsList className="mb-1 bg-gray-800">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit">
                        <Textarea
                          id="description"
                          className="h-48 bg-gray-200 text-gray-900"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        {description ? (
                          <Prose>{description}</Prose>
                        ) : (
                          <em className="text-gray-400">No description provided.</em>
                        )}
                      </TabsContent>
                    </Tabs>
                    <span className="text-xs text-gray-400">
                      Markdown is supported. Using headings are not recommended due to space constraints.
                    </span>
                  </div>
                  <hr className="my-3" />
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="hint1">Hint 1</Label>
                    <Tabs defaultValue="edit">
                      <TabsList className="mb-1 bg-gray-800">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit">
                        <Textarea
                          id="hint1"
                          className="h-24 bg-gray-200 text-gray-900"
                          value={hint1 ?? ""}
                          onChange={(e) => setHint1(e.target.value)}
                          required
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        {hint1 ? (
                          <div className="prose prose-gray prose-invert prose-code:font-medium prose-code:before:hidden prose-code:after:hidden">
                            <Prose>{hint1}</Prose>
                          </div>
                        ) : (
                          <em className="text-gray-400">No hint provided.</em>
                        )}
                      </TabsContent>
                    </Tabs>
                    <span className="text-xs text-gray-400">
                      Markdown is supported. Using headings are not recommended due to space constraints.
                    </span>
                  </div>
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="hint2">Hint 2</Label>
                    <Tabs defaultValue="edit">
                      <TabsList className="mb-1 bg-gray-800">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit">
                        <Textarea
                          id="hint2"
                          className="h-24 bg-gray-200 text-gray-900"
                          value={hint2 ?? ""}
                          onChange={(e) => setHint2(e.target.value)}
                          required
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        {hint2 ? (
                          <div className="prose prose-gray prose-invert prose-code:font-medium prose-code:before:hidden prose-code:after:hidden">
                            <Prose>{hint2}</Prose>
                          </div>
                        ) : (
                          <em className="text-gray-400">No hint provided.</em>
                        )}
                      </TabsContent>
                    </Tabs>
                    <span className="text-xs text-gray-400">
                      Markdown is supported. Using headings are not recommended due to space constraints.
                    </span>
                  </div>
                  <hr className="my-3" />
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Files</Label>
                    <ol className="ml-4 list-decimal space-y-2">
                      {files.map((file, index) => (
                        <li key={index}>
                          <div className="flex items-center gap-2">
                            <Input
                              className="ml-2 bg-gray-200 text-gray-900"
                              value={file}
                              onChange={(e) =>
                                setFiles((files) => {
                                  const newFiles = [...files];
                                  newFiles[index] = e.target.value;
                                  return newFiles;
                                })
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() => setFiles((files) => files.filter((_, i) => i !== index))}
                            >
                              <HiXMark className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => setFiles((files) => [...files, ""])}
                      className="flex w-fit items-center gap-1"
                    >
                      <HiPlusSmall className="h-4 w-4" />
                      <span>Add file</span>
                    </Button>
                    <span className="text-xs text-gray-400">
                      Only links should be here. Files are formatted to only display the file name (i.e., everything
                      after the last slash).
                    </span>
                  </div>
                  <hr className="my-3" />
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Global flags</Label>
                    <ol className="ml-4 list-decimal space-y-2">
                      {globalFlags.map((flag, index) => (
                        <li key={index}>
                          <div className="flex items-center gap-2">
                            <Input
                              className="ml-2 bg-gray-200 font-mono text-gray-900"
                              value={flag}
                              onChange={(e) =>
                                setGlobalFlags((flags) => {
                                  const newFlags = [...flags];
                                  newFlags[index] = e.target.value;
                                  return newFlags;
                                })
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() => setGlobalFlags((flags) => flags.filter((_, i) => i !== index))}
                            >
                              <HiXMark className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => setGlobalFlags((flags) => [...flags, ""])}
                      className="flex w-fit items-center gap-1"
                    >
                      <HiPlusSmall className="h-4 w-4" />
                      <span>Add flag</span>
                    </Button>
                    <span className="text-xs text-gray-400">
                      Global flags are valid for everyone. They should be in the format <code>{"csd{FLAG}"}</code>.
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="areGlobalFlagsCaseSensitive"
                        defaultChecked={row?.original.areGlobalFlagsCaseSensitive ?? true}
                        ref={areGlobalFlagsCaseSensitiveRef}
                      />
                      <label
                        htmlFor="areGlobalFlagsCaseSensitive"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Are global flags case-sensitive?
                      </label>
                    </div>
                    <span className="text-xs text-gray-400">
                      Does not include global regex flags. This should be ON if your challenge outputs flags with cases.
                    </span>
                  </div>
                  <hr className="my-3" />
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Global regex flags</Label>
                    <ol className="ml-4 list-decimal space-y-2">
                      {globalRegexFlags.map((flag, index) => (
                        <li key={index}>
                          <div className="flex items-center gap-2">
                            <Input
                              className="ml-2 bg-gray-200 font-mono text-gray-900"
                              value={flag}
                              onChange={(e) =>
                                setGlobalRegexFlags((flags) => {
                                  const newFlags = [...flags];
                                  newFlags[index] = e.target.value;
                                  return newFlags;
                                })
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() => setGlobalRegexFlags((flags) => flags.filter((_, i) => i !== index))}
                            >
                              <HiXMark className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => setGlobalRegexFlags((flags) => [...flags, ""])}
                      className="flex w-fit items-center gap-1"
                    >
                      <HiPlusSmall className="h-4 w-4" />
                      <span>Add regex flag</span>
                    </Button>
                    <span className="text-xs text-gray-400">
                      Global (JS-flavoured) regex flags are valid for everyone. Do not prefix or suffix with slashes
                      (/).
                    </span>
                  </div>
                  <hr className="my-3" />
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="publishDate">Scheduled publish date</Label>
                    <Input
                      id="publishDate"
                      type="datetime-local"
                      className="bg-gray-200 text-gray-900 [color-scheme:_light]"
                      defaultValue={row?.original.publishDate && getDateTimeLocalValue(row.original.publishDate)}
                      ref={publishDateRef}
                      required
                    />
                    <span className="text-xs text-gray-400">
                      In your local time zone. Use up/down or {"'1'/'2'"} to control AM/PM in the last section on
                      desktop, or click the calendar icon for a GUI.
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="submissionsEnabled"
                        defaultChecked={row?.original.submissionsEnabled ?? true}
                        ref={submissionsEnabledRef}
                      />
                      <label
                        htmlFor="submissionsEnabled"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Submissions enabled?
                      </label>
                    </div>
                    <span className="text-xs text-gray-400">
                      This should be ON unless you explicitly want to disable submissions (e.g., for maintenance).
                    </span>
                  </div>
                  {row && (
                    <>
                      <hr className="my-3" />
                      <Button
                        variant="destructive"
                        type="button"
                        className="self-start"
                        onClick={() => setDeleteDialogOpen(true)}
                      >
                        Delete challenge
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </ScrollArea>
          <SheetFooter className="border-t border-gray-700 pt-6">
            <div className="mt-2 flex w-full items-center px-4 text-sm sm:mt-0 sm:px-6">
              <p>State after saving: {status}</p>
            </div>
            <div className="flex gap-4 px-4">
              <Button variant="default" type="submit" form={`${row?.original.id ?? reactId}-edit-form`}>
                {textButton ? "Create challenge" : "Save changes"}
              </Button>
              <Button variant="ghost" className="text-gray-400" onClick={() => processSheetClose()}>
                Discard changes
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
