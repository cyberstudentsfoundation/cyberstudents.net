import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import AnchoredHeading from "~/components/AnchoredHeading";
import TableOfContents from "./table-of-contents";

import countriesPieChart from "~/../public/advent-of-ctf-2024/countries-pie-chart.svg";
import countriesGeoChart from "~/../public/advent-of-ctf-2024/countries-geo-chart.png";
import schoolingStatusPieChart from "~/../public/advent-of-ctf-2024/schooling-status-pie-chart.svg";
import challengeCategoriesPieChart from "~/../public/advent-of-ctf-2024/challenge-categories-pie-chart.svg";

export const metadata: Metadata = {
  title: "CyberStudents’ Advent of CTF 2024 results and statistics",
  description:
    "Advent of CTF 2024 was a month-long cybersecurity capture the flag (CTF) competition from December 1st to December 31st, 2024 premiered last year by CyberStudents, an online organization and community focused on cybersecurity education. It featured beginner-oriented challenges from six popular categories with challenges releasing daily during the advent season. The event was open to everybody and we encouraged high school and college students from around the world to participate.",
  authors: [{ name: "CyberStudents" }],
};

/*
Published		
Profile Picture for thee2d
thee2d
Logical Exclusivity	Cryptography	12/01/24 3:00 pm	30	
rotten bxgxnnxngs ``` 64 6e 63 74 7f 4c 7a 37 7b 3c 50 37 3c 36 3e 59 79 3e 59 36 3a 50 37 3a 37 43 3b 37 72 ```
0 files	2 hints	csd{hUm8l3_8391Nn1N95_858D48}	Case-sensitive	0 regex global flags	12/01/24 1:45 pm	11/30/24 7:00 pm	Yes	aoc2024	cm45ybtcg0000hs4jyfopyffr

Published		
Profile Picture for qvipin
qvipin
screaming	Reverse engineering	12/02/24 3:00 pm	40	
AAAAA- I'm not screaming, I'm just buffer overflowing my emotions!
1 files	2 hints	csd{d4y_2_H0w_r_u?}	Case-sensitive	0 regex global flags	12/02/24 12:07 am	12/01/24 7:00 pm	Yes	aoc2024	cm46kj93q0000haaztamwmxfu

Published		
Profile Picture for qvipin
qvipin
ElfTV	Reverse engineering	12/03/24 3:00 pm	55	
Santa’s ElfTV license key checker got leaked! Finally, a break for a broke elf like you, starving for that sweet, sweet elf dopamine. The catch? You’ve got to reverse-engineer Santa’s “state-of-the-art” security to unlock it. Think you’re smarter than the guy who still uses reindeer for transportation? Prove it and claim your ElfTV fix!!!! Connect using `nc ctf.csd.lol 1001`
1 files	2 hints	csd{Ru57y_L1c3N53_k3Y_CH3Ck3r}	Case-sensitive	0 regex global flags	12/03/24 1:10 pm	12/02/24 7:00 pm	Yes	aoc2024	cm48ry3gy0000uiuwr4ez9mme

Published		
Profile Picture for qvipin
qvipin
long gone	Forensics	12/04/24 3:00 pm	75	
Agent Elf, Agent Elf, wake up! Elf Tim's computer has been compromised by malware from a rogue elf. This malicious elf has been secretly deleting critical files without anyone noticing—and it’s evident because Elf Tim's game in progress is missing. Can you recover the deleted files? Some of them are password-protected—can you retrieve those too?
1 files	2 hints	csd{5An7a5_N3W_Gam3_5uCk2}	Case-sensitive	0 regex global flags	12/04/24 9:51 am	12/03/24 7:00 pm	Yes	aoc2024	cm4a09v3f0000wu5fkrcs3fzc

Published		
Profile Picture for ladderlogic
ladderlogic
Rusty Lock	Reverse engineering	12/05/24 3:00 pm	110	
This is a classic crackme. Figure out all the checks on the license key to create your own. When a successful key is detected it contacts a web url to grab your flag. If there are any web server errors DM ladderlogix on Discord.
3 files	2 hints	csd{V41id_L1ceNs3_K3y}	Case-sensitive	0 regex global flags	12/02/24 11:56 pm	12/02/24 7:00 pm	Yes	aoc2024	cm47zl89k0000cqvdi68p2wbu

Published		
Profile Picture for qvipin
qvipin
Epochrypt	Cryptography	12/06/24 3:00 pm	70	
It's time to test out Tibel Elf's new encryption method. He says once you encrypt it, you can't unencrypt it. Sureeee... Connect with `nc ctf.csd.lol 3551`.
1 files	2 hints	csd{d3F0_M4d3_8y_4N_3lf}	Case-sensitive	0 regex global flags	12/06/24 3:53 pm	12/06/24 3:53 pm	Yes	aoc2024	cm4d83dgi0020ccqj7537e0cn

Published		
Profile Picture for thee2d
thee2d
Apple Fanatic	Web exploitation	12/07/24 3:00 pm	60	
Welcome to the bunker, agent. We’ve evaluated your performance in solving (and guessing) our formative challenges and are excited to offer you a trial position at Elves Intelligence. It appears that a _secret society_ has become interested in our immense data on the world’s children—including names, birthdates, likes, dislikes, and social security numbers. (Don’t ask me why we store their social security numbers in plain text.) Here at Elves Intelligence, we stop our threats at the source. The best defense is a good offense. (Usually?) A member of the secret society dropped a note in Santa’s presents sack overnight. Somehow, they got past our sleeping elf watching the security cameras. Thankfully, the person didn’t seem to know [OPSEC](https://en.wikipedia.org/wiki/Operations_security) and included their personal website on the note. The note read: > We will be watching you. > \- The Secret Society of K.U.N.A.L > [https://apple-fanatic.csd.lol/](https://apple-fanatic.csd.lol/) The only thing they’ve taken with them is an apple from the sack of presents. Weird. Our top SOC elves gathered two pieces of information from their initial observation of the site: 1. This person seems to like apples. Like, a lot. 2. The person claims a flag is intricately hidden on the site under a name that no one will be able to guess. Good luck, agent. Santa is watching. --- _**You are only allowed to test in the scope `https://apple-fanatic.csd.lol/*`.** Blind brute-force request sending (e.g. using tools like DirBuster) can trigger Cloudflare rate limits. Do not attempt to bypass Cloudflare limits. Therefore, if you wish to brute-force, please limit your wordlists or attack scope._
0 files	2 hints	csd{5H3_w45_80RN_0N_7H3_d4y_0f_Chr157M4Z}	Case-sensitive	0 regex global flags	12/07/24 2:12 am	12/07/24 2:12 am	Yes	aoc2024	cm4du7fif0001unzbz7n9lpd1

Published		
Profile Picture for qvipin
qvipin
vuln research	OSINT	12/08/24 3:00 pm	45	
Santa needs your help to investigate the **Downdate** vulnerability! He has a few urgent questions about it that he needs answered ASAP. Can you provide the answers to help keep the North Pole safe from these threats? 1. What is the surname of the researcher who discovered the Downdate vulnerability. 2. Which technology company is responsible for addressing the Downdate vulnerability? 3. What is the CVE identifier associated with the Windows Downdate vulnerability? 4. Which registry key is manipulated to disable Virtualization-Based Security (VBS) in the Windows Downdate exploit? 5. What is the name of the XML file that the Windows Downdate exploit manipulates to control the update process? 6. Which Windows kernel module is downgraded in the Windows Downdate proof-of-concept to exploit the "ItsNotASecurityBoundary" vulnerability? Answer the questions with a single word @ `nc ctf.csd.lol 5000`
0 files	2 hints	csd{d0wNda73_15_W31RD}	Case-sensitive	0 regex global flags	12/08/24 3:10 pm	12/08/24 3:10 pm	Yes	aoc2024	cm4g1ft7s001hpb96znwnabu5

Published		
Profile Picture for qvipin
qvipin
resa?	Cryptography	12/09/24 3:00 pm	80	
**Elf Theodred:** Hey, I’m testing out a new... *<yap yap yap>* **You:** What? You lost me at "Hey, I’m testing." **Elf Theodred:** What I *said* was, I encrypted... *<yap yap yap>* and missing `q`. **You:** Resa? Vesa? Are we talking about monitors or cybersecurity? And what’s this about a missing `e` and `q`? Is that supposed to be a type of screw? Huh? **Elf Theodred:** I’m not repeating myself to an intern. Figure it out, bud. And if you heard a word I said, it's under 50.
1 files	2 hints	csd{V3sA_R3sa_RSa?_1D3k}	Case-sensitive	0 regex global flags	12/09/24 2:33 pm	12/09/24 2:33 pm	Yes	aoc2024	cm4hfkbb1001xxpv4xo6tuwpd

Published		
Profile Picture for kolmus
kolmus
flag from wish	Binary exploitation	12/10/24 3:00 pm	90	
What is on your wish list this year? Be sure to tell Santa in great detail. He might have an early present or two in store for you! `nc ctf.csd.lol 4003`
1 files	2 hints	csd{Br0uGH7_t0_YOU_8y_W15H_D0t_CoM}	Case-sensitive	0 regex global flags	12/10/24 10:20 am	12/10/24 10:20 am	Yes	aoc2024	cm4ilyveu0062xpv4x8wd1537

Published		
Profile Picture for thee2d
thee2d
Festive Encoding	Cryptography	12/11/24 3:00 pm	55	
"Agent! There you are. I got to take today off, sorry," said your elf mentor, "it's fine if I leave you at the office, right? It's a slow day anyways..." Your curiosity, of course, led you to Santa's office. You step into his glacial abode where he is sleeping gracefully. *Actually, he snores pretty loudly.* Maybe, you'll find some of his secrets about children. *Should I peak into the unlocked file cabinet?* Your intrusive thoughts won, of course. You take out a document, only to find it scattered with emojis. Perhaps, Santa wants to better relate to the children of Generation Alpha? *He should've used words like rizz, Diddy, and fein instead.* "That's Festive Encoding, agent," muttered Santa behind you. --- Try decoding the excerpt under "2024 Encoded" in the file to reveal the flag. Once you do, probably use it for blackmail before you get fired.
1 files	2 hints	csd{bag_big_jaw_box_web_vow_wax_baggy_wavy_woven_glow}	Not case-sensitive	0 regex global flags	12/09/24 11:30 pm	12/09/24 11:30 pm	Yes	aoc2024	cm4hyrcj7003pxpv4zoaxy8ow

Published		
Profile Picture for ladderlogic
ladderlogic
Letter To Santa	Forensics	12/12/24 3:00 pm	85	
A child sent Santa a letter but he forgot to include the password can you figure it out. **YOU DO NOT NEED TO BRUTE FORCE**
1 files	2 hints	2 global flags	Case-sensitive	0 regex global flags	12/12/24 1:10 pm	12/12/24 1:10 pm	Yes	aoc2024	cm4lmwpxs006d7jlcv1ctv81k

Published		
Profile Picture for thee2d
thee2d
Disoriented Santa	OSINT	12/13/24 3:00 pm	100	
Sorry that we woke you up at this hour, but Santa is missing. We suspect the K.U.N.A.L Secret Society kidnapped Santa when he was flying over Europe while scoping out for some children. Thankfully, Santa was equipped with a state-of-the-art GPS tracker circa 2008. Anyways, it gave us these clues: - Santa is trapped in a **history museum**. - The museum charges **3 EUR** for entry. - There is a **library** within **1 km** of the museum. Can you find the coordinates of the museum? The flag is in the format `csd{latitude,longitude}`, where each number is **rounded** (not truncated) to 3 decimal places. Numbers within an error of ±0.001 are accepted. For example, a flag could be `csd{11.533,-125.396}`.
0 files	2 hints	0 global flags	Case-sensitive	csd{48\.20[456], ?7\.36[456]}	12/13/24 2:58 pm	12/13/24 2:58 pm	Yes	aoc2024	cm4n68hai00987jlct9gnw0n5

Published		
Profile Picture for qvipin
qvipin
angry elf	Reverse engineering	12/14/24 3:00 pm	50	
Elf Glaki went rouge! At 2:56 PM EST, he locked up all our flags! Luckily you're not an idiot and you can fix this in 3 minutes. Stop this Angry Elf ASAP! `nc ctf.csd.lol 1147` (uhh kinda broken but works, will fix soon)
1 files	2 hints	csd{4N9ry_3lf5_5h0uLdNT_83_M3553D_w1tH}	Case-sensitive	0 regex global flags	12/14/24 3:15 pm	12/14/24 3:15 pm	Yes	aoc2024	cm4om9g8q00ed7jlcxsk0t7ib

Published		
Profile Picture for thee2d
thee2d
JETS	Web exploitation	12/15/24 3:00 pm	70	
It seems like the Secret Society of K.U.N.A.L has invested in another business…Oh no. If those planes come anywhere close to Santa—after his “adventure” in France—he’ll be scathed for good. Those reindeer don’t like inhaling kerosene! Agent, we need you to infiltrate their system and gather some information for our engineers at Elves Intelligence. We believe the plane they’re using is a bit special…it may have been custom-built for K.U.N.A.L himself! Here’s their website, agent: [https://jets.csd.lol/](https://jets.csd.lol/). Best of luck. --- _**You are only allowed to test in the scope `https://jets.csd.lol/*`.** Blind brute-force request sending (e.g. using tools like DirBuster) can trigger Cloudflare rate limits. Do not attempt to bypass Cloudflare limits. Therefore, if you wish to brute-force, please limit your wordlists or attack scope._
0 files	2 hints	2 global flags	Not case-sensitive	0 regex global flags	12/14/24 8:42 pm	12/14/24 8:42 pm	Yes	aoc2024	cm4oxxnyj00ip7jlc55m49fb9

Published		
Profile Picture for qvipin
qvipin
Jingle Bell ROP	Binary exploitation	12/16/24 3:00 pm	105	
Angry Elf Glaki is at it again! He’s been hiding our toy designs deep in his server. We know there’s a single service running and we managed to find the binary it’s running —can you pwn it and recover those locked-up designs? `nc ctf.csd.lol 2020`
2 files	2 hints	csd{J1Ngl3_b3ll_r0CK_15_b357_XM45_50NG}	Case-sensitive	0 regex global flags	12/16/24 12:22 pm	12/16/24 12:22 pm	Yes	aoc2024	cm4rayiin01417jlcn8gypnm3

Published		
Profile Picture for ladderlogic
ladderlogic
Santa's Plane	OSINT	12/17/24 3:00 pm	80	
Santa cargo plane is running into issues can mechanical problems. Can you figure out his plane model. Please include the variant in the answer. Ex. csd{a10}
2 files	2 hints	0 global flags	Not case-sensitive	^(?:csd\{\s*[Cc]\s*-?\s*130\s*[Jj]\s*\}|[Cc]\s*-?\s*130\s*[Jj])$	12/17/24 2:38 pm	12/17/24 2:38 pm	Yes	aoc2024	cm4sv9un901fj7jlc5e57q0kv

Published		
Profile Picture for kolmus
kolmus
trng	Reverse engineering	12/18/24 3:00 pm	120	
True random numbers can’t hurt you … they’re not real. (Or are they?) It looks like somebody is trying to hide your presents? Can you go trace them back and figure out their secrets? Connect using `nc ctf.csd.lol 5040`.
2 files	2 hints	csd{M47H_15nT_7H4t_5cARY_N0w_15_I7?}	Case-sensitive	0 regex global flags	12/18/24 6:11 pm	12/18/24 6:11 pm	Yes	aoc2024	cm4uiaz36025n7jlcgfrdoyta

Published		
Profile Picture for qvipin
qvipin
interns	Cryptography	12/19/24 3:00 pm	150	
Interns often struggle with creating things, but Elf Bharmeesh insists you give it a shot. You refused initially, but he went behind your back and encrypted your password, wrapping it in csd{}. Now, you’ve forgotten the password. It’s time to crack it!
3 files	2 hints	csd{dH4R_dh4r_4Nt1_P1R4cY_5CR33n}	Case-sensitive	0 regex global flags	12/19/24 4:38 pm	12/19/24 4:38 pm	Yes	aoc2024	cm4vuf9lj00e269h2mi2mz7h2

Published		
Profile Picture for ladderlogic
ladderlogic
Lost Santa	OSINT	12/20/24 3:00 pm	80	
Santa got lost on his way to the largest hacking conference. He was out cycling and got lost and all we have is this picture of him can you help us find him? Round to 3 decimal places in cords. IE csd{10.111,-23,400} DO NOT TRUNCATE, leave all zeros and negative
1 files	2 hints	2 global flags	Not case-sensitive	0 regex global flags	12/20/24 2:46 pm	12/20/24 2:46 pm	Yes	aoc2024	cm4x5vnha00ot69h26gvbmbq3

Published		
Profile Picture for kolmus
kolmus
hpjl	Binary exploitation	12/21/24 3:00 pm	125	
Hope, peace, joy and love. Four bytes for the four candles of advent. Four days and it’s Christmas! Connect using `nc ctf.csd.lol 2024`.
3 files	2 hints	csd{4LL_1_W4n7_4_CHR15TmaS_iS_4tuN3_4_L1F3}	Case-sensitive	0 regex global flags	12/21/24 2:53 pm	12/21/24 2:53 pm	Yes	aoc2024	cm4ylkp2u014069h2prmss2o5

Published		
Profile Picture for thee2d
thee2d
K.U.N.A.L Consulting	Web exploitation	12/22/24 3:00 pm	115	
{% alert %} 12/22 10:37 pm EST - The URL has been updated again. Do not blind dirsearch. {% /alert %} “This is not a good start to my winter break,” Agent Aspen said anxiously, “Santa’s really worried this society is going to stop Christmas one way or another.“ “Well, let’s get this done before Christmas, agent. I really want to get hom—oh…nevermind, this is my home.” “You know, you’re really lucky. You get to do all these fun things on real earth and visit the North Pole for Christmas, while I get to sit here all year round.” “I get one day off and it’s during Christmas! Can you believe that? It’s the busiest day of the year. Santa’s gone off to do his shenanigans with children and no one’s at the base. Can we even call ourselves Elves Intelligence?” “I’m sorry, agent. It’s just been like this for the past seventeen years of my life…” “Also, I might’ve forgot to tell you something a few weeks ago. This K.U.N.A.L society has actually existed for a while now. They took my sister almost ten years ago on Christmas Eve. My mother still has trauma from that day, and so does my father, I think. I haven’t seen him in a while.” “I was the first one to speak up about it. I tried telling Santa about it, but he was already flying around the sky and giving away presents. I couldn’t blame him.” “Now, he wants us to take down this organization. But, only because he found out they were trying to steal his presents—not because of my sister. He did assign two hundred elves to stop this organization, though.” “I know I should’ve moved on years ago…but I still grieve when Christmas comes every year.” “There is one thing that may give me closure, though. Will you, agent?” It seems like the society has been running a consulting firm…targeted at children. We can’t change the past for Aspen, but you can prevent this for the thousands of other elves. Good luck, agent: [https://kunal-consulting.csd.lol/](https://kunal-consulting.csd.lol/). --- _**You are only allowed to test in the scope `https://kunal-consulting.csd.lol/*`.** Blind brute-force request sending (e.g., using tools like DirBuster) can trigger Cloudflare rate limits. Do not attempt to bypass Cloudflare limits. Therefore, if you wish to brute-force, please limit your wordlists or attack scope._
0 files	2 hints	csd{cOn5uL7iN9_CHIldR3N_5InC3_2009}	Case-sensitive	0 regex global flags	12/21/24 7:10 pm	12/21/24 7:10 pm	Yes	aoc2024	cm4yuqoi8016069h2s1vd3elv

Published		
Profile Picture for kolmus
kolmus
help	Binary exploitation	12/23/24 3:00 pm	150	
Oh no! Santa really needs your HELP! Just as the final preparations were happening at the flag factory, one of the elfs went rogue and deleted Santa’s entire mailing list. We’re currently looking through all the stacks and heaps of address books as an emergency solution ... we absolutely need you to figure out how the mailing list got compromised! Hurry! Connect using `nc ctf.csd.lol 7777`.
3 files	2 hints	csd{Y0Ur_HeLp_15_MuCH_4PPr3CiA73d}	Case-sensitive	0 regex global flags	12/23/24 1:34 pm	12/23/24 1:34 pm	Yes	aoc2024	cm51dlug601pq69h2t74z6nww

Published		
Profile Picture for thee2d
thee2d
ELForms	Web exploitation	12/24/24 3:00 pm	130	
“It was snowing this morning,” Agent Aspen said. “I know it’s your last day—but we have something for you to do. It won’t take long, I promise.” We’re anticipating that K.U.N.A.L himself is coming after our systems. We have this internal software that another intern created a few years ago; we’ve been using it ever since they pitched it to Santa. Santa was impressed, but after taking a closer look it doesn’t look very secure at all. [https://elforms.csd.lol/](https://elforms.csd.lol/) (source code is attached) --- _**You are only allowed to test in the scope `https://*elforms.csd.lol/*`.** Blind brute-force request sending (e.g., using tools like DirBuster) can trigger Cloudflare rate limits. Do not attempt to bypass Cloudflare limits. Therefore, if you wish to brute-force, please limit your wordlists or attack scope._
1 files	2 hints	csd{wh4t_4N_3v3ntFuL_cHR15TM45_3v3}	Case-sensitive	0 regex global flags	12/24/24 2:58 pm	12/24/24 2:58 pm	Yes	aoc2024	cm52w2jhb025469h2br2x1011

Published		
Profile Picture for kolmus
kolmus
House of Santa Claus	Binary exploitation	12/25/24 3:00 pm	200	
Through halls adorned with yuletide cheer, Lies a secret no one dares go near. In the House of Santa, deep and dark, A mystery lurks, waiting to leave its mark. Elves speak of whispers in the night, Of a backdoor hidden out of sight. Crafted by the sharpest mind, A flaw for only the brave to find. Snowflakes fall in silent grace, Masking the danger in this place. Many have ventured, bold and bright, But none have returned to tell of their plight. Can you, dear challenger, face the test? Outwit the fortress and be the best? Unlock the secrets, break the chains, Solve the puzzle where darkness reigns. Santa’s house is not what it seems, A labyrinth of code, a realm of dreams. With malloc and free, the game is set, Enter now, if you dare, with no regret. This Christmas, the gauntlet is thrown, In the House of Santa, your skills must be shown. An epic quest, where legends are made, Dive into the code, and do not be afraid. For in the heart of Santa's lair, Lies the secret, if you dare. Crack the heap, find the flaw, And become the hero of them all. Connect using `nc ctf.csd.lol 8888`.
3 files	2 hints	csd{XM4s_I5_N07_TH3_tImE_4_P01sOnoU5_4cT5}	Case-sensitive	0 regex global flags	12/24/24 3:34 pm	12/24/24 3:34 pm	Yes	aoc2024	cm52xc323025w69h2zjexmzjl
 */

