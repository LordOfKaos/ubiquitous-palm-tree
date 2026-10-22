export default function Progress({ questions, scores, baseline }) {
  const total = questions.reduce((sum, q) => sum + scores[q.id] - baseline[q.id], 0);

  return (
    <table className="progress">
      <caption>Distance travelled</caption>
      <thead>
        <tr>
          <th>Area</th>
          <th>Start</th>
          <th>Now</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => {
          const change = scores[q.id] - baseline[q.id];
          return (
            <tr key={q.id}>
              <td>{q.label}</td>
              <td>{baseline[q.id]}</td>
              <td>{scores[q.id]}</td>
              <td>{formatChange(change)}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Total change</td>
          <td>{formatChange(total)}</td>
        </tr>
      </tfoot>
    </table>
  );
}

function formatChange(n) {
  if (n > 0) return `▲ +${n}`;
  if (n < 0) return `▼ ${n}`;
  return '–';
}
