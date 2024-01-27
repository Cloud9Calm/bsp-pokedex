import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/App.scss';
import Header from './components/Header/Header';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonDetails from './components/PokemonDetails/PokemonDetails'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