const challengesData = [
  {
    day: 1,
    title: "Logical Exclusivity",
    author: "GodderE2D",
    category: "Cryptography",
    points: 30,
    attempts: 489,
    solves: 237,
    id: "cm45ybtcg0000hs4jyfopyffr",
  },
  {
    day: 2,
    title: "screaming",
    author: "Vip3r",
    category: "Reverse engineering",
    points: 40,
    attempts: 313,
    solves: 259,
    id: "cm46kj93q0000haaztamwmxfu",
  },
  {
    day: 3,
    title: "ElfTV",
    author: "Vip3r",
    category: "Reverse engineering",
    points: 55,
    attempts: 53,
    solves: 147,
    id: "cm48ry3gy0000uiuwr4ez9mme",
  },
  {
    day: 4,
    title: "long gone",
    author: "Vip3r",
    category: "Forensics",
    points: 75,
    attempts: 33,
    solves: 44,
    id: "cm4a09v3f0000wu5fkrcs3fzc",
  },
  {
    day: 5,
    title: "Rusty Lock",
    author: "Logix",
    category: "Reverse engineering",
    points: 110,
    attempts: 164,
    solves: 31,
    id: "cm47zl89k0000cqvdi68p2wbu",
  },
  {
    day: 6,
    title: "Epochrypt",
    author: "Vip3r",
    category: "Cryptography",
    points: 70,
    attempts: 214,
    solves: 97,
    id: "cm4d83dgi0020ccqj7537e0cn",
  },
  {
    day: 7,
    title: "Apple Fanatic",
    author: "GodderE2D",
    category: "Web exploitation",
    points: 60,
    attempts: 124,
    solves: 116,
    id: "cm4du7fif0001unzbz7n9lpd1",
  },
  {
    day: 8,
    title: "vuln research",
    author: "Vip3r",
    category: "OSINT",
    points: 45,
    attempts: 138,
    solves: 122,
    id: "cm4g1ft7s001hpb96znwnabu5",
  },
  {
    day: 9,
    title: "resa?",
    author: "Vip3r",
    category: "Cryptography",
    points: 80,
    attempts: 110,
    solves: 101,
    id: "cm4hfkbb1001xxpv4xo6tuwpd",
  },
  {
    day: 10,
    title: "flag from wish",
    author: "Kolmus",
    category: "Binary exploitation",
    points: 90,
    attempts: 95,
    solves: 93,
    id: "cm4ilyveu0062xpv4x8wd1537",
  },
  {
    day: 11,
    title: "Festive Encoding",
    author: "GodderE2D",
    category: "Cryptography",
    points: 55,
    attempts: 372,
    solves: 101,
    id: "cm4hyrcj7003pxpv4zoaxy8ow",
  },
  {
    day: 12,
    title: "Letter To Santa",
    author: "Logix",
    category: "Forensics",
    points: 85,
    attempts: 31,
    solves: 27,
    id: "cm4lmwpxs006d7jlcv1ctv81k",
  },
  {
    day: 13,
    title: "Disoriented Santa",
    author: "GodderE2D",
    category: "OSINT",
    points: 100,
    attempts: 571,
    solves: 45,
    id: "cm4n68hai00987jlct9gnw0n5",
  },
  {
    day: 14,
    title: "angry elf",
    author: "Vip3r",
    category: "Reverse engineering",
    points: 50,
    attempts: 82,
    solves: 76,
    id: "cm4om9g8q00ed7jlcxsk0t7ib",
  },
  {
    day: 15,
    title: "JETS",
    author: "GodderE2D",
    category: "Web exploitation",
    points: 70,
    attempts: 177,
    solves: 113,
    id: "cm4oxxnyj00ip7jlc55m49fb9",
  },
  {
    day: 16,
    title: "Jingle Bell ROP",
    author: "Vip3r",
    category: "Binary exploitation",
    points: 105,
    attempts: 35,
    solves: 34,
    id: "cm4rayiin01417jlcn8gypnm3",
  },
  {
    day: 17,
    title: "Santa's Plane",
    author: "Logix",
    category: "OSINT",
    points: 80,
    attempts: 391,
    solves: 65,
    id: "cm4sv9un901fj7jlc5e57q0kv",
  },
  {
    day: 18,
    title: "trng",
    author: "Kolmus",
    category: "Reverse engineering",
    points: 120,
    attempts: 31,
    solves: 31,
    id: "cm4uiaz36025n7jlcgfrdoyta",
  },
  {
    day: 19,
    title: "interns",
    author: "Vip3r",
    category: "Cryptography",
    points: 150,
    attempts: 51,
    solves: 9,
    id: "cm4vuf9lj00e269h2mi2mz7h2",
  },
  {
    day: 20,
    title: "Lost Santa",
    author: "Logix",
    category: "OSINT",
    points: 80,
    attempts: 321,
    solves: 43,
    id: "cm4x5vnha00ot69h26gvbmbq3",
  },
  {
    day: 21,
    title: "hpjl",
    author: "Kolmus",
    category: "Binary exploitation",
    points: 125,
    attempts: 11,
    solves: 10,
    id: "cm4ylkp2u014069h2prmss2o5",
  },
  {
    day: 22,
    title: "K.U.N.A.L Consulting",
    author: "GodderE2D",
    category: "Web exploitation",
    points: 115,
    attempts: 21,
    solves: 19,
    id: "cm4yuqoi8016069h2s1vd3elv",
  },
  {
    day: 23,
    title: "help",
    author: "Kolmus",
    category: "Binary exploitation",
    points: 150,
    attempts: 11,
    solves: 11,
    id: "cm51dlug601pq69h2t74z6nww",
  },
  {
    day: 24,
    title: "ELForms",
    author: "GodderE2D",
    category: "Web exploitation",
    points: 130,
    attempts: 13,
    solves: 13,
    id: "cm52w2jhb025469h2br2x1011",
  },
  {
    day: 25,
    title: "House of Santa Claus",
    author: "Kolmus",
    category: "Binary exploitation",
    points: 200,
    attempts: 7,
    solves: 6,
    id: "cm52xc323025w69h2zjexmzjl",
  },
];

