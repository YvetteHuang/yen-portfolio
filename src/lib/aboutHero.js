// Copy and graph data for the /about hero. Edit text here; the components only
// read from this file.

import { designProjects } from "./designProjects";

export const aboutProfile = {
  name: "Yen-Yi Huang",
  where: "Product designer. New York.",
};

// Each entry `id` is what graph nodes reference in their `cv` list.
export const aboutCv = {
  education: [
    {
      id: "nyu",
      role: "M.S. Integrated Design & Media",
      org: "New York University",
      year: "2023",
    },
    {
      id: "ncku",
      role: "B.Arch. Architectural Design",
      org: "National Cheng Kung University",
      year: "2019",
    },
  ],
  experience: [
    {
      id: "devote",
      role: "Interaction Designer",
      org: "Devote Architecture Design Studio",
      year: "2025–",
    },
    { id: "snai", role: "Product Designer", org: "StockNews.AI", year: "2024–25" },
    { id: "wondera", role: "Product Designer", org: "Wondera", year: "2023–24" },
    {
      id: "nyulab",
      role: "Graduate Assistant",
      org: "NYU IDM Prototyping Lab",
      year: "2022–23",
    },
    { id: "jlin", role: "Brand Designer", org: "jlin technology", year: "2021" },
    {
      id: "ytc",
      role: "Product Designer",
      org: "YEN TING CHO Studio",
      year: "2020–21",
    },
    {
      id: "ncku-ta",
      role: "Technical Teaching Assistant",
      org: "National Cheng Kung University",
      year: "2019–20",
    },
    {
      id: "dance",
      role: "Technical Artist",
      org: "Scarecrow Contemporary Dance Company",
      note: "fabrication for a dance production",
      year: "2019",
      // Role and org share one line; the note goes underneath.
      inline: true,
    },
  ],
  awards: [
    {
      id: "awards-muse-ny",
      role: "MUSE & NY Product Design Awards",
      org: "Silver · Product Design, UX / UI / IxD",
      year: "2025",
    },
    {
      id: "awards-comm",
      role: "Communicator Awards",
      org: "Distinction · Financial Services",
      year: "2025",
    },
    {
      id: "awards-indigo",
      role: "Indigo Design Award",
      org: "Winner",
      year: "2025",
    },
    { id: "awards-aida", role: "AI Design Award", org: "Winner", year: "2025" },
  ],
  awardsNote: "all for StockNews.AI",
  // `self` is rendered bold between `lead` and `rest`. `short` and `year` are
  // the one-line version used on the mobile map cards.
  publications: [
    {
      id: "pub-intu",
      lead: "Cho, Y-T., Kuo, Y-L., Yeh, Y-T., ",
      self: "Huang, Y-Y.",
      short: "IntuModels, ACM Creativity & Cognition",
      year: "2021",
      rest: ", Huang, P-L. (2021). IntuModels: Enabling Interactive Modeling for the Novice through Idea Generation and Selection. ACM Creativity & Cognition.",
    },
    {
      id: "pub-2018",
      lead: "",
      self: "黃燕怡",
      short: "設計思考的再生, 臺灣建築學會",
      year: "2018",
      rest: ", 簡聖芬 (2018). 設計思考的再生：數位工具結合傳統設計模式的探索. 臺灣建築學會第三十屆第一次建築研究成果發表會.",
    },
  ],
};

