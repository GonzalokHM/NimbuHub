import CityWeather from '../CityWeather';

const CityForecastPage = () => {
  return (
    <div>
      <CityWeather isFiveDayForecast={true} />
    </div>
  );
};

export default CityForecastPage;