import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';


function Header () {
  return (
    <header className="cabecera">
      <div className="contenedor">
        <Link to="/">
          <img src={logo} alt="Logo Pokémon" className="logo-pokemon" />
        </Link>

        <div>
          <h1 className="titulo-kanto">Pokédex Kanto</h1>
        </div>

      </div>
    </header>
  );
}

export default Header;