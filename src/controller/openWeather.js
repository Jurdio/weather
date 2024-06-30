const axios = require("axios");
const openWeatherAPI = require("../util/openWeatherAPI");

exports.postLocations = async (req, res) => {
  const city = req.body.city;
  console.log(city);

  try {
    const locations = await openWeatherAPI.getLocationsFromQuery(city);
    const locationsWithWeather = await Promise.all(
      locations.map(async (location) => {
        const weather = await openWeatherAPI.getCurrentWeatherFromCoordinates(
          location.lat,
          location.lon
        );
        return { ...location, weather };
      })
    );

    res.render("locations", {
      pageTitle: "Locations",
      locations: locationsWithWeather,
    });
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
