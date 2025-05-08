import React, { useState, useEffect } from 'react'
import './weatherapi/style.css'

const api = {
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  key: "85fffc03643653822a7b572dfafdfdc1"
}

const App = () => {
  const [weather, setWeather] = useState({})
  const [city, setCity] = React.useState("");
  const [currentLocation, setCurrentLocation] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`${api.baseUrl}?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then((d) => {
          setCurrentLocation(d)
        })
    });
  }, [])

  function handleSearch() {
    fetch(`${api.baseUrl}?q=${city}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then((d) => {
        setWeather(d)
        console.log(d)
      })
  }

  return (
    <div className="body">
      <div className="content">
        <input className="searchbox" type="text" onChange={(e) => setCity(e.target.value)} />
        <button className='button' onClick={handleSearch}>Search</button>
        {currentLocation.main !== undefined ? (
          <div className='text'>
            <h1>Weather in your current location ({currentLocation.name})</h1>
            <p>Temperature: {currentLocation.main.temp}°C</p>
            <p>Humidity: {currentLocation.main.humidity}%</p>
            <p>Wind: {currentLocation.wind.speed}m/s</p>
            <p>Description: {currentLocation.weather && currentLocation.weather[0].description}</p>
          </div>
        ) : ("")}
        {weather.main !== undefined ? (
          <div className='text'>
            <h1>Weather in {weather.name}</h1>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed}m/s</p>
            <p>Description: {weather.weather && weather.weather[0].description}</p>
          </div>
        ) : <span style={{ color: 'red' }}>City Not found! try another one</span>}
      </div>
    </div>
  )
}

export default App