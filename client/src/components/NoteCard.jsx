const noteColors = [
  "#E9E5FF",
  "#FFF1D6",
  "#E6F4EA",
  "#E8F0FF",
  "#FCE8F1",
];

function NoteCard({
  note,
  index,
  onView,
  onEdit,
  onDelete,
  deletingId,
}) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const backgroundColor = noteColors[index % noteColors.length];

  return (
    <article
      className="note-card"
      style={{ backgroundColor }}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>

      <div className="note-footer">
        <span className="note-date">{formattedDate}</span>

        <div className="note-actions">
          <button
            type="button"
            className="view-btn"
            onClick={() => onView(note)}
          >
            View
          </button>

          <button
            className="edit-btn"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(note._id)}
            disabled={deletingId !== null}
          >
            {deletingId === note._id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
