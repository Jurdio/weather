const axios = require("axios");
const openWeatherAPI = require("../util/openWeatherAPI");

exports.getLocations = async (req, res) => {
  const city = req.body.city;
  console.log(city);

  try {
    const locations = await openWeatherAPI.getLocationsFromQuery(city);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWeather = async (req, res) => {
  const { lat, lon } = req.params;

  try {
    const weather = await openWeatherAPI.getWeatherFromCoordinates(lat, lon);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
