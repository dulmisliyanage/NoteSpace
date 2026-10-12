function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search your notes..."
        aria-label="Search notes"
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />
    </div>
  );
}

export default SearchBar;
