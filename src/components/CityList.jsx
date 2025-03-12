import { Link } from 'react-router-dom'
import cities from './cities'

const CityList = () => (
  <div className='city-weather-container'>
    <h3 className='city-header'>Selecciona una ciudad:</h3>
    <ul className='city-list'>
      {cities.map((city) => (
        <li key={city.name}>
          <Link className='city-link' to={`/city/${city.lat}/${city.lon}`}>
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default CityList
