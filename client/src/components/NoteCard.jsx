function NoteCard({ title, content, date, color }) {
  return (
    <article
      className="note-card"
      style={{ backgroundColor: color }}
    >
      <h3>{title}</h3>
      <p>{content}</p>
      <span className="note-date">{date}</span>
    </article>
  );
}

export default NoteCard;
