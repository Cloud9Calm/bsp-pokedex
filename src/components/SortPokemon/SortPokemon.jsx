import React from 'react';
import sortPokemon from '../../scripts/sortPokemon';

const SortPokemon = ({ sortMethod, setSortMethod }) => {
    return (
        <div>
            <label>Sort by: </label>
            <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
                <option value="index">Index</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="type">Type</option>
            </select>
        </div>
    );
};

export default SortPokemon;