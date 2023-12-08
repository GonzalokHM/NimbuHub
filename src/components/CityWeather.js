import Weather from './Weather';
import { useState } from 'react';

const cities = [
  { name: 'Tokyo', lat: '35.6895', lon: '139.6917' },
  { name: 'New York', lat: '40.7128', lon: '-74.0060' },
  { name: 'Paris', lat: '48.8566', lon: '2.3522' },
  { name: 'London', lat: '51.5074', lon: '-0.1278' },
  { name: 'Canberra', lat: '-35.2809', lon: '149.1300' },
];

const CityWeather = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
  };

  const selectedCityData = cities.find(city => city.name === selectedCity);

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

      {selectedCity && (
        <div>
          <h2>Weather in {selectedCity}</h2>
          <Weather latitude={selectedCityData.lat} longitude={selectedCityData.lon}/>
        </div>
      )}
    </div>
  );
};

export default CityWeather;