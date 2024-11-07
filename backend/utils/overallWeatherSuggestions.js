const suggestItemsForOverallWeather = (overallWeather) => {
    const { condition, avgTemp } = overallWeather;
    const items = [];

    // General items based on predominant weather conditions
    if (condition.includes('rain')) {
        items.push({ id: 'raincoat', name: 'Raincoat', weight: 0.5, unit: 'kg' });
        items.push({ id: 'umbrella', name: 'Umbrella', weight: 0.4, unit: 'kg' });
    }
    if (condition.includes('snow')) {
        items.push({ id: 'thermal', name: 'Thermal Wear', weight: 1, unit: 'kg' });
        items.push({ id: 'winter_jacket', name: 'Winter Jacket', weight: 1.5, unit: 'kg' });
    }
    if (condition.includes('clear') || condition.includes('sun')) {
        items.push({ id: 'sunscreen', name: 'Sunscreen', weight: 0.2, unit: 'kg' });
        items.push({ id: 'sunglasses', name: 'Sunglasses', weight: 0.1, unit: 'kg' });
    }
    if (condition.includes('clouds')) {
        items.push({ id: 'light_jacket', name: 'Light Jacket', weight: 0.5, unit: 'kg' });
    }

    // Additional items based on average temperature
    if (avgTemp < 10) {
        items.push({ id: 'warm_hat', name: 'Warm Hat', weight: 0.3, unit: 'kg' });
    } else if (avgTemp >= 10 && avgTemp <= 20) {
        items.push({ id: 'hoodie', name: 'Hoodie', weight: 0.6, unit: 'kg' });
    } else if (avgTemp > 20) {
        items.push({ id: 'hydration_pack', name: 'Hydration Pack', weight: 0.5, unit: 'kg' });
    }

    return items;
};

module.exports = { suggestItemsForOverallWeather };
