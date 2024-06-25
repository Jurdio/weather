const router = require('express').Router();

const homeController = require('../controller/home');
const weatherController = require('../controller/openWeather');

const isAuth = require('../middleware/is-auth');

router.get('/', homeController.getHomePage);
router.get('/locations', weatherController.getLocations);
router.post('/locations', isAuth, weatherController.getLocations);
router.get('/weather/:lat/:lon', weatherController.getWeather);

module.exports = router;