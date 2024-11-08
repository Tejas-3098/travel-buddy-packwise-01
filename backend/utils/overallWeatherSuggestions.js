const suggestItemsForOverallWeather = (overallWeather) => {
    const { condition, avgTemp } = overallWeather;
    const items = [];

    // Basic clothing items based on temperature
    if (avgTemp < 10) {
        items.push(
            { id: 'winter_tops', name: 'Thermal Long Sleeve Tops', weight: 0.3, unit: 'kg', type: 'top' },
            { id: 'winter_bottoms', name: 'Thermal Pants', weight: 0.4, unit: 'kg', type: 'bottom' },
            { id: 'winter_shoes', name: 'Insulated Boots', weight: 1.2, unit: 'kg', type: 'shoes' }
        );
    } else if (avgTemp >= 10 && avgTemp <= 20) {
        items.push(
            { id: 'mild_tops', name: 'Long Sleeve Shirts', weight: 0.2, unit: 'kg', type: 'top' },
            { id: 'mild_bottoms', name: 'Regular Pants', weight: 0.3, unit: 'kg', type: 'bottom' },
            { id: 'mild_shoes', name: 'Comfortable Walking Shoes', weight: 0.8, unit: 'kg', type: 'shoes' }
        );
    } else {
        items.push(
            { id: 'summer_tops', name: 'T-Shirts', weight: 0.15, unit: 'kg', type: 'top' },
            { id: 'summer_bottoms', name: 'Shorts', weight: 0.2, unit: 'kg', type: 'bottom' },
            { id: 'summer_shoes', name: 'Light Sneakers', weight: 0.6, unit: 'kg', type: 'shoes' }
        );
    }

    // Weather specific items
    if (condition.includes('rain')) {
        items.push(
            { id: 'raincoat', name: 'Raincoat', weight: 0.5, unit: 'kg', type: 'accessory' },
            { id: 'umbrella', name: 'Umbrella', weight: 0.4, unit: 'kg', type: 'accessory' },
            { id: 'waterproof_shoes', name: 'Waterproof Shoes', weight: 1.0, unit: 'kg', type: 'shoes' }
        );
    }
    if (condition.includes('snow')) {
        items.push(
            { id: 'thermal', name: 'Thermal Wear', weight: 1, unit: 'kg', type: 'accessory' },
            { id: 'winter_jacket', name: 'Winter Jacket', weight: 1.5, unit: 'kg', type: 'accessory' }
        );
    }
    if (condition.includes('clear') || condition.includes('sun')) {
        items.push(
            { id: 'sunscreen', name: 'Sunscreen', weight: 0.2, unit: 'kg', type: 'accessory' },
            { id: 'sunglasses', name: 'Sunglasses', weight: 0.1, unit: 'kg', type: 'accessory' }
        );
    }
    if (condition.includes('clouds')) {
        items.push(
            { id: 'light_jacket', name: 'Light Jacket', weight: 0.5, unit: 'kg', type: 'accessory' }
        );
    }

    // Additional items based on average temperature
    if (avgTemp < 10) {
        items.push(
            { id: 'warm_hat', name: 'Warm Hat', weight: 0.3, unit: 'kg', type: 'accessory' },
            { id: 'gloves', name: 'Winter Gloves', weight: 0.2, unit: 'kg', type: 'accessory' }
        );
    } else if (avgTemp >= 10 && avgTemp <= 20) {
        items.push(
            { id: 'hoodie', name: 'Hoodie', weight: 0.6, unit: 'kg', type: 'accessory' }
        );
    } else if (avgTemp > 20) {
        items.push(
            { id: 'hydration_pack', name: 'Hydration Pack', weight: 0.5, unit: 'kg', type: 'accessory' },
            { id: 'cap', name: 'Cap', weight: 0.1, unit: 'kg', type: 'accessory' }
        );
    }

    return items;
};

module.exports = { suggestItemsForOverallWeather };