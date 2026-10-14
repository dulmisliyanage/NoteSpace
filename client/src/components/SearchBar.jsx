function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      {/* Search icon */}
      <span className="search-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </span>

      <input
        id="search-notes"
        type="search"
        placeholder="Search notes by title…"
        aria-label="Search notes by title"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
