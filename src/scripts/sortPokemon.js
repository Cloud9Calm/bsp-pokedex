const sortPokemon = (pokemonList, method) => {
    switch(method) {
      case 'alphabetical':
        return [...pokemonList].sort((a, b) => a.name.localeCompare(b.name));
      case 'type':
        return [...pokemonList].sort((a, b) => a.types[0].localeCompare(b.types[0]));
      case 'index':
      default:
        return pokemonList; 
    }
  };
  