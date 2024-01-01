import { useState } from 'react';
import { Link , useLocation} from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  return (
    <>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <nav id='nav' className={menuOpen ? 'open' : ''}>
        <ul id='links'>
          <li className={`link ${isActive('/') ? 'active' : ''}`}>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li className={`link ${isActive('/city') ? 'active' : ''}`}>
            <Link to="/city" onClick={closeMenu}>City Weather</Link>
          </li>
          <li className={`link ${isActive('/localForecast') ? 'active' : ''}`}>
            <Link to="/localForecast" onClick={closeMenu}>Local Forecast</Link>
          </li>
          <li className={`link ${isActive('/cityForecast') ? 'active' : ''}`}>
            <Link to="/cityForecast" onClick={closeMenu}>City Forecast</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
