import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPokemon, fetchPokemonSpecies } from '../data/pokeapi';
import { typeTranslations } from '../utils/translations';
import { habitatTranslations } from '../utils/translations';
import { statsTranslations } from '../utils/translations';
import type { Pokemon, PokemonSpecies } from '../types/pokemon';

function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function cargarPokemon() {
      if (!name) {
        setErrorMsg('No se ha indicado ningún Pokémon');
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setErrorMsg(null);

        const pokemonData = await fetchPokemon(name);
        setPokemon(pokemonData)
        const speciesData = await fetchPokemonSpecies(pokemonData.id);
        setSpecies(speciesData);  
        setCargando(false);
      } catch (err) {
        setErrorMsg('No se pudo cargar el Pokémon');
        setCargando(false);
      }
    }
    cargarPokemon();
  }, [name]);

  // sacar la descripcion en español
  const getDescripcionEspanol = (): string => {
    if (!species) return '';
    
    const entradaEsp = species.flavor_text_entries.find(
      entry => entry.language.name === 'es'
    );
    
    if (entradaEsp) {
      // limpiar saltos de linea raros
      return entradaEsp.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
    }
    
    return 'Descripción no disponible';
  };

  if (cargando) {
    return (
      <main className="contenedor-detalle">
        <div className="loading-container">
          <p>Cargando Pokémon...</p>
        </div>
      </main>
    );
  }

  if (errorMsg || !pokemon) {
    return (
      <main className="contenedor-detalle">
        <div className="error-container">
          <p>{errorMsg ?? 'Pokémon no encontrado'}</p>
        </div>
        <Link className="boton" to="/">
          Volver
        </Link>
      </main>
    );
  }

  // primera letra mayuscula
  const nombreCapitalizado = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <main className="contenedor-detalle">
      <div className="detalle-header">
        <h2 className="titulo-detalle">
          {nombreCapitalizado}
        </h2>
        <span className="pokemon-number-detail">
          {String(pokemon.id).padStart(3, '0')}
        </span>
      </div>

      <div>
        <img
          className="imagen-detalle"
          src={
            pokemon.sprites.other?.['official-artwork']?.front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
        />
      </div>

      {species && (
        <div className="badges-container">
          {species.is_legendary && <span className="badge legendary">Legendario</span>}
          {species.is_mythical && <span className="badge mythical">Singular</span>}
        </div>
      )}

      {species && (
        <div className="descripcion-section">
          <h3 className="subtitulo-detalle">Descripción</h3>

          <p className="descripcion-texto">
            {getDescripcionEspanol()}
          </p>
        </div>
      )}

      <div className="info-basica">
        <div className="info-item">
          <span className="info-label">Altura:</span>
          <span className="info-value">{(pokemon.height / 10).toFixed(2)} m</span>
        </div>
        <div className="info-item">
          <span className="info-label">Peso:</span>
          <span className="info-value">{(pokemon.weight / 10).toFixed(2)} kg</span>
        </div>
        {species?.habitat && (
          <div className="info-item">
            <span className="info-label">Hábitat:</span>
            <span className="info-value">
              {habitatTranslations[species.habitat.name] || species.habitat.name}
            </span>
          </div>
        )}
      </div>

      <div className="tipos-section">
        <h3 className="subtitulo-detalle">Tipos</h3>
        <div>
          {pokemon.types.map((t) => (
            <span key={t.slot} className={`tipo tipo-${t.type.name}`}>
              {typeTranslations[t.type.name] || t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3 className="subtitulo-detalle">Estadísticas Base</h3>
        <div className="stats-container">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="stat-item">
              <span className="stat-name">
                {statsTranslations[stat.stat.name] || stat.stat.name} 
              </span>
              <div className="stat-bar-container">
                <div
                  className="stat-bar"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                />
              </div>
              <span className="stat-value">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>

      <Link className="boton boton-volver" to="/">
        Volver
      </Link>
    </main>
  );
}

export default PokemonDetailPage;