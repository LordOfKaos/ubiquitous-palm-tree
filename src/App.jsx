import { useEffect, useState } from 'react';
import StarScreen from './screens/StarScreen.jsx';
import JobsScreen from './screens/JobsScreen.jsx';

const SCREENS = [
  { id: 'star', label: '⭐ My Star' },
  { id: 'jobs', label: '💼 Jobs' },
];

// The screen lives in the URL hash (#jobs) so links and the back button work.
function screenFromHash() {
  const id = window.location.hash.slice(1);
  return SCREENS.some((s) => s.id === id) ? id : 'star';
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [screen, setScreen] = useState(screenFromHash);

  useEffect(() => {
    const onHashChange = () => setScreen(screenFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <nav className="tabs no-print">
        {SCREENS.map((s) => (
          <a key={s.id} href={`#${s.id}`} aria-current={screen === s.id ? 'page' : undefined}>
            {s.label}
          </a>
        ))}
        <button className="theme" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
          {dark ? '☀️' : '🌙'}
        </button>
      </nav>

      {screen === 'jobs' ? <JobsScreen /> : <StarScreen />}
    </div>
  );
}
