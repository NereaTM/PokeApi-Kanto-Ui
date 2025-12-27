import type React from 'react';

interface SearchBarProps {
  busqueda: string;
  actualizarBusqueda: (value: string) => void;
}

function SearchBar({ busqueda, actualizarBusqueda }: SearchBarProps): React.JSX.Element {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    actualizarBusqueda(valor);
  };
  
  const handleLimpiar = () => {
    actualizarBusqueda('');
  };

  return (
    <div className="contenedor-busqueda">
      <input
        type="text"
        className="buscador"
        placeholder="Buscar Pokémon por nombre..."
        value={busqueda}
        onChange={handleChange}
      />
      
      {busqueda && (
        <button 
          className="boton-limpiar"
          onClick={handleLimpiar}
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;