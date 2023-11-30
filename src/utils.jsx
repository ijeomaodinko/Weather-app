const API_KEY = `77fbe33994032b61bc735adcf925abe8`;


const getLocation = (successCallback, errorCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        successCallback(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        errorCallback();
      },
      {
        enableHighAccuracy: true, // Set to true for high accuracy
        timeout: 5000, // Maximum time (in milliseconds) to wait for location information
        maximumAge: 0, // Maximum age (in milliseconds) of a possible cached position
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    errorCallback();
  }
};

const getAirQualityDescription = (aqi) => {
  switch (aqi) {
    case 1:
      return 'Good Air Quality Index';
    case 2:
      return 'Fair Air Quality Index';
    case 3:
      return 'Moderate Air Quality Index';
    case 4:
      return 'Poor Air Quality Index';
    case 5:
      return 'Very Poor Air Quality Index';
    default:
      return 'Unknown Air Quality Index';
  }
};


export { getLocation, API_KEY, getAirQualityDescription };
