import { useEffect, useRef, useState } from 'react';
import HomeScreen from './screens/HomeScreen.jsx';
import StarScreen from './screens/StarScreen.jsx';
import JobsScreen from './screens/JobsScreen.jsx';

const SCREENS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'star', icon: '⭐', label: 'My Star' },
  { id: 'jobs', icon: '💼', label: 'Jobs' },
];

// The screen lives in the URL hash (#jobs) so links and the back button work.
function screenFromHash() {
  const id = window.location.hash.slice(1);
  return SCREENS.some((s) => s.id === id) ? id : 'home';
}

// The hash is used for screens, so the skip link moves focus itself rather than navigating.
function skipToMain(e) {
  e.preventDefault();
  document.getElementById('main')?.focus();
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [screen, setScreen] = useState(screenFromHash);
  const firstRender = useRef(true);

  useEffect(() => {
    const onHashChange = () => {
      setScreen(screenFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Give each screen its own page title, and move keyboard and screen reader focus to the
  // new screen's heading when the participant switches tab.
  useEffect(() => {
    document.title = `${SCREENS.find((s) => s.id === screen).label} – Employability Hub`;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    document.querySelector('h1')?.focus();
  }, [screen]);

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <a className="skip-link" href="#main" onClick={skipToMain}>
        Skip to main content
      </a>
      <div className="topbar no-print">
        <nav className="tabs" aria-label="Main">
          <span className="brand-name">Employability Hub</span>
          {SCREENS.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={screen === s.id ? 'page' : undefined}>
              <span aria-hidden="true">{s.icon}</span> {s.label}
            </a>
          ))}
          <button className="theme" onClick={() => setDark(!dark)} aria-label="Dark mode" aria-pressed={dark}>
            <span aria-hidden="true">{dark ? '☀️' : '🌙'}</span>
          </button>
        </nav>
      </div>

      {screen === 'home' && <HomeScreen />}
      {screen === 'star' && <StarScreen />}
      {screen === 'jobs' && <JobsScreen />}
    </div>
  );
}
