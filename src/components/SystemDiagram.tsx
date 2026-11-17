import type { Diagram } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

/**
 * Data-driven system diagram. Lanes run left to right on wide screens and top to
 * bottom on narrow ones (two SVGs, swapped with CSS), so it never needs to scroll.
 * Packets travel along flow edges to show data in motion.
 */

type Geometry = {
  colW: number;
  rowH: number;
  nodeW: number;
  nodeH: number;
  padX: number;
  padY: number;
  laneH: number;
};

const H: Geometry = { colW: 196, rowH: 84, nodeW: 156, nodeH: 60, padX: 6, padY: 6, laneH: 34 };
const HC: Geometry = { colW: 170, rowH: 76, nodeW: 142, nodeH: 56, padX: 6, padY: 6, laneH: 32 };
const V: Geometry = { colW: 158, rowH: 136, nodeW: 148, nodeH: 68, padX: 6, padY: 6, laneH: 32 };

type Rect = { x: number; y: number; w: number; h: number };

function layout(diagram: Diagram, vertical: boolean, compact = false) {
  const g = vertical ? V : compact ? HC : H;
  const hasLanes = Boolean(diagram.lanes?.length);
  const laneOffset = hasLanes ? g.laneH : 0;
  const rects = new Map<string, Rect>();

  // Centre each lane's nodes across the minor axis.
  const shift = new Map<number, number>();
  for (let c = 0; c < diagram.cols; c++) {
    const inLane = diagram.nodes.filter((n) => n.col === c);
    if (!inLane.length) continue;
    const min = Math.min(...inLane.map((n) => n.row));
    const max = Math.max(...inLane.map((n) => n.row + (n.rowSpan ?? 1)));
    shift.set(c, (diagram.rows - (max - min)) / 2 - min);
  }

  for (const n of diagram.nodes) {
    const span = n.rowSpan ?? 1;
    const minor = n.row + (shift.get(n.col) ?? 0);
    if (!vertical) {
      rects.set(n.id, {
        x: g.padX + n.col * g.colW,
        y: g.padY + laneOffset + minor * g.rowH,
        w: g.nodeW,
        h: g.nodeH + (span - 1) * g.rowH,
      });
    } else {
      rects.set(n.id, {
        x: g.padX + minor * g.colW,
        y: g.padY + n.col * g.rowH + laneOffset,
        w: g.nodeW + (span - 1) * g.colW,
        h: g.nodeH,
      });
    }
  }

  const width = !vertical
    ? g.padX * 2 + (diagram.cols - 1) * g.colW + g.nodeW
    : g.padX * 2 + (diagram.rows - 1) * g.colW + g.nodeW;
  const gridBottom = !vertical
    ? g.padY + laneOffset + (diagram.rows - 1) * g.rowH + g.nodeH
    : g.padY + (diagram.cols - 1) * g.rowH + laneOffset + g.nodeH;
  const hasReturn = diagram.edges.some((e) => e.kind === "return");
  const extraRight = vertical && hasReturn ? 30 : 0;
  const extraBottom = !vertical && hasReturn ? 44 : 0;

  return { g, rects, width: width + extraRight, height: gridBottom + g.padY + extraBottom, gridBottom, laneOffset };
}

function edgePath(a: Rect, b: Rect, vertical: boolean) {
  if (!vertical) {
    const x1 = a.x + a.w;
    const y1 = a.y + a.h / 2;
    const x2 = b.x - 3;
    const y2 = b.y + b.h / 2;
    const k = (x2 - x1) * 0.55;
    return `M ${x1} ${y1} C ${x1 + k} ${y1}, ${x2 - k} ${y2}, ${x2} ${y2}`;
  }
  const x1 = a.x + a.w / 2;
  const y1 = a.y + a.h;
  const x2 = b.x + b.w / 2;
  const y2 = b.y - 3;
  const k = (y2 - y1) * 0.55;
  return `M ${x1} ${y1} C ${x1} ${y1 + k}, ${x2} ${y2 - k}, ${x2} ${y2}`;
}