// Thumbnails for the expanded sheet, keyed by the names used in `works`,
// `workImages` and `gallery` below.
export const aboutThumbs = {
  "Seizing the Ever-Changing Light": "/about/thumbs/seizing-the-ever-changing-light.jpg",
  Metamorphosis: "/about/thumbs/metamorphosis.jpg",
  "metamorphosis-print": "/about/thumbs/metamorphosis-print.jpg",
  "Melting into River": "/about/thumbs/melting-into-river.jpg",
  "Seeds in the Wind": "/about/thumbs/seeds-in-the-wind.jpg",
  "Light Painting": "/about/thumbs/light-painting.jpg",
  "Virtual NYU Lounge": "/about/thumbs/virtual-nyu-lounge.jpg",
  Mourning: "/about/thumbs/mourning.jpg",
  "The Disconnection": "/about/thumbs/the-disconnection.jpg",
  "Parametric keycaps": "/about/thumbs/parametric-keycaps.jpg",
  "Witch on the Pie Moon": "/about/thumbs/witch-on-the-pie-moon.jpg",
  Gizmu: "/about/thumbs/gizmu.jpg",
  "StockNews.AI": "/about/thumbs/stocknews-ai.jpg",
  Wondera: "/about/thumbs/wondera.jpg",
  "StockNews.AI design system": "/about/thumbs/stocknews-ai-design-system.jpg",
  "Bubble Up": "/about/thumbs/bubble-up.jpg",
  "1x3": "/about/thumbs/1x3.jpg",
  "“Bugs” — Scarecrow Dance Company": "/about/thumbs/bugs-scarecrow-dance-company.jpg",
  "jlin CIS": "/about/thumbs/jlin-cis.jpg",
  mush1: "/about/thumbs/mush1.jpg",
  mush2: "/about/thumbs/mush2.jpg",
  mush3: "/about/thumbs/mush3.jpg",
  mush4: "/about/thumbs/mush4.jpg",
  mush5: "/about/thumbs/mush5.jpg",
  mush6: "/about/thumbs/mush6.jpg",
};

// Pages for works in the sheet, keyed by the names used in `works`. Case
// studies are listed here; design projects pick up their href from
// designProjects, so a newly linked project shows up here too.
export const aboutWorkLinks = {
  "StockNews.AI": "/work/stocknews",
  "StockNews.AI design system": "/work/design-system",
  Wondera: "/work/wondera",
  ...Object.fromEntries(
    designProjects.filter((p) => p.href).map((p) => [p.title, p.href])
  ),
};

