function Header({ onNewNote }) {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-icon">✦</span>
        <h1>NoteSpace.</h1>
      </div>

      <button className="new-note-btn" onClick={onNewNote}>
        + New Note
      </button>
    </header>
  );
}

export default Header;
