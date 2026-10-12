import { ActiveComponent } from "../@types/ActiveComponent";

export interface Topic {
  id: ActiveComponent;
  label: string;
  prompt: string;
  keywords: string[];
}

// Order here drives the sidebar numbering and the suggestion chips.
export const topics: Topic[] = [
  { id: ActiveComponent.AboutMe, label: "About me", prompt: "Tell me more about yourself", keywords: ["about", "who", "summary", "bio", "intro"] },
  { id: ActiveComponent.CareerExperience, label: "Career", prompt: "Walk me through your career", keywords: ["career", "work", "experience", "job", "role", "raid", "rsaf", "air force"] },
  { id: ActiveComponent.TechnicalExperience, label: "Projects", prompt: "Show me concrete projects", keywords: ["project", "build", "built", "app", "astro", "sage", "ccis", "sentinel", "technical", "capabilit"] },
  { id: ActiveComponent.Study, label: "Education", prompt: "What did you study?", keywords: ["education", "study", "school", "degree", "university", "imperial", "ntu", "msc"] },
  { id: ActiveComponent.TechStack, label: "Tech stack", prompt: "What is your tech stack?", keywords: ["tech", "stack", "skill", "language", "react", "python", "tools"] },
  { id: ActiveComponent.MediaCoverage, label: "Media", prompt: "Any media coverage?", keywords: ["media", "news", "press", "video", "straits", "interview"] },
];

export function findTopic(query: string, exclude: ActiveComponent[]): Topic | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  const open = topics.filter((t) => !exclude.includes(t.id));
  // Pass 1: the query appears in a topic's label or prompt (strongest signal).
  // Pass 2: fall back to keyword matches.
  return (
    open.find((t) => t.label.toLowerCase().includes(q) || t.prompt.toLowerCase().includes(q)) ??
    open.find((t) => t.keywords.some((k) => q.includes(k) || k.includes(q)))
  );
}
