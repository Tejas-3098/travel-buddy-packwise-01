const suggestItemsBasedOnWeather = (weatherDescription) => {
    const items = [];

    if (weatherDescription.includes('rain')) {
        items.push(
            { id: 'raincoat', name: 'Raincoat', weight: 0.5, unit: 'kg' },
            { id: 'umbrella', name: 'Umbrella', weight: 0.4, unit: 'kg' },
            { id: 'waterproof_shoes', name: 'Waterproof Shoes', weight: 1, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('snow')) {
        items.push(
            { id: 'thermal', name: 'Thermal Wear', weight: 1, unit: 'kg' },
            { id: 'winter_jacket', name: 'Winter Jacket', weight: 1.5, unit: 'kg' },
            { id: 'gloves', name: 'Warm Gloves', weight: 0.2, unit: 'kg' },
            { id: 'scarf', name: 'Scarf', weight: 0.2, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('clear')) {
        items.push(
            { id: 'sunglasses', name: 'Sunglasses', weight: 0.1, unit: 'kg' },
            { id: 'sunscreen', name: 'Sunscreen', weight: 0.2, unit: 'kg' },
            { id: 'hat', name: 'Sun Hat', weight: 0.3, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('clouds')) {
        items.push(
            { id: 'light_jacket', name: 'Light Jacket', weight: 0.5, unit: 'kg' },
            { id: 'scarf', name: 'Scarf', weight: 0.2, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('drizzle')) {
        items.push(
            { id: 'light_raincoat', name: 'Light Raincoat', weight: 0.3, unit: 'kg' },
            { id: 'umbrella', name: 'Umbrella', weight: 0.4, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('thunderstorm')) {
        items.push(
            { id: 'waterproof_jacket', name: 'Waterproof Jacket', weight: 0.6, unit: 'kg' },
            { id: 'flashlight', name: 'Flashlight', weight: 0.2, unit: 'kg' },
            { id: 'power_bank', name: 'Power Bank', weight: 0.3, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('mist') || weatherDescription.includes('fog') || weatherDescription.includes('haze')) {
        items.push(
            { id: 'visibility_vest', name: 'Visibility Vest', weight: 0.2, unit: 'kg' },
            { id: 'face_mask', name: 'Face Mask', weight: 0.1, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('smoke')) {
        items.push(
            { id: 'mask', name: 'Air Quality Mask', weight: 0.1, unit: 'kg' },
            { id: 'eye_drops', name: 'Eye Drops', weight: 0.05, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('sand') || weatherDescription.includes('dust')) {
        items.push(
            { id: 'face_mask', name: 'Dust Mask', weight: 0.1, unit: 'kg' },
            { id: 'goggles', name: 'Protective Goggles', weight: 0.2, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('tornado')) {
        items.push(
            { id: 'emergency_kit', name: 'Emergency Kit', weight: 1.0, unit: 'kg' },
            { id: 'helmet', name: 'Helmet', weight: 0.5, unit: 'kg' },
            { id: 'sturdy_boots', name: 'Sturdy Boots', weight: 1.2, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('hot') || weatherDescription.includes('heat')) {
        items.push(
            { id: 'hydration_pack', name: 'Hydration Pack', weight: 0.5, unit: 'kg' },
            { id: 'cooling_towel', name: 'Cooling Towel', weight: 0.1, unit: 'kg' }
        );
    }

    if (weatherDescription.includes('cold')) {
        items.push(
            { id: 'thermal_underwear', name: 'Thermal Underwear', weight: 0.4, unit: 'kg' },
            { id: 'fleece_jacket', name: 'Fleece Jacket', weight: 0.8, unit: 'kg' },
            { id: 'wool_socks', name: 'Wool Socks', weight: 0.2, unit: 'kg' }
        );
    }

    return items;
};

module.exports = { suggestItemsBasedOnWeather };
