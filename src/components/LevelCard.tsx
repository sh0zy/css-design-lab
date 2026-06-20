import type { LessonLevel } from "../types/lesson";
import { ProgressBar } from "./ProgressBar";
import { Icon, type IconName } from "./Icon";

type Props = {
  level: LessonLevel;
  total: number;
  done: number;
  description: string;
  onOpen?: () => void;
};

const META: Record<
  LessonLevel,
  { title: string; color: "beginner" | "intermediate" | "advanced"; icon: IconName }
> = {
  beginner: { title: "Beginner", color: "beginner", icon: "book" },
  intermediate: { title: "Intermediate", color: "intermediate", icon: "rocket" },
  advanced: { title: "Advanced", color: "advanced", icon: "trophy" },
};

const COLOR_BY_LEVEL = {
  beginner: "text-accent-beginner",
  intermediate: "text-accent-intermediate",
  advanced: "text-accent-advanced",
};

export function LevelCard({ level, total, done, description, onOpen }: Props) {
  const m = META[level];
  const value = total > 0 ? done / total : 0;
  return (
    <button
      onClick={onOpen}
      className="card p-4 w-full text-left hover:border-accent-css/30"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl bg-bg-soft grid place-items-center ${COLOR_BY_LEVEL[level]}`}
        >
          <Icon name={m.icon} />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-ink-mid">
            STAGE
          </div>
          <div className="text-base font-bold text-ink-high">{m.title}</div>
        </div>
        <div className="text-right">
          <div className={`text-base font-bold ${COLOR_BY_LEVEL[level]}`}>
            {done}/{total}
          </div>
          <div className="text-[11px] text-ink-low">Lessons</div>
        </div>
      </div>
      <p className="mt-2 text-[13px] text-ink-mid line-clamp-2">{description}</p>
      <div className="mt-3">
        <ProgressBar value={value} color={m.color} />
      </div>
    </button>
  );
}
