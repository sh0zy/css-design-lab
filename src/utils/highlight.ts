export type Token = { t: string; c: string };

const PROPERTY_COLOR = "text-sky-300";
const VALUE_COLOR = "text-amber-200";
const SELECTOR_COLOR = "text-fuchsia-300";
const NUM_COLOR = "text-amber-300";
const STR_COLOR = "text-emerald-300";
const COMMENT_COLOR = "text-ink-low italic";
const PUNCT_COLOR = "text-ink-mid";
const AT_COLOR = "text-pink-300";
const FN_COLOR = "text-yellow-200";
const HEX_COLOR = "text-orange-300";
const TAG_COLOR = "text-rose-300";
const ATTR_COLOR = "text-sky-300";

export function highlightCssLine(
  line: string,
  state: { inComment: boolean; inDecl: boolean }
): { tokens: Token[]; state: { inComment: boolean; inDecl: boolean } } {
  const out: Token[] = [];
  let i = 0;
  const len = line.length;
  let { inComment, inDecl } = state;

  while (i < len) {
    if (inComment) {
      const end = line.indexOf("*/", i);
      if (end === -1) {
        out.push({ t: line.slice(i), c: COMMENT_COLOR });
        i = len;
        break;
      } else {
        out.push({ t: line.slice(i, end + 2), c: COMMENT_COLOR });
        i = end + 2;
        inComment = false;
        continue;
      }
    }

    const ch = line[i];

    if (ch === "/" && line[i + 1] === "*") {
      const end = line.indexOf("*/", i + 2);
      if (end === -1) {
        out.push({ t: line.slice(i), c: COMMENT_COLOR });
        inComment = true;
        i = len;
        break;
      } else {
        out.push({ t: line.slice(i, end + 2), c: COMMENT_COLOR });
        i = end + 2;
        continue;
      }
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < len && line[j] !== quote) {
        if (line[j] === "\\") j += 2;
        else j++;
      }
      out.push({ t: line.slice(i, j + 1), c: STR_COLOR });
      i = j + 1;
      continue;
    }

    if (ch === "{") {
      out.push({ t: "{", c: PUNCT_COLOR });
      inDecl = true;
      i++;
      continue;
    }
    if (ch === "}") {
      out.push({ t: "}", c: PUNCT_COLOR });
      inDecl = false;
      i++;
      continue;
    }
    if (ch === ";") {
      out.push({ t: ";", c: PUNCT_COLOR });
      i++;
      continue;
    }

    if (ch === "#") {
      const m = /^#[0-9a-fA-F]{3,8}\b/.exec(line.slice(i));
      if (m) {
        out.push({ t: m[0], c: HEX_COLOR });
        i += m[0].length;
        continue;
      }
    }

    if (ch === "@") {
      const m = /^@[A-Za-z-]+/.exec(line.slice(i));
      if (m) {
        out.push({ t: m[0], c: AT_COLOR });
        i += m[0].length;
        continue;
      }
    }

    if (/[0-9]/.test(ch) || (ch === "-" && /[0-9.]/.test(line[i + 1] ?? ""))) {
      const m =
        /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|s|ms|deg|fr|ch|ex|vmin|vmax|pt)?/.exec(
          line.slice(i)
        );
      if (m) {
        out.push({ t: m[0], c: NUM_COLOR });
        i += m[0].length;
        continue;
      }
    }

    if (/[A-Za-z_-]/.test(ch)) {
      const m = /^[A-Za-z_-][A-Za-z0-9_-]*/.exec(line.slice(i));
      if (m) {
        const w = m[0];
        const after = line[i + w.length];
        if (after === "(") {
          out.push({ t: w, c: FN_COLOR });
          i += w.length;
          continue;
        }
        if (inDecl) {
          const before = line.slice(0, i);
          const colonIndex = before.lastIndexOf(":");
          const semiIndex = Math.max(
            before.lastIndexOf(";"),
            before.lastIndexOf("{")
          );
          const isValue = colonIndex > semiIndex;
          out.push({ t: w, c: isValue ? VALUE_COLOR : PROPERTY_COLOR });
          i += w.length;
          continue;
        } else {
          out.push({ t: w, c: SELECTOR_COLOR });
          i += w.length;
          continue;
        }
      }
    }

    let j = i;
    while (j < len && !/[A-Za-z0-9_@#"'/{};\-]/.test(line[j])) j++;
    out.push({ t: line.slice(i, j === i ? i + 1 : j), c: PUNCT_COLOR });
    i = j === i ? i + 1 : j;
  }

  return { tokens: out, state: { inComment, inDecl } };
}

export function highlightHtmlLine(line: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const len = line.length;
  while (i < len) {
    const ch = line[i];
    if (ch === "<") {
      const close = line.indexOf(">", i);
      const seg = close === -1 ? line.slice(i) : line.slice(i, close + 1);
      const tagMatch = /^<\/?([A-Za-z][A-Za-z0-9-]*)/.exec(seg);
      let consumed = 0;
      out.push({ t: seg[0], c: PUNCT_COLOR });
      consumed = 1;
      if (seg[1] === "/") {
        out.push({ t: "/", c: PUNCT_COLOR });
        consumed = 2;
      }
      if (tagMatch) {
        out.push({ t: tagMatch[1], c: TAG_COLOR });
        consumed += tagMatch[1].length;
      }
      const rest = seg.slice(consumed);
      let k = 0;
      while (k < rest.length) {
        const c2 = rest[k];
        if (c2 === '"' || c2 === "'") {
          const q = c2;
          let m = k + 1;
          while (m < rest.length && rest[m] !== q) m++;
          out.push({ t: rest.slice(k, m + 1), c: STR_COLOR });
          k = m + 1;
          continue;
        }
        if (/[A-Za-z]/.test(c2)) {
          const am = /^[A-Za-z_:][A-Za-z0-9_:.\-]*/.exec(rest.slice(k));
          if (am) {
            out.push({ t: am[0], c: ATTR_COLOR });
            k += am[0].length;
            continue;
          }
        }
        out.push({ t: rest[k], c: PUNCT_COLOR });
        k++;
      }
      i = close === -1 ? len : close + 1;
      continue;
    }
    let j = i;
    while (j < len && line[j] !== "<") j++;
    out.push({ t: line.slice(i, j), c: "text-ink-high" });
    i = j;
  }
  return out;
}
