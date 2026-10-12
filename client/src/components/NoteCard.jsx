function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article
      className="note-card"
      style={{ backgroundColor: note.color }}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>

      <div className="note-footer">
        <span className="note-date">{note.date}</span>

        <div className="note-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
