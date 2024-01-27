import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './PokemonList.scss';
import SearchBar from "../SearchBar/SearchBar";
import { getTypeColorClass } from "../../scripts/pokemonTypes";
import '../../styles/pokemon/pokemonTypes.scss';


const PokemonList = ({ searchQuery, setSearchQuery }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [sortMethod, setSortMethod] = useState('index'); // Default sorting by index

  const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=2000";

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data.results;
  
      const pokemonWithImagesAndTypes = await Promise.all(
        data.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          const types = response.data.types.map((typeData) => typeData.type.name);
          return { ...response.data, types };
        })
      );
  
      setPokemonList(pokemonWithImagesAndTypes);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter(pokemon => pokemon.name.includes(searchQuery.toLowerCase()));
    setFilteredPokemonList(filtered);
  }, [searchQuery, pokemonList]);


  return (
    <section className="pokemon">
      <h2 className="pokemon__title">Pokémon</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="pokemon__main-container">
  {filteredPokemonList.map((pokemon, index) => (
    <li
      className={`pokemon__container ${getTypeColorClass(pokemon.types)}`}
      key={index}
    >
      <Link to={`/pokemon/${pokemon.name}`} className="pokemon__link">
        <img
          className="pokemon__img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <span className="pokemon__name">{pokemon.name}</span>
      </Link>
    </li>
  ))}
</ul>

    </section>
  );
};

export default PokemonList;

