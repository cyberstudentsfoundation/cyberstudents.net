import serverInside from "~/../public/server/server-inside.webp";
import serverMemory from "~/../public/server/server-memory.webp";
import { Facts, Figure, H2, P, Quote } from "../_components";
import { ArchitectureDiagram } from "../_visuals";
import type { Article } from "./types";

// Dates and parts come from our purchase records: a memory stick for the server on 2024-11-30, and two 16 GB RAM
// modules "for server upgrades" on 2025-04-12. The setup, including the move to Proxmox, is described in general terms
// on purpose, so keep it that way (no CPU model, no totals). The two photos show the new memory before it went in, and
// the inside of the server.

export const serverUpgrade: Article = {
  slug: "upgrading-our-server",
  date: "2025-04-12",
  kind: "Behind the scenes",
  title: "Upgrading the Server That Runs Our Challenges",
  dek: "This spring, our server got more memory and a fresh Proxmox setup that keeps every challenge well away from the rest of the platform.",
  author: "Edward Z.",
  minutes: 4,
  image: {
    src: serverInside,
    alt: "Inside our server: the CPU heatsink with an airflow arrow, next to rows of memory modules",
    position: "center 40%",
  },
  Body: () => (
    <>
      <P>
        When we launched cyberstudents.net and the Advent of CTF platform last December, everything ran on a single
        server that we look after ourselves. It carried us through 25 days of challenges and 780 players, but it was
        starting to feel a little cramped, so this week we gave it a proper upgrade.
      </P>

      <H2>Why we host it ourselves</H2>
      <P>
        Running our own hardware keeps costs low for a community that&rsquo;s free to join, and it gives us complete
        control over how challenges are deployed. Players reach the site through a Cloudflare Tunnel, which means the
        server never has to open a port to the internet, while Cloudflare sits in front of everything and deals with
        unwanted traffic before it ever reaches us.
      </P>

      <H2>More memory</H2>
      <P>
        Right before Advent of CTF 2024 began, we added a memory stick to keep up with the extra load. This time, we
        installed two 16 GB RAM modules, which gives us plenty of headroom to run more challenge instances side by side
        and lets the website and its database breathe during the busiest hours, like the minutes right after a new
        challenge drops.
      </P>
      <Figure
        src={serverMemory}
        alt="Two 16 GB DDR4 ECC memory modules resting on the server's chassis before installation"
        caption="The new memory, ready to go into the server."
        wide
      />

      <H2>Moving to Proxmox</H2>
      <P>
        The bigger change is under the hood. We rebuilt the server around Proxmox VE, an open-source virtualization
        platform, so each part of CyberStudents now lives in its own virtual machine or container. The website and its
        database have a space of their own, the challenge infrastructure has another, and our other community services
        sit separately again.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <ArchitectureDiagram />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">
          How a visit reaches our server: through Cloudflare and a Cloudflare Tunnel, into a Proxmox host where each
          service has its own space.
        </figcaption>
      </figure>
      <P>
        Splitting things up this way has some really nice benefits. A challenge that&rsquo;s meant to be hacked
        can&rsquo;t reach anything it shouldn&rsquo;t, we can snapshot a machine and roll it back if a change goes wrong,
        and we can update one service without taking down the others.
      </P>
      <Quote by="Edward Z., co-founder of CyberStudents">
        Every challenge we host is designed to be broken into, so keeping them well away from the database and the
        website was at the very top of our list.
      </Quote>
      <Facts
        title="What changed"
        items={[
          { label: "Memory", value: "Two new 16 GB RAM modules" },
          { label: "Virtualization", value: "Proxmox VE" },
          { label: "Way in", value: "Cloudflare and a Cloudflare Tunnel" },
          { label: "Isolation", value: "Separate VMs and containers per service" },
        ]}
      />

      <H2>What&rsquo;s next</H2>
      <P>
        With the upgrade done, we&rsquo;re in a much better spot for whatever comes next, including a second Advent of
        CTF this December. If you&rsquo;re curious about the platform itself, all of its code is open source, and
        we&rsquo;re always happy to chat about how it works in our Discord server.
      </P>
    </>
  ),
};
