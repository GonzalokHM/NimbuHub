import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Loader from './Loader/Loader';

const Weather = ({ latitude, longitude, isFiveDayForecast }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [next5DaysData, setNext5DaysData] = useState([]);
  console.log("isFiveDayForecast antes:", isFiveDayForecast);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        let endpoint;
        console.log("isFiveDayForecast dentro fecthWeather:", isFiveDayForecast);
        if (latitude && longitude) {
          endpoint = isFiveDayForecast
          ? `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          : `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        }else {
          console.error('Invalid parameters for Weather component');
          return;
        }
        
        const response = await axios.get(endpoint);
        console.log("API response data:", response.data);
        setWeatherData(response.data);
      
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }finally {
        setIsLoading(false);
      }

    };
    // Llamamos a la función de obtener datos meteorológicos cuando la geolocalización está disponible
    if (latitude && longitude) {
      fetchWeather()
    }
  },[latitude, longitude, isFiveDayForecast])
    useEffect(() => {
        if (isFiveDayForecast && weatherData && weatherData.list) {
         // Obtén la fecha actual
         const today = new Date();
         today.setHours(0, 0, 0, 0); // Establece las horas a 00:00:00 para comparaciones de fechas
          // Procesar los datos aquí y actualizar next5DaysData con setNext5DaysData
          const processedData = weatherData.list.reduce((result, data) => {
            const dataDate = new Date(data.dt_txt);
          dataDate.setHours(0, 0, 0, 0); // Establece las horas a 00:00:00 para comparaciones de fechas

    // Verifica si la fecha es después de hoy y si aún no tenemos datos para ese día
    if (dataDate.getTime() > today.getTime() && !result.some(dayData => dayData.dt_date.getTime() === dataDate.getTime())) {
      // Agrega este día a los datos resultantes
      result.push({ 
      dt: data.dt,
      dt_txt: data.dt_txt,
      weather: {
        description: data.weather[0].description,
        icon: data.weather[0].icon
      },
      temp: data.main.temp,
      humidity: data.main.humidity,
      dt_date: dataDate, // Añade la fecha del día para futuras comparaciones
    });
  }

  return result;
}, []).slice(0, 5);

        setNext5DaysData(processedData);
        }
     // Volvemos a ejecutar este efecto cuando cambie la ubicación o isFiveDayForecast
  }, [weatherData, isFiveDayForecast]);// eslint-disable-line react-hooks/exhaustive-deps
 
  if (isLoading ||!weatherData) {
    return <Loader/>;
  }

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };





  return (
      <div>
        {isFiveDayForecast ? (
          <>
            <h3>Daily Forecast</h3>
            <ul>
              {next5DaysData.map((data) => (
                <li className='forecastList' key={data.dt}>
                  <h4>{new Date(data.dt * 1000).toLocaleDateString('es-ES', {
                       weekday: 'long', day: '2-digit', month: '2-digit'
                      })}
                  </h4> 
                  <div className='forecastData'>
                  <p>{data.weather.description}</p>
                  <p>💧{data.humidity}%</p>
                  <p>🌡️{convertKelvinToCelsius(data.temp)}°C</p>
                  </div>
                  <img
                  src={`https://openweathermap.org/img/w/${data.weather.icon}.png`}
                  alt={data.weather.description} 
                  width="50" height="50"
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="currentWeatherContainer">
            <h3>Current Weather</h3>
            <div className="current-weather">
              <p>
              <strong>🌡️</strong> {convertKelvinToCelsius(weatherData.current.temp)}°C
              </p>
              <p>
              <strong>Weather:</strong> {weatherData.current.weather[0].description}
              </p>
            </div>
            <div className='imgContainer'>
            <img
              src={`https://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
              alt={weatherData.current.weather[0].description}
              width="100" height="100"
            />
            </div>
          </div>
        )}
      </div>
    );
    
};

Weather.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  isFiveDayForecast: PropTypes.bool,
};

export default Weather;