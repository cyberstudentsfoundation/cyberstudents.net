// The Advent of CTF 2025 dynamic scoring curve, drawn from the formula in src/server/api/routers/challenge.ts:
// points = max(50, floor(500 * min(1, 162 / (solves + 161)) ^ 1.5)).

const K = 162;
const points = (solves: number) => Math.max(50, Math.floor(500 * Math.pow(Math.min(1, K / (solves + (K - 1))), 1.5)));

const W = 480;
const H = 240;
const PAD = { l: 44, r: 12, t: 14, b: 34 };
const MAX_SOLVES = 600;

const x = (s: number) => PAD.l + (s / MAX_SOLVES) * (W - PAD.l - PAD.r);
const y = (p: number) => PAD.t + (1 - p / 500) * (H - PAD.t - PAD.b);

export function ScoringChart({ className }: { className?: string }) {
  const path = Array.from({ length: 121 }, (_, i) => {
    const s = (i / 120) * MAX_SOLVES;
    return `${i === 0 ? "M" : "L"}${x(s).toFixed(1)},${y(points(Math.max(1, s))).toFixed(1)}`;
  }).join(" ");
  const marks = [1, 50, 162, 400];

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="scoring-title" className="w-full">
        <title id="scoring-title">{`Points for a 2025 challenge fall from 500 for the first solves to ${points(162)} at 162 solves and reach the minimum of 50 at about 590 solves.`}</title>
        {[0, 100, 200, 300, 400, 500].map((p) => (
          <g key={p}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(p)} y2={y(p)} className="stroke-slate-300" strokeWidth={1} />
            <text x={PAD.l - 8} y={y(p) + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
              {p}
            </text>
          </g>
        ))}
        {[0, 100, 200, 300, 400, 500, 600].map((s) => (
          <text key={s} x={x(s)} y={H - PAD.b + 18} textAnchor="middle" className="fill-slate-500 text-[11px]">
            {s}
          </text>
        ))}
        <text x={(W + PAD.l) / 2} y={H - 2} textAnchor="middle" className="fill-slate-600 text-[11px]">
          Players who have solved it
        </text>
        <line
          x1={PAD.l}
          x2={W - PAD.r}
          y1={y(50)}
          y2={y(50)}
          className="stroke-cyan-700"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <path d={path} fill="none" className="stroke-cyan-700" strokeWidth={2.5} strokeLinejoin="round" />
        {marks.map((s) => (
          <g key={s}>
            <circle cx={x(s)} cy={y(points(s))} r={4} className="fill-white stroke-cyan-700" strokeWidth={2} />
            <text
              x={x(s) + 7}
              y={y(points(s)) - 7}
              className="fill-slate-800 text-[11px] font-semibold"
            >
              {points(s)}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-sm text-slate-600">
        How many points a 2025 challenge was worth, depending on how many players had already solved it. The dashed
        line marks the 50-point minimum.
      </figcaption>
    </figure>
  );
}
