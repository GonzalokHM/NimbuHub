import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LocalWeatherPage from './components/pages/LocalWeatherPage';
import CityWeatherPage from './components/pages/CityWeatherPage'
import LocalForecastPage from './components/pages/LocalForecastPage';
import CityForecastPage from './components/pages/CityForecastPage';
import './App.css'

function App() {

  return (
    <Router>
    <div id='container'>
      <nav id='nav'>
        <ul id='links'>
          <li className='link'>
            <Link to="/">Home</Link>
          </li>
          <li className='link'>
            <Link to="/city">City Weather</Link>
          </li>
          <li className='link'>
            <Link to="/localForecast">Local Forecas</Link>
          </li>
          <li className='link'>
            <Link to="/cityForecast">City Forecast</Link>
          </li>
        </ul>
      </nav>

      <Routes>
       <Route path="/" element={<LocalWeatherPage />} />
       <Route path="/city" element={<CityWeatherPage />} />
       <Route path="/localForecast" element={<LocalForecastPage />} />
       <Route path="/cityForecast" element={<CityForecastPage />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
