import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import '../src/App.scss';
import Header from './components/Header/Header';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonDetails from './components/PokemonDetails/PokemonDetails'
import Background from './components/Background/Background'

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
     <Background />
      <Header />
      <Routes>
        <Route path="/bsp-pokedex" element={<PokemonList searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
