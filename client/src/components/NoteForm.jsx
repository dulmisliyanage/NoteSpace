import { useState } from "react";

const TITLE_MAX = 100;
const CONTENT_MAX = 5000;

function NoteForm({ onSave, onCancel, initialNote }) {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    if (title.trim().length > TITLE_MAX || content.trim().length > CONTENT_MAX) {
      setError("Title or content exceeds the maximum allowed length.");
      return;
    }

    setError("");
    onSave({
      title: title.trim(),
      content: content.trim(),
    });
  }

  const isEditing = Boolean(initialNote);

  return (
    <form
      id="note-form"
      className="note-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>{isEditing ? "Edit Note" : "New Note"}</h2>

      <div className="form-field">
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError("");
          }}
          maxLength={TITLE_MAX}
          placeholder="Give your note a title…"
          autoFocus
          aria-required="true"
          aria-describedby={error ? "form-error-msg" : undefined}
        />
        <div className="form-hint">
          <span className="char-count">{title.length} / {TITLE_MAX}</span>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            if (error) setError("");
          }}
          maxLength={CONTENT_MAX}
          placeholder="Write your thoughts here…"
          rows={8}
          aria-required="true"
          aria-describedby={error ? "form-error-msg" : undefined}
        />
        <div className="form-hint">
          <span className="char-count">{content.length} / {CONTENT_MAX}</span>
        </div>
      </div>

      {error && (
        <p id="form-error-msg" className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button
          type="button"
          id="cancel-note-btn"
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          id="save-note-btn"
          className="new-note-btn"
        >
          {isEditing ? "Save Changes" : "Save Note"}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
