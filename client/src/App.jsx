import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import NoteView from "./components/NoteView";
import Hero from "./components/Hero";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/noteService";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // ── Data fetching ──────────────────────────────────────────────
  const loadNotes = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // ── Handlers ───────────────────────────────────────────────────
  function handleNewNote() {
    setEditingNote(null);
    setViewingNote(null);
    setActionError("");
    setShowForm(true);
  }

  function handleViewNote(note) {
    setViewingNote(note);
  }

  function handleCloseView() {
    setViewingNote(null);
  }

  function handleEditNote(note) {
    setViewingNote(null);
    setEditingNote(note);
    setActionError("");
    setShowForm(true);
  }

  async function handleSaveNote(noteData) {
    setSaving(true);
    setActionError("");

    try {
      if (editingNote) {
        const updatedNote = await updateNote(editingNote._id, noteData);
        setNotes((prev) =>
          prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
        );
      } else {
        const newNote = await createNote(noteData);
        setNotes((prev) => [newNote, ...prev]);
      }

      setShowForm(false);
      setEditingNote(null);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteNote(id) {
    if (deletingId !== null) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    setActionError("");

    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));

      if (viewingNote?._id === id) {
        setViewingNote(null);
      }
    } catch (err) {
      setActionError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingNote(null);
    setActionError("");
  }

  // ── Derived state ──────────────────────────────────────────────
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const isSearching = searchTerm.trim().length > 0;
  const countLabel = isSearching
    ? `${filteredNotes.length} result${filteredNotes.length !== 1 ? "s" : ""}`
    : `${notes.length} note${notes.length !== 1 ? "s" : ""}`;

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="app-container">
      <Header onNewNote={handleNewNote} />

      <main>
        {/* Landing hero — visible only when not editing */}
        {!showForm && <Hero />}

        {/* Action-level error */}
        {actionError && (
          <div className="api-error" role="alert">
            {actionError}
          </div>
        )}

        {/* Form view */}
        {showForm ? (
          <fieldset className="form-fieldset" disabled={saving}>
            <NoteForm
              key={editingNote?._id ?? "new"}
              initialNote={editingNote}
              onSave={handleSaveNote}
              onCancel={handleCancel}
            />
          </fieldset>
        ) : (
          <>
            {/* Search */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Notes section */}
            <section className="notes-section" aria-label="Your notes">
              <div className="section-heading">
                <h2>All Notes</h2>
                {!loading && !loadError && (
                  <span>{countLabel}</span>
                )}
              </div>

              {/* Loading state */}
              {loading ? (
                <div className="empty-state">
                  <p className="loading-text">Loading your notes…</p>
                </div>

              /* Load error state */
              ) : loadError ? (
                <div className="empty-state" role="alert">
                  <div className="empty-icon" aria-hidden="true">⚠</div>
                  <h3>Couldn&apos;t load your notes</h3>
                  <p>{loadError}</p>
                  <button
                    id="retry-btn"
                    className="retry-btn"
                    onClick={loadNotes}
                  >
                    Try Again
                  </button>
                </div>

              /* Notes grid */
              ) : filteredNotes.length > 0 ? (
                <div className="notes-grid">
                  {filteredNotes.map((note, index) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      index={index}
                      onView={handleViewNote}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      deletingId={deletingId}
                    />
                  ))}
                </div>

              /* Empty state */
              ) : (
                <div className="empty-state">
                  <div className="empty-icon" aria-hidden="true">
                    {isSearching ? "🔍" : "📝"}
                  </div>
                  <h3>
                    {isSearching
                      ? "No matching notes"
                      : "No notes yet"}
                  </h3>
                  <p>
                    {isSearching
                      ? "Try a different search term."
                      : "Click New Note above to create your first note."}
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Note view modal */}
      {viewingNote && (
        <NoteView
          note={viewingNote}
          onClose={handleCloseView}
          onEdit={handleEditNote}
        />
      )}
    </div>
  );
}

export default App;