// Graph coordinates are in the hero SVG's 1040 × 780 viewBox.
// tier: "core" | "mid" | "leaf" | "alone"
// hover: short text for the hover panel (null = no panel, outline dot)
// expanded: paragraphs for the click-to-expand sheet
// works: project titles shown in the sheet
// workImages: optional per-work thumbnail override (work title → image key)
// gallery: image keys shown without captions
// panelPos: "ne" places the hover panel above the node
// cv: aboutCv entry ids this node highlights
export const aboutNodes = [
  {
    id: "arch",
    label: "Architecture",
    tier: "mid",
    x: 108,
    y: 248,
    hover:
      "Architecture taught me two things: to think in systems, and to question the brief before answering it.",
    expanded: [
      "Five years of architecture. The first lesson was that nothing is local. A decision about a stair is a decision about how the building gets used, so you work from the whole, and from the fundamentals outward.",
      "The second was that the brief is rarely the problem. Studio trains you to spend a long time working out what question you are actually answering, and only then to design. Both habits came with me when I moved to product.",
    ],
    works: ["Seizing the Ever-Changing Light", "Bubble Up", "1x3"],
    cv: ["ncku", "pub-2018"],
  },
  {
    id: "hci",
    label: "Human–Computer Interaction",
    tier: "mid",
    x: 104,
    y: 556,
    hover:
      "The same systems question, moved from space to information. Also the first time I could test whether I was right.",
    expanded: [
      "At NYU the question moved from buildings to interfaces: how someone reads a system, builds a model of it, and acts inside it. The structure of the problem did not change. The material did.",
      "What HCI added was evidence. In architecture you hand the building over and find out decades later, if at all. Here I could put something in front of people, watch where they hesitated, and change it that week. That loop is most of why I stayed.",
    ],
    works: [],
    cv: ["nyu", "pub-intu"],
  },
  {
    id: "gen",
    label: "Generative Design",
    tier: "core",
    x: 330,
    y: 206,
    hover:
      "I don’t draw outcomes. I define the rules and let the result grow inside a range: bounded, but not locked down.",
    expanded: [
      "This is the centre of how I work, and it started in architecture. Instead of drawing a form, you describe the parameters and the relationships that produce it, then run the system and see what comes back.",
      "What makes it worth doing is the range. Wide enough that the system gives you something you would not have drawn yourself, narrow enough that everything inside it still holds. Judging that width is the actual skill, and it is the same judgement I make now on AI products.",
      "It also taught me to let go of the result. I am responsible for the conditions, not for any single output.",
    ],
    works: [
      "Metamorphosis",
      "Seizing the Ever-Changing Light",
      "Melting into River",
      "Parametric keycaps",
    ],
    cv: ["ytc", "nyulab", "pub-2018", "pub-intu"],
  },
  {
    id: "pd",
    label: "Product Design",
    tier: "core",
    x: 846,
    y: 580,
    hover:
      "Three years on AI products. The work is deciding how much freedom a system should have, and then auditing what happens at the edges.",
    expanded: [
      "A voice AI app before most people had any model for what a trained voice was, then a fintech platform as founding designer. Both are the same shape of problem as everything else here: set the conditions, let the system produce, accept that you cannot author the output.",
      "What changes is the edge of the range. In generative work the edge is an unusual shape, and an unusual shape is fine. In an AI product the edge is where someone acts on something wrong, so the work is not only choosing the width but checking what sits at the boundary. Too narrow and the AI is an expensive form. Too wide and nobody trusts the output.",
      "At StockNews.AI that meant designing for traceability: where a claim came from, how confident the system was, and how fast someone could verify it themselves. The output was never going to be guaranteed correct, so the product had to make it checkable.",
    ],
    works: ["StockNews.AI", "Wondera"],
    cv: [
      "devote",
      "snai",
      "wondera",
      "awards-muse-ny",
      "awards-comm",
      "awards-indigo",
      "awards-aida",
    ],
  },
  {
    id: "ixd",
    label: "Interaction Design",
    tier: "mid",
    x: 338,
    y: 462,
    hover:
      "Where the two roots meet. A person is inside the loop: they shape the result, and the result reshapes what they do next.",
    expanded: [
      "This is where architecture and HCI actually merge. In generative design I set the parameters in advance and run the system. Here someone supplies them from inside it, and the output resolves around them.",
      "What I like is the loop. A person acts, the system responds, and that response changes what they do next. Architecture does the same thing to behaviour, just on a scale of years and without ever telling you whether it worked. Here the loop closes in a second, and you can watch it happen.",
      "I co-authored a paper on the rules for turning body movement into three-dimensional models, which is this problem in its most literal form.",
    ],
    works: [
      "Metamorphosis",
      "Seeds in the Wind",
      "Melting into River",
      "Light Painting",
      "“Bugs” — Scarecrow Dance Company",
    ],
    cv: ["nyu", "ytc", "dance", "pub-intu"],
  },
  {
    id: "ds",
    label: "Design System",
    tier: "mid",
    x: 628,
    y: 442,
    hover:
      "The same mechanism as generative design: rules that define a range. One is there to raise the ceiling, the other to hold the floor.",
    expanded: [
      "Both are rules that other people produce from, and the tension is identical. Too tight and nobody has room to solve the actual problem. Too loose and nothing holds together.",
      "What differs is what the rules are for. In generative work the rules exist to produce something I would not have arrived at myself, so I run the system, look at a lot of outputs and keep the ones worth keeping. A design system is judged the other way round: not by its best output but by its worst one, and it has to hold without me looking at any of them.",
      "At StockNews.AI I took the system from Figma into a live React and Storybook environment. A rule written in code is enforced rather than suggested, and it is also what lets AI tooling build with the system instead of around it.",
    ],
    works: ["StockNews.AI design system", "jlin CIS"],
    cv: ["snai", "wondera", "jlin"],
  },
  {
    id: "fab",
    label: "Fabrication",
    tier: "mid",
    x: 596,
    y: 170,
    hover:
      "Where a rule has to become an actual object. Make the imagination tangible in the real world.",
    expanded: [
      "The point where parameters stop being negotiable. A material has a thickness, a machine has a tolerance, and the thing either comes out or it does not. Generative work can stay plausible on screen for a long time; a printer tells you within hours whether the logic held.",
      "It also changes how you design upstream. Once you know something has to be cut, printed or assembled, you start building those limits into the rules themselves rather than discovering them at the end.",
      "And then it exists. Someone can pick it up, turn it over, find the weight wrong or the edge sharper than expected. No screen gives you that, and nothing I have made digitally has been read as closely as the objects people could hold.",
      "Both of my degrees had a workshop at the centre of them, and I ended up teaching in both: Rhino and Grasshopper at NCKU, laser cutters, 3D printers and welding at the NYU prototyping lab.",
    ],
    works: [
      "Metamorphosis",
      "Light Painting",
      "Parametric keycaps",
      "“Bugs” — Scarecrow Dance Company",
    ],
    workImages: { Metamorphosis: "metamorphosis-print" },
    cv: ["nyulab", "ncku-ta", "dance", "ytc"],
  },
  {
    id: "xr",
    label: "XR",
    tier: "mid",
    x: 192,
    y: 374,
    panelPos: "ne",
    hover:
      "Spatial judgement from architecture, applied to worlds that are built rather than drawn, and to information laid over the real one.",
    expanded: [
      "One side is building environments in Unreal, where the camera, the performer and the light all resolve at once. It is the closest thing I have done to architecture since architecture, except the space is made of polygons and can be rebuilt in an afternoon. The work there is camera language: what the frame sees, and what it never needs to.",
      "The other side runs the opposite way. Instead of making a world, you add a layer to the one that already exists. The real room becomes the thing you design around, and you no longer control the site, the light, or what else is in view.",
      "Both need the same judgement about space, scale and where attention goes. Neither lets you fix a result and walk away.",
    ],
    works: [
      "Virtual NYU Lounge",
      "Witch on the Pie Moon",
      "Mourning",
      "The Disconnection",
      "Gizmu",
    ],
    cv: ["nyu"],
  },

  { id: "rhino", label: "Rhino / Grasshopper", tier: "leaf", x: 248, y: 118, hover: null, cv: ["ytc", "ncku-ta", "nyulab"] },
  { id: "print", label: "Laser cutting / 3D printing", tier: "leaf", x: 744, y: 96, hover: null, cv: ["nyulab"] },
  { id: "proc", label: "Processing / Kinect", tier: "leaf", x: 430, y: 536, hover: null, cv: ["ytc", "dance", "pub-intu"] },
  { id: "react", label: "React / Storybook", tier: "leaf", x: 700, y: 360, hover: null, cv: ["snai", "devote"] },
  { id: "unreal", label: "Unreal Engine", tier: "leaf", x: 130, y: 452, hover: null, cv: ["nyu"] },

  {
    id: "mush",
    label: "Mushrooms",
    tier: "alone",
    x: 884,
    y: 300,
    hover:
      "I forage with researchers and local experts, and dry the good-looking ones at home for research and inspiration.",
    expanded: [
      "Not a design metaphor. I just like it: being outdoors, and being around people who know far more than I do about something I am only beginning to read.",
      "It is the one thing here where I set none of the rules. I am not designing the system, I am learning to recognise what it produced, and most of the time I am wrong in a way that someone with thirty years of looking can correct in a second.",
      "Lately I have been going to Genspace to see what people are growing with mycelium, and whether it is something I could work with as a material. Right now I am mostly looking at form.",
    ],
    gallery: ["mush1", "mush2", "mush3", "mush4", "mush5", "mush6"],
    cv: [],
  },
];

