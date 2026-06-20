import { useMemo, useState } from "react";
import type { ProgressState } from "../hooks/useProgress";
import {
  chaptersByLevel,
  lessonsByLevel,
  getLesson,
} from "../data/lessons";
import type { LessonLevel } from "../types/lesson";
import { ProgressBar } from "../components/ProgressBar";
import { Icon } from "../components/Icon";

type Props = {
  state: ProgressState;
  initialLevel?: LessonLevel;
  onOpenLesson: (id: string) => void;
};

const LEVELS: { key: LessonLevel; title: string; color: "beginner" | "intermediate" | "advanced" }[] = [
  { key: "beginner", title: "Beginner Stage", color: "beginner" },
  { key: "intermediate", title: "Intermediate Stage", color: "intermediate" },
  { key: "advanced", title: "Advanced Stage", color: "advanced" },
];

export function Roadmap({ state, initialLevel = "beginner", onOpenLesson }: Props) {
  const [active, setActive] = useState<LessonLevel>(initialLevel);

  const stats = useMemo(() => {
    const m: Record<LessonLevel, { total: number; done: number }> = {
      beginner: { total: 0, done: 0 },
      intermediate: { total: 0, done: 0 },
      advanced: { total: 0, done: 0 },
    };
    (Object.keys(lessonsByLevel) as LessonLevel[]).forEach((k) => {
      const list = lessonsByLevel[k];
      m[k].total = list.length;
      m[k].done = list.filter((l) => state.completed[l.id]).length;
    });
    return m;
  }, [state.completed]);

  return (
    <div className="px-4 pb-28 fade-in">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-4">
        {LEVELS.map((lv) => {
          const on = active === lv.key;
          const s = stats[lv.key];
          return (
            <button
              key={lv.key}
              onClick={() => setActive(lv.key)}
              className={`shrink-0 rounded-xl border px-3 py-2 text-left ${
                on
                  ? "border-accent-css/50 bg-accent-css/10"
                  : "border-bg-line bg-bg-card"
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-ink-mid">
                stage
              </div>
              <div className="text-[13px] font-bold">{lv.title}</div>
              <div className="mt-1 w-32">
                <ProgressBar value={s.total ? s.done / s.total : 0} color={lv.color} />
              </div>
              <div className="mt-1 text-[11px] font-mono text-ink-low">
                {s.done}/{s.total}
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        {chaptersByLevel[active].map((chap, ci) => {
          const lessons = chap.lessonIds
            .map(getLesson)
            .filter((x) => Boolean(x)) as ReturnType<typeof getLesson>[];
          const done = lessons.filter((l) => l && state.completed[l.id]).length;
          const progress = lessons.length ? done / lessons.length : 0;

          return (
            <section key={chap.id}>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-ink-mid">
                    Stage {ci + 1}
                  </div>
                  <h3 className="text-[15px] font-bold">{chap.title}</h3>
                  <div className="text-[12px] text-ink-mid mt-0.5">
                    {chap.description}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-mono text-ink-mid">
                    {done}/{lessons.length}
                  </div>
                </div>
              </div>
              <ProgressBar
                value={progress}
                color={
                  active === "beginner"
                    ? "beginner"
                    : active === "intermediate"
                    ? "intermediate"
                    : "advanced"
                }
              />
              <ol className="mt-3 relative">
                <div className="absolute left-[18px] top-2 bottom-2 w-px bg-bg-line" />
                {lessons.map((l, i) => {
                  if (!l) return null;
                  const isDone = !!state.completed[l.id];
                  const inReview = !!state.review[l.id];
                  // unlock: previous lesson done OR first lesson, OR earlier lessons in level done
                  const idx = lessons.findIndex((x) => x?.id === l.id);
                  const prev = idx > 0 ? lessons[idx - 1] : null;
                  const locked =
                    !isDone && prev ? !state.completed[prev.id] : false;
                  return (
                    <li key={l.id} className="relative pl-10 pb-3">
                      <div
                        className={`absolute left-0 top-0 w-9 h-9 rounded-full grid place-items-center border-2 ${
                          isDone
                            ? "border-emerald-400 bg-emerald-400/15 text-emerald-300"
                            : locked
                            ? "border-bg-line bg-bg-card text-ink-low"
                            : inReview
                            ? "border-sky-400 bg-sky-400/10 text-sky-300"
                            : "border-accent-css bg-accent-css/15 text-accent-css"
                        }`}
                      >
                        {isDone ? (
                          <Icon name="check" width={16} height={16} />
                        ) : locked ? (
                          <Icon name="lock" width={14} height={14} />
                        ) : (
                          <span className="text-[11px] font-mono font-bold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        )}
                      </div>
                      <button
                        disabled={locked}
                        onClick={() => onOpenLesson(l.id)}
                        className={`w-full text-left card p-3 ${
                          locked
                            ? "opacity-60"
                            : "hover:border-accent-css/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="chip border-bg-line text-ink-mid">
                            {l.category}
                          </span>
                          <span className="text-[10px] font-mono text-ink-low">
                            ≈ {l.estimatedMinutes} min · ★{l.difficulty}
                          </span>
                        </div>
                        <div className="text-[14px] font-semibold leading-snug">
                          {l.title}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
