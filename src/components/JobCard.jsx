import { useState } from 'react';

function posted(days) {
  if (days === 0) return 'Posted today';
  if (days === 1) return 'Posted yesterday';
  return `Posted ${days} days ago`;
}

export default function JobCard({ job, saved, onToggleSave }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="card job">
      <div className="job-head">
        <div>
          <h3>{job.title}</h3>
          <div className="employer">{job.employer}</div>
        </div>
        <button
          className={saved ? 'save saved' : 'save'}
          onClick={onToggleSave}
          aria-pressed={saved}
          aria-label={`${saved ? 'Saved' : 'Save'} job: ${job.title}`}
        >
          <span aria-hidden="true">{saved ? '★' : '☆'}</span> {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      <ul className="facts">
        <li>
          <span aria-hidden="true">📍</span> <span className="sr-only">Location: </span>
          {job.location}
        </li>
        <li>
          <span aria-hidden="true">💷</span> <span className="sr-only">Pay: </span>
          {job.salary}
        </li>
        <li>
          <span aria-hidden="true">🕒</span> <span className="sr-only">Hours: </span>
          {job.hours}
        </li>
      </ul>

      <div className="tags">
        {job.noExperience && <span className="tag">No experience needed</span>}
        {job.training && <span className="tag">Training provided</span>}
        <span className="muted">{posted(job.postedDaysAgo)}</span>
      </div>

      {open && (
        <div className="job-details">
          <p>{job.description}</p>
          <strong>What they’re looking for</strong>
          <ul>
            {job.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="muted">This is a sample advert, so there’s nowhere to apply yet.</p>
        </div>
      )}

      <button
        className="secondary"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`${open ? 'Hide' : 'More'} details: ${job.title}`}
      >
        {open ? 'Hide details' : 'More details'}
      </button>
    </article>
  );
}
