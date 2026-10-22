export default function Summary({ questions, scores }) {
  const values = questions.map((q) => scores[q.id]);
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  const highest = Math.max(...values);
  const lowest = Math.min(...values);
  const strongest = questions.filter((q) => scores[q.id] === highest);
  const focus = questions.filter((q) => scores[q.id] === lowest);
  const names = (list) => list.map((q) => q.label).join(', ');

  return (
    <dl className="summary">
      <div>
        <dt>Average score</dt>
        <dd>{average.toFixed(1)} / 10</dd>
      </div>
      <div>
        <dt>Strongest area</dt>
        <dd>{names(strongest)}</dd>
      </div>
      <div>
        <dt>Area to focus on</dt>
        <dd>{highest === lowest ? 'All areas are level' : names(focus)}</dd>
      </div>
    </dl>
  );
}
