import { useEffect, useMemo, useRef, useState } from "react";
import type { Lesson } from "../types/lesson";
import { CodeBlock } from "./CodeBlock";
import { highlightCssLine } from "../utils/highlight";

type Props = {
  practice: Lesson["practice"];
  onResult?: (passed: boolean) => void;
};

const EDITOR_FONT: React.CSSProperties = {
  fontFamily:
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  fontSize: 12.5,
  lineHeight: "20px",
  letterSpacing: 0,
  tabSize: 2 as unknown as number,
};

const PADDING = 10;

function normalize(s: string) {
  return s.replace(/\s+/g, " ").replace(/\s*([:;{}])\s*/g, "$1").trim();
}

export function PracticeBox({ practice, onResult }: Props) {
  const [code, setCode] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [result, setResult] = useState<"pass" | "fail" | null>(null);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCode("");
    setResult(null);
    setShowHint(false);
    setShowAnswer(false);
  }, [practice]);

  const syncScroll = () => {
    const ta = taRef.current;
    if (!ta) return;
    if (preRef.current) {
      preRef.current.scrollTop = ta.scrollTop;
      preRef.current.scrollLeft = ta.scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = ta.scrollTop;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const s = ta.selectionStart;
      const en = ta.selectionEnd;
      const next = code.slice(0, s) + "  " + code.slice(en);
      setCode(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = s + 2;
      });
    }
  };

  const check = () => {
    const a = normalize(code);
    const b = normalize(practice.answer);
    const pass = a.length > 0 && (a === b || a.includes(b) || b.includes(a));
    setResult(pass ? "pass" : "fail");
    onResult?.(pass);
  };

  const lines = useMemo(
    () => (code.length === 0 ? [""] : code.split("\n")),
    [code]
  );

  const lineCount = lines.length;
  const editorHeight = Math.max(
    176,
    Math.min(360, lineCount * 20 + PADDING * 2)
  );

  // pre-compute highlighted tokens line by line (carry state across lines)
  const hlLines = useMemo(() => {
    let state = { inComment: false, inDecl: false };
    return lines.map((line) => {
      const r = highlightCssLine(line, state);
      state = r.state;
      return r.tokens;
    });
  }, [lines]);

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="chip border-accent-info/40 text-accent-info bg-accent-info/10">
          Practice
        </span>
        <span className="text-[13px] font-semibold">{practice.title}</span>
        {result === "pass" && (
          <span className="chip border-emerald-500/40 text-emerald-300 bg-emerald-500/10 ml-auto">
            ✓ pass
          </span>
        )}
        {result === "fail" && (
          <span className="chip border-amber-500/40 text-amber-300 bg-amber-500/10 ml-auto">
            もう少し
          </span>
        )}
      </div>
      <p className="text-[13px] text-ink-mid mb-3">{practice.task}</p>

      <div className="rounded-xl overflow-hidden border border-bg-line bg-[#0a0f1c]">
        <div className="flex items-center px-3 py-2 bg-[#0d1422] border-b border-bg-line gap-2">
          <span className="editor-dot bg-red-400/80" />
          <span className="editor-dot bg-yellow-400/80" />
          <span className="editor-dot bg-emerald-400/80" />
          <div className="ml-2 text-[12px] font-mono text-ink-mid truncate">
            practice.css
          </div>
          <span className="ml-auto text-[10px] font-mono text-ink-low">
            {lineCount} line{lineCount > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex" style={{ height: editorHeight }}>
          {/* gutter */}
          <div
            ref={gutterRef}
            aria-hidden="true"
            className="overflow-hidden"
            style={{
              ...EDITOR_FONT,
              flexShrink: 0,
              width: 36,
              padding: `${PADDING}px 6px ${PADDING}px 0`,
              textAlign: "right",
              color: "rgba(150,160,180,0.45)",
              userSelect: "none",
              backgroundColor: "rgba(255,255,255,0.015)",
              borderRight: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {lines.map((_, i) => (
              <div key={i} style={{ height: 20 }}>
                {i + 1}
              </div>
            ))}
          </div>

          {/* editor area */}
          <div className="relative" style={{ flex: 1, minWidth: 0 }}>
            <pre
              ref={preRef}
              aria-hidden="true"
              className="absolute inset-0 m-0 overflow-auto"
              style={{
                ...EDITOR_FONT,
                padding: `${PADDING}px`,
                margin: 0,
                whiteSpace: "pre",
                wordBreak: "normal",
                pointerEvents: "none",
                boxSizing: "border-box",
              }}
            >
              <code style={{ display: "block" }}>
                {code.length === 0 ? (
                  <>
                    <span style={{ color: "rgba(190,200,220,0.35)" }}>
                      {`/* ここにCSSを書いて Check ▷ */`}
                    </span>
                    {"\n"}
                    <span style={{ color: "rgba(190,200,220,0.35)" }}>
                      {`.card {`}
                    </span>
                    {"\n"}
                    <span style={{ color: "rgba(190,200,220,0.35)" }}>
                      {`  /* properties... */`}
                    </span>
                    {"\n"}
                    <span style={{ color: "rgba(190,200,220,0.35)" }}>
                      {`}`}
                    </span>
                  </>
                ) : (
                  lines.map((line, idx) => (
                    <div key={idx} style={{ minHeight: 20 }}>
                      {hlLines[idx].map((tok, i) => (
                        <span key={i} className={tok.c}>
                          {tok.t}
                        </span>
                      ))}
                      {line.length === 0 ? "​" : null}
                    </div>
                  ))
                )}
              </code>
            </pre>

            <textarea
              ref={taRef}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setResult(null);
              }}
              onScroll={syncScroll}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              className="absolute inset-0 w-full h-full overflow-auto"
              style={{
                ...EDITOR_FONT,
                padding: `${PADDING}px`,
                margin: 0,
                border: "none",
                outline: "none",
                resize: "none",
                whiteSpace: "pre",
                wordBreak: "normal",
                background: "transparent",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                caretColor: "#38BDF8",
                boxSizing: "border-box",
                display: "block",
              }}
            />
          </div>
        </div>

        <div className="flex items-center px-3 py-1.5 bg-[#0d1422] border-t border-bg-line gap-3 text-[10px] font-mono text-ink-low">
          <span>UTF-8</span>
          <span>CSS</span>
          <span className="ml-auto">Tab = 2 spaces</span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button onClick={check} className="btn-primary px-3 py-2 text-[13px]">
          ▷ Check
        </button>
        <button
          onClick={() => setShowHint((s) => !s)}
          className="btn-ghost px-3 py-2 text-[13px]"
        >
          {showHint ? "Hide hint" : "Hint"}
        </button>
        <button
          onClick={() => setShowAnswer((s) => !s)}
          className="btn-ghost px-3 py-2 text-[13px]"
        >
          {showAnswer ? "Hide answer" : "Answer"}
        </button>
      </div>
      {showHint && (
        <div className="mt-3 p-3 rounded-xl border border-bg-line bg-bg-soft text-[13px] text-ink-mid">
          <div className="text-[11px] font-mono uppercase tracking-wider text-ink-low mb-1">
            HINT
          </div>
          {practice.hint}
        </div>
      )}
      {showAnswer && (
        <div className="mt-3">
          <CodeBlock
            code={practice.answer}
            fileName="answer.css"
            showLineNumbers={false}
          />
        </div>
      )}
    </div>
  );
}
