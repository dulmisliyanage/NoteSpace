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

  const createdDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const updatedDate = note.updatedAt && note.updatedAt !== note.createdAt
    ? new Date(note.updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

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
        {/* Header */}
        <div className="note-modal-header">
          <h2 id="note-view-title">{note.title}</h2>

          <button
            ref={closeButtonRef}
            type="button"
            className="note-modal-close"
            onClick={onClose}
            aria-label="Close note"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Metadata */}
        <p className="note-modal-date">
          {updatedDate
            ? `Updated ${updatedDate}`
            : `Created ${createdDate}`}
        </p>

        <hr className="note-modal-divider" />

        {/* Body */}
        <div className="note-modal-content">
          {note.content}
        </div>

        {/* Actions */}
        <div className="note-modal-actions">
          <button
            type="button"
            id="modal-close-btn"
            className="note-modal-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            id="modal-edit-btn"
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
