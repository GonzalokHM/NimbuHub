import { useState } from 'react';

const cities = [
  { name: 'City 1', lat: 'latitude1', lon: 'longitude1' },
  { name: 'City 2', lat: 'latitude2', lon: 'longitude2' },
  // Add more cities as needed
];

const CityWeather = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [view, setView] = useState('current'); // 'current' or 'historical'

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setView('current'); // Reset to current view when city changes
    // Fetch weather data for the selected city
    // You can use a similar approach as in the Weather component
  };

  const handleViewChange = (newView) => {
    setView(newView);
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
      <div>
        <button onClick={() => handleViewChange('current')}>Current Weather</button>
        <button onClick={() => handleViewChange('historical')}>Historical Weather</button>
      </div>
      {view === 'current' && (
        <div>
          <h3>Current Weather in {selectedCity}</h3>
          {/* Display current weather data for the selected city */}
          <Weather latitude={/* latitude of selectedCity */} longitude={/* longitude of selectedCity */} />
        </div>
      )}
      {view === 'historical' && (
        <div>
          <h3>Historical Weather in {selectedCity}</h3>
          {/* Add UI to pick a date and display historical weather data */}
          {/* You can use the API call to request history daily aggregation data */}
        </div>
      )}
    </div>
  );
};

export default CityWeather;