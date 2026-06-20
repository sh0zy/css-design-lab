type Props = {
  description?: string;
  visualChange?: string;
};

export function StylePreview({ description, visualChange }: Props) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="chip border-accent-css/40 text-accent-css bg-accent-css/10">
          Preview
        </span>
        <span className="text-[12px] font-mono text-ink-mid">style change</span>
      </div>
      {description && (
        <p className="text-[13px] text-ink-high leading-relaxed">
          {description}
        </p>
      )}
      {visualChange && (
        <div className="mt-3 p-3 rounded-xl border border-bg-line bg-bg-soft">
          <div className="text-[11px] font-mono uppercase tracking-wider text-ink-low mb-1">
            どこが変わる？
          </div>
          <p className="text-[12.5px] text-ink-mid leading-relaxed">
            {visualChange}
          </p>
        </div>
      )}
    </div>
  );
}
