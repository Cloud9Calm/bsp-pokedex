import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <label>Search Pokémon: </label>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
