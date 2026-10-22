import { useState } from 'react';
import { MAX_SCORE } from '../questions.js';

const WIDTH = 500;
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

export default function SpiderChart({ questions, scores }) {
  const [hovered, setHovered] = useState(null);
  const n = questions.length;

  return (
    <svg
      className="spider"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={questions.map((q) => `${q.label}: ${scores[q.id]} out of 10`).join(', ')}
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

      {questions.map((q, i) => {
        const [x, y] = point(i, n, scores[q.id]);
        return (
          <g
            key={q.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle className="hit" cx={x} cy={y} r="14" />
            <circle className="dot" cx={x} cy={y} r={hovered === i ? 6 : 4.5} />
          </g>
        );
      })}

      {hovered !== null && (() => {
        const q = questions[hovered];
        const [x, y] = point(hovered, n, scores[q.id]);
        const text = `${q.label}: ${scores[q.id]}/10`;
        const w = text.length * 7.5 + 16;
        return (
          <g className="tooltip" pointerEvents="none">
            <rect x={x - w / 2} y={y - 38} width={w} height="24" rx="6" />
            <text x={x} y={y - 26} textAnchor="middle" dominantBaseline="middle">
              {text}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}
