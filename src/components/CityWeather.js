import { useState } from 'react';

const cities = [
  { name: 'City 1', lat: 'latitude1', lon: 'longitude1' },
  { name: 'City 2', lat: 'latitude2', lon: 'longitude2' },
  // Add more cities as needed
];

const CityWeather = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [cityWeather, setCityWeather] = useState(null);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    // Fetch weather data for the selected city
    // You can use a similar approach as in the Weather component
  };

  return (
    <div>
      <h2>Weather by City</h2>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="" disabled>
          Select a city
        </option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      {cityWeather && (
        <div>
          <h3>Weather in {selectedCity}</h3>
          {/* Display weather data for the selected city */}
        </div>
      )}
    </div>
  );
};

export default CityWeather;