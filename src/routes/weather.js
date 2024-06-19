const router = require('express').Router();

const homeController = require('../controller/home');
const weatherController = require('../controller/openWeather');

router.get('/', homeController.getHomePage);
router.get('/locations/:city', weatherController.getLocations);
router.get('/weather/:lat/:lon', weatherController.getWeather);

module.exports = router;