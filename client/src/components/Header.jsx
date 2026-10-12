function Header() {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-icon">✦</span>
        <h1>NoteSpace.</h1>
      </div>

      <button className="new-note-btn">
        + New Note
      </button>
    </header>
  );
}

export default Header;
