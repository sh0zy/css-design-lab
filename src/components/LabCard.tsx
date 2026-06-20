import type { Lab } from "../types/lab";
import { Icon } from "./Icon";

type Props = {
  lab: Lab;
  index: number;
  onOpen?: () => void;
};

const CAT_LABEL: Record<Lab["category"], string> = {
  flex: "Flex",
  grid: "Grid",
  spacing: "Spacing",
  alignment: "Align",
  responsive: "Responsive",
};

export function LabCard({ lab, index, onOpen }: Props) {
  return (
    <button
      onClick={onOpen}
      className="card w-full text-left p-4 hover:border-accent-css/40"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[11px] font-mono text-ink-low">
          LAB {String(index + 1).padStart(2, "0")}
        </span>
        <span className="chip border-accent-css/40 text-accent-css bg-accent-css/10">
          {CAT_LABEL[lab.category]}
        </span>
      </div>
      <div className="text-[16px] font-bold leading-snug text-ink-high">
        {lab.title}
      </div>
      <p className="mt-1 text-[12.5px] text-ink-mid line-clamp-2">{lab.goal}</p>
      <div className="mt-3 flex items-center justify-between text-[12px] font-mono text-ink-low">
        <span>{lab.description.slice(0, 40)}…</span>
        <span className="text-accent-css inline-flex items-center gap-1">
          開く <Icon name="next" width={12} height={12} />
        </span>
      </div>
    </button>
  );
}