export default function Advent2024Results() {
  return (
    <main className="mx-4 mt-8 flex justify-center gap-12 sm:mx-8 md:mx-10">
      <div className="w-full max-w-(--breakpoint-sm) xl:max-w-(--breakpoint-lg)">
        <article
          itemScope
          itemType="http://schema.org/Article"
          className="prose prose-gray prose-invert prose-code:font-medium prose-code:before:hidden prose-code:after:hidden max-w-full"
        >
          <h1 itemProp="name">CyberStudents&rsquo; Advent of CTF 2024 results and statistics</h1>
          <p>
            <time itemProp="datePublished" dateTime="2025-05-18">
              Sunday, May 18, 2025
            </time>
            <br />
            By <span itemProp="author">GodderE2D</span>, CyberStudents Foundation Co-Chair and Co-Founder
          </p>
          <div className="flex rounded-r-md border-l-4 border-red-400 bg-red-500/20">
            <div className="py-4 pr-8 pl-6">
              <AnchoredHeading
                level={3}
                id="a-note-on-the-delay-of-prizes"
                className="mt-0"
                buttonClassName="-left-20 pr-20"
              >
                A note on the delay of prizes
              </AnchoredHeading>
              <p className="text-gray-200">
                Unfortunately, our event sponsor ICSRED was unable to fulfill their share of $190 USD in prizes after
                we&rsquo;ve requested them for over two months. Due to this, the first, second, and third place winners
                for the High School/College Division received their prizes considerably late.
              </p>
              <p className="text-gray-200">
                <strong>These remaining prizes were personally funded by event organizers Vip3r and GodderE2D.</strong>{" "}
                The Antisyphon Course prize for the HS/College Division first place winner was also delayed as we lost
                contact with the sponsor after February 2nd.
              </p>
              <p className="mb-0 text-gray-200">
                This was also ultimately the reason finalized winners and write-ups were not announced until now. We
                apologize for the inconvenience and thank the winners for their patience.
              </p>
            </div>
          </div>
          <p>
            Advent of CTF 2024 was a month-long cybersecurity capture the flag (CTF) competition from December 1st to
            December 31st, 2024 premiered last year by CyberStudents, an online organization and community focused on
            cybersecurity education. It featured beginner-oriented challenges from six popular categories with
            challenges releasing daily during the advent season. The event was open to everybody and we encouraged high
            school and college students from around the world to participate.
          </p>
          <p>
            The competition comprised of <strong>780 players</strong> from <strong>85 countries</strong> to attempt 25
            challenges of varying difficulties and categories. We encouraged players to discuss the challenges and share
            their progress in our Discord server through public channels and our private challenge support system, where
            challenge developers and community members were available to help players with guidance and resources.
          </p>
          <p>
            We offered a total prize pool of <strong>$280 USD</strong>, with $225 for high school and college students
            and $55 for write-up submissions open to all players. The prize pool was funded by event&rsquo;s organizers
            vip3r and GodderE2D, previous sponsorships/partnerships, and the event&rsquo;s sponsor ICSRED.{" "}
            <strong>(Please refer to the note above for issues regarding our sponsor.)</strong>
          </p>
          <p>
            In addition to the main leaderboard division, we also had a write-up division where all players were
            encouraged to submit write-ups for the challenges they solved. These community write-ups were reviewed by
            each challenge&rsquo;s creators and would be featured on the CyberStudents website as a resource for future
            visitors who wish to learn from the challenges and discover different perspectives. We looked for write-ups
            that were clear, complete, educational, creative, and explained every step of their challenge-solving and
            planning process.
          </p>
          <p>
            The event concluded on December 31st, 2024, and we are proud to announce the winners and some statistics
            regarding player demographics and challenges.
          </p>
          <AnchoredHeading level={2} id="final-leaderboard-high-school-college-division">
            Final leaderboard: High School/College Division
          </AnchoredHeading>
          <div className="overflow-x-auto">
            <table className="min-w-205">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Points (2270 max)</th>
                  <th>Completion</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st</td>
                  <td>
                    <strong>zarnex__</strong>
                  </td>
                  <td>United States</td>
                  <td>2270</td>
                  <td>25/25</td>
                  <td>
                    $100 USD +{" "}
                    <a
                      href="https://www.antisyphontraining.com/course-catalog/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Antisyphon Course
                    </a>{" "}
                    of choice (worth $600+)
                  </td>
                </tr>
                <tr>
                  <td>2nd</td>
                  <td>
                    <strong>minipif</strong>
                  </td>
                  <td>Romania</td>
                  <td>2270</td>
                  <td>25/25</td>
                  <td>$60 USD</td>
                </tr>
                <tr>
                  <td>3rd</td>
                  <td>
                    <strong>pligonstein</strong>
                  </td>
                  <td>Romania</td>
                  <td>2070</td>
                  <td>24/25</td>
                  <td>$30 USD</td>
                </tr>
                <tr>
                  <td>4th</td>
                  <td>
                    <strong>silence_</strong>
                  </td>
                  <td>India</td>
                  <td>1875</td>
                  <td>22/25</td>
                  <td>$20 USD</td>
                </tr>
                <tr>
                  <td>5th</td>
                  <td>
                    <strong>trixai</strong>
                  </td>
                  <td>Sweden</td>
                  <td>1830</td>
                  <td>22/25</td>
                  <td>$15 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            See the full leaderboard and the open division <Link href="/advent/leaderboard">here.</Link>
          </p>
          <AnchoredHeading level={2} id="final-leaderboard-open-write-up-division">
            Final leaderboard: Open - Write-Up Division
          </AnchoredHeading>
          <div className="overflow-x-auto">
            <table className="min-w-144.5">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Points</th>
                  <th>Winning write-ups</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st</td>
                  <td>
                    <strong>zarnex__</strong>
                  </td>
                  <td>United States</td>
                  <td>600</td>
                  <td>8/25</td>
                  <td>$40 USD</td>
                </tr>
                <tr>
                  <td>2nd</td>
                  <td className="flex items-center gap-1">
                    <span>
                      <strong>raul_26</strong> (Fl4gged)
                    </span>
                    <a href="https://github.com/raul-dunca" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="h-4 w-4 transition-opacity hover:opacity-75" />
                    </a>
                  </td>
                  <td>Austria</td>
                  <td>425</td>
                  <td>4/25</td>
                  <td>$15 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>All players who won a prize verified their identity and student status (if applicable).</p>
          <AnchoredHeading level={2} id="format">
            Format
          </AnchoredHeading>
          <p>
            A new challenge was released every day at 3 pm EST until December 25th. Players could earn points by solving
            challenges in these six categories: web exploitation, cryptography, forensics, binary exploitation, reverse
            engineering, and OSINT (open-source intelligence).
          </p>
          <p>
            To complete a challenge, players must find and submit a <strong>flag</strong>. A flag is a hidden piece of
            text or code always in the format <code>{"csd{example_flag}"}</code>, making it easy for players to
            identify. For example, for cryptography challenges, the flag may be included in the text after it has been
            decrypted or decoded. For web exploitation challenges, the flag may be hidden in a hidden file or is
            somewhere that is not visible to a regular user and the site must be exploited to obtain it. Knowing the
            flag format may be useful when attempting challenges, especially for cryptography and forensics challenges.
          </p>
          <p>
            Two sets of hints were also released for each challenge. The first hint was given 12 hours after the
            challenge releases (at 3 am EST) and the second hint was given 24 hours after the challenge releases (at 3
            pm EST the following day). Most importantly, hints do not cost points and players were not penalized for
            viewing them.
          </p>
          <p>
            Other than the challenges being released daily instead of all at once, this CTF followed the common
            Jeopardy-style format found in many other CTFs, preparing players for future CTFs and similar competitions.
            Challenges could be solved in any order and players could attempt challenges at any time during the event,
            including the six days that were given after the last challenge released on Christmas Day.
          </p>
          <p>
            Each challenge had a point value assigned to it relative to its difficulty. Tiebreakers were determined by
            the player who had kept their score the longest (i.e., whoever submitted their last flag first). You can
            find the competition guidelines <Link href="/advent/register">here.</Link>
          </p>
          <p>
            CyberStudents&rsquo; Advent of CTF is inspired by Eric Wastl&rsquo;s{" "}
            <a href="https://adventofcode.com" target="_blank" rel="noopener noreferrer">
              Advent of Code
            </a>
            , TryHackMe&rsquo;s{" "}
            <a href="https://tryhackme.com/christmas" target="_blank" rel="noopener noreferrer">
              Advent of Cyber
            </a>
            , and{" "}
            <a href="https://cyberstart.com" target="_blank" rel="noopener noreferrer">
              CyberStart
            </a>
            .
          </p>
          <AnchoredHeading level={2} id="write-ups">
            Write-ups
          </AnchoredHeading>
          <p>
            Players were able to submit write-ups and they would be graded by the respective challenge developer. We
            look for clarity, completeness, educational value, creativity, and explanation of every step in the
            challenge-solving and planning process.
          </p>
          <p>
            In the event that no suitable write-ups were submitted for a challenge, the challenge developer has provided
            an official write-up and solution. These write-ups serve as a resource for participants to learn from and
            improve their skills in cybersecurity.
          </p>
          <p>
            The 25 write-ups have been published in{" "}
            <a href="https://github.com/cyberstudentsacademy/Advent-of-CTF" target="_blank" rel="noopener noreferrer">
              this GitHub repository
            </a>
            , as well as at the bottom of the <a href="#challenge-statistics">respective challenge pages</a>.
          </p>
          <AnchoredHeading level={2} id="player-demographics">
            Player demographics
          </AnchoredHeading>
          <p>
            <strong>780 players</strong> registered to play in Advent of CTF 2024, representing{" "}
            <strong>85 countries</strong>. Players from the United States made up the largest portion of the player base
            at 23.3%, followed by India at 13.7%, and Indonesia at 7.0%. This was more diverse than the distribution of
            countries in the CyberStudents Discord server.
          </p>
          <figure>
            <Image src={countriesPieChart} alt="Pie chart of countries" className="rounded-md" />
            <figcaption>Self-reported countries of registered players</figcaption>
          </figure>
          <figure>
            <Image src={countriesGeoChart} alt="Geo chart of countries" className="rounded-md" />
            <figcaption>Geographical map of countries of registered players</figcaption>
          </figure>
          <p>
            Players were also asked whether they were attending high school or college/university, and if they were,
            which grade or year they were in. The majority of players were in college or university at 62.0%, with high
            school students following at 21.4%. Intriguingly, the Discord server had more members who identified as high
            school students than college students. Given the number of international players who could not be easily
            categorized under one of the allowed categories, this metric may not be entirely reflective of their age or
            experience. Middle school students were categorized as &ldquo;None&rdquo; in the data below.
          </p>
          <figure>
            <Image src={schoolingStatusPieChart} alt="Pie chart of schooling status" className="rounded-md" />
            <figcaption>Self-reported schooling status of registered players</figcaption>
          </figure>
          <AnchoredHeading level={2} id="challenge-statistics">
            Challenge statistics
          </AnchoredHeading>
          <p>
            Out of the 25 challenges released, <strong>3,858 attempts</strong> (both correct and incorrect) were
            submitted. <strong>1,850</strong> (48.0%) of those attempts were correct (i.e., solves). OSINT challenges
            had the highest attempts per solve rate, with an average of 6.83 attempts for every solve.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-157">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Challenge</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Points</th>
                  <th>Attempts</th>
                  <th>Solves</th>
                </tr>
              </thead>
              <tbody>
                {challengesData.map((challenge) => (
                  <tr key={challenge.title}>
                    <td>{challenge.day}</td>
                    <td>
                      <Link href={`/advent/challenges?challenge=${challenge.id}`}>
                        <strong>{challenge.title}</strong>
                      </Link>
                    </td>
                    <td>{challenge.category}</td>
                    <td>{challenge.author}</td>
                    <td>{challenge.points}</td>
                    <td>{challenge.attempts}</td>
                    <td>{challenge.solves}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The categories of challenges were mostly evenly spread, except for forensics with only 2 challenges. We aim
            to have a more balanced distribution of challenges in future events.
          </p>
          <figure>
            <Image src={challengeCategoriesPieChart} alt="Pie chart of challenge categories" className="rounded-md" />
            <figcaption>Distribution of challenge categories</figcaption>
          </figure>
          <p>
            Finally, we would like to thank all the players who participated in our inaugural event and those who
            provided feedback and reported technical and challenge issues to us. Furthermore, we would like to
            acknowledge the challenge creators Vip3r, Kolmus, GodderE2D, and Logix who worked throughout the holiday
            season to create challenges for the community.
          </p>
          <p>
            If you would like to try similar challenges, we recommend checking out the daily CTF in our{" "}
            <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
              Discord server
            </a>
            .
          </p>
          <p>
            If you&rsquo;re interested in sponsoring or partnering with CyberStudents, please reach out to us at{" "}
            <a href="mailto:admin@cyberstudents.net">admin@cyberstudents.net</a>.
          </p>
        </article>
      </div>
      <TableOfContents />
    </main>
  );
}
