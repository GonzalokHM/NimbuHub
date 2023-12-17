import Weather from './Weather';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const LocalWeather = ({ isFiveDayForecast }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await getCurrentPosition();
          const { latitude, longitude } = position.coords;
          const locationData = await fetchLocation(latitude, longitude);
          setLocation({ latitude, longitude, ...locationData });
        } else {
          const GeolocationError ='You must enable geolocation permissions to use the application.';
          alert(GeolocationError);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        setIsLoading(false); // Indicar que la carga ha finalizado, ya sea con éxito o error.
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

    getLocation(); 
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id='localWeatherContainer'>
    <h2>Weather in {location.name}, {location.country}</h2>
    <Weather latitude={location.latitude} longitude={location.longitude} isFiveDayForecast={isFiveDayForecast}/>
    </div>
  );
};

LocalWeather.propTypes = {
  isFiveDayForecast: PropTypes.bool
};

export default LocalWeather;
