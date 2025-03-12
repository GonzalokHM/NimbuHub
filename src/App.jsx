import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LocalWeatherPage from './pages/LocalWeatherPage'
import CityWeatherPage from './pages/CityWeatherPage'
import LocalForecastPage from './pages/LocalForecastPage'
import CityForecastPage from './pages/CityForecastPage'
import BackgroundWrapper from './components/BackgroundWrapper'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <BackgroundWrapper>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<LocalWeatherPage />} />
          <Route path='/city/:lat/:lon' element={<CityWeatherPage />} />
          <Route path='/city' element={<CityWeatherPage />} />
          <Route path='/localForecast' element={<LocalForecastPage />} />
          <Route path='/cityForecast' element={<CityForecastPage />} />
        </Routes>
        <Footer />
      </Router>
    </BackgroundWrapper>
  )
}

export default App