// On mobile the map is a scroll-driven tour: each scroll step moves the camera
// to the next node in this order, then it zooms out to the whole map.
export const aboutTourOrder = [
  "arch",
  "gen",
  "fab",
  "ixd",
  "hci",
  "xr",
  "ds",
  "pd",
  "mush",
];

// Card for the last tour step, when the camera pulls back to the whole map.
export const aboutTour = {
  outroTitle: "The whole map",
  outroText:
    "Architecture and HCI at the roots, generative design at the centre, product design where it all leads. And mushrooms, off to one side.",
};

// kind: "dashed" | "faint" (optional)
// control: fixed quadratic control point; otherwise the curve bows from the midpoint
export const aboutEdges = [
  { from: "arch", to: "gen" },
  { from: "hci", to: "ixd" },
  { from: "gen", to: "ixd" },
  { from: "gen", to: "fab" },
  { from: "gen", to: "ds" },
  { from: "hci", to: "pd", control: { x: 470, y: 700 } },
  { from: "ds", to: "pd" },
  { from: "fab", to: "pd", kind: "dashed" },
  { from: "gen", to: "rhino" },
  { from: "fab", to: "print" },
  { from: "ds", to: "react" },
  { from: "ixd", to: "proc" },
  { from: "arch", to: "xr" },
  { from: "ixd", to: "xr" },
  { from: "xr", to: "unreal" },
  { from: "mush", to: "fab", kind: "faint", control: { x: 760, y: 300 } },
  { from: "mush", to: "gen", kind: "faint", control: { x: 610, y: 330 } },
];
