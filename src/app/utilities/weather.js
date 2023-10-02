// utilities/weather.js

const API_KEY = '77fbe33994032b61bc735adcf925abe8'; 
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherDataByLocation = async (latitude, longitude) => {
  const apiUrl = `${API_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  const response = await fetch(apiUrl);
  return await response.json();
};
