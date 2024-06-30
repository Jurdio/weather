require('dotenv').config();
const axios = require('axios'); 

exports.getLocationsFromQuery = async (city) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}&units=metric`);
        return response.data;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message); 
        throw new Error('An error occurred while fetching location data.');
    }
};


exports.getCurrentWeatherFromCoordinates = async (lat, lon) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        return response.data;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message); 
        throw new Error('An error occurred while fetching weather data.');
    }
}