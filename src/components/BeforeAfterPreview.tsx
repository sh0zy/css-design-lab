type Props = {
  before: string;
  after: string;
  changedNote?: string;
};

export function BeforeAfterPreview({ before, after, changedNote }: Props) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="chip border-accent-css/40 text-accent-css bg-accent-css/10">
          Before / After
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-bg-line bg-bg-soft p-3 min-h-[88px] grid place-items-center text-[12px] text-ink-mid">
          <div className="text-center">
            <div className="text-[10px] font-mono text-ink-low mb-1">BEFORE</div>
            <div>{before}</div>
          </div>
        </div>
        <div className="rounded-xl border border-accent-css/40 bg-accent-css/10 p-3 min-h-[88px] grid place-items-center text-[12px] text-ink-high">
          <div className="text-center">
            <div className="text-[10px] font-mono text-accent-css/80 mb-1">
              AFTER
            </div>
            <div>{after}</div>
          </div>
        </div>
      </div>
      {changedNote && (
        <div className="mt-3 text-[12.5px] text-ink-mid">
          <span className="text-accent-css">→</span> {changedNote}
        </div>
      )}
    </div>
  );
}
