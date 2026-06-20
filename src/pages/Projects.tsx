import { useState } from "react";
import type { ProgressState } from "../hooks/useProgress";
import { projects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { CodeBlock } from "../components/CodeBlock";
import { Icon } from "../components/Icon";
import type { Project } from "../types/project";

type Props = {
  state: ProgressState;
  onComplete: (id: string) => void;
};

export function Projects({ state, onComplete }: Props) {
  const [active, setActive] = useState<Project | null>(null);

  if (active) {
    const done = !!state.completedProjects[active.id];
    return (
      <div className="px-4 pb-28 fade-in">
        <button
          onClick={() => setActive(null)}
          className="text-[12px] font-mono text-ink-mid mb-3 inline-flex items-center gap-1"
        >
          <Icon name="back" width={14} height={14} /> Missions
        </button>
        <div className="card p-4">
          <div className="text-[11px] font-mono text-ink-low">
            MISSION · {active.category} · ★{active.difficulty}
          </div>
          <h1 className="text-[20px] font-bold mt-1">{active.title}</h1>
          <p className="mt-2 text-[14px] text-ink-mid">{active.description}</p>
          <p className="mt-2 text-[13px] text-ink-high">
            <span className="text-accent-css">Goal: </span>
            {active.goal}
          </p>
        </div>

        <Section title="必要なCSS知識">
          <ul className="flex flex-wrap gap-1.5">
            {active.requiredKnowledge.map((k) => (
              <li key={k} className="chip border-bg-line text-ink-mid">
                {k}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="作るUI">
          <p className="text-[13.5px] text-ink-mid leading-relaxed">
            {active.uiDescription}
          </p>
        </Section>

        <Section title="使うCSSプロパティ">
          <ul className="flex flex-wrap gap-1.5">
            {active.cssProperties.map((p) => (
              <li
                key={p}
                className="chip border-accent-css/40 text-accent-css bg-accent-css/10"
              >
                {p}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="制作ステップ">
          <ol className="space-y-2">
            {active.steps.map((s, i) => (
              <li
                key={i}
                className="card p-3 text-[14px] text-ink-high flex gap-3"
              >
                <span className="font-mono text-[12px] text-accent-css w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="HTML">
          <CodeBlock code={active.htmlExample} fileName="index.html" lang="html" />
        </Section>

        <Section title="CSS">
          <CodeBlock
            code={active.cssExample}
            fileName={active.cssFileName ?? "style.css"}
            lang="css"
          />
        </Section>

        <Section title="発展課題">
          <ul className="space-y-1.5">
            {active.bonus.map((b) => (
              <li key={b} className="text-[13px] text-ink-mid flex gap-2">
                <span className="text-accent-info">＋</span>
                {b}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Reactへの接続">
          <p className="text-[13.5px] text-ink-mid leading-relaxed">
            {active.reactConnection}
          </p>
        </Section>

        <Section title="Tailwindへの接続">
          <p className="text-[13.5px] text-ink-mid leading-relaxed">
            {active.tailwindConnection}
          </p>
        </Section>

        <button
          onClick={() => onComplete(active.id)}
          className={`mt-6 h-12 w-full ${done ? "btn-ghost" : "btn-primary"}`}
        >
          <Icon name="check" />
          {done ? "完了済み" : "Mission完了 (+60 XP)"}
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 fade-in">
      <div className="card p-4 mb-4">
        <div className="text-accent-css text-[11px] font-mono uppercase tracking-wider">
          // missions
        </div>
        <h1 className="text-[18px] font-bold mt-1">Mini UI Projects</h1>
        <p className="text-[13px] text-ink-mid mt-1">
          学んだCSSを使って、実際の部品やUIを作ろう。完成したら完了マークでXP獲得。
        </p>
      </div>
      <div className="grid gap-2">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            done={!!state.completedProjects[p.id]}
            onOpen={() => setActive(p)}
          />
        ))}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid mb-2">
        // {title}
      </h2>
      {children}
    </section>
  );
}
