import { Fragment, type ReactNode } from "react";

/**
 * A tiny, dependency-free Markdown renderer covering exactly the subset the
 * study content uses: paragraphs, **bold**, `code`, and ordered / bulleted
 * lists. It replaces the heavyweight `streamdown` (which bundled Shiki and
 * Mermaid) to keep the client bundle small. Output is theme-aware — text uses
 * the standard ink tokens so it works in light and dark mode.
 */

const INLINE = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  INLINE.lastIndex = 0;
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) {
      nodes.push(<strong key={key++} className="font-semibold text-foreground">{m[2]}</strong>);
    } else if (m[3] !== undefined) {
      nodes.push(
        <code key={key++} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">
          {m[3]}
        </code>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

type Group = { kind: "p" | "ol" | "ul"; items: string[] };

function groupLines(block: string): Group[] {
  const groups: Group[] = [];
  for (const rawLine of block.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    const ordered = /^\d+\.\s+/.test(line);
    const bullet = /^[-*]\s+/.test(line);
    const kind: Group["kind"] = ordered ? "ol" : bullet ? "ul" : "p";
    const content = ordered
      ? line.replace(/^\d+\.\s+/, "")
      : bullet
        ? line.replace(/^[-*]\s+/, "")
        : line;
    const prev = groups[groups.length - 1];
    if (prev && prev.kind === kind) {
      prev.items.push(content);
    } else {
      groups.push({ kind, items: [content] });
    }
  }
  return groups;
}

export function Markdown({ children }: { children?: string }) {
  const src = (children ?? "").trim();
  if (!src) return null;
  const blocks = src.split(/\n\s*\n/);

  return (
    <div className="space-y-3">
      {blocks.flatMap((block, bi) =>
        groupLines(block).map((group, gi) => {
          const key = `${bi}-${gi}`;
          if (group.kind === "ol") {
            return (
              <ol key={key} className="list-decimal space-y-1 pl-5">
                {group.items.map((it, i) => (
                  <li key={i}>{renderInline(it)}</li>
                ))}
              </ol>
            );
          }
          if (group.kind === "ul") {
            return (
              <ul key={key} className="list-disc space-y-1 pl-5">
                {group.items.map((it, i) => (
                  <li key={i}>{renderInline(it)}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={key} className="leading-relaxed">
              {group.items.map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {renderInline(it)}
                </Fragment>
              ))}
            </p>
          );
        }),
      )}
    </div>
  );
}
