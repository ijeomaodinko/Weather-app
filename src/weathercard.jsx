import React from 'react';
import './weathercard.css';

const WeatherCard = ({ weather }) => {
  const iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  return (
    <div className="weather-card">
    <h2 className="card-heading">{weather.name}</h2>
    <p className="card-info">Temperature: {weather.main.temp}°C</p>
    <p className="card-info">Description: {weather.weather[0].description}</p>
    <img src={iconUrl} alt="Weather Icon" className="weather-icon" />
    <p className="card-info">Humidity: {weather.main.humidity}%</p>
    <p className="card-info">Wind Speed: {weather.wind.speed} m/s</p>
    {/* Add more details as needed */}
  </div>
  );
};

export default WeatherCard;

