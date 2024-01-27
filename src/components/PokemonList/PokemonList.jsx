import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './PokemonList.scss';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data.results;

      const pokemonWithImages = await Promise.all(
        data.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        })
      );

      setPokemonList(pokemonWithImages); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <section className="pokemon">
      <h2 className="pokemon__title">151 Pokemon</h2>
        <ul className="pokemon__main-container">
        {pokemonList.map((pokemon, index) => (
      <li className="pokemon__container" key={index}>
        <Link to={`/pokemon/${pokemon.name}`} className="pokemon__link">
          <img className="pokemon__img" src={pokemon.sprites.front_default} alt={pokemon.name}/>
          <span className="pokemon__name">{pokemon.name}</span>
        </Link>
      </li>
    ))}
  </ul>
</section>
  );
};

export default PokemonList;
