import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain, faSun } from '@fortawesome/free-solid-svg-icons';
import { apiKEY } from './utils';
import WeatherIcons from './weathericon'; 
import { getRandomColor } from './utils';

// Added this line to define which part of  the app should be hidden from screen readers when the modal is open
Modal.setAppElement('#root'); 

const modalStyle = {
  contentBox: {
    transform: 'translate(-50%, -50%)',
    marginTop: '-9rem',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '16rem',
    borderRadius: '12px',
    backgroundColor: '#fff',
    border: '12px',
    borderColor: 'blue',
  },
  weatherIcons: {
    display: 'flex',
     color: '#87CEEB',
  },

  icon: {
    fontSize: '1.5rem', 
    margin: '0 5px', 
    transition: 'opacity 0.5s ease-in-out, color 0.5s ease-in-out',
  },
  input: {
    width: '12rem',
    height: '2rem',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '12px', 
    fontSize: '1rem',
  },
  button: {
    marginTop: '10px', 
    color: 'blue',
  },

  content: {
    position: 'absolute',
    inset: '40px',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(255, 255, 255)',
    overflow: 'hidden',
    borderRadius: '19px',
    outline: 'none',
    padding: '20px',
    transform: 'translate(-50%, -50%)',	
    marginTop: '19rem',
    marginLeft: '49rem',
    alignItems: 'center',
    backgroundColor: getRandomColor(),
},
  searchModal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    borderRadius: '12px',
    padding: '20px',
  },
  iconModal: {
    fontSize: '2.9rem', 
  },
};

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const iconList = [faCloudRain, faSun];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 30000); // Switch icons every 30 seconds

    return () => clearInterval(intervalId);
  }, []);


  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKEY}`
      );
      console.log('API response: ', response.data);
      setWeatherData(response.data);
      openModal();
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div style={modalStyle.contentBox}>
    {/* <h3>Check for your favourite country</h3> */}
      <div style={modalStyle.inputContainer}>
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        style={modalStyle.input} 
      />
        <div style={modalStyle.weatherIcons}>
          {iconList.map((icon, index) => (
            <FontAwesomeIcon
              key={index}
              icon={icon}
              className= "weather-icon"
              style={{
                ...modalStyle.icon,
                display: index === currentIconIndex ? 'inline-block' : 'none',
                color: index === currentIconIndex ? (icon === faSun ? '#FFD700' : '#87CEEB') : '#87CEEB',             
              }}
            />
          ))}
        </div>
      </div>
      <button onClick={fetchWeather} style={modalStyle.button}>Get Weather</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Weather Modal"
      >
        {weatherData && (
          <div style={modalStyle.searchModal}>
          <h2>Weather in {weatherData.data[0].city_name}</h2>
          <p>Temperature: {weatherData.data[0].temp}°C</p>
          <p className="weather-description">Weather: {weatherData.data[0].weather.description}</p>
          <p style={modalStyle.iconModal}> {WeatherIcons[weatherData.data[0].weather.icon]}</p>
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default WeatherSearch;
