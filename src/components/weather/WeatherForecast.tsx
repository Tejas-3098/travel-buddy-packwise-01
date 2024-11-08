import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Snowflake, Thermometer } from "lucide-react";
import { TravelDetails } from "@/types/types";
import { calculateTripDuration } from "@/utils/dateUtils";

interface WeatherForecastProps {
  weatherInfo: string;
  temperature: string | null;
  travelDetails: TravelDetails;
}

const WeatherForecast = ({ weatherInfo, temperature, travelDetails }: WeatherForecastProps) => {
  const tripDuration = calculateTripDuration(travelDetails.startDate, travelDetails.endDate);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'snowy':
      case 'snow':
        return <Snowflake className="h-6 w-6 text-blue-300" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm border border-blue-200"
    >
      <div className="flex items-center gap-3">
        {weatherInfo && getWeatherIcon(weatherInfo)}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Weather Forecast</h3>
          <p className="text-blue-700">
            Your {tripDuration}-day trip to <span className="font-semibold">{travelDetails.destination}</span>
          </p>
          <p className="text-blue-700 mt-1">
            From {travelDetails.startDate} to {travelDetails.endDate}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Thermometer className="h-5 w-5 text-red-500" />
            <span className="text-lg font-medium text-blue-800">
              {temperature ? `${temperature}°C` : "Temperature not available"}
            </span>
          </div>
          <p className="text-blue-700 mt-2 font-medium">
            {weatherInfo || "Loading weather information..."}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherForecast;