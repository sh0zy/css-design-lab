import { useMemo, useState } from "react";
import type { ProgressState } from "../hooks/useProgress";
import { allLessons, lessonsByLevel } from "../data/lessons";
import type { Lesson, LessonLevel } from "../types/lesson";
import { LessonCard } from "../components/LessonCard";
import { Icon } from "../components/Icon";

type Props = {
  state: ProgressState;
  onOpenLesson: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  initialLevel?: LessonLevel;
};

type Filter = "all" | "todo" | "done" | "review" | "favorite";

export function Lessons({
  state,
  onOpenLesson,
  onToggleFavorite,
  initialLevel,
}: Props) {
  const [level, setLevel] = useState<LessonLevel | "all">(
    initialLevel ?? "all"
  );
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    allLessons.forEach((l) => set.add(l.category));
    return ["all", ...Array.from(set)];
  }, []);
  const [cat, setCat] = useState<string>("all");

  const list = useMemo(() => {
    const base: Lesson[] =
      level === "all" ? allLessons : lessonsByLevel[level];
    const k = q.trim().toLowerCase();
    return base.filter((l) => {
      if (cat !== "all" && l.category !== cat) return false;
      if (filter === "todo" && state.completed[l.id]) return false;
      if (filter === "done" && !state.completed[l.id]) return false;
      if (filter === "review" && !state.review[l.id]) return false;
      if (filter === "favorite" && !state.favorites[l.id]) return false;
      if (k) {
        const hay = (l.title + " " + l.description + " " + l.category).toLowerCase();
        if (!hay.includes(k)) return false;
      }
      return true;
    });
  }, [level, filter, cat, q, state.completed, state.review, state.favorites]);

  return (
    <div className="px-4 pb-28 fade-in">
      <div className="flex gap-2 mb-3">
        <div className="flex-1 flex items-center gap-2 px-3 h-10 rounded-xl bg-bg-soft border border-bg-line">
          <Icon name="search" width={16} height={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Lessonを検索"
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-ink-low"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-ink-low">
              <Icon name="close" width={14} height={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-3">
        {(["all", "beginner", "intermediate", "advanced"] as const).map((lv) => (
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

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-3">
        {(
          [
            { k: "all", l: "All" },
            { k: "todo", l: "未完了" },
            { k: "done", l: "完了" },
            { k: "review", l: "復習" },
            { k: "favorite", l: "★" },
          ] as { k: Filter; l: string }[]
        ).map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className={`shrink-0 px-3 h-8 rounded-full text-[12px] border ${
              filter === f.k
                ? "border-accent-css/50 text-accent-css bg-accent-css/10"
                : "border-bg-line text-ink-mid"
            }`}
          >
            {f.l}
          </button>
        ))}
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 px-3 h-7 rounded-full text-[11px] border ${
              cat === c
                ? "border-accent-css/40 text-accent-css bg-accent-css/10"
                : "border-bg-line text-ink-mid"
            }`}
          >
            {c === "all" ? "all categories" : c}
          </button>
        ))}
      </div>

      <div className="text-[11px] font-mono text-ink-low mb-2">
        {list.length} lessons
      </div>

      <div className="grid gap-2">
        {list.map((l) => (
          <LessonCard
            key={l.id}
            lesson={l}
            index={allLessons.indexOf(l)}
            done={!!state.completed[l.id]}
            inReview={!!state.review[l.id]}
            isFavorite={!!state.favorites[l.id]}
            onOpen={() => onOpenLesson(l.id)}
            onToggleFavorite={() => onToggleFavorite(l.id)}
          />
        ))}
        {list.length === 0 && (
          <div className="card p-8 text-center text-[13px] text-ink-mid">
            条件に合うLessonがありません
          </div>
        )}
      </div>
    </div>
  );
}
