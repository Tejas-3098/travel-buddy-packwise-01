const axios = require('axios');
const config = require('../config/config');

const getWeatherData = async (city) => {
    try {
        if (!config.weatherApiKey) {
            throw new Error('Weather API key is not configured');
        }

        if (!city) {
            throw new Error('City parameter is required');
        }

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${config.weatherApiKey}&units=metric`;
        console.log(`Fetching weather data from OpenWeather API for city: ${city}`);
        
        const response = await axios.get(url);
        
        // Validate the response
        if (!response.data || !response.data.list) {
            throw new Error('Invalid response from weather API');
        }

        console.log('Weather data retrieved successfully');
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error.response?.data || error.message);
        if (error.response?.data?.message === 'city not found') {
            throw new Error('City not found. Please check the city name and try again.');
        }
        if (error.response?.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
        }
        throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
};

module.exports = { getWeatherData };