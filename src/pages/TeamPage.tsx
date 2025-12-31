import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { SavedPokemon } from '../types/pokemonteam';

function TeamPage() {
  const [equipo, setEquipo] = useState<SavedPokemon[]>([]);

  // cargar el equipo cuando se abre la pagina
  useEffect(() => {
    const equipoGuardado = localStorage.getItem('pokemon-team');
    
    if (equipoGuardado) {
      try {
        const parsedTeam: SavedPokemon[] = JSON.parse(equipoGuardado);
        setEquipo(parsedTeam);
      } catch (error) {
        setEquipo([]);
      }
    }
  }, []);

  // funcion para eliminar un pokemon del equipo
  const eliminarPokemon = (id: number) => {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar este Pokémon del equipo?');
    
    if (!confirmar) {return;}

    // filtrar el equipo para sacar el que queremos eliminar
    const nuevoEquipo = equipo.filter((pokemon) => pokemon.id !== id);

    // actualizar el estado
    setEquipo(nuevoEquipo);
    
    // guardar en localStorage
    localStorage.setItem('pokemon-team', JSON.stringify(nuevoEquipo));
    
  };

  return (
    <main className="contenedor-principal">
      <section className="team-header">
        <p style={{ marginTop: '0.5rem' }}>
          Tienes {equipo.length} Pokémon en tu equipo
        </p>
      </section>

      <div className="team-boton">
        <Link to="/" className="boton">
          Volver a la Pokédex
        </Link>
      </div>

      {/* si no hay pokemon en el equipo */}
      {equipo.length === 0 ? (
        <div className="no-results">
          <p>Tu equipo está vacío. Ve a la Pokédex y añade un Pokémon.</p>
        </div>
      ) : (
        // si hay pokemon, mostrarlos
        <div className="team-grid">
          {equipo.map((pokemon) => {
            
            return (
              <article key={pokemon.id} className="team-card">
                <header className="team-card-header">
                  <div>
                    <h3 className="team-pokemon-name">{pokemon.nombre}</h3>
                    <p className="team-pokemon-level">
                      Nivel {pokemon.nivel}
                    </p>
                  </div>

                  {pokemon.sprite && (
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.nombre}
                      className="sprite-team"
                    />
                  )}
                </header>

                <div className="team-card-info">
                  <p>
                    <strong>Tipo:</strong> {pokemon.tipo1}
                    {pokemon.tipo2 && ` / ${pokemon.tipo2}`}
                  </p>

                  {pokemon.objeto && (
                    <p>
                      <strong>Objeto:</strong> {pokemon.objeto}
                    </p>
                  )}

                  <p>
                    <strong>Movimientos:</strong> {pokemon.movimientos}
                  </p>

                  {pokemon.notas && (
                    <p className="team-notes">
                      <strong>Notas:</strong> {pokemon.notas}
                    </p>
                  )}
                </div>
                <br></br>
                <button
                  className="boton boton-amarillo"
                  onClick={() => eliminarPokemon(pokemon.id)}>
                  Eliminar
                </button>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default TeamPage;