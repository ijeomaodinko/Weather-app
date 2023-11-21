import React from 'react';
import { FaSun, FaMoon, FaCloud, FaCloudSun, FaCloudMoon, FaCloudSunRain, FaCloudRain, FaBolt, FaSnowflake, FaWind } from 'react-icons/fa';

const WeatherIcons = {
  '01d': <FaSun />,
  '01n': <FaMoon />,
  '02d': <FaCloudSun />,
  '02n': <FaCloudMoon />,
  '03d': <FaCloud />,
  '03n': <FaCloud />,
  '04d': <FaCloudSun />,
  '04n': <FaCloudSun />,
  '09d': <FaCloudRain />,
  '09n': <FaCloudRain />,
  '10d': <FaCloudSunRain />,
  '10n': <FaCloudSunRain />,
  '11d': <FaBolt />,
  '11n': <FaBolt />,
  '13d': <FaSnowflake />,
  '13n': <FaSnowflake />,
  '50d': <FaWind />,
  '50n': <FaWind />,
};

export default WeatherIcons;
