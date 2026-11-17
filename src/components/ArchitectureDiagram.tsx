import type { Diagram } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

const COL_W = 196;
const ROW_H = 92;
const NODE_W = 164;
const NODE_H = 60;
const PAD_X = 8;
const PAD_Y = 10;
const RETURN_GAP = 34;

type Box = { x: number; y: number; w: number; h: number; cx: number; cy: number };

function box(col: number, row: number, rowSpan = 1): Box {
  const x = PAD_X + col * COL_W;
  const y = PAD_Y + row * ROW_H;
  const h = NODE_H + (rowSpan - 1) * ROW_H;
  return { x, y, w: NODE_W, h, cx: x + NODE_W / 2, cy: y + h / 2 };
}

export function ArchitectureDiagram({
  diagram,
  locale,
  id,
  compact = false,
  live = false,
}: {
  diagram: Diagram;
  locale: Locale;
  id: string;
  /** Compact: used as a card preview, purely decorative, no text alternative needed. */
  compact?: boolean;
  live?: boolean;
}) {
  const hasReturn = diagram.edges.some((e) => e.kind === "return");
  const width = PAD_X * 2 + (diagram.cols - 1) * COL_W + NODE_W;
  const gridBottom = PAD_Y + (diagram.rows - 1) * ROW_H + NODE_H;
  const height = gridBottom + PAD_Y + (hasReturn ? RETURN_GAP + 6 : 0);

  const boxes = new Map(diagram.nodes.map((n) => [n.id, box(n.col, n.row, n.rowSpan)]));
  const label = (id: string) => diagram.nodes.find((n) => n.id === id)?.label[locale] ?? id;

  const paths = diagram.edges.map((e, i) => {
    const a = boxes.get(e.from)!;
    const b = boxes.get(e.to)!;
    if (e.kind === "return") {
      const y = gridBottom + RETURN_GAP - 8;
      const x1 = a.cx;
      const x2 = b.cx;
      return {
        key: `${e.from}-${e.to}-${i}`,
        d: `M ${x1} ${a.y + a.h} V ${y} H ${x2} V ${b.y + b.h + 2}`,
        labelAt: { x: (x1 + x2) / 2, y: y - 7 },
        edge: e,
      };
    }
    const x1 = a.x + a.w;
    const x2 = b.x - 2;
    const mx = x1 + (x2 - x1) / 2;
    const d = a.cy === b.cy ? `M ${x1} ${a.cy} H ${x2}` : `M ${x1} ${a.cy} H ${mx} V ${b.cy} H ${x2}`;
    return { key: `${e.from}-${e.to}-${i}`, d, labelAt: null, edge: e };
  });

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const description = diagram.edges
    .map((e) => `${label(e.from)} → ${label(e.to)}`)
    .join(" ; ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`block h-auto w-full ${live ? "diagram-live" : ""}`}
      style={compact ? undefined : { minWidth: `${Math.round(width * 0.78)}px` }}
      role={compact ? undefined : "img"}
      aria-hidden={compact ? true : undefined}
      aria-labelledby={compact ? undefined : `${titleId} ${descId}`}
      focusable="false"
    >
      {!compact && (
        <>
          <title id={titleId}>{diagram.caption[locale]}</title>
          <desc id={descId}>{description}</desc>
        </>
      )}
      <defs>
        <marker
          id={`${id}-arrow`}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0.5 L7.5 4 L0 7.5 z" fill="var(--color-fg-subtle)" />
        </marker>
      </defs>

      {paths.map((p) => (
        <g key={p.key}>
          <path
            d={p.d}
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth={1.25}
            strokeDasharray={p.edge.kind === "return" ? "3 4" : undefined}
            markerEnd={`url(#${id}-arrow)`}
          />
          <path d={p.d} fill="none" stroke="var(--color-flow)" strokeWidth={1.5} className="diagram-edge-flow" />
          {p.labelAt && p.edge.label && !compact && (
            <text
              x={p.labelAt.x}
              y={p.labelAt.y}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={10.5}
              fill="var(--color-fg-subtle)"
            >
              {p.edge.label[locale]}
            </text>
          )}
        </g>
      ))}

      {diagram.nodes.map((n) => {
        const b = boxes.get(n.id)!;
        const focus = n.tone === "focus";
        const muted = n.tone === "muted";
        const hasSub = Boolean(n.sub);
        return (
          <g key={n.id}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={8}
              fill={focus ? "var(--color-raised)" : "var(--color-surface)"}
              stroke={focus ? "var(--color-fg-subtle)" : "var(--color-line-strong)"}
              strokeWidth={1}
              strokeDasharray={muted ? "4 4" : undefined}
            />
            {focus && <circle cx={b.x + b.w - 12} cy={b.y + 12} r={3} fill="var(--color-signal)" />}
            <text
              x={b.x + 14}
              y={b.cy + (hasSub ? -3 : 5)}
              fontFamily="var(--font-display)"
              fontWeight={500}
              fontSize={15}
              fill="var(--color-fg)"
            >
              {n.label[locale]}
            </text>
            {n.sub && (
              <text
                x={b.x + 14}
                y={b.cy + 15}
                fontFamily="var(--font-mono)"
                fontSize={10.5}
                fill="var(--color-fg-subtle)"
              >
                {n.sub[locale]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
