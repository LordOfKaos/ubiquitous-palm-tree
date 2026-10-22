import { useEffect, useState } from 'react';
import { QUESTIONS } from '../questions.js';
import { loadSaved, save } from '../storage.js';
import Question from '../components/Question.jsx';
import SpiderChart from '../components/SpiderChart.jsx';
import Summary from '../components/Summary.jsx';
import Progress from '../components/Progress.jsx';

const STORAGE_KEY = 'employability-star';
const today = new Date().toISOString().slice(0, 10);
const saved = loadSaved(STORAGE_KEY);
const initialScores = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, saved.scores?.[q.id] ?? 5])
);

export default function StarScreen() {
  const [name, setName] = useState(saved.name ?? '');
  const [date, setDate] = useState(today);
  const [scores, setScores] = useState(initialScores);
  const [baseline, setBaseline] = useState(saved.baseline ?? null);

  useEffect(() => {
    save(STORAGE_KEY, { name, scores, baseline });
  }, [name, scores, baseline]);

  function setScore(id, value) {
    setScores({ ...scores, [id]: value });
  }

  function saveBaseline() {
    if (baseline && !window.confirm('Replace your saved starting point with today’s scores?')) return;
    setBaseline({ date, scores });
  }

  function clearBaseline() {
    if (window.confirm('Remove your saved starting point?')) setBaseline(null);
  }

  return (
    <>
      <header>
        <h1>My Employability Star</h1>
        <p>Score yourself from 1 (not at all) to 10 (completely) on each question.</p>
        <div className="row center no-print">
          <button onClick={() => window.print()}>🖨️ Print / save PDF</button>
        </div>
      </header>

      <main className="layout">
        <section className="card">
          <div className="participant">
            <label>
              Participant name
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </label>
            <label>
              Date
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>

          {QUESTIONS.map((q, i) => (
            <Question
              key={q.id}
              number={i + 1}
              question={q}
              value={scores[q.id]}
              onChange={(value) => setScore(q.id, value)}
            />
          ))}
        </section>

        <section className="card chart-card">
          <h2>{name ? `${name}'s star` : 'Your star'}</h2>
          <div className="muted">{date}</div>

          {baseline && (
            <div className="legend">
              <span><i className="swatch now" /> Now ({date})</span>
              <span><i className="swatch start" /> Start ({baseline.date})</span>
            </div>
          )}

          <SpiderChart questions={QUESTIONS} scores={scores} baseline={baseline?.scores} />

          <div className="row center wrap no-print">
            <button onClick={saveBaseline}>
              {baseline ? 'Update starting point' : '📌 Save as starting point'}
            </button>
            {baseline && (
              <button className="secondary" onClick={clearBaseline}>
                Clear starting point
              </button>
            )}
          </div>
          {!baseline && (
            <p className="muted hint">
              Save today’s scores as your starting point, then come back at your next check-in to see how far you’ve come.
            </p>
          )}

          <Summary questions={QUESTIONS} scores={scores} />
          {baseline && <Progress questions={QUESTIONS} scores={scores} baseline={baseline.scores} />}
        </section>
      </main>
    </>
  );
}
