import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WeightIndicator from "./WeightIndicator";
import { PackingItem, TravelDetails } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";
import { calculateTripDuration } from "@/utils/dateUtils";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, Sun, Cloud, CloudRain, Snowflake, Thermometer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WeatherSuggestionsProps {
  weatherItems: PackingItem[];
  selectedItems: PackingItem[];
  travelDetails: TravelDetails;
  onAddItem: (item: PackingItem) => void;
  onNext: () => void;
  onBack: () => void;
}

const WeatherSuggestions = ({
  weatherItems,
  selectedItems,
  travelDetails,
  onAddItem,
  onNext,
  onBack,
}: WeatherSuggestionsProps) => {
  const { toast } = useToast();
  const totalWeight = calculateTotalWeight(selectedItems, travelDetails.unit);
  const tripDuration = calculateTripDuration(travelDetails.startDate, travelDetails.endDate);
  
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    weatherItems.forEach(item => {
      const existingItem = selectedItems.find(selected => selected.id === item.id);
      initial[item.id] = existingItem?.quantity || 1;
    });
    return initial;
  });

  const weatherInfo = weatherItems[0]?.message || "";
  const temperatureMatch = weatherInfo.match(/temperature of (-?\d+\.?\d*)°C/);
  const temperature = temperatureMatch ? temperatureMatch[1] : null;

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

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta)
    }));
  };

  const handleAddItem = (item: PackingItem) => {
    const quantity = quantities[item.id];
    const totalItemWeight = item.weight * quantity;
    const existingItemIndex = selectedItems.findIndex(selected => selected.id === item.id);
    const newTotalWeight = totalWeight + totalItemWeight;
    
    if (newTotalWeight > travelDetails.weightLimit) {
      toast({
        title: "Weight Limit Exceeded",
        description: `Adding this item would exceed your weight limit of ${travelDetails.weightLimit}${travelDetails.unit}`,
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      ...item,
      quantity,
      category: "weather" as const,
      packed: false
    };

    if (existingItemIndex !== -1) {
      // Update existing item's quantity
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex] = newItem;
      onAddItem(newItem);
    } else {
      onAddItem(newItem);
    }

    toast({
      title: "Item Added",
      description: `Added ${quantity} ${item.name} to your bag`,
    });
  };

  const isItemAdded = (itemId: string) => {
    return selectedItems.some(item => item.id === itemId);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Weather-Based Suggestions</h2>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm border border-blue-200"
      >
        <div className="flex items-center gap-3">
          {weatherItems[0]?.message && getWeatherIcon(weatherItems[0].message)}
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
              {weatherItems[0]?.message || "Loading weather information..."}
            </p>
          </div>
        </div>
      </motion.div>
      
      <WeightIndicator
        currentWeight={totalWeight}
        weightLimit={travelDetails.weightLimit}
        unit={travelDetails.unit}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Suggested Items</h3>
        <div className="grid gap-4">
          {weatherItems.map((item) => {
            const isAdded = isItemAdded(item.id);
            const quantity = quantities[item.id] || 1;
            const existingItem = selectedItems.find(selected => selected.id === item.id);
            
            return (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <p className="text-sm text-gray-600">
                    Weight: {(item.weight * quantity).toFixed(1)} {travelDetails.unit}
                  </p>
                  {existingItem && (
                    <p className="text-sm text-green-600">
                      Currently in bag: x{existingItem.quantity}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={isAdded ? "secondary" : "default"}
                    onClick={() => handleAddItem(item)}
                    className="min-w-[100px]"
                  >
                    {isAdded ? "Update Bag" : "Add to Bag"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Activities
        </Button>
      </div>
    </Card>
  );
};

export default WeatherSuggestions;