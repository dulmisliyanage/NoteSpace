// Muted, professional accent colours used only as the 3px top border stripe
const CARD_ACCENTS = [
  "#6D5CE7", // lavender
  "#E89B4F", // amber
  "#3DA96B", // sage
  "#4B90D9", // steel blue
  "#C76DA3", // mauve
];

function NoteCard({
  note,
  index,
  onView,
  onEdit,
  onDelete,
  deletingId,
}) {
  const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const isDeleting = deletingId === note._id;

  return (
    <article
      className="note-card"
      style={{ "--card-accent": accent }}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>

      <div className="note-footer">
        <span className="note-date">{formattedDate}</span>

        <div className="note-actions">
          <button
            type="button"
            id={`view-${note._id}`}
            className="view-btn"
            onClick={() => onView(note)}
            aria-label={`View note: ${note.title}`}
          >
            View
          </button>

          <button
            type="button"
            id={`edit-${note._id}`}
            className="edit-btn"
            onClick={() => onEdit(note)}
            aria-label={`Edit note: ${note.title}`}
          >
            Edit
          </button>

          <button
            type="button"
            id={`delete-${note._id}`}
            className="delete-btn"
            onClick={() => onDelete(note._id)}
            disabled={deletingId !== null}
            aria-label={`Delete note: ${note.title}`}
          >
            {isDeleting ? "…" : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
