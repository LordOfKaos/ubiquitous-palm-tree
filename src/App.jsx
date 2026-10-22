import { useState } from 'react';
import Counter from './components/Counter.jsx';
import TodoList from './components/TodoList.jsx';
import Clock from './components/Clock.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import Demo from './components/Demo.jsx';

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header>
        <h1>⚛️ React Demo</h1>
        <p>A handful of tiny components, each showing one core React idea.</p>
        <button onClick={() => setDark(!dark)}>
          {dark ? '☀️ Light mode' : '🌙 Dark mode'}
        </button>
      </header>

      <main className="grid">
        <Demo title="State" concept="useState">
          <Counter />
        </Demo>

        <Demo title="Lists & Forms" concept="controlled inputs, .map(), keys">
          <TodoList />
        </Demo>

        <Demo title="Side Effects" concept="useEffect + cleanup">
          <Clock />
        </Demo>

        <Demo title="Props" concept="reusable components">
          <ProfileCard name="Ada Lovelace" role="First programmer" emoji="👩‍💻" />
          <ProfileCard name="Alan Turing" role="Computing pioneer" emoji="🧠" />
        </Demo>
      </main>

      <footer>Built with React + Vite</footer>
    </div>
  );
}
