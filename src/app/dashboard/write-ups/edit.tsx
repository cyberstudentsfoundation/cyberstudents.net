"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { api } from "~/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { WriteUp } from "./columns";
import { HiMiniArrowPath, HiPencilSquare, HiPlus } from "react-icons/hi2";
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
} from "~/components/ui/alert-dialog";
import { Prose } from "~/lib/renderMarkdoc";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "~/components/ui/command";
import { cn } from "~/lib/utils";
import { z } from "zod";

export default function Edit({ row, textButton }: { row?: Row<WriteUp>; textButton: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const editWriteUpMutation = api.dashboard.editWriteUp.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteWriteUpMutation = api.dashboard.deleteWriteUp.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [open, setOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [challengeMenuOpen, setChallengeMenuOpen] = useState(false);

  const authorPreferredNameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const publishDateRef = useRef<HTMLInputElement>(null);
  const originalURLRef = useRef<HTMLInputElement>(null);
  const authorMetadataGitHubURL = useRef<HTMLInputElement>(null);
  const authorMetadataLinkedInURL = useRef<HTMLInputElement>(null);
  const contentCreatedAtRef = useRef<HTMLInputElement>(null);
  const contentUpdatedAtRef = useRef<HTMLInputElement>(null);
  const submissionsEnabledRef = useRef<HTMLButtonElement>(null);

  const [challengeId, setChallengeId] = useState(row?.original.challengeId);
  const [content, setContent] = useState(row?.original.content ?? "");

  const [status, setStatus] = useState<React.ReactNode>();
  const reactId = useId();

  const getChallengesQuery = api.dashboard.getChallenges.useQuery();

  function getDateTimeLocalValue(date: Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, -1);
  }

  function getAuthorMetadata() {
    const schema = z.object({ github: z.string().optional(), linkedin: z.string().optional() });
    return schema.parse(row?.original.authorMetadata ?? {});
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
    setChallengeId(row?.original.challengeId);
    setContent(row?.original.content ?? "");
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
      // we love client-side rounding
      Math.abs(new Date(publishDateRef.current?.value ?? 0).getTime() - row.original.publishDate.getTime()) <= 2000 &&
      Math.abs(new Date(contentCreatedAtRef.current?.value ?? 0).getTime() - row.original.contentCreatedAt.getTime()) <=
        2000 &&
      Math.abs(new Date(contentUpdatedAtRef.current?.value ?? 0).getTime() - row.original.contentUpdatedAt.getTime()) <=
        2000 &&
      challengeId === row.original.challengeId &&
      content === row.original.content &&
      challengeId === row.original.challengeId &&
      authorPreferredNameRef.current?.value === row.original.authorPreferredName &&
      authorMetadataGitHubURL.current?.value === getAuthorMetadata().github &&
      authorMetadataLinkedInURL.current?.value === getAuthorMetadata().linkedin &&
      originalURLRef.current?.value === row.original.originalURL
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
          Math.abs(new Date(publishDateRef.current?.value ?? 0).getTime() - row.original.publishDate.getTime()) <=
            2000 &&
          challengeId === row.original.challengeId &&
          content === row.original.content)
      ) {
        return;
      }

      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => window.removeEventListener("beforeunload", beforeUnloadHandler);
  }, [challengeId, content, row, open]);

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
            <AlertDialogTitle>Delete write-up?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete <strong>{row?.original.title}</strong>?{" "}
              {(row?.original.publishDate.getTime() ?? Infinity) <= Date.now() ? (
                <span className="text-orange-500">This write-up has been published before.</span>
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
                if (!row) return toast.error("No write-up to delete");

                await deleteWriteUpMutation.mutateAsync({ id: row.original.id });

                if (!editWriteUpMutation.isError) {
                  toast.success("Write-up deleted successfully.", { position: "top-center" });
                  setDeleteDialogOpen(false);
                  setOpen(false);
                  location.reload();
                }
              }}
            >
              Delete write-up
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
                <span>Create write-up</span>
              </>
            ) : (
              <HiPencilSquare className="h-5 w-5" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          className="flex flex-col gap-0 bg-gray-900! px-0! text-gray-200 sm:max-w-(--breakpoint-md)"
          onInteractOutside={processSheetClose}
          onEscapeKeyDown={processSheetClose}
          onPointerDownOutside={processSheetClose}
        >
          <ScrollArea className="pr-6">
            <SheetHeader className="pl-6">
              <SheetTitle className="text-gray-200">{textButton ? "Create" : "Edit"} write-up</SheetTitle>
              <SheetDescription>Changes will be lost if you close the drawer or refresh the page.</SheetDescription>
            </SheetHeader>
            <form
              id={`${row?.original.id ?? reactId}-edit-form`}
              onSubmit={async (e) => {
                e.preventDefault();

                // if (!challengeId) return toast.error("Please select a challenge.");

                editWriteUpMutation.reset();

                await editWriteUpMutation.mutateAsync({
                  id: row?.original.id,
                  originalURL: originalURLRef.current!.value,
                  authorPreferredName: authorPreferredNameRef.current!.value,
                  authorMetadata: {
                    github: authorMetadataGitHubURL.current!.value,
                    linkedin: authorMetadataLinkedInURL.current!.value,
                  },
                  contentCreatedAt: new Date(contentCreatedAtRef.current!.value),
                  contentUpdatedAt: new Date(contentUpdatedAtRef.current!.value),
                  challengeId: challengeId!,
                  title: titleRef.current!.value,
                  content: content!,
                  publishDate: new Date(publishDateRef.current!.value),
                });

                toast.success("Write-up updated successfully.", { position: "top-center" });
                setOpen(false);

                setTimeout(() => {
                  location.href = "/dashboard/write-ups";
                }, 100);
              }}
            >
              <div className="my-8 pl-6">
                <div className="flex flex-col gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="id">Write-up ID</Label>
                    <Input
                      id="id"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.id ?? "Generated after creation"}
                      disabled
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Linked challenge</Label>
                    <Popover open={challengeMenuOpen} onOpenChange={setChallengeMenuOpen} modal={true}>
                      <PopoverTrigger
                        className="border-gray-900! bg-gray-200! text-gray-900 ring-gray-200! ring-offset-gray-900"
                        asChild
                      >
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={challengeMenuOpen}
                          className="justify-between hover:text-gray-900 dark:hover:text-gray-900"
                        >
                          {challengeId
                            ? (getChallengesQuery.data?.find((c) => c.id === challengeId)?.title ?? "")
                            : "Select a challenge..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-96 p-0">
                        <Command
                          filter={(value, search) => {
                            if (
                              getChallengesQuery.data
                                ?.find((c) => c.id === value)
                                ?.title.toLowerCase()
                                .includes(search.toLowerCase())
                            )
                              return 1;
                            return 0;
                          }}
                        >
                          <CommandInput placeholder="Search by title…" />
                          <CommandList>
                            <CommandEmpty>No challenge found.</CommandEmpty>
                            <CommandGroup>
                              {getChallengesQuery.data
                                ?.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
                                .map(({ id, title, author, publishDate }) => (
                                  <CommandItem
                                    key={id}
                                    value={id}
                                    onSelect={() => {
                                      setChallengeId(id);
                                      setChallengeMenuOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn("mr-2 h-4 w-4", challengeId === id ? "opacity-100" : "opacity-0")}
                                    />
                                    <div className="flex flex-col gap-0.5">
                                      <span>{title}</span>
                                      <span className="text-xs text-gray-400">
                                        {dayjs(publishDate).format("MM/DD/YY")} · {author.name}
                                      </span>
                                    </div>
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="authorPreferredName">Author preferred name</Label>
                    <Input
                      id="authorPreferredName"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.authorPreferredName}
                      ref={authorPreferredNameRef}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.title}
                      ref={titleRef}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="content">Content</Label>
                    <Tabs defaultValue="edit">
                      <TabsList className="mb-1 bg-gray-800">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit">
                        <Textarea
                          id="content"
                          className="h-48 border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          required
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        {content ? <Prose>{content}</Prose> : <em className="text-gray-400">No content provided.</em>}
                      </TabsContent>
                    </Tabs>
                    <span className="text-xs text-gray-400">Markdown is supported.</span>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="originalURL">Original URL</Label>
                    <Input
                      id="originalURL"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.originalURL ?? ""}
                      ref={originalURLRef}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="authorMetadataGitHubURL">Author GitHub URL (optional)</Label>
                    <Input
                      id="authorMetadataGitHubURL"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={getAuthorMetadata().github}
                      ref={authorMetadataGitHubURL}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="authorMetadataLinkedInURL">Author LinkedIn URL (optional)</Label>
                    <Input
                      id="authorMetadataLinkedInURL"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={getAuthorMetadata().linkedin}
                      ref={authorMetadataLinkedInURL}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="contentCreatedAt">Content created date</Label>
                    <Input
                      id="contentCreatedAt"
                      type="datetime-local"
                      step={1}
                      className="border-gray-900! bg-gray-200 text-gray-900 scheme-light ring-gray-200! ring-offset-gray-900"
                      defaultValue={
                        row?.original.contentCreatedAt && getDateTimeLocalValue(row.original.contentCreatedAt)
                      }
                      ref={contentCreatedAtRef}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="contentUpdatedAt">Content updated date</Label>
                    <Input
                      id="contentUpdatedAt"
                      type="datetime-local"
                      step={1}
                      className="border-gray-900! bg-gray-200 text-gray-900 scheme-light ring-gray-200! ring-offset-gray-900"
                      defaultValue={
                        row?.original.contentUpdatedAt && getDateTimeLocalValue(row.original.contentUpdatedAt)
                      }
                      ref={contentUpdatedAtRef}
                      required
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => {
                        contentUpdatedAtRef.current!.value = contentCreatedAtRef.current!.value;
                      }}
                      className="flex w-fit items-center gap-1"
                    >
                      <HiMiniArrowPath className="h-4 w-4" />
                      <span>Set to created date</span>
                    </Button>
                    <span className="text-xs text-gray-400">
                      In your local time zone. Use up/down or {"'1'/'2'"} to control AM/PM in the last section on
                      desktop, or click the calendar icon for a GUI.
                    </span>
                  </div>
                  <hr className="my-3" />
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="publishDate">Scheduled publish date</Label>
                    <Input
                      id="publishDate"
                      type="datetime-local"
                      step={1}
                      className="border-gray-900! bg-gray-200 text-gray-900 scheme-light ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.publishDate && getDateTimeLocalValue(row.original.publishDate)}
                      ref={publishDateRef}
                      required
                    />
                    <span className="text-xs text-gray-400">
                      In your local time zone. Use up/down or {"'1'/'2'"} to control AM/PM in the last section on
                      desktop, or click the calendar icon for a GUI.
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
                        Delete write-up
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
                {textButton ? "Create write-up" : "Save changes"}
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
