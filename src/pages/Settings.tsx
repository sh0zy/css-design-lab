import { useState } from "react";
import type { ProgressState } from "../hooks/useProgress";
import { Icon } from "../components/Icon";

type Props = {
  state: ProgressState;
  onReset: () => void;
  onSeed: () => void;
  setGoal: (n: number) => void;
  setStudyGoal: (text: string) => void;
  setStrictMode: (v: boolean) => void;
};

export function Settings({
  state,
  onReset,
  onSeed,
  setGoal,
  setStudyGoal,
  setStrictMode,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [studyGoal, setText] = useState(state.studyGoal);
  const [goal, setG] = useState(state.goalLessonsPerDay);

  const lsSize = (() => {
    try {
      const raw = localStorage.getItem("cssdl_progress_v1") ?? "";
      return new Blob([raw]).size;
    } catch {
      return 0;
    }
  })();

  return (
    <div className="px-4 pb-28 fade-in">
      <Section title="学習目標">
        <textarea
          value={studyGoal}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setStudyGoal(studyGoal)}
          rows={3}
          className="w-full p-3 rounded-xl bg-bg-soft border border-bg-line text-[14px] outline-none focus:border-accent-css/40"
        />
      </Section>

      <Section title="1日の目標Lesson数">
        <div className="card p-3 flex items-center justify-between">
          <div className="text-[14px]">{goal} lessons / day</div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const next = Math.max(1, goal - 1);
                setG(next);
                setGoal(next);
              }}
              className="btn-ghost px-3 py-1.5 text-[13px]"
            >
              −
            </button>
            <button
              onClick={() => {
                const next = Math.min(20, goal + 1);
                setG(next);
                setGoal(next);
              }}
              className="btn-ghost px-3 py-1.5 text-[13px]"
            >
              ＋
            </button>
          </div>
        </div>
      </Section>

      <Section title="スパルタモード">
        <button
          onClick={() => setStrictMode(!state.strictMode)}
          className={`card p-3 w-full flex items-center justify-between transition ${
            state.strictMode
              ? "border-accent-css/50 bg-accent-css/5"
              : "border-bg-line"
          }`}
        >
          <div className="text-left">
            <div className="text-[14px] font-semibold flex items-center gap-2">
              <Icon name="bolt" width={14} height={14} />
              Practice + Quiz をクリアしないと進めない
            </div>
            <div className="text-[11.5px] text-ink-low mt-0.5">
              ON にすると、Practice 実行成功と Quiz 正解の両方を満たすまで「完了」「次のLesson」がロックされます。
            </div>
          </div>
          <span
            className={`shrink-0 ml-3 inline-flex items-center justify-center w-11 h-6 rounded-full border transition ${
              state.strictMode
                ? "bg-accent-css border-accent-css"
                : "bg-bg-soft border-bg-line"
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-bg-base transition-transform ${
                state.strictMode ? "translate-x-2" : "-translate-x-2"
              }`}
            />
          </span>
        </button>
      </Section>

      <Section title="サンプルデータ">
        <button onClick={onSeed} className="btn-ghost h-11 w-full">
          <Icon name="wand" width={16} height={16} />
          サンプル進捗を投入
        </button>
        <p className="text-[12px] text-ink-low mt-1">
          初期Lessonをいくつか完了状態にしてXPを少し付与します。デバッグ確認用。
        </p>
      </Section>

      <Section title="localStorage">
        <div className="card p-3 text-[13px] space-y-1 font-mono">
          <div className="flex justify-between">
            <span className="text-ink-mid">key</span>
            <span>cssdl_progress_v1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-mid">size</span>
            <span>{lsSize} bytes</span>
          </div>
        </div>
      </Section>

      <Section title="危険な操作">
        <button
          onClick={() => setConfirmOpen(true)}
          className="btn-danger h-11 w-full"
        >
          <Icon name="trash" width={16} height={16} />
          すべての進捗を初期化
        </button>
      </Section>

      <div className="text-center text-[11px] font-mono text-ink-low mt-8">
        CSS Design Lab · v1
      </div>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 flex items-end sm:items-center justify-center p-4"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md card p-4"
          >
            <div className="flex items-center gap-2 mb-2 text-accent-warn">
              <Icon name="alert" width={18} height={18} />
              <span className="text-[14px] font-bold">本当に初期化しますか？</span>
            </div>
            <p className="text-[13px] text-ink-mid">
              XP・完了Lesson・お気に入り・復習リスト・Mini UI進捗を削除します。元に戻せません。
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="btn-ghost h-11"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  onReset();
                  setConfirmOpen(false);
                }}
                className="btn-danger h-11"
              >
                初期化する
              </button>
            </div>
          </div>
        </div>
      )}
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
