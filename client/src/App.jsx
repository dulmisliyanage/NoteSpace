import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";
import "./App.css";

const sampleNotes = [
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

function App() {
  return (
    <div className="app-container">
      <Header />

      <main>
        <section className="welcome-section">
          <h2>Your thoughts, organized.</h2>
          <p>A little space for your big ideas.</p>
        </section>

        <SearchBar />

        <section className="notes-section">
          <div className="section-heading">
            <h2>All Notes</h2>
            <span>{sampleNotes.length} notes</span>
          </div>

          <div className="notes-grid">
            {sampleNotes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                content={note.content}
                date={note.date}
                color={note.color}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
