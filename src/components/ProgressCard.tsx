import type { ProgressState } from "../hooks/useProgress";
import { rankFromXp } from "../utils/progress";
import { ProgressBar } from "./ProgressBar";
import { Icon } from "./Icon";

type Props = {
  state: ProgressState;
  totalLessons: number;
  doneLessons: number;
};

export function ProgressCard({ state, totalLessons, doneLessons }: Props) {
  const { current, next, progress } = rankFromXp(state.xp);
  return (
    <div className="card p-4 relative overflow-hidden">
      <div className="absolute -top-12 -right-10 w-40 h-40 rounded-full bg-accent-css/10 blur-2xl pointer-events-none" />
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-accent-css/15 grid place-items-center text-accent-css">
          <Icon name="trophy" />
        </div>
        <div>
          <div className="text-[11px] font-mono text-ink-mid uppercase tracking-wider">
            current rank
          </div>
          <div className="text-lg font-bold">{current.name}</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <Stat label="XP" value={state.xp.toString()} />
        <Stat
          label="STREAK"
          value={`${state.streak.count}日`}
          icon={<Icon name="fire" width={14} height={14} />}
        />
        <Stat
          label="DONE"
          value={`${doneLessons}/${totalLessons}`}
        />
      </div>
      {next && (
        <div className="mt-3">
          <div className="flex justify-between items-center text-[11px] font-mono text-ink-mid mb-1">
            <span>{current.name}</span>
            <span>{next.name}</span>
          </div>
          <ProgressBar value={progress} color="css" height={5} />
          <div className="mt-1 text-[11px] font-mono text-ink-low text-right">
            あと {Math.max(0, next.minXp - state.xp)} XP
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-bg-soft border border-bg-line py-2.5">
      <div className="text-[10px] font-mono text-ink-low tracking-wider">
        {label}
      </div>
      <div className="mt-0.5 text-[15px] font-bold inline-flex items-center gap-1">
        {icon && <span className="text-accent-warn">{icon}</span>}
        {value}
      </div>
    </div>
  );
}
