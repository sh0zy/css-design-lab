import { useMemo, useState } from "react";
import type { ProgressState } from "../hooks/useProgress";
import { allLessons } from "../data/lessons";
import { PracticeBox } from "../components/PracticeBox";
import { QuizCard } from "../components/QuizCard";
import { Icon } from "../components/Icon";
import type { Lesson, LessonLevel } from "../types/lesson";

type Props = {
  state: ProgressState;
  onToggleReview: (id: string) => void;
  onOpenLesson: (id: string) => void;
};

export function Practice({ state, onToggleReview, onOpenLesson }: Props) {
  const [level, setLevel] = useState<LessonLevel | "all">("all");
  const [seed, setSeed] = useState(0);

  const lesson = useMemo<Lesson | undefined>(() => {
    const pool =
      level === "all"
        ? allLessons
        : allLessons.filter((l) => l.level === level);
    if (pool.length === 0) return undefined;
    const i = Math.floor(Math.random() * pool.length);
    return pool[i];
    // seed dependency forces re-pick
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, seed]);

  const reviewLessons = useMemo(
    () =>
      Object.keys(state.review)
        .map((id) => allLessons.find((l) => l.id === id))
        .filter((l): l is Lesson => Boolean(l)),
    [state.review]
  );

  return (
    <div className="px-4 pb-28 fade-in">
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="chip border-accent-info/40 text-accent-info bg-accent-info/10">
            Practice Dojo
          </span>
        </div>
        <p className="text-[13px] text-ink-mid">
          ランダムなLessonの練習問題とクイズで腕試し。詰まったらヒント／解答を見て、わかったら復習リストへ。
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {(
              ["all", "beginner", "intermediate", "advanced"] as const
            ).map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                className={`shrink-0 px-3 h-8 rounded-full text-[12px] font-mono border ${
                  level === lv
                    ? "border-accent-css/50 bg-accent-css/10 text-accent-css"
                    : "border-bg-line text-ink-mid"
                }`}
              >
                {lv}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="ml-auto btn-ghost px-3 py-2 text-[13px]"
          >
            <Icon name="refresh" width={14} height={14} /> Re-roll
          </button>
        </div>
      </div>

      {lesson && (
        <>
          <button
            onClick={() => onOpenLesson(lesson.id)}
            className="mt-4 card p-3 w-full text-left hover:border-accent-css/40"
          >
            <div className="text-[11px] font-mono text-ink-low">
              from #{lesson.id}
            </div>
            <div className="text-[15px] font-bold mt-0.5">{lesson.title}</div>
            <div className="text-[12px] text-ink-mid mt-0.5 line-clamp-2">
              {lesson.description}
            </div>
          </button>

          <div className="mt-3">
            <PracticeBox
              key={`p-${lesson.id}-${seed}`}
              practice={lesson.practice}
            />
          </div>
          <div className="mt-3">
            <QuizCard
              key={`q-${lesson.id}-${seed}`}
              quiz={lesson.quiz}
              onAddReview={() => onToggleReview(lesson.id)}
            />
          </div>
        </>
      )}

      {reviewLessons.length > 0 && (
        <section className="mt-6">
          <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid mb-2">
            // review list
          </h2>
          <div className="grid gap-2">
            {reviewLessons.map((l) => (
              <button
                key={l.id}
                onClick={() => onOpenLesson(l.id)}
                className="card p-3 w-full text-left hover:border-accent-css/40"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="chip border-sky-500/40 text-sky-300 bg-sky-500/10">
                    復習
                  </span>
                  <span className="chip border-bg-line text-ink-mid">
                    {l.category}
                  </span>
                </div>
                <div className="text-[14px] font-semibold">{l.title}</div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
