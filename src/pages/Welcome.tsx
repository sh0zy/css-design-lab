import { Icon } from "../components/Icon";
import cssIcon from "../assets/css-icon.svg";

type Props = { onStart: () => void };

export function Welcome({ onStart }: Props) {
  return (
    <div className="min-h-[100dvh] flex flex-col px-6 py-10 fade-in">
      <div className="mt-6 flex items-center gap-3">
        <img
          src={cssIcon}
          alt="CSS"
          className="w-12 h-12 rounded-lg shadow-[0_0_24px_rgba(56,189,248,0.35)]"
          draggable={false}
        />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-bg-line bg-bg-soft text-[11px] font-mono text-ink-mid">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-css" />
          v1 · style studio learning UI
        </div>
      </div>
      <h1 className="mt-6 font-mono text-[34px] leading-[1.1] font-bold">
        <span className="text-ink-high">CSS</span>{" "}
        <span className="text-accent-css">Design</span>{" "}
        <span className="text-ink-high">Lab</span>
      </h1>
      <p className="mt-4 text-ink-mid text-[14.5px] leading-relaxed">
        ゼロから業界プロレベルへ。<br />
        色・余白・レイアウトを自分の手で作りながら、CSSを身につけよう。
      </p>

      <div className="mt-8 grid grid-cols-3 gap-2">
        <Mini level="Beginner" sub="40+ Lessons" color="text-accent-beginner" />
        <Mini
          level="Intermediate"
          sub="45+ Lessons"
          color="text-accent-intermediate"
        />
        <Mini level="Advanced" sub="45+ Lessons" color="text-accent-advanced" />
      </div>

      <div className="mt-8 card p-4">
        <div className="text-[11px] font-mono text-ink-low uppercase tracking-wider mb-1">
          README.md
        </div>
        <div className="text-[14px] text-ink-mid leading-relaxed">
          ・ ステージ型のRoadmapで進捗が一目瞭然<br />
          ・ Lessonごとに学習目標 / コード / プレビュー / 練習 / クイズ<br />
          ・ XP・ランク・連続学習日数で成長を可視化<br />
          ・ Layout Lab と Mini UI で実装力を磨く
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <SwatchPreview color="#38BDF8" label="brand" />
        <SwatchPreview color="#A78BFA" label="accent" />
        <SwatchPreview color="#F472B6" label="pop" />
      </div>

      <div className="flex-1" />

      <button onClick={onStart} className="btn-primary mt-8 h-12">
        <Icon name="rocket" />
        学習を始める
      </button>
      <div className="mt-3 text-center text-[11px] font-mono text-ink-low">
        進捗はこの端末のlocalStorageに保存されます
      </div>
    </div>
  );
}

function Mini({
  level,
  sub,
  color,
}: {
  level: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="card p-3 text-center">
      <div className={`text-[12px] font-mono ${color}`}>{level}</div>
      <div className="text-[11px] text-ink-low mt-0.5">{sub}</div>
    </div>
  );
}

function SwatchPreview({ color, label }: { color: string; label: string }) {
  return (
    <div className="rounded-xl border border-bg-line bg-bg-soft p-2 flex items-center gap-2">
      <span
        className="w-6 h-6 rounded-md"
        style={{ background: color, boxShadow: `0 0 0 1px rgba(255,255,255,0.06)` }}
      />
      <div className="leading-tight">
        <div className="text-[11px] font-mono text-ink-mid">{label}</div>
        <div className="text-[10px] font-mono text-ink-low">{color}</div>
      </div>
    </div>
  );
}
