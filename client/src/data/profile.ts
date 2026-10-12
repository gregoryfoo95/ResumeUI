// Single source of truth for all resume content.
// Sourced from the LinkedIn Profile.pdf export (Oct 2026) plus existing site content.
// All strings are rendered as React text nodes (never as raw HTML).

export const profile = {
  name: "Gregory Foo",
  nameZh: "符傑雄",
  location: "Singapore",
  currentRole: "RSAF Autonomy Technical Lead Engineer",
  summary: [
    "I am a driven and hardworking individual who strives to attain as much knowledge as possible and possesses the dedication to lifelong learning. My career journey started off as an aerospace engineer, amassing a few years worth of aviation experience, armed with people management skillsets and deep technical expertise for a large organization (Republic of Singapore Air Force).",
    "In 2022, I decided to pursue my unearthed passion, which is developing software applications and machine learning products for the betterment of our daily lives through technology. Boundaries were pushed and here I am, within the Tech arm of RSAF, RAiD. Equipped with an arsenal of software skills (e.g. Full-Stack Development and Autonomy/Robotics) with a substantial technical repository, I am looking to enhance the current processes of the RSAF and aspire to create a marriage between aviation, software development and machine learning/AI.",
  ],
  links: {
    github: "https://github.com/gregoryfoo95",
    linkedin: "https://www.linkedin.com/in/gregoryfoo",
  },
  languages: [
    { name: "English", level: "Native or Bilingual" },
    { name: "Chinese", level: "Native or Bilingual" },
  ],
} as const;

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export const stats: Stat[] = [
  { label: "Flagship systems shipped", value: 5 },
  { label: "Days to a PoC CCIS (Ex Wallaby)", value: 9 },
  { label: "Degrees (MSc, BEng)", value: 2 },
];

export interface Role {
  title: string;
  org: string;
  start: string;
  end: string;
  location?: string;
  current?: boolean;
  bullets: string[];
  tags?: string[];
}

export const roles: Role[] = [
  {
    title: "RSAF Autonomy Technical Lead Engineer | Senior Software Engineer | CSAA | CDVA | CMLA",
    org: "RAiD (RSAF Agile innovation Digital)",
    start: "Mar 2025",
    end: "Present",
    current: true,
    location: "Singapore",
    bullets: [
      "Autonomy Robotics/Software Engineer.",
      "Senior Engineer secondary role: conduct technical interviews for software engineering applicants, support the professional development of junior engineers through programmes and certifications, and continually review technical competencies to raise standards.",
    ],
    tags: ["Hivemind Enterprise", "C++", "CUELang", "Bash", "Python", "Networking", "Electronics Hardware", "DevOps", "Docker"],
  },
  {
    title: "Software Engineer",
    org: "RAiD (RSAF Agile innovation Digital)",
    start: "May 2023",
    end: "Mar 2025",
    location: "Singapore",
    bullets: [
      "Delivered full-stack applications across RSAF, DSTA and USAF collaborations (see Projects).",
      "Acted as Deputy Tech Lead on SAFEGUARD, Exercise Wallaby 2024.",
    ],
    tags: ["TypeScript", "React", "Express", "PostgreSQL", "Java", "Spring Boot", "Azure OpenAI"],
  },
  {
    title: "Air Force Engineering Officer, Aircraft Weapons Department",
    org: "Republic of Singapore Air Force",
    start: "Oct 2020",
    end: "Apr 2023",
    bullets: [
      "Lead Engineer and OC (Ag): defect troubleshooting and root-cause rectification to cut recurring defects.",
      "Logistical planning for effective aircraft generation to meet operational mission requirements.",
      "Managed technicians for efficient manpower utilisation; organised squadron-level events.",
      "Innovation projects leveraging data science and machine learning. Awarded the Exemplary Innovator Award, MINDEF IGNITE Awards.",
      "Data Office: drove data-driven projects and digitalisation. Reliability Analyst: fleet reliability analysis of all major aircraft systems.",
    ],
    tags: ["VBA", "Power BI", "Python", "Streamlit", "scikit-learn"],
  },
  {
    title: "Air Force Engineering Officer, Aerodynamics Department",
    org: "Republic of Singapore Air Force",
    start: "May 2019",
    end: "Sep 2020",
    location: "Singapore",
    bullets: [
      "Computational Fluid Dynamics for external aerodynamic analysis of aircraft and loads; paper presented at SATEC 2020.",
      "Built a predictive engine-health model using regression, supervised/unsupervised ML, KNN and LSTM neural networks.",
    ],
    tags: ["CFD", "LSTM", "KNN", "Regression"],
  },
  {
    title: "Air Force Engineering Officer, Propulsion and Aero-Systems Department",
    org: "Republic of Singapore Air Force",
    start: "Apr 2014",
    end: "May 2019",
    location: "Tengah Air Base",
    bullets: [
      "Engineering analysis of aircraft component defects to ensure reliability and safety.",
      "Logistics planning for spares and repair availability to ensure mission success for every sortie.",
      "Excel VBA scripting for data analysis of logistics processes.",
    ],
    tags: ["VBA", "Reliability", "Logistics"],
  },
  {
    title: "Operations Engineer Intern",
    org: "Pratt & Whitney",
    start: "Jan 2018",
    end: "Jun 2018",
    location: "Tuas, Singapore",
    bullets: [
      "Improved production efficiency through VBA coding.",
      "Cross-department projects spanning Engineering and IT; ad hoc logistics and layout planning.",
    ],
    tags: ["VBA"],
  },
];

