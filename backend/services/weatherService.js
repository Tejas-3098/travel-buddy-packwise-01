const axios = require('axios');
const config = require('../config/config');

const getWeatherData = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${config.weatherApiKey}&units=metric`;
        console.log(`Fetching weather data from OpenWeather API for city: ${city}`);
        const response = await axios.get(url);
        console.log('Weather data retrieved:', response.data);  // Log the entire response for debugging
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);  // Log the error
        throw new Error('Failed to fetch weather data');
    }
};

module.exports = { getWeatherData };
