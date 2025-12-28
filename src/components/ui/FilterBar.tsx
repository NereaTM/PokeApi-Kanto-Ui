import type React from 'react';
import { typeTranslations } from '../../utils/translations';

interface FilterBarProps {
  tipoSeleccionado: string;
  cambiarTipo: any;
  orden: 'asc' | 'desc' | 'id';
  cambiarOrden: any;
  tiposPokemon: string[];
}

function FilterBar({ 
  tipoSeleccionado, 
  cambiarTipo, 
  orden, 
  cambiarOrden,
  tiposPokemon 
}: FilterBarProps): React.JSX.Element {
  
  const tiposOrdenados = [...tiposPokemon].sort();

  return (
    <div className="barra-filtros">
      <div className="filtros-tipos">
        <button
          className={tipoSeleccionado === 'all' ? 'boton-tipo active' : 'boton-tipo'}
          onClick={() => {
            cambiarTipo('all');
          }}
        >
          Todos
        </button>
        
        {tiposOrdenados.map((type) => {
          const nombreTraducido = typeTranslations[type] || type;
          
          return (
            <button
              key={type}
              className={
                tipoSeleccionado === type 
                  ? `boton-tipo tipo-${type} active` 
                  : `boton-tipo tipo-${type}`
              }
              onClick={() => {
                cambiarTipo(type);
              }}
            >
              {nombreTraducido}
            </button>
          );
        })}
      </div>

      <div>
        <label htmlFor="sort-order">Ordenar por: </label>
        <select
          id="sort-order"
          className="selector-orden"
          value={orden}
          onChange={(e) => {
            const nuevoOrden = e.target.value as 'asc' | 'desc' | 'id';
            cambiarOrden(nuevoOrden);
          }}
        >
          <option value="id">Número (Pokédex)</option>
          <option value="asc">Nombre (A-Z)</option>
          <option value="desc">Nombre (Z-A)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;