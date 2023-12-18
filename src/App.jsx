import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LocalWeatherPage from './components/pages/LocalWeatherPage';
import CityWeatherPage from './components/pages/CityWeatherPage'
import LocalForecastPage from './components/pages/LocalForecastPage';
import CityForecastPage from './components/pages/CityForecastPage';
import  BackgroundWrapper from './components/BackgroundWrapper';
import NavigationBar from './components/NavigationBar'
import './App.css'

function App() {


  return (
    <BackgroundWrapper>
     <Router>
      <NavigationBar/>
       <Routes>
         <Route path="/" element={<LocalWeatherPage />} />
         <Route path="/city" element={<CityWeatherPage />} />
         <Route path="/localForecast" element={<LocalForecastPage />} />
         <Route path="/cityForecast" element={<CityForecastPage />} />
       </Routes>
     </Router>
    </BackgroundWrapper>
  )
}

export default App
