import { useState } from 'react';
import { Link , useLocation} from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  return (
    <>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <nav id='nav' className={menuOpen ? 'open' : ''}>
        <ul id='links'>
          <li className={`link ${isActive('/') ? 'active' : ''}`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`link ${isActive('/city') ? 'active' : ''}`}>
            <Link to="/city">City Weather</Link>
          </li>
          <li className={`link ${isActive('/localForecast') ? 'active' : ''}`}>
            <Link to="/localForecast">Local Forecast</Link>
          </li>
          <li className={`link ${isActive('/cityForecast') ? 'active' : ''}`}>
            <Link to="/cityForecast">City Forecast</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
