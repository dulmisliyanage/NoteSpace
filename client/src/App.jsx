import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import "./App.css";

const initialNotes = [
  {
    id: 1,
    title: "React Basics",
    content: "Today I learned about React components, props and state.",
    date: "Oct 12",
    color: "#E9E5FF",
  },
  {
    id: 2,
    title: "Project Ideas",
    content: "Build a personal notes application using the MERN stack.",
    date: "Oct 11",
    color: "#FFF1D6",
  },
  {
    id: 3,
    title: "Study Goals",
    content: "Practice JavaScript, REST APIs and MongoDB.",
    date: "Oct 10",
    color: "#E6F4EA",
  },
];

const noteColors = [
  "#E9E5FF",
  "#FFF1D6",
  "#E6F4EA",
  "#E8F0FF",
  "#FCE8F1",
];

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  function handleNewNote() {
    setEditingNote(null);
    setShowForm(true);
  }

  function handleEditNote(note) {
    setEditingNote(note);
    setShowForm(true);
  }

  function handleSaveNote(noteData) {
    if (editingNote) {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id === editingNote.id
            ? { ...note, ...noteData }
            : note
        )
      );
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        ...noteData,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        color: noteColors[notes.length % noteColors.length],
      };

      setNotes((previousNotes) => [newNote, ...previousNotes]);
    }

    setShowForm(false);
    setEditingNote(null);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingNote(null);
  }

  return (
    <div className="app-container">
      <Header onNewNote={handleNewNote} />

      <main>
        <section className="welcome-section">
          <h2>Your thoughts, organized.</h2>
          <p>A little space for your big ideas.</p>
        </section>

        {showForm ? (
          <NoteForm
            key={editingNote?.id ?? "new"}
            initialNote={editingNote}
            onSave={handleSaveNote}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <SearchBar />

            <section className="notes-section">
              <div className="section-heading">
                <h2>All Notes</h2>
                <span>{notes.length} notes</span>
              </div>

              <div className="notes-grid">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
