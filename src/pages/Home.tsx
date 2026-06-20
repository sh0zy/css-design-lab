import { useMemo } from "react";
import type { ProgressState } from "../hooks/useProgress";
import { ProgressCard } from "../components/ProgressCard";
import { LessonCard } from "../components/LessonCard";
import { LevelCard } from "../components/LevelCard";
import { allLessons, lessonsByLevel } from "../data/lessons";
import type { Lesson, LessonLevel } from "../types/lesson";
import { Icon } from "../components/Icon";

type Props = {
  state: ProgressState;
  onOpenLesson: (id: string) => void;
  onGoTo: (
    page: "roadmap" | "lessons" | "practice" | "stats" | "projects" | "lab"
  ) => void;
  onToggleFavorite: (id: string) => void;
  onOpenLevel: (level: LessonLevel) => void;
};

export function Home({
  state,
  onOpenLesson,
  onGoTo,
  onToggleFavorite,
  onOpenLevel,
}: Props) {
  const doneCount = Object.keys(state.completed).length;
  const total = allLessons.length;

  const next = useMemo(() => {
    return allLessons.find((l) => !state.completed[l.id]);
  }, [state.completed]);

  const recents = useMemo(() => {
    const ids = Object.keys(state.completed);
    return ids
      .map((id) => allLessons.find((l) => l.id === id))
      .filter((x): x is Lesson => Boolean(x))
      .slice(-3)
      .reverse();
  }, [state.completed]);

  const reviews = useMemo(
    () =>
      Object.keys(state.review)
        .map((id) => allLessons.find((l) => l.id === id))
        .filter((x): x is Lesson => Boolean(x))
        .slice(0, 3),
    [state.review]
  );

  return (
    <div className="px-4 pb-28 fade-in">
      <ProgressCard
        state={state}
        totalLessons={total}
        doneLessons={doneCount}
      />

      {next && (
        <section className="mt-5">
          <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid mb-2">
            // today's lesson
          </h2>
          <div className="card p-4 hover:border-accent-css/40">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="chip border-accent-css/40 text-accent-css bg-accent-css/10">
                Today
              </span>
              <span className="chip border-bg-line text-ink-mid">
                {next.category}
              </span>
            </div>
            <div className="text-[17px] font-bold leading-snug">
              {next.title}
            </div>
            <p className="mt-1 text-[13px] text-ink-mid line-clamp-2">
              {next.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-[11px] font-mono text-ink-low">
                ≈ {next.estimatedMinutes} min · ★{next.difficulty}
              </div>
              <button
                onClick={() => onOpenLesson(next.id)}
                className="btn-primary px-4 py-2 text-[13px]"
              >
                <Icon name="play" width={14} height={14} />
                Start
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid">
            // stages
          </h2>
          <button
            onClick={() => onGoTo("roadmap")}
            className="text-[12px] font-mono text-accent-css"
          >
            View all ›
          </button>
        </div>
        <div className="grid gap-2">
          {(["beginner", "intermediate", "advanced"] as LessonLevel[]).map(
            (lv) => {
              const list = lessonsByLevel[lv];
              const done = list.filter((l) => state.completed[l.id]).length;
              return (
                <LevelCard
                  key={lv}
                  level={lv}
                  total={list.length}
                  done={done}
                  description={
                    lv === "beginner"
                      ? "CSSの基本 / 文字 / 余白 / ボックス / ボタン / カード制作。"
                      : lv === "intermediate"
                      ? "Flexbox / Grid / レスポンシブ / 実践UI / Tailwind連携。"
                      : "設計 / 詳細度 / デザインシステム / A11y / 性能 / 最終LP。"
                  }
                  onOpen={() => onOpenLevel(lv)}
                />
              );
            }
          )}
        </div>
      </section>

      <section className="mt-6 grid grid-cols-3 gap-2">
        <button
          onClick={() => onGoTo("practice")}
          className="card p-3 text-left hover:border-accent-css/40"
        >
          <div className="text-accent-info mb-1">
            <Icon name="bolt" />
          </div>
          <div className="text-[13px] font-bold">Practice</div>
          <div className="text-[11px] text-ink-mid mt-0.5">CSS練習</div>
        </button>
        <button
          onClick={() => onGoTo("lab")}
          className="card p-3 text-left hover:border-accent-css/40"
        >
          <div className="text-accent-css mb-1">
            <Icon name="wand" />
          </div>
          <div className="text-[13px] font-bold">Layout Lab</div>
          <div className="text-[11px] text-ink-mid mt-0.5">配置の実験室</div>
        </button>
        <button
          onClick={() => onGoTo("projects")}
          className="card p-3 text-left hover:border-accent-css/40"
        >
          <div className="text-accent-pink mb-1">
            <Icon name="rocket" />
          </div>
          <div className="text-[13px] font-bold">Mini UI</div>
          <div className="text-[11px] text-ink-mid mt-0.5">制作課題</div>
        </button>
      </section>

      {recents.length > 0 && (
        <section className="mt-6">
          <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid mb-2">
            // recently learned
          </h2>
          <div className="grid gap-2">
            {recents.map((l) => (
              <LessonCard
                key={l.id}
                lesson={l}
                index={allLessons.indexOf(l)}
                done
                isFavorite={!!state.favorites[l.id]}
                onOpen={() => onOpenLesson(l.id)}
                onToggleFavorite={() => onToggleFavorite(l.id)}
                inReview={!!state.review[l.id]}
              />
            ))}
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="mt-6">
          <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-mid mb-2">
            // review
          </h2>
          <div className="grid gap-2">
            {reviews.map((l) => (
              <LessonCard
                key={l.id}
                lesson={l}
                index={allLessons.indexOf(l)}
                done={!!state.completed[l.id]}
                inReview
                isFavorite={!!state.favorites[l.id]}
                onOpen={() => onOpenLesson(l.id)}
                onToggleFavorite={() => onToggleFavorite(l.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
