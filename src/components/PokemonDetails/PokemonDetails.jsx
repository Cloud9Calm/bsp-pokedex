import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.scss';

const PokemonDetails = () => {
  const { name } = useParams(); 
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonDetails(response.data);

        const abilitiesData = await Promise.all(
          response.data.abilities.map(async (ability) => {
            const abilityResponse = await axios.get(ability.ability.url);
            return abilityResponse.data;
          })
        );
        setAbilities(abilitiesData);

        const typesData = await Promise.all(
          response.data.types.map(async (type) => {
            const typeResponse = await axios.get(type.type.url);
            return typeResponse.data;
          })
        );
        setTypes(typesData);

        setStats(response.data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  return (
    <section className='details'>
        <Link to="/" className='details__back-button'>Back to Homepage</Link>

      {pokemonDetails ? (
        <div className='details__main-container'>
          <h2 className='details__title'>Pokemon Details</h2>
          <p>Name: {pokemonDetails.name}</p>
          <img className='details__img' src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          <div className='details__abilities-container'>
            <div className='details__containers'>
            <h3 className='details__title'>Abilities:</h3>
            <ul>
                {abilities.map((ability) => (
                <li className='details__stats' key={ability.id}>{ability.name}</li>
                ))}
            </ul>
            </div>
            <div className='details__containers'>
            <h3 className='details__title'>Types:</h3>
            <ul>
                {types.map((type) => (
                <li className='details__stats' key={type.id}>{type.name}</li>
                ))}
            </ul>
            </div>
            <div className='details__containers'>
            <h3 className='details__title'>Base Stats:</h3>
            <ul>
                {stats.map((stat) => (
                <li className='details__stats' key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                </li>
                ))}
            </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default PokemonDetails;
