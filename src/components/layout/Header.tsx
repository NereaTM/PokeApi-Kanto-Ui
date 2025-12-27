import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Navigation from './Navigation';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function Header ({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="cabecera">
      <div className="contenedor">
        <Link to="/">
          <img src={logo} alt="Logo Pokémon" className="logo-pokemon" />
        </Link>

        <div>
          <h1 className="titulo-kanto">Pokédex Kanto</h1>
        </div>

        <Navigation />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}

export default Header;