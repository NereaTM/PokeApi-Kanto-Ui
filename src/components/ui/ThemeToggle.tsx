import luna from '../../assets/luna.png';
import sol from '../../assets/sol.png';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  
  const imagen = theme === 'dark' ? sol : luna;
  const textoAlt = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';

  const handleClick = () => {
    onToggle();
  };

  return (
    <button 
      className="theme-toggle"
      onClick={handleClick}
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      <img 
        src={imagen}
        alt={textoAlt}
        className="icono-tema"
      />
    </button>
  );
}

export default ThemeToggle;