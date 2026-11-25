// Framework alignments for each Advent of CTF challenge category.
// Single source of truth: used by the homepage and by /advent/2025.

export type FrameworkKind = "nice" | "mitre" | "ap";

export type Alignment = { code: string; title: string; kind: FrameworkKind };

export type FrameworkCategory = {
  name: string;
  description: string;
  alignments: Alignment[];
};

export const frameworkNames: Record<FrameworkKind, string> = {
  nice: "NICE",
  mitre: "MITRE ATT&CK",
  ap: "AP® Cybersecurity",
};

/**
 * AP® Cybersecurity skill categories and skills, worded exactly as in the College Board's AP Cybersecurity Course and
 * Exam Description, effective fall 2026, page 16 ("Cybersecurity Skills"). Read 2026-11-23.
 */
export const AP_SKILL_CATEGORIES: Record<string, string> = {
  "1": "Analyze Risk",
  "2": "Mitigate Risk",
  "3": "Detect Attacks",
  "4": "Collaborate",
};

export const AP_SKILLS = {
  "1.A": "Identify, with and without the support of AI, vulnerabilities, threats, and attack methods, and explain how they generate risk.",
  "1.B": "Determine ways adversaries exploit vulnerabilities to compromise an asset.",
  "1.C": "Evaluate, with and without the support of AI, the likelihood and impact of risks.",
  "1.D": "Document, with and without the support of AI, the likelihood and impact of risks.",
  "2.A": "Identify security controls, and explain how they mitigate risks.",
  "2.B": "Determine layered security controls that address vulnerabilities.",
  "2.C": "Evaluate, with and without the support of AI, the impact of protective risk-management strategies.",
  "2.D": "Implement and log mitigations with and without the support of AI.",
  "3.A": "Identify methods for monitoring systems, and explain how they detect attacks.",
  "3.B": "Determine strategies and methods to detect attacks.",
  "3.C": "Evaluate the impact of threat detection methods.",
  "3.D": "Detect and classify cyberattacks by analyzing digital evidence with and without the support of AI.",
  "4.A": "Develop clear, shared team objectives related to a cybersecurity task.",
  "4.B": "Determine clear roles and responsibilities for members of a team working to accomplish a cybersecurity task.",
  "4.C": "Implement AI as a collaboration tool individually and as a group.",
  "4.D": "Complete assigned work to accomplish a collaborative cybersecurity task.",
} as const satisfies Record<string, string>;

const nice = (code: string, title: string): Alignment => ({ code, title, kind: "nice" });
const mitre = (code: string, title: string): Alignment => ({ code, title, kind: "mitre" });
const ap = (code: string, title: string): Alignment => ({ code, title, kind: "ap" });

/** Link for a MITRE ATT&CK technique id such as "T1505.003". */
export function mitreHref(code: string) {
  return `https://attack.mitre.org/techniques/${code.replace(".", "/")}/`;
}

export const frameworkCategories: FrameworkCategory[] = [
  {
    name: "Web exploitation",
    description:
      "Find and exploit vulnerabilities in web applications, such as SQL injection, cross-site scripting (XSS), and more.",
    alignments: [
      nice("PR-VAM", "Vulnerability Assessment"),
      nice("PR-CDA", "Cybersecurity Defense Analysis"),
      nice("SP-DEV", "Software Development"),
      nice("SP-TST", "Test and Evaluation"),
      mitre("T1190", "Exploit Public-Facing Application"),
      mitre("T1505.003", "Server Software Component: Web Shell"),
      mitre("T1071.001", "Application Layer Protocol: Web Protocols"),
      ap("1.A", AP_SKILLS["1.A"]),
      ap("1.B", AP_SKILLS["1.B"]),
      ap("1.C", AP_SKILLS["1.C"]),
    ],
  },
  {
    name: "Reverse engineering",
    description:
      "Analyze and reverse engineer binaries and other source code to understand their functionality, find vulnerabilities, and exploit them.",
    alignments: [
      nice("AN-EXP", "Exploitation Analysis"),
      nice("SP-DEV", "Software Development"),
      nice("SP-TST", "Test and Evaluation"),
      nice("SP-TRD", "Technology R&D"),
      mitre("T1059", "Command and Scripting Interpreter"),
      mitre("T1106", "Native API"),
      mitre("T1027", "Obfuscated Files or Information"),
      mitre("T1204", "User Execution"),
      ap("1.B", AP_SKILLS["1.B"]),
      ap("3.B", AP_SKILLS["3.B"]),
    ],
  },
  {
    name: "Binary exploitation",
    description:
      "Identify and exploit vulnerabilities in compiled binaries, such as buffer overflows, format string vulnerabilities, and more.",
    alignments: [
      nice("AN-EXP", "Exploitation Analysis"),
      nice("PR-VAM", "Vulnerability Assessment"),
      nice("SP-ARC", "Systems Architecture"),
      nice("SP-TST", "Test and Evaluation"),
      nice("SP-SYS", "Systems Development"),
      mitre("T1548", "Abuse Elevation Control Mechanism"),
      mitre("T1055", "Process Injection"),
      mitre("T1068", "Exploitation for Privilege Escalation"),
      mitre("T1203", "Exploitation for Client Execution"),
      ap("1.B", AP_SKILLS["1.B"]),
      ap("2.B", AP_SKILLS["2.B"]),
    ],
  },
  {
    name: "Forensics",
    description:
      "Analyze digital evidence, such as memory dumps, disk images, and network traffic, to uncover hidden information and artifacts.",
    alignments: [
      nice("IN-FOR", "Digital Forensics"),
      nice("IN-INV", "Cyber Investigation"),
      nice("PR-CDA", "Cybersecurity Defense Analysis"),
      mitre("T1005", "Data from Local System"),
      mitre("T1036", "Masquerading"),
      mitre("T1082", "System Information Discovery"),
      mitre("T1049", "System Network Connections Discovery"),
      ap("3.A", AP_SKILLS["3.A"]),
      ap("3.D", AP_SKILLS["3.D"]),
    ],
  },
  {
    name: "Cryptography",
    description:
      "Solve challenges related to cryptographic algorithms and implementations, including encryption, decryption, and key management.",
    alignments: [
      nice("SP-DEV", "Software Development"),
      nice("SP-ARC", "Systems Architecture"),
      nice("SP-TRD", "Technology R&D"),
      nice("SP-RSK", "Risk Management"),
      mitre("T1573.001", "Symmetric Cryptography"),
      mitre("T1573.002", "Asymmetric Cryptography"),
      mitre("T1486", "Data Encrypted for Impact"),
      mitre("T1027", "Obfuscated Files or Information"),
      ap("2.A", AP_SKILLS["2.A"]),
      ap("2.C", AP_SKILLS["2.C"]),
    ],
  },
  {
    name: "Miscellaneous",
    description:
      "A diverse category that includes more creative challenges, such as open-source intelligence (OSINT), jails, blue-team OS images, and more.",
    alignments: [
      nice("AN-TWA", "Threat Analysis"),
      nice("AN-ASA", "All-Source Analysis"),
      nice("PR-CDA", "Cybersecurity Defense Analysis"),
      mitre("T1595", "Active Scanning"),
      mitre("T1596", "Search Open Websites/Domains"),
      mitre("T1598", "Phishing for Information"),
      mitre("T1087", "Account Discovery"),
      ap("4.A", AP_SKILLS["4.A"]),
      ap("1.A", AP_SKILLS["1.A"]),
    ],
  },
];
