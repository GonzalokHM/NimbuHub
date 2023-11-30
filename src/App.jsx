import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Weather from './components/Weather';
import CityWeather from './components/CityWeather';
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
        </ul>
      </nav>

      <Switch>
        <Route path="/city">
          <CityWeather />
        </Route>
        <Route path="/">
          {/* Use the Geolocation API to get user's location */}
          {/* Pass the latitude and longitude to the Weather component */}
          {/* You can use the Geolocation API as shown below or use a library like 'react-geolocated' */}
          {/* <Geolocation render={({ coords }) => <Weather latitude={coords.latitude} longitude={coords.longitude} />} /> */}
          <Weather />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

export default App
