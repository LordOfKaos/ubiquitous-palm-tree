import { useState } from 'react';
import { QUESTIONS } from './questions.js';
import Question from './components/Question.jsx';
import SpiderChart from './components/SpiderChart.jsx';
import Summary from './components/Summary.jsx';

const initialScores = Object.fromEntries(QUESTIONS.map((q) => [q.id, 5]));
const today = new Date().toISOString().slice(0, 10);

export default function App() {
  const [dark, setDark] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(today);
  const [scores, setScores] = useState(initialScores);

  function setScore(id, value) {
    setScores({ ...scores, [id]: value });
  }

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header>
        <h1>My Employability Star</h1>
        <p>Score yourself from 1 (not at all) to 10 (completely) on each question.</p>
        <div className="row center no-print">
          <button onClick={() => setDark(!dark)}>
            {dark ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
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
          <SpiderChart questions={QUESTIONS} scores={scores} />
          <Summary questions={QUESTIONS} scores={scores} />
        </section>
      </main>
    </div>
  );
}
