import { Link } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  
  // normalizo primera letra a mayusculas
  const nombreCapitalizado =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // cojo la imagen
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default 
  || pokemon.sprites.front_default;

  // formatear el numero con ceros a la izquierda
  let numeroFormateado = String(pokemon.id);
  
  if (pokemon.id < 10) {
    numeroFormateado = '00' + pokemon.id;
  } else if (pokemon.id < 100) {
    numeroFormateado = '0' + pokemon.id;
  }

  return (
    <article className="tarjeta-pokemon">
      <span className="pokemon-number">
        #{numeroFormateado}
      </span>

      <img
        className="sprite-home"
        src={imageUrl}
        alt={nombreCapitalizado}
      />

      <h3 className="nombre-pokemon">{nombreCapitalizado}</h3>

      <div className="tipos-container">
        {pokemon.types.map((t) => {
          
          return (
            <span
              key={t.type.name}
              className={`tipo tipo-${t.type.name}`}
            >
              {t.type.name}
            </span>
          );
        })}
      </div>

      <Link className="boton" to={`/pokemon/${pokemon.name}`}>
        Ver detalle
      </Link>
    </article>
  );
}

export default PokemonCard;
