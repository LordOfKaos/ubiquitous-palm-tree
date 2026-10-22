import { useState } from 'react';
import { MAX_SCORE } from '../questions.js';

const WIDTH = 520;
const HEIGHT = 390;
const CX = WIDTH / 2;
const CY = HEIGHT / 2 + 5;
const RADIUS = 125;
const RINGS = [2, 4, 6, 8, 10];

// Spoke i points straight up for i = 0, then goes clockwise.
function point(i, count, value) {
  const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
  const r = (value / MAX_SCORE) * RADIUS;
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

function polygon(count, valueAt) {
  return Array.from({ length: count }, (_, i) => point(i, count, valueAt(i)).join(',')).join(' ');
}

export default function SpiderChart({ questions, scores, baseline }) {
  const [active, setActive] = useState(null);
  const n = questions.length;

  function describe(q) {
    return baseline
      ? `${q.label}: ${baseline[q.id]} → ${scores[q.id]}`
      : `${q.label}: ${scores[q.id]}/10`;
  }

  return (
    <svg
      className="spider"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={questions.map(describe).join(', ')}
      onMouseLeave={() => setActive(null)}
    >
      {RINGS.map((ring) => (
        <polygon key={ring} className="grid" points={polygon(n, () => ring)} />
      ))}

      {questions.map((q, i) => {
        const [x, y] = point(i, n, MAX_SCORE);
        return <line key={q.id} className="grid" x1={CX} y1={CY} x2={x} y2={y} />;
      })}

      {RINGS.map((ring) => {
        const [, y] = point(0, n, ring);
        return (
          <text key={ring} className="tick" x={CX - 6} y={y} textAnchor="end" dominantBaseline="middle">
            {ring}
          </text>
        );
      })}

      {questions.map((q, i) => {
        const [x, y] = point(i, n, MAX_SCORE + 1.3);
        const anchor = Math.abs(x - CX) < 1 ? 'middle' : x > CX ? 'start' : 'end';
        // Split multi-word labels over two lines so they fit at phone width.
        const words = q.label.split(' ');
        const lines = words.length > 1 ? [words.slice(0, -1).join(' '), words.at(-1)] : words;
        const top = y - ((lines.length - 1) * 18) / 2;
        return (
          <text key={q.id} className="axis-label" textAnchor={anchor} dominantBaseline="middle">
            {lines.map((line, j) => (
              <tspan key={j} x={x} y={top + j * 18}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}

      <polygon className="area" points={polygon(n, (i) => scores[questions[i].id])} />

      {baseline && (
        <polygon className="baseline" points={polygon(n, (i) => baseline[questions[i].id])} />
      )}

      {questions.map((q, i) => {
        const [x, y] = point(i, n, scores[q.id]);
        return (
          <g
            key={q.id}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(active === i ? null : i)}
          >
            <circle className="hit" cx={x} cy={y} r="16" />
            <circle className="dot" cx={x} cy={y} r={active === i ? 6 : 4.5} />
          </g>
        );
      })}

      {active !== null && (() => {
        const q = questions[active];
        const [x, y] = point(active, n, scores[q.id]);
        const text = describe(q);
        const w = text.length * 7.5 + 16;
        // Keep the tooltip inside the chart so it can't push the page wider.
        const left = Math.min(Math.max(x - w / 2, 0), WIDTH - w);
        return (
          <g className="tooltip" pointerEvents="none">
            <rect x={left} y={y - 38} width={w} height="24" rx="6" />
            <text x={left + w / 2} y={y - 26} textAnchor="middle" dominantBaseline="middle">
              {text}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}
