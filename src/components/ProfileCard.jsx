import { useState } from 'react';

export default function ProfileCard({ name, role, emoji }) {
  const [likes, setLikes] = useState(0);

  return (
    <div className="profile">
      <span className="avatar">{emoji}</span>
      <div>
        <strong>{name}</strong>
        <div className="muted">{role}</div>
      </div>
      <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
    </div>
  );
}
