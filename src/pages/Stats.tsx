import { useMemo } from "react";
import type { ProgressState } from "../hooks/useProgress";
import { allLessons, lessonsByLevel } from "../data/lessons";
import { projects } from "../data/projects";
import { ProgressBar } from "../components/ProgressBar";
import { rankFromXp } from "../utils/progress";
import { Icon } from "../components/Icon";

type Props = {
  state: ProgressState;
  onOpenLesson: (id: string) => void;
};

export function Stats({ state, onOpenLesson }: Props) {
  const totals = useMemo(() => {
    const out: Record<
      "beginner" | "intermediate" | "advanced",
      { total: number; done: number }
    > = {
      beginner: { total: 0, done: 0 },
      intermediate: { total: 0, done: 0 },
      advanced: { total: 0, done: 0 },
    };
    (Object.keys(out) as (keyof typeof out)[]).forEach((k) => {
      out[k].total = lessonsByLevel[k].length;
      out[k].done = lessonsByLevel[k].filter((l) => state.completed[l.id]).length;
    });
    return out;
  }, [state.completed]);

  const projectsDone = Object.keys(state.completedProjects).length;

  const weak = useMemo(() => {
    const entries = Object.entries(state.weakCategories).sort(
      (a, b) => b[1] - a[1]
    );
    return entries.slice(0, 3);
  }, [state.weakCategories]);

  const reviewLessons = useMemo(
    () =>
      Object.keys(state.review)
        .map((id) => allLessons.find((l) => l.id === id))
        .filter(Boolean)
        .slice(0, 5),
    [state.review]
  );

  const { current, next, progress } = rankFromXp(state.xp);

  return (
    <div className="px-4 pb-28 fade-in">
      <div className="card p-4 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent-css/10 blur-2xl" />
        <div className="text-[11px] font-mono text-ink-mid uppercase tracking-wider">
          CSS RANK
        </div>
        <div className="text-[24px] font-bold mt-1">{current.name}</div>
        <div className="mt-3">
          <ProgressBar value={progress} color="css" height={6} />
          <div className="mt-1 text-[11px] font-mono text-ink-low text-right">
            {next ? `${current.name} → ${next.name}` : "MAX"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Big label="Total XP" value={state.xp.toString()} />
        <Big label="Streak" value={`${state.streak.count}日`} />
        <Big
          label="Done Lessons"
          value={`${Object.keys(state.completed).length}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <Big
          label="Mini UI"
          value={`${projectsDone}/${projects.length}`}
        />
        <Big
          label="Today"
          value={`${state.todayCount} / ${state.goalLessonsPerDay}`}
        />
      </div>

      <section className="mt-5">
        <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid mb-2">
          // level progress
        </h2>
        <div className="grid gap-2">
          {(["beginner", "intermediate", "advanced"] as const).map((lv) => {
            const t = totals[lv];
            const v = t.total ? t.done / t.total : 0;
            return (
              <div key={lv} className="card p-3">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`text-[13px] font-bold ${
                      lv === "beginner"
                        ? "text-accent-beginner"
                        : lv === "intermediate"
                        ? "text-accent-intermediate"
                        : "text-accent-advanced"
                    }`}
                  >
                    {lv}
                  </div>
                  <div className="text-[12px] font-mono text-ink-mid">
                    {t.done}/{t.total}
                  </div>
                </div>
                <ProgressBar value={v} color={lv} />
              </div>
            );
          })}
        </div>
      </section>

      {weak.length > 0 && (
        <section className="mt-5">
          <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid mb-2">
            // weak categories
          </h2>
          <div className="card p-3">
            <ul className="space-y-2">
              {weak.map(([cat, count]) => (
                <li
                  key={cat}
                  className="flex items-center justify-between text-[13.5px]"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="alert" width={14} height={14} className="text-accent-warn" />
                    {cat}
                  </span>
                  <span className="font-mono text-[12px] text-ink-mid">
                    miss × {count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {reviewLessons.length > 0 && (
        <section className="mt-5">
          <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid mb-2">
            // review queue
          </h2>
          <div className="grid gap-2">
            {reviewLessons.map(
              (l) =>
                l && (
                  <button
                    key={l.id}
                    onClick={() => onOpenLesson(l.id)}
                    className="card p-3 text-left hover:border-accent-css/40"
                  >
                    <div className="text-[12px] font-mono text-ink-low">
                      #{l.id}
                    </div>
                    <div className="text-[14px] font-semibold mt-0.5">
                      {l.title}
                    </div>
                  </button>
                )
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function Big({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-3 text-center">
      <div className="text-[10px] font-mono text-ink-low tracking-wider uppercase">
        {label}
      </div>
      <div className="text-[20px] font-bold mt-1">{value}</div>
    </div>
  );
}
