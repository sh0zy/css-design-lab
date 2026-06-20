import { useState } from "react";
import { Icon } from "./Icon";
import { highlightCssLine, highlightHtmlLine } from "../utils/highlight";

type Lang = "css" | "html";

type Props = {
  code: string;
  fileName?: string;
  lang?: Lang;
  showLineNumbers?: boolean;
};

export function CodeBlock({
  code,
  fileName,
  lang,
  showLineNumbers = true,
}: Props) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\t/g, "  ").split("\n");

  const inferred: Lang =
    lang ?? (fileName?.endsWith(".html") || fileName?.endsWith(".tsx") ? "html" : "css");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* noop */
    }
  };

  const renderLines = () => {
    if (inferred === "html") {
      return lines.map((line, idx) => (
        <div key={idx} className="flex">
          {showLineNumbers && (
            <span className="select-none w-8 pr-3 text-right text-ink-low/70">
              {idx + 1}
            </span>
          )}
          <span className="whitespace-pre flex-1">
            {highlightHtmlLine(line).map((tok, i) => (
              <span key={i} className={tok.c}>
                {tok.t}
              </span>
            ))}
            {line.length === 0 ? " " : null}
          </span>
        </div>
      ));
    }
    let state = { inComment: false, inDecl: false };
    return lines.map((line, idx) => {
      const r = highlightCssLine(line, state);
      state = r.state;
      return (
        <div key={idx} className="flex">
          {showLineNumbers && (
            <span className="select-none w-8 pr-3 text-right text-ink-low/70">
              {idx + 1}
            </span>
          )}
          <span className="whitespace-pre flex-1">
            {r.tokens.map((tok, i) => (
              <span key={i} className={tok.c}>
                {tok.t}
              </span>
            ))}
            {line.length === 0 ? " " : null}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="rounded-xl overflow-hidden border border-bg-line bg-[#0a0f1c]">
      <div className="flex items-center px-3 py-2 bg-[#0d1422] border-b border-bg-line gap-2">
        <span className="editor-dot bg-red-400/80" />
        <span className="editor-dot bg-yellow-400/80" />
        <span className="editor-dot bg-emerald-400/80" />
        <div className="ml-2 text-[12px] font-mono text-ink-mid truncate">
          {fileName ?? (inferred === "html" ? "snippet.html" : "style.css")}
        </div>
        <button
          onClick={onCopy}
          className="ml-auto inline-flex items-center gap-1 text-[11px] font-mono text-ink-mid hover:text-accent-css"
        >
          <Icon name="copy" width={14} height={14} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="codeblock overflow-x-auto p-3">
        <code>{renderLines()}</code>
      </pre>
    </div>
  );
}
