import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <div>
        <NavLink 
          to="/" 
          className={({ isActive }) => {
            if (isActive) {
              return 'nav-link active';
            }
            return 'nav-link';
          }}>
          Pokédex
        </NavLink>
        
        <NavLink 
          to="/team" 
          className={({ isActive }) => {
            if (isActive) {
              return 'nav-link active';
            }
            return 'nav-link';
          }}>
          Mi Equipo
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;