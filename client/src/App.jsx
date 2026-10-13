import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import NoteView from "./components/NoteView";
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

  // Load notes when the application starts
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
        const updatedNote = await updateNote(
          editingNote._id,
          noteData
        );

        setNotes((previousNotes) =>
          previousNotes.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
          )
        );
      } else {
        const newNote = await createNote(noteData);
        setNotes((previousNotes) => [
          newNote,
          ...previousNotes,
        ]);
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

      setNotes((previousNotes) =>
        previousNotes.filter((note) => note._id !== id)
      );

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

  const filteredNotes = notes.filter((note) =>
    note.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="app-container">
      <Header onNewNote={handleNewNote} />

      <main>
        <section className="welcome-section">
          <h2>Your thoughts, organized.</h2>
          <p>A little space for your big ideas.</p>
        </section>

        {actionError && (
          <div className="api-error" role="alert">
            {actionError}
          </div>
        )}

        {showForm ? (
          <fieldset
            className="form-fieldset"
            disabled={saving}
          >
            <NoteForm
              key={editingNote?._id ?? "new"}
              initialNote={editingNote}
              onSave={handleSaveNote}
              onCancel={handleCancel}
            />
          </fieldset>
        ) : (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            <section className="notes-section">
              <div className="section-heading">
                <h2>All Notes</h2>
                <span>
                  {searchTerm.trim()
                    ? `${filteredNotes.length} results`
                    : `${notes.length} notes`}
                </span>
              </div>

              {loading ? (
                <div className="empty-state">
                  <p>Loading your notes...</p>
                </div>
              ) : loadError ? (
                <div className="empty-state" role="alert">
                  <h3>Couldn't load your notes</h3>
                  <p>{loadError}</p>

                  <button
                    className="retry-btn"
                    onClick={loadNotes}
                  >
                    Try Again
                  </button>
                </div>
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
              ) : (
                <div className="empty-state">
                  <h3>
                    {searchTerm.trim()
                      ? "No matching notes found"
                      : "No notes yet"}
                  </h3>

                  <p>
                    {searchTerm.trim()
                      ? "Try searching with a different title."
                      : "Click New Note to create your first note."}
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </main>

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
