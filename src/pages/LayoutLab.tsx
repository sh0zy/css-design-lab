import { useMemo, useState } from "react";
import { labs } from "../data/labs";
import { LabCard } from "../components/LabCard";
import { CodeBlock } from "../components/CodeBlock";
import { ResponsivePreview } from "../components/ResponsivePreview";
import { Icon } from "../components/Icon";
import type { Lab } from "../types/lab";

const CATEGORIES: { key: Lab["category"] | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "flex", label: "Flex" },
  { key: "grid", label: "Grid" },
  { key: "spacing", label: "Spacing" },
  { key: "alignment", label: "Align" },
  { key: "responsive", label: "Responsive" },
];

export function LayoutLab() {
  const [cat, setCat] = useState<Lab["category"] | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(
    () => (cat === "all" ? labs : labs.filter((l) => l.category === cat)),
    [cat]
  );

  const open = openId ? labs.find((l) => l.id === openId) : undefined;

  if (open) {
    return (
      <div className="px-4 pb-28 fade-in">
        <button
          onClick={() => setOpenId(null)}
          className="text-[12px] font-mono text-accent-css mb-3 inline-flex items-center gap-1"
        >
          <Icon name="back" width={14} height={14} /> Lab一覧へ
        </button>
        <div className="card p-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-ink-mid">
            Layout Lab
          </div>
          <h1 className="text-[18px] font-bold leading-snug mt-1">
            {open.title}
          </h1>
          <p className="mt-2 text-[13.5px] text-ink-mid">{open.goal}</p>
        </div>
        <Section title="解説">
          <p className="text-[14px] leading-relaxed text-ink-high">
            {open.description}
          </p>
        </Section>
        <Section title="CSS">
          <CodeBlock
            code={open.cssExample}
            fileName={`${open.id}.css`}
            lang="css"
          />
        </Section>
        <Section title="HTML">
          <CodeBlock code={open.htmlExample} fileName="index.html" lang="html" />
        </Section>
        <Section title="どこで使う？">
          <p className="text-[13.5px] text-ink-mid">{open.whereToUse}</p>
        </Section>
        <Section title="レスポンシブ">
          <ResponsivePreview
            mobile="まずはここから書く"
            tablet="必要なら2列に"
            desktop="広い画面で最終形"
            hint={open.responsiveNote}
          />
        </Section>
        <Section title="よくあるミス">
          <ul className="space-y-2">
            {open.commonMistakes.map((m, i) => (
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
        <Section title="練習">
          <div className="card p-3 text-[13.5px] text-ink-mid">
            {open.practice}
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 fade-in">
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="chip border-accent-css/40 text-accent-css bg-accent-css/10">
            Layout Lab
          </span>
          <span className="text-[12px] font-mono text-ink-mid">配置の実験室</span>
        </div>
        <p className="text-[13px] text-ink-mid leading-relaxed">
          Flex / Grid / Spacing / Alignment / Responsive。
          『どのプロパティでどう変わるか』を1テーマずつ確かめます。
        </p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 my-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`shrink-0 px-3 h-8 rounded-full text-[12px] font-mono border ${
              cat === c.key
                ? "border-accent-css/50 bg-accent-css/10 text-accent-css"
                : "border-bg-line text-ink-mid"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="text-[11px] font-mono text-ink-low mb-2">
        {list.length} labs
      </div>

      <div className="grid gap-2">
        {list.map((l, i) => (
          <LabCard key={l.id} lab={l} index={i} onOpen={() => setOpenId(l.id)} />
        ))}
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
