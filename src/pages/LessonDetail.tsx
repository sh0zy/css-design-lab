import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "../types/lesson";
import type { ProgressState } from "../hooks/useProgress";
import { allLessons } from "../data/lessons";
import { CodeBlock } from "../components/CodeBlock";
import { QuizCard } from "../components/QuizCard";
import { PracticeBox } from "../components/PracticeBox";
import { StylePreview } from "../components/StylePreview";
import { BeforeAfterPreview } from "../components/BeforeAfterPreview";
import { Icon } from "../components/Icon";
import { xpForLesson } from "../utils/progress";

type Props = {
  lesson: Lesson;
  state: ProgressState;
  onComplete: (lesson: Lesson, opts?: { quizCorrect?: boolean }) => void;
  onToggleFavorite: (id: string) => void;
  onToggleReview: (id: string) => void;
  onOpenLesson: (id: string) => void;
};

export function LessonDetail({
  lesson,
  state,
  onComplete,
  onToggleFavorite,
  onToggleReview,
  onOpenLesson,
}: Props) {
  const isDone = !!state.completed[lesson.id];
  const isFav = !!state.favorites[lesson.id];
  const inReview = !!state.review[lesson.id];
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const [practicePassed, setPracticePassed] = useState(false);

  useEffect(() => {
    setQuizCorrect(null);
    setPracticePassed(false);
    window.scrollTo({ top: 0 });
  }, [lesson.id]);

  const strict = !!state.strictMode;
  const gated = strict && !(practicePassed && quizCorrect === true);

  const next = useMemo(() => {
    const idx = allLessons.findIndex((l) => l.id === lesson.id);
    return allLessons[idx + 1];
  }, [lesson.id]);

  const xp = xpForLesson(lesson.difficulty, lesson.level);

  return (
    <div className="px-4 pb-28 fade-in">
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="chip border-bg-line text-ink-mid font-mono">
            #{lesson.id}
          </span>
          <span
            className={`chip ${
              lesson.level === "beginner"
                ? "border-accent-beginner/40 text-accent-beginner bg-accent-beginner/10"
                : lesson.level === "intermediate"
                ? "border-accent-intermediate/40 text-accent-intermediate bg-accent-intermediate/10"
                : "border-accent-advanced/40 text-accent-advanced bg-accent-advanced/10"
            }`}
          >
            {lesson.level}
          </span>
          <span className="chip border-bg-line text-ink-mid">
            {lesson.category}
          </span>
          <span className="chip border-bg-line text-ink-low">
            {lesson.chapter}
          </span>
        </div>
        <h1 className="text-[20px] font-bold leading-tight">{lesson.title}</h1>
        <p className="mt-2 text-[14px] text-ink-mid leading-relaxed">
          {lesson.description}
        </p>
        <div className="mt-3 flex items-center gap-3 text-[12px] font-mono text-ink-low">
          <span>≈ {lesson.estimatedMinutes} min</span>
          <span className="text-accent-css/80">
            {"★".repeat(lesson.difficulty) + "☆".repeat(5 - lesson.difficulty)}
          </span>
          <span>+{xp} XP</span>
          <button
            onClick={() => onToggleFavorite(lesson.id)}
            className={`ml-auto inline-flex items-center gap-1 ${
              isFav ? "text-accent-css" : "text-ink-mid"
            }`}
            aria-label="お気に入り"
          >
            <Icon name={isFav ? "starFilled" : "star"} width={16} height={16} />
            <span className="text-[11px] font-mono">Fav</span>
          </button>
          <button
            onClick={() => onToggleReview(lesson.id)}
            className={`inline-flex items-center gap-1 ${
              inReview ? "text-accent-intermediate" : "text-ink-mid"
            }`}
          >
            <Icon name="bolt" width={14} height={14} />
            <span className="text-[11px] font-mono">復習</span>
          </button>
        </div>
      </div>

      <Section title="今日学ぶこと">
        <ul className="space-y-1.5">
          {lesson.goals.map((g, i) => (
            <li key={i} className="flex gap-2 text-[14px] text-ink-high">
              <span className="text-accent-css mt-0.5">
                <Icon name="check" width={14} height={14} />
              </span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="やさしい説明">
        <p className="text-[14px] text-ink-high leading-relaxed">
          {lesson.explanation}
        </p>
      </Section>

      <Section title="Webページではどこで使う？">
        <p className="text-[14px] text-ink-mid leading-relaxed">
          {lesson.webUseCase}
        </p>
      </Section>

      <Section title="HTMLとのつながり">
        <p className="text-[14px] text-ink-mid leading-relaxed">
          {lesson.htmlConnection}
        </p>
      </Section>

      <Section title="JS / Reactとのつながり">
        <p className="text-[14px] text-ink-mid leading-relaxed">
          {lesson.jsReactConnection}
        </p>
      </Section>

      <Section title="Tailwindとのつながり">
        <p className="text-[14px] text-ink-mid leading-relaxed">
          {lesson.tailwindConnection}
        </p>
      </Section>

      <Section title="CSS Example">
        <CodeBlock
          code={lesson.cssExample}
          fileName={lesson.cssFileName ?? "style.css"}
          lang="css"
        />
        <ul className="mt-3 space-y-1.5">
          {lesson.codeExplanation.map((c, i) => (
            <li
              key={i}
              className="text-[13.5px] text-ink-mid leading-relaxed flex gap-2"
            >
              <span className="text-accent-css shrink-0 font-mono">›</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      {lesson.htmlExample && (
        <Section title="HTML Example">
          <CodeBlock
            code={lesson.htmlExample}
            fileName="index.html"
            lang="html"
          />
        </Section>
      )}

      <Section title="見た目のプレビュー">
        <StylePreview
          description={lesson.previewDescription}
          visualChange={lesson.visualChange}
        />
      </Section>

      <Section title="Before / After">
        <BeforeAfterPreview
          before="プレーンな表示"
          after={lesson.title}
          changedNote={lesson.visualChange}
        />
      </Section>

      <Section title="よくあるミス">
        <ul className="space-y-2">
          {lesson.commonMistakes.map((m, i) => (
            <li
              key={i}
              className="card p-3 text-[13px] text-ink-mid border-accent-warn/30 bg-accent-warn/5"
            >
              <span className="text-accent-warn font-mono mr-1.5">!</span>
              {m}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Practice">
        <PracticeBox
          key={`p-${lesson.id}`}
          practice={lesson.practice}
          onResult={setPracticePassed}
        />
      </Section>

      <Section title="Quiz">
        <QuizCard
          key={`q-${lesson.id}`}
          quiz={lesson.quiz}
          onResult={(c) => setQuizCorrect(c)}
          onAddReview={() => onToggleReview(lesson.id)}
        />
      </Section>

      {strict && (
        <div className="mt-6 card p-3 border-accent-css/40 bg-accent-css/5">
          <div className="text-[12px] font-mono uppercase tracking-wider text-accent-css mb-1.5">
            // strict mode
          </div>
          <div className="text-[13px] text-ink-mid leading-relaxed">
            Practice 合格と Quiz 正解の両方を満たすまで、次に進めません。
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Gate
              label="Practice"
              ok={practicePassed}
              hint={practicePassed ? "クリア" : "Check で答え合わせ"}
            />
            <Gate
              label="Quiz"
              ok={quizCorrect === true}
              hint={
                quizCorrect === null
                  ? "未回答"
                  : quizCorrect
                  ? "正解"
                  : "もう一度"
              }
            />
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-2">
        <button
          onClick={() =>
            onComplete(lesson, {
              quizCorrect: quizCorrect ?? undefined,
            })
          }
          disabled={gated && !isDone}
          className="btn-primary h-12 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="check" />
          {gated && !isDone
            ? "Practice + Quiz をクリアしてください"
            : isDone
            ? "完了済み（再記録）"
            : `完了して +${xp} XP`}
        </button>
        {next && (
          <button
            onClick={() => onOpenLesson(next.id)}
            disabled={gated && !isDone}
            className="btn-ghost h-11 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次のLesson <Icon name="next" width={14} height={14} />
          </button>
        )}
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

function Gate({
  label,
  ok,
  hint,
}: {
  label: string;
  ok: boolean;
  hint: string;
}) {
  return (
    <div
      className={`rounded-xl border p-2.5 ${
        ok
          ? "border-emerald-500/40 bg-emerald-500/10"
          : "border-bg-line bg-bg-soft"
      }`}
    >
      <div className="flex items-center gap-1.5 text-[12px] font-mono">
        <span
          className={`w-3.5 h-3.5 rounded-full grid place-items-center text-[10px] ${
            ok
              ? "bg-emerald-400/90 text-bg-base"
              : "bg-bg-line text-ink-low"
          }`}
        >
          {ok ? "✓" : "·"}
        </span>
        <span className={ok ? "text-emerald-300" : "text-ink-mid"}>{label}</span>
      </div>
      <div className="text-[11px] text-ink-low mt-1">{hint}</div>
    </div>
  );
}
