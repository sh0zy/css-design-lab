import type { Lesson } from "../types/lesson";
import { Icon } from "./Icon";

type Props = {
  lesson: Lesson;
  index: number;
  done?: boolean;
  inReview?: boolean;
  isFavorite?: boolean;
  locked?: boolean;
  onOpen?: () => void;
  onToggleFavorite?: () => void;
};

const LEVEL_COLOR = {
  beginner: "text-accent-beginner border-accent-beginner/40 bg-accent-beginner/10",
  intermediate:
    "text-accent-intermediate border-accent-intermediate/40 bg-accent-intermediate/10",
  advanced:
    "text-accent-advanced border-accent-advanced/40 bg-accent-advanced/10",
} as const;

export function LessonCard({
  lesson,
  index,
  done,
  inReview,
  isFavorite,
  locked,
  onOpen,
  onToggleFavorite,
}: Props) {
  const stars = "★".repeat(lesson.difficulty) + "☆".repeat(5 - lesson.difficulty);
  return (
    <button
      onClick={locked ? undefined : onOpen}
      className={`card w-full text-left p-3 flex gap-3 ${
        locked ? "opacity-60" : "hover:border-accent-css/40"
      }`}
      disabled={locked}
    >
      <div className="font-mono text-[11px] text-ink-low w-10 pt-1 select-none">
        {String(index + 1).padStart(3, "0")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`chip ${LEVEL_COLOR[lesson.level]}`}>
            {lesson.level}
          </span>
          <span className="chip border-bg-line text-ink-mid">
            {lesson.category}
          </span>
          {done && (
            <span className="chip border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
              <Icon name="check" width={12} height={12} />
              <span className="ml-0.5">完了</span>
            </span>
          )}
          {inReview && !done && (
            <span className="chip border-sky-500/40 text-sky-300 bg-sky-500/10">
              復習
            </span>
          )}
        </div>
        <div className="text-[15px] font-semibold text-ink-high leading-snug">
          {lesson.title}
        </div>
        <div className="mt-1 text-[12.5px] text-ink-mid line-clamp-2">
          {lesson.description}
        </div>
        <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-ink-low">
          <span>≈ {lesson.estimatedMinutes} min</span>
          <span className="text-accent-css/80">{stars}</span>
          {locked && (
            <span className="inline-flex items-center gap-1 text-ink-low">
              <Icon name="lock" width={12} height={12} /> 未開放
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <span
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          role="button"
          aria-label="お気に入り"
          className={`p-1 rounded ${
            isFavorite ? "text-accent-css" : "text-ink-low"
          }`}
        >
          <Icon name={isFavorite ? "starFilled" : "star"} />
        </span>
        {!locked && (
          <span
            className={`mt-2 text-[11px] font-mono ${
              done ? "text-ink-low" : "text-accent-css"
            }`}
          >
            {done ? "Review" : "Start ›"}
          </span>
        )}
      </div>
    </button>
  );
}
