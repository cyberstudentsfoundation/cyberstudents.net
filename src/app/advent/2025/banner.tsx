import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { cn } from "~/lib/utils";

export default function Banner({ className, rootClassName }: { className?: string; rootClassName?: string }) {
  return (
    <div className={cn("flex justify-center pt-6", rootClassName)}>
      <Alert
        className={cn(
          "mx-8 w-full max-w-(--breakpoint-2xl) border-gray-700! bg-gray-900/50! dark:bg-gray-900",
          className,
        )}
      >
        <HiOutlineMegaphone className="h-5 w-5 stroke-2" />
        <AlertTitle>Advent of CTF 2025 has ended; thank you for playing!</AlertTitle>
        <AlertDescription className="mt-2 text-gray-300">
          Winners and prizes will be announced soon pending verification. Write-up submissions will open shortly here
          and in our{" "}
          <a
            className="underline decoration-gray-500 underline-offset-3 transition-all hover:decoration-gray-400"
            href="https://discord.com/invite/cyberstudents-916144903686336513"
            target="_blank"
          >
            Discord server
          </a>
          .
        </AlertDescription>
      </Alert>
    </div>
  );
}
