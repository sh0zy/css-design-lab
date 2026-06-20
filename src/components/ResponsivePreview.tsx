type Props = {
  mobile: string;
  tablet: string;
  desktop: string;
  hint?: string;
};

export function ResponsivePreview({ mobile, tablet, desktop, hint }: Props) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="chip border-accent-css/40 text-accent-css bg-accent-css/10">
          Responsive
        </span>
        <span className="text-[12px] font-mono text-ink-mid">
          mobile / tablet / desktop
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-bg-line bg-bg-soft p-2.5">
          <div className="aspect-[3/5] rounded-lg bg-bg-base/60 grid place-items-center text-[10px] text-ink-mid">
            Mobile
          </div>
          <div className="mt-2 text-[11.5px] text-ink-mid leading-snug">
            {mobile}
          </div>
        </div>
        <div className="rounded-xl border border-bg-line bg-bg-soft p-2.5">
          <div className="aspect-[4/5] rounded-lg bg-bg-base/60 grid place-items-center text-[10px] text-ink-mid">
            Tablet
          </div>
          <div className="mt-2 text-[11.5px] text-ink-mid leading-snug">
            {tablet}
          </div>
        </div>
        <div className="rounded-xl border border-bg-line bg-bg-soft p-2.5">
          <div className="aspect-[16/10] rounded-lg bg-bg-base/60 grid place-items-center text-[10px] text-ink-mid">
            Desktop
          </div>
          <div className="mt-2 text-[11.5px] text-ink-mid leading-snug">
            {desktop}
          </div>
        </div>
      </div>
      {hint && (
        <div className="mt-3 text-[12.5px] text-ink-mid">
          <span className="text-accent-css">→</span> {hint}
        </div>
      )}
    </div>
  );
}
