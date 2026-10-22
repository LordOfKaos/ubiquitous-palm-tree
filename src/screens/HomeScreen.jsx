import { useEffect, useState } from 'react';
import { QUESTIONS } from '../questions.js';
import { KEYS, loadSaved, save } from '../storage.js';
import { fetchCoachUpdates } from '../home/coachSource.js';
import { daysFromToday, downloadCalendarFile, greeting, relativeDay, time } from '../home/dates.js';

const MESSAGE_ICONS = { nudge: '💡', praise: '🎉', reminder: '⏰', info: '📣' };

function average(scores) {
  return QUESTIONS.reduce((sum, q) => sum + scores[q.id], 0) / QUESTIONS.length;
}

export default function HomeScreen() {
  // Read saved data each time the screen opens, so it reflects changes made on other tabs.
  const [star] = useState(() => loadSaved(KEYS.star));
  const [jobs] = useState(() => loadSaved(KEYS.jobs));
  const [saved] = useState(() => loadSaved(KEYS.home));
  const [readMessages, setReadMessages] = useState(saved.readMessages ?? []);
  const [actionState, setActionState] = useState(saved.actionState ?? {});

  const [updates, setUpdates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    save(KEYS.home, { readMessages, actionState });
  }, [readMessages, actionState]);

  useEffect(() => {
    let cancelled = false;
    fetchCoachUpdates()
      .then((data) => !cancelled && setUpdates(data))
      .catch(() => !cancelled && setError('Sorry, updates from your coach could not be loaded.'));
    return () => {
      cancelled = true;
    };
  }, []);

  const name = star.name?.trim();

  return (
    <>
      <header>
        <h1 tabIndex={-1}>
          {greeting()}
          {name ? `, ${name}` : ''} 👋
        </h1>
        <p>Here’s what’s coming up and what your coach has been in touch about.</p>
      </header>

      <main id="main" tabIndex={-1} className="home">
        <div className="notice">
          <strong>Sample data.</strong> The messages, meetings and actions below are examples to show how this
          page will work.
        </div>

        {error && <p className="status">{error}</p>}
        {!updates && !error && <p className="muted status">Loading your updates…</p>}

        {updates && (
          <div className="home-grid">
            <div className="home-col">
              <NextMeeting meeting={updates.meetings[0]} coach={updates.coach} />
              <Messages
                coach={updates.coach}
                messages={updates.messages}
                read={readMessages}
                onRead={(id) => !readMessages.includes(id) && setReadMessages([...readMessages, id])}
                onReadAll={() => setReadMessages(updates.messages.map((m) => m.id))}
              />
            </div>
            <div className="home-col">
              <Actions
                actions={updates.actions}
                state={actionState}
                onToggle={(id, done) => setActionState({ ...actionState, [id]: done })}
              />
              <Meetings meetings={updates.meetings.slice(1)} />
              <Snapshot star={star} savedJobs={jobs.shortlist?.length ?? 0} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function NextMeeting({ meeting, coach }) {
  if (!meeting) return null;
  const days = daysFromToday(meeting.start);

  return (
    <section className="card next-meeting">
      <div className="eyebrow">Your next meeting</div>
      <h2>{meeting.title}</h2>
      <div className="when">
        {relativeDay(meeting.start)} at {time(meeting.start)}
        {days > 1 && <span className="muted"> · in {days} days</span>}
      </div>
      <ul className="facts">
        <li>
          <span aria-hidden="true">👤</span> <span className="sr-only">With: </span>
          {coach.name}
        </li>
        <li>
          <span aria-hidden="true">📍</span> <span className="sr-only">Where: </span>
          {meeting.format}: {meeting.location}
        </li>
        <li>
          <span aria-hidden="true">📝</span> <span className="sr-only">Notes: </span>
          {meeting.notes}
        </li>
      </ul>
      <button className="secondary" onClick={() => downloadCalendarFile(meeting)}>
        <span aria-hidden="true">📅</span> Add to my calendar
      </button>
    </section>
  );
}

function Messages({ coach, messages, read, onRead, onReadAll }) {
  const unread = messages.filter((m) => !read.includes(m.id)).length;

  return (
    <section className="card">
      <div className="section-head">
        <h2>
          Messages from {coach.name.split(' ')[0]}
          {unread > 0 && <span className="badge" aria-label={`${unread} unread`}>{unread}</span>}
        </h2>
        {unread > 0 && (
          <button className="link-button" onClick={onReadAll}>
            Mark all as read
          </button>
        )}
      </div>
      <ul className="messages">
        {messages.map((m) => {
          const isUnread = !read.includes(m.id);
          return (
            <li key={m.id} className={isUnread ? 'message unread' : 'message'}>
              <span className="message-icon" aria-hidden="true">
                {MESSAGE_ICONS[m.type]}
              </span>
              <div>
                <p>{m.text}</p>
                <div className="message-meta">
                  <span className="muted">
                    {relativeDay(m.sentAt)}, {time(m.sentAt)}
                  </span>
                  {isUnread && <span className="new">New</span>}
                  {isUnread && (
                    <button className="link-button" onClick={() => onRead(m.id)}>
                      Mark as read
                    </button>
                  )}
                  {m.link && (
                    <a href={m.link.href} className="message-link" onClick={() => onRead(m.id)}>
                      {m.link.label} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Actions({ actions, state, onToggle }) {
  const isDone = (a) => state[a.id] ?? Boolean(a.doneByDefault);
  const done = actions.filter(isDone).length;
  // Outstanding actions first, soonest due at the top; completed ones sink to the bottom.
  const sorted = [...actions].sort((a, b) => isDone(a) - isDone(b) || new Date(a.due) - new Date(b.due));

  return (
    <section className="card">
      <div className="section-head">
        <h2>My actions</h2>
        <span className="muted">
          {done} of {actions.length} done
        </span>
      </div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-label="Actions completed"
        aria-valuemin="0"
        aria-valuemax={actions.length}
        aria-valuenow={done}
        aria-valuetext={`${done} of ${actions.length} done`}
      >
        <div style={{ width: `${(done / actions.length) * 100}%` }} />
      </div>
      <ul className="actions">
        {sorted.map((a) => {
          const complete = isDone(a);
          const days = daysFromToday(a.due);
          const overdue = !complete && days < 0;
          return (
            <li key={a.id} className={complete ? 'done' : ''}>
              <label className="check">
                <input type="checkbox" checked={complete} onChange={(e) => onToggle(a.id, e.target.checked)} />
                <span>{a.text}</span>
              </label>
              <span className={overdue ? 'due overdue' : 'due muted'}>
                {complete ? 'Done' : overdue ? (
                  <>
                    <span aria-hidden="true">⚠️</span> Overdue
                  </>
                ) : (
                  `Due ${Math.abs(days) <= 1 ? relativeDay(a.due).toLowerCase() : relativeDay(a.due)}`
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Meetings({ meetings }) {
  if (meetings.length === 0) return null;

  return (
    <section className="card">
      <h2>Coming up</h2>
      <ul className="meetings">
        {meetings.map((m) => (
          <li key={m.id}>
            <div className="date-chip">
              <span>{new Date(m.start).toLocaleDateString('en-GB', { month: 'short' })}</span>
              <strong>{new Date(m.start).getDate()}</strong>
            </div>
            <div>
              <strong>{m.title}</strong>
              <div className="muted">
                {relativeDay(m.start)}, {time(m.start)} · {m.format}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Snapshot({ star, savedJobs }) {
  const hasScores = Boolean(star.scores);
  const now = hasScores ? average(star.scores) : null;
  const change = hasScores && star.baseline ? now - average(star.baseline.scores) : null;

  return (
    <section className="card">
      <h2>My progress</h2>
      <div className="tiles">
        <a className="tile" href="#star">
          <span className="muted">Employability Star</span>
          <strong>{hasScores ? `${now.toFixed(1)} out of 10` : 'Not started'}</strong>
          <span className="muted">
            {change === null
              ? hasScores
                ? 'Average score'
                : 'Score yourself'
              : `${change >= 0 ? 'Up' : 'Down'} ${Math.abs(change).toFixed(1)} since your start`}
          </span>
        </a>
        <a className="tile" href="#jobs">
          <span className="muted">Saved jobs</span>
          <strong>{savedJobs}</strong>
          <span className="muted">{savedJobs ? 'View my shortlist' : 'Find jobs'}</span>
        </a>
      </div>
    </section>
  );
}
