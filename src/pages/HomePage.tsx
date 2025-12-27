import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/ui/SearchBar';
import PokemonLoading from '../components/ui/PokemonLoading';
import { fetchPokemonList, fetchPokemon } from '../data/pokeapi';
import type { Pokemon } from '../types/pokemon';

function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [busqueda, setBusqueda] = useState('');
  
  useEffect(() => {
    async function cargarPokemons() {
      try {
        setCargando(true);
        setError(null);

        // kanto 151 iniciales
        const basicList = await fetchPokemonList(20, 0);

        // con sus detalles
        const detailedPokemons = await Promise.all(
          basicList.map((p) => fetchPokemon(p.name))
        );
        
        setPokemons(detailedPokemons);
        setCargando(false);
      } catch (err) {
        console.log('Error cargando pokemons:', err);
        setError('No se pudo cargar la API');
        setCargando(false);
      }
    }

    cargarPokemons();
  }, []);
  
  const texto = busqueda.trim().toLowerCase();

  let pokemonsFiltrados = [...pokemons];

  if (texto) {
    pokemonsFiltrados = pokemonsFiltrados.filter((p) => 
      p.name.toLowerCase().includes(texto)
    );
  }

  // lottie loading
  if (cargando) {
    return (
      <main className="contenedor-principal">
        <PokemonLoading />
      </main>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <main className="contenedor-principal">
      <SearchBar busqueda={busqueda} actualizarBusqueda={setBusqueda} />

     <div className="results-info">
        <p>
          {pokemonsFiltrados.length} de {pokemons.length}
        </p>
      </div>

      {pokemonsFiltrados.length === 0 ? (
        <div className="no-results">
          <p>No hay resulados</p>
        </div>
      ) : (
     <section className="grid-pokemon">
      {pokemonsFiltrados.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      </section>
    )}
    </main>
  );
}

export default HomePage;