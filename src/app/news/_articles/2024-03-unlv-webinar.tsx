import talkVirtualMachines from "~/../public/community/talk-virtual-machines.webp";
import { site } from "~/data/site";
import { A, BOILERPLATE_2024, Dateline, Facts, Figure, H2, P } from "../_components";
import { EventTicket } from "../_visuals";
import type { Article } from "./types";

// Sources: the server announcement of March 26, 2024 (webinar by UNLV students from Cyber Clinic and Layer Zero; the
// server card pasted with it shows the member count on the day of the export, not of the post, so no count is given
// here), Vipin's reply that day referring to his own webinar, and the recording of
// that webinar, dated March 24, 2024 by its file name. The start time is left out because the export shows it in the
// reader's time zone.

const ticket = {
  kind: "Webinar",
  date: "2024-03-26",
  title: "Cyber Clinic and Layer Zero",
  host: "Cybersecurity students from the University of Nevada, Las Vegas",
  place: "Conference Room",
};

export const unlvWebinar: Article = {
  slug: "unlv-webinar",
  date: "2024-03-26",
  kind: "Press release",
  title: "Cybersecurity Students From UNLV to Host a Webinar for CyberStudents Tonight",
  dek: "Members of the University of Nevada, Las Vegas's Cyber Clinic and Layer Zero will share what their groups do and give an overview of the field, live in our Conference Room.",
  author: "CyberStudents",
  minutes: 2,
  visual: () => <EventTicket {...ticket} className="h-full" />,
  about: BOILERPLATE_2024,
  Body: () => (
    <>
      <P>
        <Dateline date="2024-03-26" />
        CyberStudents will host a live webinar this evening with cybersecurity students from the University of Nevada,
        Las Vegas. Members of two UNLV student organizations, Cyber Clinic and Layer Zero, will talk about what each
        group does and what it&rsquo;s working toward, and they&rsquo;ll give an overview of cybersecurity for anyone
        thinking about studying it.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <EventTicket {...ticket} />
        </div>
      </figure>
      <P className="mt-10">
        For the high school students in our community, it&rsquo;s a chance to hear what studying security in college
        actually looks like from the students doing it, and for college members, it&rsquo;s a look at how students
        on another campus get involved in security. Everyone is welcome to bring questions.
      </P>

      <H2>Our second webinar this week</H2>
      <P>
        Tonight&rsquo;s session follows Sunday&rsquo;s webinar from Vipin, one of our moderators, who introduced
        virtual machines, Kali Linux, and other essential tools for getting started. Webinars like
        these are what the Conference Room was built for, and we&rsquo;re excited to keep hosting more of them.
      </P>
      <Figure
        src={talkVirtualMachines}
        alt="Title slide reading Mastering Cybersecurity: An Introduction to Virtual Machines, Kali Linux, and Essential Tools, hosted by Vipin B"
        caption="The title slide from Sunday's webinar on virtual machines and Kali Linux."
      />
      <Facts
        items={[
          { label: "When", value: "Tonight, Tuesday, March 26, 2024" },
          { label: "Where", value: "The Conference Room in our Discord server" },
          { label: "Speakers", value: "Students from UNLV's Cyber Clinic and Layer Zero" },
          { label: "Cost", value: "Free, and open to every member" },
        ]}
      />

      <H2>How to join</H2>
      <P>
        The webinar is listed as an event in our server, so members can mark themselves as interested and get a
        reminder when it starts. Not a member yet? <A href={site.discord}>Join us on Discord</A> and we&rsquo;ll see you
        in the Conference Room!
      </P>
    </>
  ),
};
