import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import PokemonLoading from '../components/ui/PokemonLoading';
import { fetchPokemonList, fetchPokemon } from '../data/pokeapi';
import type { Pokemon } from '../types/pokemon';

function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [busqueda, setBusqueda] = useState('');
    const [tipoSeleccionado, setTipoSeleccionado] = useState<string>('all');
  const [orden, setOrden] = useState<'asc' | 'desc' | 'id'>('id');

  
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

  // Array de los tipos pkmn
    const tiposUnicos = Array.from(
    new Set(pokemons.flatMap((p) => p.types.map((t) => t.type.name)))
  );
  
  // filtro y ordenacion
  const texto = busqueda.trim().toLowerCase();

  let pokemonsFiltrados = [...pokemons];

  // filtro por nombre 
  if (texto) {
    pokemonsFiltrados = pokemonsFiltrados.filter((p) => 
      p.name.toLowerCase().includes(texto)
    );
  }

    // filtro por tipo
  if (tipoSeleccionado !== 'all') {
    pokemonsFiltrados = pokemonsFiltrados.filter((p) =>
      p.types.some((t) => t.type.name === tipoSeleccionado)
    );
  }
  // ordenar
  if (orden === 'asc') {
    pokemonsFiltrados.sort((a, b) => a.name.localeCompare(b.name));
  } else if (orden === 'desc') {
    pokemonsFiltrados.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    pokemonsFiltrados.sort((a, b) => a.id - b.id);
  }

  // lottie loading
  if (cargando) {
    return (
      <main className="contenedor-principal">
        <PokemonLoading />
      </main>
    );
  }

  if (error) {
    return (       
    <main className="contenedor-principal">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </main>
    );;
  }

  return (
    <main className="contenedor-principal">
      <SearchBar busqueda={busqueda} actualizarBusqueda={setBusqueda} />

      <FilterBar
        tipoSeleccionado={tipoSeleccionado}
        cambiarTipo={setTipoSeleccionado}
        orden={orden}
        cambiarOrden={setOrden}
        tiposPokemon={tiposUnicos}
      />

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