function returnPath(a: Rect, b: Rect, vertical: boolean, width: number, gridBottom: number) {
  if (!vertical) {
    const y = gridBottom + 26;
    const x1 = a.x + a.w / 2;
    const x2 = b.x + b.w / 2;
    return {
      d: `M ${x1} ${a.y + a.h} V ${y - 10} Q ${x1} ${y} ${x1 - 10} ${y} H ${x2 + 10} Q ${x2} ${y} ${x2} ${y - 10} V ${b.y + b.h + 3}`,
      label: { x: (x1 + x2) / 2, y: y + 16 },
    };
  }
  const x = width - 10;
  const y1 = a.y + a.h / 2;
  const y2 = b.y + b.h / 2;
  return {
    d: `M ${a.x + a.w} ${y1} H ${x - 10} Q ${x} ${y1} ${x} ${y1 - 10} V ${y2 + 10} Q ${x} ${y2} ${x - 10} ${y2} H ${b.x + b.w + 3}`,
    label: null,
  };
}

function Svg({
  diagram,
  locale,
  id,
  vertical,
  decorative,
  animated,
  compact,
  className,
}: {
  diagram: Diagram;
  locale: Locale;
  id: string;
  vertical: boolean;
  decorative: boolean;
  animated: boolean;
  compact?: boolean;
  className?: string;
}) {
  const { g, rects, width, height, gridBottom } = layout(diagram, vertical, compact);
  const label = (nid: string) => diagram.nodes.find((n) => n.id === nid)?.label[locale] ?? nid;
  const uid = `${id}-${vertical ? "v" : "h"}`;

  const flows = diagram.edges
    .filter((e) => e.kind !== "return")
    .map((e, i) => {
      const a = rects.get(e.from)!;
      const b = rects.get(e.to)!;
      const from = diagram.nodes.find((n) => n.id === e.from)!;
      return { key: `${e.from}-${e.to}-${i}`, d: edgePath(a, b, vertical), stage: from.col, planned: e.kind === "planned" };
    });
  const returns = diagram.edges
    .filter((e) => e.kind === "return")
    .map((e, i) => ({
      key: `r-${i}`,
      ...returnPath(rects.get(e.from)!, rects.get(e.to)!, vertical, width, gridBottom),
      text: e.label?.[locale],
    }));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`block h-auto w-full ${className ?? ""}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-labelledby={decorative ? undefined : `${uid}-t ${uid}-d`}
      focusable="false"
    >
      {!decorative && (
        <>
          <title id={`${uid}-t`}>{diagram.caption[locale]}</title>
          <desc id={`${uid}-d`}>
            {diagram.edges.map((e) => `${label(e.from)} → ${label(e.to)}`).join(" ; ")}
          </desc>
        </>
      )}
      <defs>
        <linearGradient id={`${uid}-node`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e2733" />
          <stop offset="1" stopColor="#171e28" />
        </linearGradient>
        <linearGradient id={`${uid}-focus`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#21323a" />
          <stop offset="1" stopColor="#192329" />
        </linearGradient>
        <marker id={`${uid}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0.8 L7.2 4 L0 7.2 z" fill="#4a5666" />
        </marker>
      </defs>

      {diagram.lanes?.map((lane) => {
        const lx = !vertical ? g.padX + lane.col * g.colW + 2 : g.padX + 2;
        const ly = !vertical ? g.padY + 14 : g.padY + lane.col * g.rowH + 16;
        return (
          <text key={lane.col} x={lx} y={ly} fontSize={vertical ? 15 : 12.5} fill="var(--color-fg-subtle)" letterSpacing="0.01em">
            {lane.label[locale]}
          </text>
        );
      })}

      <g fill="none" stroke="#2c3644" strokeWidth={1.25}>
        {flows.map((f) => (
          <path key={f.key} d={f.d} strokeDasharray={f.planned ? "3 5" : undefined} markerEnd={`url(#${uid}-arrow)`} />
        ))}
        {returns.map((r) => (
          <path key={r.key} d={r.d} strokeDasharray="3 5" markerEnd={`url(#${uid}-arrow)`} />
        ))}
      </g>

      {returns.map(
        (r) =>
          r.label &&
          r.text && (
            <text key={`${r.key}-l`} x={r.label.x} y={r.label.y} textAnchor="middle" fontSize={12} fill="var(--color-fg-subtle)">
              {r.text}
            </text>
          ),
      )}

      {animated && (
        <g className="packets">
          {flows.filter((f) => !f.planned).map((f, i) => (
            <circle key={`p-${f.key}`} r={2.6} fill="var(--color-live)">
              <animateMotion
                dur="2.6s"
                begin={`${(f.stage * 0.55 + (i % 3) * 0.37).toFixed(2)}s`}
                repeatCount="indefinite"
                path={f.d}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.45 0 0.55 1"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur="2.6s"
                begin={`${(f.stage * 0.55 + (i % 3) * 0.37).toFixed(2)}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {diagram.nodes.map((n) => {
        const r = rects.get(n.id)!;
        const focus = n.tone === "focus";
        const muted = n.tone === "muted";
        const cy = r.y + r.h / 2;
        // Fit the label to its box: Instrument Sans averages ~0.53em per glyph.
        const base = vertical ? 18 : 15;
        const fit = (txt: string, size: number) => Math.min(size, (r.w - 26) / (txt.length * 0.53));
        const fs = fit(n.label[locale], base);
        const ss = n.sub ? fit(n.sub[locale], vertical ? 14 : 12) : 0;
        return (
          <g key={n.id}>
            <rect
              x={r.x + 0.5}
              y={r.y + 0.5}
              width={r.w - 1}
              height={r.h - 1}
              rx={12}
              fill={`url(#${uid}-${focus ? "focus" : "node"})`}
              stroke={focus ? "rgba(127,209,196,0.55)" : muted ? "#3a4555" : "#2e3846"}
              strokeDasharray={muted ? "4 4" : undefined}
            />
            {focus && <circle cx={r.x + r.w - 14} cy={r.y + 14} r={3} fill="var(--color-live)" />}
            <text x={r.x + 14} y={cy + (n.sub ? (vertical ? -3 : -2) : 5)} fontSize={fs} fontWeight={500} fill="var(--color-fg)">
              {n.label[locale]}
            </text>
            {n.sub && (
              <text x={r.x + 14} y={cy + (vertical ? 19 : 16)} fontSize={ss} fill="var(--color-fg-subtle)">
                {n.sub[locale]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function SystemDiagram({
  diagram,
  locale,
  id,
  decorative = false,
  animated = true,
  stackBelow = "md",
  compact = false,
}: {
  diagram: Diagram;
  locale: Locale;
  id: string;
  decorative?: boolean;
  animated?: boolean;
  /** Breakpoint under which the vertical layout is shown. */
  stackBelow?: "md" | "lg" | "never";
  compact?: boolean;
}) {
  if (stackBelow === "never") {
    return <Svg diagram={diagram} locale={locale} id={id} vertical={false} decorative={decorative} animated={animated} compact={compact} />;
  }
  const hide = stackBelow === "md" ? ["md:hidden", "hidden md:block"] : ["lg:hidden", "hidden lg:block"];
  return (
    <>
      <Svg diagram={diagram} locale={locale} id={id} vertical decorative={decorative} animated={animated} className={`mx-auto max-w-[440px] ${hide[0]}`} />
      <Svg diagram={diagram} locale={locale} id={id} vertical={false} decorative={decorative} animated={animated} compact={compact} className={hide[1]} />
    </>
  );
}
