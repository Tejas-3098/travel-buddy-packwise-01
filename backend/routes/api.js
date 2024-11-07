/*
const express = require('express');
const { fetchWeather } = require('../controllers/weatherController');
const { getPackingSuggestions } = require('../controllers/packingController');

const router = express.Router();

router.get('/weather', fetchWeather);  // Endpoint to get weather data
router.get('/packing-suggestions', getPackingSuggestions);  // Endpoint to get packing suggestions

module.exports = router; */

const express = require('express');
const { fetchWeather } = require('../controllers/weatherController');
const { getPackingSuggestions } = require('../controllers/packingController');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Router is working!' });
});

// Add the /weather route
router.get('/weather', fetchWeather);

router.get('/packing-suggestions', getPackingSuggestions);

module.exports = router;
