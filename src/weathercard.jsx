// WeatherCard.jsx
import React from 'react';

const WeatherCard = ({ weather }) => {
  const iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Description: {weather.weather[0].description}</p>
      <img src={iconUrl} alt="Weather Icon" />
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>

      {/* Add more details as needed */}
    </div>
  );
};

export default WeatherCard;

