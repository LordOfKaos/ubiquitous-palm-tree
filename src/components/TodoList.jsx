import { useState } from 'react';

let nextId = 3;

export default function TodoList() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn JSX', done: true },
    { id: 2, text: 'Learn hooks', done: false },
  ]);

  function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: nextId++, text: text.trim(), done: false }]);
    setText('');
  }

  function toggle(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div>
      <form onSubmit={addTodo} className="row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task…"
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todos">
        {todos.map((t) => (
          <li key={t.id} className={t.done ? 'done' : ''}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              {t.text}
            </label>
            <button className="link" onClick={() => remove(t.id)}>✕</button>
          </li>
        ))}
      </ul>
      <small>{remaining} remaining</small>
    </div>
  );
}
