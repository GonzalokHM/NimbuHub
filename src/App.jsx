import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LocalWeatherPage from './components/LocationWeatherPage';
import CityWeatherPage from './components/CityWeatherPage';
import LocalForecastPage from './LocalForecastPage';
import CityForecastPage from './CityForecastPage';
import './App.css'

function App() {

  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/city">City Weather</Link>
          </li>
          <li>
            <Link to="/localForecast">Local Forecas</Link>
          </li>
          <li>
            <Link to="/cityForecast">City Forecast</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/">
          <LocalWeatherPage />
        </Route>
        <Route path="/city">
          <CityWeatherPage />
        </Route>
        <Route path="/localForecast">
          <LocalForecastPage />
        </Route>
        <Route path="/cityForecast">
          <CityForecastPage />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

export default App
