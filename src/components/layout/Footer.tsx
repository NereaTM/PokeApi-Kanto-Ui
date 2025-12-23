export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} - Pokédex Kanto</p>
      <p className="footer-subtitle">Grado Superior Desarrollo Web. Diseño de Interfaces.</p>
    </footer>
  );
}