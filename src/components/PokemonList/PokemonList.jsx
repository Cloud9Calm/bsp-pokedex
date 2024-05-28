import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './PokemonList.scss';
import SearchBar from "../SearchBar/SearchBar";
import { getTypeColorClass } from "../../scripts/pokemonTypes";
import '../../styles/pokemon/pokemonTypes.scss';


const PokemonList = ({ searchQuery, setSearchQuery }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [sortMethod, setSortMethod] = useState('index'); 

  const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=2000";

  const fetchPokemonList = async () => {
    setIsLoading(true); 
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
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter(pokemon => pokemon.name.includes(searchQuery.toLowerCase()));
    setFilteredPokemonList(filtered);
  }, [searchQuery, pokemonList]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <section className="pokemon">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <div className="pokemon__loading">Loading...</div> 
      ) : (
        <ul className="pokemon__main-container">
          {filteredPokemonList.map((pokemon, index) => (
            <li
              className={`pokemon__container ${getTypeColorClass(pokemon.types)}`}
              key={index}
            >
              <Link to={`/pokemon/${pokemon.name}`} className="pokemon__link">
                <p className="pokemon__order">{pokemon.id}</p>
                <span className="pokemon__name">{capitalizeFirstLetter(pokemon.name)}</span>
                <img
                  className="pokemon__img"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
                <p className="pokemon__types">
                  {Array.isArray(pokemon.types) ? pokemon.types.join(' & ') : pokemon.types}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
  

};

export default PokemonList;

