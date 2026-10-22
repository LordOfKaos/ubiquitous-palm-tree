import { MIN_SCORE, MAX_SCORE } from '../questions.js';

export default function Question({ number, question, value, onChange }) {
  const inputId = `q-${question.id}`;

  return (
    <div className="question">
      <label htmlFor={inputId}>
        <strong>
          {number}. {question.fullLabel ?? question.label}
        </strong>
        <span className="muted">{question.text}</span>
      </label>
      <div className="slider-row">
        <input
          id={inputId}
          type="range"
          min={MIN_SCORE}
          max={MAX_SCORE}
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuetext={`${value} out of ${MAX_SCORE}`}
        />
        <span className="score">{value}</span>
      </div>
    </div>
  );
}
