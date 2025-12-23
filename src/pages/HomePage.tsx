import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemonList, fetchPokemon } from '../data/pokeapi';
import type { Pokemon } from '../types/pokemon';

function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

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


  if (cargando) return <p>Cargando Pokémon...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
     <section className="grid-pokemon">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </main>
  );
}

export default HomePage;