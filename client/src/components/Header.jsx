function Header({ onNewNote }) {
  return (
    <header className="header">
      <div className="brand">
        {/* Wordmark icon — simple geometric mark */}
        <span className="brand-mark" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white"/>
            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6"/>
            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6"/>
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.35"/>
          </svg>
        </span>
        <h1>NoteSpace</h1>
      </div>

      <button
        id="new-note-btn"
        className="new-note-btn"
        onClick={onNewNote}
        aria-label="Create a new note"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
        New Note
      </button>
    </header>
  );
}

export default Header;
