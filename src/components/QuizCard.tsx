import { useState } from "react";
import type { Lesson } from "../types/lesson";
import { Icon } from "./Icon";

type Props = {
  quiz: Lesson["quiz"];
  onResult?: (correct: boolean) => void;
  onAddReview?: () => void;
};

export function QuizCard({ quiz, onResult, onAddReview }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const choose = (i: number) => {
    if (revealed) return;
    setPicked(i);
    setRevealed(true);
    onResult?.(i === quiz.answerIndex);
  };

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="chip border-accent-css/40 text-accent-css bg-accent-css/10">
          Quiz
        </span>
        <span className="text-[12px] font-mono text-ink-mid">4択</span>
      </div>
      <div className="text-[15px] font-semibold text-ink-high leading-snug mb-3">
        {quiz.question}
      </div>
      <ul className="space-y-2">
        {quiz.choices.map((c, i) => {
          const isAnswer = i === quiz.answerIndex;
          const isPicked = picked === i;
          let cls =
            "border-bg-line bg-bg-soft hover:border-accent-css/30 text-ink-high";
          if (revealed) {
            if (isAnswer)
              cls =
                "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
            else if (isPicked)
              cls = "border-accent-warn/40 bg-accent-warn/10 text-accent-warn";
            else cls = "border-bg-line bg-bg-soft text-ink-mid";
          }
          return (
            <li key={i}>
              <button
                onClick={() => choose(i)}
                className={`w-full text-left p-3 rounded-xl border ${cls}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[12px] w-5 text-ink-low">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{c}</span>
                  {revealed && isAnswer && (
                    <Icon name="check" width={16} height={16} />
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      {revealed && (
        <div className="mt-3 p-3 rounded-xl border border-bg-line bg-bg-soft text-[13px] text-ink-mid">
          <div className="text-[11px] font-mono uppercase tracking-wider text-ink-low mb-1">
            解説
          </div>
          {quiz.explanation}
          {picked !== quiz.answerIndex && (
            <div className="mt-2">
              <button
                onClick={onAddReview}
                className="text-[12px] text-accent-intermediate hover:underline"
              >
                ＋ 復習リストに追加
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
