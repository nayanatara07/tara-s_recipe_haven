import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for a recipe..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;