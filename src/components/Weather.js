import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather } = weatherData;

  return (
    <div>
      <h2>Weather Forecast</h2>
      <div>
        <strong>Temperature:</strong> {main.temp} K
      </div>
      <div>
        <strong>Weather:</strong> {weather[0].description}
      </div>
      <img
        src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
        alt={weather[0].description}
      />
    </div>
  );
};

export default Weather;