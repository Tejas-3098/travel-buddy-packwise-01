const { getWeatherData } = require('../services/weatherService');
const { suggestItemsBasedOnWeather } = require('../utils/itemSuggestions');
const { suggestItemsForOverallWeather } = require('../utils/overallWeatherSuggestions');

const filterWeatherDataByDateRange = (weatherData, startDate, endDate) => {
    return weatherData.list.filter(entry => {
        const entryDate = new Date(entry.dt * 1000);  // Convert UNIX timestamp to Date
        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
    });
};

const getPackingSuggestions = async (req, res) => {
    try {
        const { city, startDate, endDate } = req.query;
        console.log(`Fetching weather data for city: ${city}, between ${startDate} and ${endDate}`);

        // Fetch weather data
        const weatherData = await getWeatherData(city);
        console.log('Weather data retrieved:', weatherData);

        // Filter the weather data based on the user's travel dates
        const filteredWeatherData = filterWeatherDataByDateRange(weatherData, startDate, endDate);
        console.log('Filtered weather data:', filteredWeatherData);

        if (filteredWeatherData.length === 0) {
            throw new Error('No weather data available for the specified date range.');
        }

        // Analyze the predominant weather condition for the travel period
        const predominantWeather = analyzeWeatherTrend(filteredWeatherData);
        console.log('Predominant weather:', predominantWeather);

        // Get item suggestions based on the predominant weather condition
        const itemSuggestions = suggestItemsForOverallWeather(predominantWeather);
        console.log('Item suggestions:', itemSuggestions);

        // Create a summary message for the user
        const summaryMessage = `This is going to be the weather in your specified travel dates: Predominantly ${predominantWeather.condition} with an average temperature of ${predominantWeather.avgTemp.toFixed(1)}°C. Here are a few items that I can suggest.`;

        res.json({ message: summaryMessage, itemSuggestions });
    } catch (error) {
        console.error('Error in getPackingSuggestions:', error);
        res.status(500).json({ error: 'Failed to get packing suggestions' });
    }
};

const analyzeWeatherTrend = (weatherData) => {
    const conditionCounts = {};
    let totalTemp = 0;
    let count = 0;

    weatherData.forEach(entry => {
        const weatherCondition = entry.weather[0].main.toLowerCase();
        totalTemp += entry.main.temp;
        count += 1;

        if (conditionCounts[weatherCondition]) {
            conditionCounts[weatherCondition] += 1;
        } else {
            conditionCounts[weatherCondition] = 1;
        }
    });

    const avgTemp = totalTemp / count;
    const predominantCondition = Object.keys(conditionCounts).reduce((a, b) => conditionCounts[a] > conditionCounts[b] ? a : b);

    return { condition: predominantCondition, avgTemp };
};

module.exports = { getPackingSuggestions };
