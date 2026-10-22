import { useEffect, useState } from 'react';

export default function Clock() {
  const [now, setNow] = useState(new Date());
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="clock">
      <span className="time">{now.toLocaleTimeString()}</span>
      <button onClick={() => setRunning(!running)}>
        {running ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
