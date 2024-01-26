import '../src/App.scss';
import Background from './components/Background/Background';
import Header from './components/Header/Header'
import Pokemon from './components/Pokemon/Pokemon' 

function App() {
  return (
    <div className="App">
      <Background />
      <Header />
      <Pokemon />
    </div>
  );
}

export default App;
