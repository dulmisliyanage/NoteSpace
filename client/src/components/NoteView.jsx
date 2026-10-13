import { useEffect, useRef } from "react";

function NoteView({ note, onClose, onEdit }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const createdDate = new Date(
    note.createdAt
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="note-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="note-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-view-title"
      >
        <div className="note-modal-header">
          <h2 id="note-view-title">{note.title}</h2>

          <button
            ref={closeButtonRef}
            type="button"
            className="note-modal-close"
            onClick={onClose}
            aria-label="Close note"
          >
            ×
          </button>
        </div>

        <p className="note-modal-date">
          Created {createdDate}
        </p>

        <div className="note-modal-content">
          {note.content}
        </div>

        <div className="note-modal-actions">
          <button
            type="button"
            className="note-modal-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="note-modal-primary"
            onClick={() => onEdit(note)}
          >
            Edit Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteView;
