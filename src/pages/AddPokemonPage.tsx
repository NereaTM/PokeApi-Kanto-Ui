import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchPokemon } from '../data/pokeapi';
import type { Pokemon } from '../types/pokemon';
import { typeTranslations } from '../utils/translations';

interface PokemonFormData {
  nivel: number;
  objeto?: string;
  movimientos: string;
  notas?: string;
}

function AddPokemonPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PokemonFormData>({
    defaultValues: {
      nivel: 5, // por defecto nivel 5
    },
  });

  // cargar el pokemon cuando entra en la pagina
  useEffect(() => {
    async function cargarPokemon() {
      if (!name) return;
      setCargando(true);
      setErrorMsg(null);
      try {
        const data = await fetchPokemon(name);
        setPokemon(data);
        setCargando(false);
      } catch (err) {
        setErrorMsg('No se pudo cargar el Pokémon seleccionado');
        setCargando(false);
      }
    }

    cargarPokemon();
  }, [name]);

  // accion de submit
  const onSubmit = (data: PokemonFormData) => {
    if (!pokemon) return;

    console.log('Datos del form:', data);

    // coger el equipo que ya hay guardado
    const equipoString = localStorage.getItem('pokemon-team');
    let equipo = [];
    
    if (equipoString) {
      equipo = JSON.parse(equipoString);
    }

    console.log('Equipo actual:', equipo);

    // sacar los tipos traducidos
    let tipo1 = 'normal';
    let tipo2 = undefined;
    
    if (pokemon.types[0]) {
      const tipo1Key = pokemon.types[0].type.name;
      tipo1 = typeTranslations[tipo1Key] || tipo1Key;
    }
    
    if (pokemon.types[1]) {
      const tipo2Key = pokemon.types[1].type.name;
      tipo2 = typeTranslations[tipo2Key] || tipo2Key;
    }

    // coger la imagen
    let sprite = pokemon.sprites.front_default;
    
    if (pokemon.sprites.other && pokemon.sprites.other['official-artwork']) {
      if (pokemon.sprites.other['official-artwork'].front_default) {
        sprite = pokemon.sprites.other['official-artwork'].front_default;
      }
    }

    // crear el nuevo pokemon
    const nuevoPokemon = {
      id: Date.now(), // id unico con la fecha!!!
      nombre: pokemon.name,
      sprite: sprite,
      tipo1: tipo1,
      tipo2: tipo2,
      nivel: data.nivel,
      objeto: data.objeto,
      movimientos: data.movimientos,
      notas: data.notas,
      fechaCaptura: new Date().toISOString(),
    };

    // añadir al array
    equipo.push(nuevoPokemon);
    
    // guardar en localStorage
    localStorage.setItem('pokemon-team', JSON.stringify(equipo));
    
    console.log('Guardado! Equipo completo:', equipo);

    // ir a la pagina del equipo
    navigate('/team');
  };

  // si no hay nombre
  if (!name) {
    return (
      <main className="contenedor-principal">
        <div className="error-container">
          <p>Debes seleccionar un Pokémon desde la Pokédex para añadirlo a tu equipo.</p>
        </div>
        <Link to="/" className="boton">
          Volver a la Pokédex
        </Link>
      </main>
    );
  }

  // mientras carga
  if (cargando) {
    return (
      <main className="contenedor-principal">
        <div className="loading-container">
          <p>Cargando Pokémon seleccionado...</p>
        </div>
      </main>
    );
  }

  // si hay error
  if (errorMsg || !pokemon) {
    return (
      <main className="contenedor-principal">
        <div className="error-container">
          <p>{errorMsg ? errorMsg : 'No se pudo cargar el Pokémon'}</p>
        </div>
        <Link to="/" className="boton">
          Volver a la Pokédex
        </Link>
      </main>
    );
  }

  // poner primera letra mayuscula
  const nombreCapitalizado =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <main className="contenedor-principal">
      <div className="form-container">
        <h2 className="form-title">Añadir {nombreCapitalizado} al Equipo</h2>
        <p className="form-subtitle">
          Personaliza el nivel, objeto, movimientos y notas para este Pokémon
        </p>

        <div className="add-pokemon-summary">
          <img
            src={
              pokemon.sprites.other?.['official-artwork']?.front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="add-sprite"
          />
          <div>
            <p>
              <strong>Nombre:</strong> {nombreCapitalizado}
            </p>
            <p>
              <strong>Tipos:</strong>{' '}
              {pokemon.types
                .map((t) => typeTranslations[t.type.name] || t.type.name)
                .join(' / ')}
            </p>
          </div>
        </div>

        <form className="pokemon-form" onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group">
            <label htmlFor="nivel">
              Nivel <span className="required">*</span>
            </label>
            <input
              id="nivel"
              type="number"
              className={errors.nivel ? 'form-input error' : 'form-input'}
              {...register('nivel', {
                required: 'El nivel es obligatorio',
                min: {
                  value: 1,
                  message: 'El nivel mínimo es 1',
                },
                max: {
                  value: 100,
                  message: 'El nivel máximo es 100',
                },
                valueAsNumber: true,
              })}
            />
            {errors.nivel && (
              <span className="error-message">{errors.nivel.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="objeto">Objeto Equipado</label>
            <input
              id="objeto"
              type="text"
              className="form-input"
              placeholder="Ej.: Baya Zidra, Pluma..."
              {...register('objeto')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="movimientos">
              Movimientos <span className="required">*</span>
            </label>
            <textarea
              id="movimientos"
              className={errors.movimientos ? 'form-textarea error' : 'form-textarea'}
              placeholder={'Lista los movimientos separados por comas\nEj.: Impactrueno, Ataque Rápido, Rayo, Trueno'}
              rows={4}
              {...register('movimientos', {
                required: 'Debes indicar al menos un movimiento',
                validate: (value) => {                  
                  // contar cuantos movimientos hay
                  const movs = value.split(',');
                  const movsFiltrados = movs.filter((m) => m.trim() !== '');
                  if (movsFiltrados.length > 4) {
                    return 'Solo puede tener hasta 4 movimientos';
                  } return true;
                },
              })}
            />
            {errors.movimientos && (
              <span className="error-message">{errors.movimientos.message}</span>
            )}
            <small className="form-help">
              Separa cada movimiento con una coma. Máximo 4
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas Adicionales</label>
            <textarea
              id="notas"
              className={errors.notas ? 'form-textarea error' : 'form-textarea'}
              placeholder="Añade información extra sobre este Pokémon..."
              rows={3}
              {...register('notas', {
                maxLength: {
                  value: 200,
                  message: 'Las notas no pueden superar 200 caracteres',
                },
              })}
            />
            {errors.notas && (
              <span className="error-message">{errors.notas.message}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="boton boton-verde">
              Añadir al equipo
            </button>

            <Link to={`/pokemon/${pokemon.name}`} className="boton boton-gris">
              Volver al detalle
            </Link>
          </div>
        </form>

        <p className="form-footer">
          <span className="required">*</span> Campos obligatorios
        </p>
      </div>
    </main>
  );
}

export default AddPokemonPage;