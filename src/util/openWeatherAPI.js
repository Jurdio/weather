require('dotenv').config();
const axios = require('axios'); 

exports.getLocationsFromQuery = async (city) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message); 
        throw new Error('An error occurred while fetching location data.');
    }
};

exports.getWeatherFromCoordinates = async (lat, lon) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        return response.data;
    } catch (error) {
        throw new Error('An error occurred while fetching weather data.');
    }
};