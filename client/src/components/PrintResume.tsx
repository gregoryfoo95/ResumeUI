import { profile, roles, projects, skills, education, certifications, honors } from "../data/profile";

// Print-only resume. Hidden on screen; shown (and everything else hidden) by the
// browser's print dialog, so "Save as PDF" yields a clean one-document resume
// generated from the same data as the interactive site.
export default function PrintResume(): JSX.Element {
  return (
    <article
      id="print-resume"
      aria-hidden="true"
      className="hidden bg-white p-0 text-left text-[10.5pt] leading-snug text-black print:block"
    >
      <header className="border-b border-black pb-2">
        <h1 className="text-[20pt] font-bold">
          {profile.name} <span lang="zh">{profile.nameZh}</span>
        </h1>
        <p className="text-[11pt]">
          {profile.currentRole} · {profile.location}
        </p>
        <p className="text-[9.5pt]">
          {profile.links.linkedin.replace("https://", "")} · {profile.links.github.replace("https://", "")}
        </p>
      </header>

      <Section title="Summary">
        {profile.summary.map((p) => (
          <p key={p.slice(0, 24)} className="mb-1">
            {p}
          </p>
        ))}
      </Section>

      <Section title="Experience">
        {roles.map((r) => (
          <div key={r.title + r.start} className="mb-2 break-inside-avoid">
            <p className="font-bold">
              {r.title} <span className="font-normal">· {r.org}</span>
            </p>
            <p className="text-[9.5pt] italic">
              {r.start} – {r.end}
              {r.location ? ` · ${r.location}` : ""}
            </p>
            <ul className="ml-4 list-disc">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {r.tags && <p className="text-[9.5pt]">Tech: {r.tags.join(", ")}</p>}
          </div>
        ))}
      </Section>

      <Section title="Selected Projects">
        {projects.map((p) => (
          <p key={p.name} className="mb-1 break-inside-avoid">
            <span className="font-bold">
              {p.name} ({p.org}):
            </span>{" "}
            {p.blurb} <span className="text-[9.5pt] italic">[{p.stack.join(", ")}]</span>
          </p>
        ))}
      </Section>

      <Section title="Skills">
        {skills.map((g) => (
          <p key={g.title}>
            <span className="font-bold">{g.title}:</span> {g.items.join(", ")}
          </p>
        ))}
      </Section>

      <Section title="Education">
        {education.map((e) => (
          <div key={e.institution} className="mb-1 break-inside-avoid">
            <p>
              <span className="font-bold">{e.institution}</span>, {e.degree} ({e.years})
              {e.grade ? ` · ${e.grade}` : ""}
            </p>
            {e.awards?.map((a) => (
              <p key={a} className="ml-4 text-[9.5pt]">
                {a}
              </p>
            ))}
          </div>
        ))}
      </Section>

      <Section title="Certifications">
        <ul className="ml-4 list-disc">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section title="Honors & Awards">
        <ul className="ml-4 list-disc">
          {honors.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }): JSX.Element {
  return (
    <section className="mt-3">
      <h2 className="mb-1 border-b border-black/40 text-[11.5pt] font-bold uppercase tracking-wide">{title}</h2>
      {children}
    </section>
  );
}
