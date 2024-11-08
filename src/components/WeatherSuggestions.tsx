import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WeightIndicator from "./WeightIndicator";
import { PackingItem, TravelDetails } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";
import WeatherForecast from "./weather/WeatherForecast";
import WeatherItem from "./weather/WeatherItem";

interface WeatherSuggestionsProps {
  weatherItems: PackingItem[];
  selectedItems: PackingItem[];
  travelDetails: TravelDetails;
  onAddItem: (item: PackingItem) => void;
  onNext: () => void;
  onBack: () => void;
}

const WeatherSuggestions = ({
  weatherItems: initialWeatherItems,
  selectedItems,
  travelDetails,
  onAddItem,
  onNext,
  onBack,
}: WeatherSuggestionsProps) => {
  const [weatherItems, setWeatherItems] = useState(initialWeatherItems);
  const totalWeight = calculateTotalWeight(selectedItems, travelDetails.unit);
  
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    weatherItems.forEach(item => {
      const existingItem = selectedItems.find(selected => selected.id === item.id);
      initial[item.id] = existingItem?.quantity || 1;
    });
    return initial;
  });

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta)
    }));
  };

  const handleAddItem = (item: PackingItem) => {
    const quantity = quantities[item.id];
    const totalItemWeight = item.weight * quantity;
    const newTotalWeight = totalWeight + totalItemWeight;
    
    if (newTotalWeight > travelDetails.weightLimit) {
      return;
    }

    const newItem = {
      ...item,
      quantity,
      category: "weather" as const,
      packed: false
    };

    onAddItem(newItem);
  };

  const handleRemoveItem = (itemId: string) => {
    // Remove the item from the suggested items list
    setWeatherItems(prev => prev.filter(item => item.id !== itemId));
    
    // Remove the item from selected items (if it was added)
    if (isItemAdded(itemId)) {
      onAddItem({ ...selectedItems.find(item => item.id === itemId)!, quantity: 0 });
    }
    
    // Reset the quantity in local state
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[itemId];
      return newQuantities;
    });
  };

  const isItemAdded = (itemId: string) => {
    return selectedItems.some(item => item.id === itemId);
  };

  const weatherInfo = weatherItems[0]?.message || "";
  const temperatureMatch = weatherInfo.match(/temperature of (-?\d+\.?\d*)°C/);
  const temperature = temperatureMatch ? temperatureMatch[1] : null;

  return (
    <Card className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Weather-Based Suggestions</h2>
      
      <WeatherForecast
        weatherInfo={weatherInfo}
        temperature={temperature}
        travelDetails={travelDetails}
      />
      
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
              <WeatherItem
                key={item.id}
                item={item}
                quantity={quantity}
                unit={travelDetails.unit}
                isAdded={isAdded}
                existingItem={existingItem}
                onQuantityChange={handleQuantityChange}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
              />
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