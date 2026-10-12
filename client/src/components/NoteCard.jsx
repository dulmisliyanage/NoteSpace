function NoteCard({ note, onEdit }) {
  return (
    <article
      className="note-card"
      style={{ backgroundColor: note.color }}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>

      <div className="note-footer">
        <span className="note-date">{note.date}</span>
        <button
          className="edit-btn"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
