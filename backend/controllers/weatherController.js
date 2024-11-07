const { getWeatherData } = require('../services/weatherService');

const fetchWeather = async (req, res) => {
  try {
    const { city } = req.query;
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { fetchWeather };
