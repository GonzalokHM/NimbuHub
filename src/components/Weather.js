import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await getCurrentPosition();
          const { latitude, longitude } = position.coords;
          const locationData = await fetchLocation(latitude, longitude);
          setLocation({ latitude, longitude, ...locationData });
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      });
    };

    const fetchLocation = async (latitude, longitude) => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
        );
        return response.data[0];
      } catch (error) {
        console.error('Error fetching location:', error);
        return null;
      }
    };
    // Llamamos a las funciones al montar el componente
    getLocation();
  }, []);


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Llamamos a la función de obtener datos meteorológicos cuando la geolocalización está disponible
    if (location && location.latitude && location.longitude) {
      fetchWeather();
    }
  }, [location]); // Volvemos a ejecutar este efecto cuando cambie la ubicación

  if (!location || !weatherData) {
    return <div>Loading...</div>;
  }

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  return (
    <div>
    <h2>Weather in {location.name}, {location.country}</h2>
    <div>
      <h2>Weather Forecast</h2>
      <div>
        <strong>Current Temperature:</strong> {weatherData.current.temp} K
      </div>
      <div>
        <strong>Current Weather:</strong> {weatherData.current.weather[0].description}
      </div>
      <img
        src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
        alt={weatherData.current.weather[0].description}
      />
      <h3>Daily Forecast</h3>
      <ul>
        {weatherData.daily.map((day) => (
          <li key={day.dt}>
            {new Date(day.dt * 1000).toLocaleDateString()}: {day.weather[0].description},
            {convertKelvinToCelsius(day.temp.day)} °C
          </li>
        ))}
      </ul>
    </div>
   </div>
  );
};

export default Weather;