export interface Project {
  name: string;
  org: string;
  blurb: string;
  stack: string[];
  highlight?: string;
  demo?: { type: "image" | "video"; src: string; alt: string; poster?: string };
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    name: "ASTRO",
    org: "RSAF",
    blurb:
      "Life support and survival currency tracking and booking app. Manages personnel ground currencies, lets trainers create sessions and personnel book slots and track their currency status.",
    stack: ["TypeScript", "React", "Express", "SQL Server", "PostgreSQL", "SgID/Singpass"],
  },
  {
    name: "SAGE",
    org: "RSAF",
    blurb:
      "A ChatGPT-style web app on Microsoft Azure OpenAI that assists training needs (e.g. exam Q&A generation) using Retrieval Augmented Generation.",
    stack: ["TypeScript", "React", "PostgreSQL", "SgID/Singpass", "Python", "Azure OpenAI", "LlamaIndex", "FastAPI"],
    highlight: "RAG",
  },
  {
    name: "SAFEGUARD",
    org: "RSAF · Exercise Wallaby 2024",
    blurb:
      "Deputy Tech Lead on a proof-of-concept functional prototype CCIS, built in a time-compressed environment alongside operational units within 9 days in Rockhampton.",
    stack: ["Rapid prototyping", "Tech leadership"],
    highlight: "9 days",
  },
  {
    name: "CCIS",
    org: "DSTA",
    blurb: "Command & Control Information System for command and control operations, with real-time geospatial views.",
    stack: ["Java", "LuciadLightspeed", "Spring Boot", "WebSockets", "JUnit", "Mockito", "TypeScript", "React", "AG-Grid", "MUI"],
  },
  {
    name: "Sentinel",
    org: "USAF & RAiD collaboration",
    blurb:
      "Harnesses mobile device sensors for threat reporting in multi-domain operations across nations and organisations, with triangulation on a map view to estimate the probable location of a reported threat.",
    stack: ["TypeScript", "React", "Next.js", "Express", "PostgreSQL", "Jest", "Turf.js", "React Hook Form", "TanStack Query", "Zustand"],
  },
];

