import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load notes when the application starts
  useEffect(() => {
    async function loadNotes() {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  function handleNewNote() {
    setEditingNote(null);
    setError("");
    setShowForm(true);
  }

  function handleEditNote(note) {
    setEditingNote(note);
    setError("");
    setShowForm(true);
  }

  async function handleSaveNote(noteData) {
    setSaving(true);
    setError("");

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
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteNote(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    setError("");

    try {
      await deleteNote(id);
      setNotes((previousNotes) =>
        previousNotes.filter((note) => note._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingNote(null);
    setError("");
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

        {error && (
          <div className="api-error" role="alert">
            {error}
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
              ) : error ? (
                <div className="empty-state">
                  <p>Unable to load your notes. Please try again.</p>
                </div>
              ) : filteredNotes.length > 0 ? (
                <div className="notes-grid">
                  {filteredNotes.map((note, index) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      index={index}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
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
    </div>
  );
}

export default App;
