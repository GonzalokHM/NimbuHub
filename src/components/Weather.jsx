import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const Weather = ({ latitude, longitude, isFiveDayForecast }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [next5DaysData, setNext5DaysData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        let endpoint;
        
        if (latitude && longitude) {
        endpoint = isFiveDayForecast
        ? `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        : `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      }else {
          console.error('Invalid parameters for Weather component');
          return;
        }

        const response = await axios.get(endpoint);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }finally {
        setIsLoading(false); // Indicar que la carga ha finalizado, ya sea con éxito o error.
      }
    };

    // Llamamos a la función de obtener datos meteorológicos cuando la geolocalización está disponible
    if (latitude && longitude) {
      fetchWeather().then(() => {
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
        main: data.weather[0].main,
        description: data.weather[0].description,
      },
      temp: data.main.temp,
      dt_date: dataDate, // Añade la fecha del día para futuras comparaciones
    });
  }

  return result;
}, []).slice(0, 5);

        setNext5DaysData(processedData);
        }
      });
    }
  }, [latitude, longitude, isFiveDayForecast ]); // Volvemos a ejecutar este efecto cuando cambie la ubicación
 
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
            <h2>Daily Forecast</h2>
            <ul>
              {next5DaysData.map((data) => (
                <li key={data.dt}>
                  {new Date(data.dt * 1000).toLocaleDateString()}: {data.weather.main},{data.weather.description},
                  {convertKelvinToCelsius(data.temp)} °C
                  <img
                  src={`http://openweathermap.org/img/w/${data.weather.icon}.png`}
                  alt={data.weather.description}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>Current Weather</h2>
            <div>
              <strong>Current Temperature:</strong> {convertKelvinToCelsius(weatherData.current.temp)} °C
            </div>
            <div>
              <strong>Current Weather:</strong> {weatherData.current.weather[0].description}
            </div>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
              alt={weatherData.current.weather[0].description}
            />
          </>
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