export interface SkillGroup {
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { title: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "Bash", "CUELang", "MATLAB", "VBA"] },
  { title: "Frontend", items: ["React", "Next.js", "Zustand", "TanStack Query", "MUI", "AG-Grid", "Tailwind"] },
  { title: "Backend & Data", items: ["Node.js", "Express", "Spring Boot", "FastAPI", "PostgreSQL", "SQL Server", "MongoDB", "WebSockets"] },
  { title: "AI & Autonomy", items: ["Machine Learning", "LLMs", "RAG", "LlamaIndex", "Azure OpenAI", "Robotics", "Hivemind Enterprise"] },
  { title: "Cloud & DevOps", items: ["Docker", "Azure", "AWS", "Git", "Networking", "Electronics Hardware"] },
  { title: "Aerospace", items: ["CFD", "Reliability Engineering", "Predictive Maintenance", "UAV", "Drone Piloting"] },
];

export interface Education {
  institution: string;
  degree: string;
  years: string;
  grade?: string;
  awards?: string[];
  thesis?: string;
  logo?: string; // key into assets, resolved by the component
}

export const education: Education[] = [
  {
    institution: "Imperial College London",
    degree: "MSc Advanced Aeronautical Engineering",
    years: "2019 – 2020",
    grade: "Distinction",
    awards: [
      "Airbus Prize for Best Individual MSc Project across 3 MSc Degrees",
      "Airbus Prize for Best Student in MSc Advanced Aeronautical Engineering",
    ],
    thesis:
      "Using Data Driven Algorithms to extract Reduced Order Models (ROMs) from Turbulent Channel Flow (Extended Dynamic Mode Decomposition, Discrete Linear-Quadratic state-feedback Regulator).",
    logo: "imperial",
  },
  {
    institution: "Nanyang Technological University",
    degree: "BEng Aerospace Engineering",
    years: "2015 – 2019",
    grade: "First Class Honours",
    thesis:
      "CFD Simulation of Helicopter with Underslung Load (presented at the Singapore Aerospace Technology and Engineering Conference (SATEC) 2020).",
    logo: "ntu",
  },
  {
    institution: "Rensselaer Polytechnic Institute",
    degree: "BE Aerospace, Aeronautical and Astronautical Engineering",
    years: "2017",
  },
  {
    institution: "Catholic Junior College",
    degree: "GCE 'A' Levels",
    years: "2012 – 2013",
    grade: "Distinctions in Physics, Mathematics, Chemistry, Economics",
  },
  {
    institution: "Clementi Town Secondary School",
    degree: "GCE 'O' Levels",
    years: "2008 – 2011",
  },
];

export const certifications: string[] = [
  "AWS Certified Solutions Architect – Associate",
  "Machine Learning by Dr Andrew Ng",
  "Software Design Patterns",
  "Introduction to Python",
  "Microsoft Excel: Data Visualization, Excel Charts and Graphs",
];

export const honors: string[] = [
  "Exemplary Innovator Award, MINDEF IGNITE Awards 2022",
  "Airbus Prize for Best Individual MSc Project, Imperial College London",
  "Airbus Prize for Best Student, MSc Advanced Aeronautical Engineering",
  "Local Study Award",
  "Australian Mathematics Competition (Distinction)",
  "GCE 'O' Levels 6 Distinction Award",
  "Uniformed Group Cadet of the Year",
  "National Youth Achievement Award (Silver)",
];

export interface Media {
  title: string;
  description: string;
  type: "video" | "image";
  src: string; // YouTube embed URL (video) or /public path (image)
  url?: string;
}

export const media: Media[] = [
  {
    title: "Exercise Wallaby 2024: YouTube",
    description:
      "Interviewed by the RSAF media team on rapid software development within the RSAF and the importance of agility in defence.",
    type: "video",
    src: "https://www.youtube-nocookie.com/embed/v-i3PYCUTPo",
  },
  {
    title: "Exercise Wallaby 2024: LinkedIn",
    description: "RSAF media feature on rapid software development at Exercise Wallaby.",
    type: "image",
    src: "images/xwb.jpeg",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7260626815856058368/",
  },
  {
    title: "CCIS Showcase on The Straits Times",
    description: "A brief introduction to CCIS development in the RSAF.",
    type: "image",
    src: "images/ccis.jpeg",
    url: "https://www.straitstimes.com/singapore/ai-data-analytics-improve-decision-making-process-but-human-touch-still-key-at-saf-exercise",
  },
];
