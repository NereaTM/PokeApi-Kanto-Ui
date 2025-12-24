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
          }}
          end
        >
          Pokédex
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;