import React from 'react';
import './weathercard.css';

const WeatherCard = ({ weather }) => {

  return (
    <div className="weather-card">
    <h2 className="card-heading">{weather.name}</h2>
    <p className="card-info"> {weather.main.temp}°C</p>
    <p className="card-info"> {weather.weather[0].description}</p>
    <p className="card-info">Humidity: {weather.main.humidity}%</p>
    <p className="card-info">Wind Speed: {weather.wind.speed} m/s</p>
    {/* Add more details as needed */}
  </div>
  );
};

export default WeatherCard;

