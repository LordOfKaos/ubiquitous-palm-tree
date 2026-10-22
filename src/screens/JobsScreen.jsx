import { useEffect, useState } from 'react';
import { DEFAULT_AREA, DEFAULT_RADIUS_MILES, RADIUS_OPTIONS } from '../jobs/config.js';
import { fetchJobs } from '../jobs/jobSource.js';
import { KEYS, loadSaved, save } from '../storage.js';
import JobCard from '../components/JobCard.jsx';

export default function JobsScreen() {
  // Read saved data each time the screen opens, so switching tabs never shows stale data.
  const [saved] = useState(() => loadSaved(KEYS.jobs));
  const [area, setArea] = useState(saved.area ?? DEFAULT_AREA);
  const [areaInput, setAreaInput] = useState(area);
  const [radius, setRadius] = useState(saved.radius ?? DEFAULT_RADIUS_MILES);
  const [shortlist, setShortlist] = useState(saved.shortlist ?? []);

  const [keyword, setKeyword] = useState('');
  const [hours, setHours] = useState('all');
  const [noExperienceOnly, setNoExperienceOnly] = useState(false);
  const [shortlistOnly, setShortlistOnly] = useState(false);
  const [sort, setSort] = useState('newest');

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    save(KEYS.jobs, { area, radius, shortlist });
  }, [area, radius, shortlist]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchJobs({ area, radius })
      .then((results) => !cancelled && setJobs(results))
      .catch(() => !cancelled && setError('Sorry, jobs could not be loaded. Please try again.'))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [area, radius]);

  function searchArea(e) {
    e.preventDefault();
    setArea(areaInput.trim() || DEFAULT_AREA);
  }

  function toggleShortlist(id) {
    setShortlist(shortlist.includes(id) ? shortlist.filter((s) => s !== id) : [...shortlist, id]);
  }

  const term = keyword.trim().toLowerCase();
  const shown = jobs
    .filter((job) => !term || `${job.title} ${job.employer} ${job.description}`.toLowerCase().includes(term))
    .filter((job) => hours === 'all' || job.hours === hours)
    .filter((job) => !noExperienceOnly || job.noExperience)
    .filter((job) => !shortlistOnly || shortlist.includes(job.id))
    .sort((a, b) => (sort === 'nearest' ? a.distance - b.distance : a.postedDaysAgo - b.postedDaysAgo));

  return (
    <>
      <header>
        <h1>Jobs Near You</h1>
        <p>Browse vacancies in your area and save the ones you’d like to talk about with your adviser.</p>
      </header>

      <main className="jobs">
        <form className="card area-search" onSubmit={searchArea}>
          <label>
            Town or postcode
            <input value={areaInput} onChange={(e) => setAreaInput(e.target.value)} placeholder={DEFAULT_AREA} />
          </label>
          <label>
            Distance
            <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
              {RADIUS_OPTIONS.map((miles) => (
                <option key={miles} value={miles}>
                  Within {miles} miles
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Search</button>
        </form>

        <div className="notice">
          <strong>Sample adverts.</strong> These are made-up jobs to show how this screen will work. They aren’t
          real vacancies.
        </div>

        <div className="filters">
          <input
            className="keyword"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search job titles, e.g. care, warehouse"
            aria-label="Search job titles"
          />
          <select value={hours} onChange={(e) => setHours(e.target.value)} aria-label="Hours">
            <option value="all">Any hours</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
            <option value="newest">Newest first</option>
            <option value="nearest">Nearest first</option>
          </select>
          <label className="check">
            <input type="checkbox" checked={noExperienceOnly} onChange={(e) => setNoExperienceOnly(e.target.checked)} />
            No experience needed
          </label>
          <label className="check">
            <input type="checkbox" checked={shortlistOnly} onChange={(e) => setShortlistOnly(e.target.checked)} />
            My saved jobs ({shortlist.length})
          </label>
        </div>

        {loading ? (
          <p className="muted status">Loading jobs near {area}…</p>
        ) : error ? (
          <p className="status">{error}</p>
        ) : (
          <>
            <p className="muted status" aria-live="polite">
              {shown.length} {shown.length === 1 ? 'job' : 'jobs'} within {radius} miles of {area}
            </p>
            {shown.length === 0 && (
              <p className="status">No jobs match. Try a wider distance or fewer filters.</p>
            )}
            <div className="job-list">
              {shown.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saved={shortlist.includes(job.id)}
                  onToggleSave={() => toggleShortlist(job.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
