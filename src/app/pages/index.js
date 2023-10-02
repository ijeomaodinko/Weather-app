import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';

const Home = () => {
  const [deviceLocation, setDeviceLocation] = useState(null);

  useEffect(() => {
    // Get the device's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDeviceLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: 'Your Location',
        });
      });
    }
  }, []);

  const locations = [
    { latitude: 51.5074, longitude: -0.1278, name: 'London' },
    // Add more locations as needed
  ];

  return (
    <div className="container">
      <h1>Weather App</h1>

      {deviceLocation && <WeatherCard location={deviceLocation} />}

      <h2>Other Locations</h2>

      {locations.map((location, index) => (
        <WeatherCard key={index} location={location} />
      ))}
    </div>
  );
};

export default Home;
