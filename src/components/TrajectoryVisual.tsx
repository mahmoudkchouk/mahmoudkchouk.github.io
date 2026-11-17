import type { Locale } from "@/lib/i18n";

/** Schematic of a robot program: a work frame, taught targets and the path through them. */
export function TrajectoryVisual({ locale }: { locale: Locale }) {
  const pts = [
    [120, 150],
    [190, 92],
    [290, 84],
    [360, 136],
    [300, 182],
  ];
  const d = `M ${pts[0][0]} ${pts[0][1]} C 150 100, 160 92, ${pts[1][0]} ${pts[1][1]} S 250 70, ${pts[2][0]} ${pts[2][1]} S 380 110, ${pts[3][0]} ${pts[3][1]} S 330 190, ${pts[4][0]} ${pts[4][1]}`;
  return (
    <svg viewBox="0 0 440 240" className="block h-auto w-full" aria-hidden focusable="false">
      <g stroke="#3a4555" strokeWidth="1.5" fill="none">
        <path d="M 60 200 H 140" markerEnd="url(#tv-a)" />
        <path d="M 60 200 V 120" markerEnd="url(#tv-a)" />
        <path d="M 60 200 L 18 224" markerEnd="url(#tv-a)" />
      </g>
      <defs>
        <marker id="tv-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0.8 L7.2 4 L0 7.2 z" fill="#4a5666" />
        </marker>
      </defs>
      <text x="146" y="204" fontSize="12" fill="var(--color-fg-subtle)">x</text>
      <text x="56" y="112" fontSize="12" fill="var(--color-fg-subtle)">z</text>
      <text x="70" y="226" fontSize="12" fill="var(--color-fg-subtle)">
        {locale === "fr" ? "repère de travail" : "work frame"}
      </text>
      <path d={d} fill="none" stroke="#2c3644" strokeWidth="1.5" />
      <path d={d} fill="none" stroke="var(--color-live)" strokeWidth="1.75" strokeDasharray="5 7" opacity="0.8" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5.5" fill="#0d1117" stroke="#e9edf2" strokeWidth="1.5" />
          <text x={x + 10} y={y - 9} fontSize="12" fill="var(--color-fg-muted)">
            p{(i + 1) * 10}
          </text>
        </g>
      ))}
    </svg>
  );
}
