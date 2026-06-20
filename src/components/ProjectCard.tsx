import type { Project } from "../types/project";
import { Icon } from "./Icon";

type Props = {
  project: Project;
  index: number;
  done?: boolean;
  onOpen?: () => void;
};

const DIFF_COLOR = (d: number) => {
  if (d <= 2) return "border-accent-beginner/40 text-accent-beginner bg-accent-beginner/10";
  if (d <= 3)
    return "border-accent-intermediate/40 text-accent-intermediate bg-accent-intermediate/10";
  return "border-accent-advanced/40 text-accent-advanced bg-accent-advanced/10";
};

export function ProjectCard({ project, index, done, onOpen }: Props) {
  const stars =
    "★".repeat(project.difficulty) + "☆".repeat(5 - project.difficulty);
  return (
    <button
      onClick={onOpen}
      className="card w-full text-left p-4 hover:border-accent-css/40"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[11px] font-mono text-ink-low">
          MISSION {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`chip ${DIFF_COLOR(project.difficulty)}`}>
          {project.category}
        </span>
        {done && (
          <span className="chip border-emerald-500/40 text-emerald-400 bg-emerald-500/10 inline-flex items-center gap-1">
            <Icon name="check" width={12} height={12} /> 完了
          </span>
        )}
      </div>
      <div className="text-[16px] font-bold leading-snug text-ink-high">
        {project.title}
      </div>
      <p className="mt-1.5 text-[13px] text-ink-mid line-clamp-2">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.requiredKnowledge.slice(0, 4).map((k) => (
          <span key={k} className="chip border-bg-line text-ink-mid">
            {k}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[12px] font-mono">
        <span className="text-ink-low">
          steps: {project.steps.length} ・ ≈ {project.estimatedMinutes}min
        </span>
        <span className="text-accent-css/80">{stars}</span>
      </div>
    </button>
  );
}
