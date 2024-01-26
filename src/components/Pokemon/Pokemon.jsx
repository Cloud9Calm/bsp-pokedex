import React, { useState, useEffect } from "react";
import axios from "axios";
import './Pokemon.scss';

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
          <li 
                className="pokemon__container"
                key={index}>
            <img 
                className="pokemon__img"
                src={pokemon.sprites.front_default} 
                alt={pokemon.name} />
            <a 
                className="pokemon__name"
                href={pokemon.url}>{pokemon.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PokemonList;
