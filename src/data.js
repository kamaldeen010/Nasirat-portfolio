/* All content lives here. Everything comes from Nasirat's CV. */
export const me = {
  name: "Balogun Nasirat Adefunke",
  short: "Nasirat Balogun",
  role: "Junior Product Manager",
  location: "Lagos, Nigeria",
  email: "nasiratbalogun@gmail.com",
  phone: "+234 708 593 3122",
  cv: "/Nasirat_Balogun_Resume.pdf", // put the PDF in /public
  linkedin: "", // add her LinkedIn URL here and it will appear on the Contact page
};

export const stats = [
  { n: "45+", t: "issues logged and triaged before a fintech launch" },
  { n: "3", t: "discovery sessions that shaped product priorities" },
  { n: "2", t: "fintech products worked on: BNPL and crypto wallet" },
  { n: "1", t: "product team led today, building Haven" },
];

export const roles = [
  {
    slug: "haven", title: "Product Lead", org: "Haven", sub: "Mental health and peer-support app", status: "Current",
    scope: "Haven is a mental health and peer-support app. I lead product on the team building it, from requirements through testing to release.",
    points: [
      "Turn requirements into user stories and prioritise the backlog with the team, following up on action items and timelines through testing to release.",
      "Coordinated a third-party integration for real-time audio and video calling (LiveKit), from requirements through end-to-end testing.",
      "Track issues in a bug list and verify fixes.",
      "Planned the admin dashboard and activity log requirements, using anonymous member IDs to protect privacy.",
    ],
    skills: ["User stories", "Backlog prioritisation", "Timeline follow-up", "Issue tracking", "Third-party integration", "Privacy-minded requirements"],
  },
  {
    slug: "fidelity-bnpl", title: "Product QA and Release Support", org: "Fidelity BNPL", sub: "Fintech", status: "Past role",
    scope: "A buy-now-pay-later fintech product. I supported testing and release, working closely with engineering.",
    points: [
      "Owned end-to-end testing and user acceptance checks across the BNPL platform, catching critical payment-flow bugs before launch.",
      "Logged and triaged 45+ issues pre-launch, working with engineering to prioritise fixes by user impact and release deadlines, then validating fixes once delivered.",
      "Documented defects with clear reproduction steps and root-cause notes, so engineering could investigate and fix faster.",
    ],
    skills: ["End-to-end testing", "User acceptance testing", "Issue triage", "Defect documentation", "Release support"],
  },
  {
    slug: "riddo-exchange", title: "Product Support, Discovery and User Feedback", org: "Riddo Exchange", sub: "Crypto wallet and P2P exchange platform (fintech)", status: "Past role",
    scope: "A crypto wallet and P2P exchange platform. I supported the Product Manager on discovery and turned user feedback into product input.",
    points: [
      "Worked with the Product Manager across 3 discovery sessions, bringing user pain points and feedback that shaped priorities for in-app P2P trade matching.",
      "Turned recurring user feedback into structured feature proposals, giving the Product team clear insight into common user challenges and improvement opportunities.",
    ],
    skills: ["Discovery sessions", "User feedback analysis", "Feature proposals", "Working with a Product Manager"],
  },
];

export const matrix = [
  ["User stories and requirements", "Haven"],
  ["Backlog prioritisation", "Haven"],
  ["Timelines and action item follow-up", "Haven"],
  ["Product testing and QA", "Fidelity BNPL"],
  ["Issue tracking", "Haven, Fidelity BNPL"],
  ["Product documentation", "Fidelity BNPL (defect reports)"],
  ["User feedback analysis", "Riddo Exchange"],
  ["Cross-functional collaboration with Product and Engineering", "Haven, Fidelity BNPL, Riddo Exchange"],
];

export const tools = ["Jira", "Asana", "Notion", "Trello", "Excel", "Google Workspace", "Slack", "AI tools"];

export const principles = [
  { t: "Detail-oriented", d: "I catch problems early, from payment-flow bugs to gaps in a requirement." },
  { t: "Analytical", d: "I look for patterns in user feedback and turn them into structured proposals." },
  { t: "Organised", d: "Backlogs, bug lists and action items stay tidy, so the team always knows what is next." },
  { t: "Execution-focused", d: "I follow up on actions and timelines until the work is tested and released." },
];

export const certs = [
  "Google Project Management Professional Certificate, Coursera (2026)",
  "Project Management Training Programme, TS Academy (2026)",
];

export const proof = [
  { t: "Google PM Certified", d: "Google Project Management Professional Certificate (Coursera, 2026)" },
  { t: "PM Training Programme", d: "Project Management Training Programme, TS Academy (2026)" },
  { t: "Leading product today", d: "Product Lead on a team building Haven" },
  { t: "Fintech hands-on", d: "A BNPL product and a crypto wallet and P2P exchange platform" },
];

export const help = [
  { t: "Requirements and user stories", d: "I turn ideas and feedback into clear user stories, then prioritise the backlog with the team.", from: "Haven" },
  { t: "Testing and release support", d: "End-to-end testing, UAT, bug triage and verifying fixes so launches go out clean.", from: "Fidelity BNPL" },
  { t: "Discovery and user feedback", d: "I bring user pain points into discovery and shape recurring feedback into feature proposals.", from: "Riddo Exchange" },
];
