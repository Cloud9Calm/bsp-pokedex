import React from 'react';
import './SearchBar.scss';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='search-bar'>
      <label className='search-bar__label'>Search the Pokédex: </label>
      <input
      className='search-bar__input'
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
