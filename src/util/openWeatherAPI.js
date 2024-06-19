require('dotenv').config();
const axios = require('axios');

exports.getLocationsFromQuery = async (city) => {
    const apiKey = process.env.GEOCODING_API_KEY;

    try {
        const response = await axios.get(`http://api.geocodingapi.com/api/v1/geocode?city=${city}&apikey=${apiKey}`);
        return response.data;
    } catch (error) {
        throw new Error('An error occurred while fetching location data.');
    }
};

exports.getWeatherFromCoordinates = async (lat, lon) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        return response.data;
    } catch (error) {
        throw new Error('An error occurred while fetching weather data.');
    }
};