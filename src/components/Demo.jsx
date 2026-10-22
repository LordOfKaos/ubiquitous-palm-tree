export default function Demo({ title, concept, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <code className="concept">{concept}</code>
      <div className="demo-body">{children}</div>
    </section>
  );
}
