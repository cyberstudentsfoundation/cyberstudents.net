import Image from "next/image";
import { HiExternalLink } from "react-icons/hi";
import { site } from "~/data/site";
import { authorAvatars, challengeAuthors, founders, pastStaff, staff } from "~/data/team";
import { cn } from "~/lib/utils";
import teamAtSf from "~/../public/community/team-at-sf.webp";
import { Heading, TextLink, Wide } from "./ui";

export function FounderCards({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-5 md:grid-cols-2", className)}>
      {founders.map((f, i) => (
        <li
          key={f.handle}
          className={cn(
            "flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6",
            i === 0 ? "md:-rotate-1" : "md:rotate-1",
            "transition-transform duration-300 hover:rotate-0",
          )}
        >
          <Image
            src={f.pfp}
            alt=""
            placeholder="blur"
            sizes="96px"
            className="size-20 shrink-0 rounded-2xl border border-white/10 sm:size-24"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-cyan-300">{f.role}</p>
            <p className="mt-0.5 text-2xl font-bold text-white">{f.name}</p>
            <p className="text-gray-400">{f.handle}</p>
            {f.href && (
              <a
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-gray-300 underline decoration-gray-600 underline-offset-4 hover:text-white"
              >
                {f.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                <HiExternalLink className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function StaffWall({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {staff.map((s) => (
        <li
          key={s.handle}
          className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-4 pl-1.5"
        >
          <Image src={s.pfp} alt="" placeholder="blur" sizes="40px" className="size-10 rounded-full" />
          <span className="leading-tight">
            <span className="block font-semibold text-gray-100">{s.handle}</span>
            <span className="block text-xs text-gray-400">{s.role}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function AuthorGroups({ className }: { className?: string }) {
  return (
    <dl className={cn("grid gap-6 md:grid-cols-3", className)}>
      {challengeAuthors.map((group) => (
        <div key={group.event}>
          <dt className="font-semibold text-white">{group.event}</dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            {group.handles.map((h) => {
              return (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] py-1 pr-3 pl-1 text-sm text-gray-200"
                >
                  <Avatar handle={h} />
                  {h}
                </span>
              );
            })}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Avatar({ handle }: { handle: string }) {
  const pfp = authorAvatars[handle];
  return pfp ? (
    <Image src={pfp} alt="" sizes="24px" className="size-6 rounded-full" />
  ) : (
    <span
      aria-hidden="true"
      className="flex size-6 items-center justify-center rounded-full bg-gray-700 text-xs font-semibold text-gray-300 uppercase"
    >
      {handle[0]}
    </span>
  );
}

/** Everyone who has stepped down from the team, grouped by the role they held. */
export function PastStaff({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="max-w-3xl leading-7 text-gray-400">
        We wouldn&rsquo;t be here without the people who helped run the server before us, from the CyberStart days
        onward. Thank you all so much!
      </p>
      <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
        {pastStaff.map((g) => (
          <div key={g.role} className={cn(g.handles.length > 4 && "sm:col-span-2 xl:col-span-3")}>
            <dt className="text-sm font-semibold text-cyan-300/80">{g.role}</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {g.handles.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] py-1 pr-3 pl-1 text-sm text-gray-300"
                >
                  <Avatar handle={h} />
                  {h}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Members of the team together in San Francisco, shown without a caption. */
export function TeamPhoto({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "max-w-lg -rotate-1 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 transition-transform duration-500 motion-safe:hover:rotate-0",
        className,
      )}
    >
      <Image
        src={teamAtSf}
        alt="Members of the CyberStudents team together in San Francisco"
        sizes="(min-width: 1024px) 32rem, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-28 bg-[#111b29] text-gray-200">
      <Wide className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Heading id="team-title" className="text-white">
              Run by students
            </Heading>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              CyberStudents is run by its two co-founders, alongside a team of volunteer staff and the challenge authors
              who write for each of our competitions. We&rsquo;re all students and volunteers who enjoy this stuff and
              want to help other people get into it, too.
            </p>
            <p className="mt-4 text-lg text-gray-300">
              Want to write a challenge, give a talk, or sponsor Advent of CTF? We&rsquo;d love to hear from you at{" "}
              <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink> or{" "}
              <TextLink href={site.phone.href}>{site.phone.vanity}</TextLink>.
            </p>
          </div>
          <TeamPhoto className="w-full lg:ml-auto lg:max-w-xl lg:rotate-1" />
        </div>
        <FounderCards className="mt-12" />

        <h3 className="mt-16 text-xl font-bold text-white">Staff</h3>
        <StaffWall className="mt-4" />

        <h3 className="mt-14 text-xl font-bold text-white">Challenge authors</h3>
        <AuthorGroups className="mt-5" />

        <h3 className="mt-14 text-xl font-bold text-white">Retired staff</h3>
        <PastStaff className="mt-3" />

        <p className="mt-12">
          <TextLink href="/about">More about us</TextLink>
        </p>
      </Wide>
    </section>
  );
}
