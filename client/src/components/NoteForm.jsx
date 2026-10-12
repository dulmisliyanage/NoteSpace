import { useState } from "react";

function NoteForm({ onSave, onCancel, initialNote }) {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    if (title.trim().length > 100 || content.trim().length > 5000) {
      setError("Title or content is too long.");
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
    });
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{initialNote ? "Edit Note" : "Create a Note"}</h2>

      <label htmlFor="note-title">Note Title</label>
      <input
        id="note-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={100}
        placeholder="Enter your note title..."
      />

      <label htmlFor="note-content">Content</label>
      <textarea
        id="note-content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={5000}
        placeholder="Write your thoughts here..."
        rows={6}
      />

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="new-note-btn">
          {initialNote ? "Save Changes" : "Save Note"}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
