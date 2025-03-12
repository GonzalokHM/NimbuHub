import Weather from './Weather'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import CityList from './CityList'
import cities from './cities'

const CityWeather = ({ isFiveDayForecast }) => {
  const { lat, lon } = useParams()

  if (lat && lon) {
    const parsedLat = parseFloat(lat)
    const parsedLon = parseFloat(lon)
    if (isNaN(parsedLat) || isNaN(parsedLon)) {
      return (
        <div className='city-weather-container'>
          <h2 className='city-coordinates-header'>Coordenadas inválidas</h2>
          <p>Por favor, revisa la URL o selecciona una ciudad:</p>
          <CityList />
        </div>
      )
    }

    const matchingCity = cities.find(
      (city) => city.lat === parsedLat && city.lon === parsedLon
    )

    return (
      <div className='city-weather-container'>
        <h2 className='city-coordinates-header'>
          {matchingCity
            ? `Clima para ${matchingCity.name} (${parsedLat}, ${parsedLon})`
            : `Clima para las coordenadas: ${parsedLat}, ${parsedLon}`}
        </h2>
        <Weather
          latitude={parsedLat}
          longitude={parsedLon}
          isFiveDayForecast={isFiveDayForecast || false}
        />
      </div>
    )
  }

  return <CityList />
}

CityWeather.propTypes = {
  isFiveDayForecast: PropTypes.bool
}

export default CityWeather
