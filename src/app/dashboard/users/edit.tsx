"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Row } from "@tanstack/react-table";
import { api } from "~/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { User } from "./columns";
import { HiPencilSquare, HiPlus } from "react-icons/hi2";
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
} from "~/components/ui/alert-dialog";
import { Prose } from "~/lib/renderMarkdoc";
import { MultiSelect } from "~/components/ui/multi-select";

export default function Edit({ row, textButton }: { row?: Row<User>; textButton: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const editUserMutation = api.dashboard.editUser.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteUserMutation = api.dashboard.deleteUser.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [open, setOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailVerifiedRef = useRef<HTMLInputElement>(null);
  const preferredEmailRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [note, setNote] = useState(row?.original.note ?? "");
  const [flags, setFlags] = useState<string[]>(row?.original.flags ?? []);
  const [events, setEvents] = useState<string[]>(row?.original.events.map((e) => e.name) ?? []);
  const [sessions, setSessions] = useState<string[]>(row?.original.sessions.map((s) => s.sessionToken) ?? []);
  const [accounts, setAccounts] = useState<string[]>(
    row?.original.accounts.map((account) => `${account.provider}:${account.providerAccountId}`) ?? [],
  );
  const [isEmailVerified, setIsEmailVerified] = useState(!!row?.original.emailVerified);

  const [status, setStatus] = useState<React.ReactNode>();
  const reactId = useId();

  const getEventsQuery = api.dashboard.getEvents.useQuery();

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
    setNote(row?.original.note ?? "");
    setStatus(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flags.includes("admin")) {
        return setStatus(<span className="text-blue-400">Admin</span>);
      }

      if (flags.includes("suspended")) {
        return setStatus(<span className="text-red-400">Suspended</span>);
      }

      setStatus(<span>Standard user</span>);
    }, 1000);

    return () => clearInterval(interval);
  }, [flags]);

  function processSheetClose(e?: Event) {
    if (e) e.preventDefault();

    if (deleteDialogOpen) return;

    if (
      row &&
      nameRef.current?.value === row.original.name &&
      emailRef.current?.value === row.original.email &&
      isEmailVerified === !!row.original.emailVerified &&
      (!isEmailVerified ||
        Math.abs(
          new Date(emailVerifiedRef.current?.value ?? 0).getTime() - (row.original.emailVerified?.getTime() ?? NaN),
        ) <= 2000) &&
      (imageRef.current?.value || null) === row!.original.image &&
      (preferredEmailRef.current?.value || null) === row!.original.preferredEmail &&
      flags.join(",") === row.original.flags.join(",") &&
      note === row.original.note &&
      events.join(",") === row.original.events.map((e) => e.name).join(",") &&
      sessions.join(",") === row.original.sessions.map((s) => s.sessionToken).join(",") &&
      accounts.join(",") ===
        row.original.accounts.map((account) => `${account.provider}:${account.providerAccountId}`).join(",")
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
          nameRef.current?.value === row.original.name &&
          emailRef.current?.value === row.original.email &&
          (isEmailVerified === !!row.original.emailVerified ||
            Math.abs(
              new Date(emailVerifiedRef.current?.value ?? 0).getTime() - (row.original.emailVerified?.getTime() ?? NaN),
            ) <= 2000) &&
          imageRef.current?.value === row.original.image &&
          preferredEmailRef.current?.value === row.original.preferredEmail &&
          flags.join(",") === row.original.flags.join(",") &&
          note === row.original.note &&
          events.join(",") === row.original.events.map((e) => e.name).join(",") &&
          sessions.join(",") === row.original.sessions.map((s) => s.sessionToken).join(",") &&
          accounts.join(",") ===
            row.original.accounts.map((account) => `${account.provider}:${account.providerAccountId}`).join(","))
      ) {
        return;
      }

      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => window.removeEventListener("beforeunload", beforeUnloadHandler);
  }, [note, row, open, isEmailVerified, flags, events, sessions, accounts]);

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
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete <strong>{row?.original.name}</strong> (
              <code>{row?.original.id}</code>)?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async () => {
                if (!row) return toast.error("No user to delete");

                await deleteUserMutation.mutateAsync({ id: row.original.id });

                if (!editUserMutation.isError) {
                  toast.success("User deleted successfully.", { position: "top-center" });
                  setDeleteDialogOpen(false);
                  setOpen(false);
                  location.reload();
                }
              }}
            >
              Delete user
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
                <span>Create user</span>
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
              <SheetTitle className="text-gray-200">{textButton ? "Create" : "Edit"} user</SheetTitle>
              <SheetDescription>Changes will be lost if you close the drawer or refresh the page.</SheetDescription>
            </SheetHeader>
            <form
              id={`${row?.original.id ?? reactId}-edit-form`}
              onSubmit={async (e) => {
                e.preventDefault();

                // if (!challengeId) return toast.error("Please select a challenge.");

                editUserMutation.reset();

                await editUserMutation.mutateAsync({
                  id: row?.original.id,
                  name: nameRef.current!.value,
                  emailVerified: isEmailVerified ? new Date(emailVerifiedRef.current!.value) : undefined,
                  image: imageRef.current?.value || undefined,
                  preferredEmail: preferredEmailRef.current?.value || undefined,
                  email: emailRef.current!.value,
                  flags,
                  note: note || "",
                  events,
                  sessions,
                  accounts: accounts.map((a) => {
                    const [provider, providerAccountId] = a.split(":");

                    if (!provider || !providerAccountId) {
                      throw new Error("Invalid account format; missing provider or providerAccountId");
                    }

                    return { provider, providerAccountId };
                  }),
                });

                toast.success("User updated successfully.", { position: "top-center" });
                setOpen(false);
                setTimeout(() => {
                  location.href = "/dashboard/users";
                }, 100);
              }}
            >
              <div className="my-8 pl-6">
                <div className="flex flex-col gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="id">User ID</Label>
                    <Input
                      id="id"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.id ?? "Generated after creation"}
                      disabled
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="name">Username</Label>
                    <Input
                      id="name"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.name ?? ""}
                      ref={nameRef}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.email}
                      ref={emailRef}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="preferredEmail">Preferred email</Label>
                    <Input
                      id="preferredEmail"
                      type="email"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.preferredEmail ?? ""}
                      ref={preferredEmailRef}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="image">Profile picture URL</Label>
                    <Input
                      id="image"
                      type="url"
                      className="border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                      defaultValue={row?.original.image ?? ""}
                      ref={imageRef}
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="flags">Flags</Label>
                    <MultiSelect
                      id="flags"
                      options={[
                        { value: "ms_hs_college_eligible", label: "ms_hs_college_eligible" },
                        { value: "hs_eligible", label: "hs_eligible" },
                        { value: "admin", label: "admin" },
                        { value: "suspended", label: "suspended" },
                      ]}
                      onValueChange={setFlags}
                      defaultValue={flags}
                      placeholder="Select flags..."
                      className="w-full max-w-sm"
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="events">Events</Label>
                    <MultiSelect
                      id="events"
                      options={
                        getEventsQuery.data
                          ?.map((e) => e.name)
                          ?.map((event) => ({
                            value: event,
                            label: event,
                          })) ?? []
                      }
                      onValueChange={setEvents}
                      defaultValue={events}
                      placeholder="Select events..."
                      className="w-full max-w-sm"
                    />
                    <span className="text-xs text-gray-400">
                      This may <strong>permanently delete</strong> all of the user&apos;s submissions if an event is
                      removed.
                    </span>
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="accounts">Accounts</Label>
                    <MultiSelect
                      id="accounts"
                      options={
                        row?.original.accounts.map((account) => ({
                          value: `${account.provider}:${account.providerAccountId}`,
                          label: `${account.provider} (${account.providerAccountId})`,
                        })) ?? []
                      }
                      onValueChange={setAccounts}
                      defaultValue={accounts}
                      placeholder="Select accounts..."
                      className="w-full max-w-sm"
                    />
                    <span className="text-xs text-gray-400">
                      Deselecting an account will only dissociate it from the user. Accounts cannot be re-added from the
                      dashboard. See table view for account details.
                    </span>
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="sessions">Sessions</Label>
                    <MultiSelect
                      id="sessions"
                      options={
                        row?.original.sessions.map((session) => ({
                          value: session.sessionToken,
                          label: session.sessionToken,
                        })) ?? []
                      }
                      onValueChange={setSessions}
                      defaultValue={sessions}
                      placeholder="Select sessions..."
                      className="w-full max-w-sm"
                    />
                    <span className="text-xs text-gray-400">
                      Deselecting a session will essentially invalidate the session and log the user out. Sessions
                      cannot be re-added from the dashboard. See table view for session creation/expiration dates.
                    </span>
                  </div>

                  <div className="grid w-full max-w-xl items-center gap-1.5">
                    <Label htmlFor="note">Note (only visible to admins)</Label>
                    <Tabs defaultValue="edit">
                      <TabsList className="mb-1 bg-gray-800">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit">
                        <Textarea
                          id="note"
                          className="h-48 border-gray-900! bg-gray-200 text-gray-900 ring-gray-200! ring-offset-gray-900"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        {note ? <Prose>{note}</Prose> : <em className="text-gray-400">No note provided.</em>}
                      </TabsContent>
                    </Tabs>
                    <span className="text-xs text-gray-400">
                      Markdown is supported here, but it likely will not be shown anywhere else.
                    </span>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="emailVerified">Email verified at</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isEmailVerified"
                        checked={isEmailVerified}
                        onCheckedChange={(state) => setIsEmailVerified(state === true)}
                      />
                      <label
                        htmlFor="isEmailVerified"
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Set email as verified
                      </label>
                    </div>
                    <Input
                      id="emailVerified"
                      type="datetime-local"
                      className="border-gray-900! bg-gray-200 text-gray-900 scheme-light ring-gray-200! ring-offset-gray-900"
                      defaultValue={
                        row?.original.emailVerified ? getDateTimeLocalValue(row.original.emailVerified) : ""
                      }
                      ref={emailVerifiedRef}
                      disabled={!isEmailVerified}
                      required
                    />
                    <span className="text-xs text-gray-400">
                      A date is required if (and only if) the email is set as verified.
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
                        Delete user
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </ScrollArea>
          <SheetFooter className="border-t border-gray-700 pt-6">
            <div className="mt-2 flex w-full items-center px-4 text-sm sm:mt-0 sm:px-6">
              <p>Status after saving: {status}</p>
            </div>
            <div className="flex gap-4 px-4">
              <Button variant="default" type="submit" form={`${row?.original.id ?? reactId}-edit-form`}>
                {textButton ? "Create user" : "Save changes"}
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
