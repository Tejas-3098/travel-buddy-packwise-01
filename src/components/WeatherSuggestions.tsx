import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WeightIndicator from "./WeightIndicator";
import { PackingItem, TravelDetails } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";
import { calculateTripDuration } from "@/utils/dateUtils";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
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
      initial[item.id] = item.type === "shoes" ? Math.min(3, tripDuration) : tripDuration;
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
    const newWeight = totalWeight + (item.weight * quantity);
    
    if (newWeight > travelDetails.weightLimit) {
      toast({
        title: "Weight Limit Exceeded",
        description: `Adding this item would exceed your weight limit of ${travelDetails.weightLimit}${travelDetails.unit}`,
        variant: "destructive",
      });
      return;
    }

    onAddItem({
      ...item,
      quantity,
      weight: item.weight * quantity
    });

    toast({
      title: "Item Added",
      description: `Added ${quantity} ${item.name} to your bag`,
    });
  };

  const renderClothingSection = (type: "top" | "bottom" | "shoes") => {
    const items = weatherItems.filter(item => item.type === type);
    const typeLabel = type === "top" ? "Tops" : type === "bottom" ? "Bottoms" : "Shoes";
    const suggestedQuantity = type === "shoes" ? Math.min(3, tripDuration) : tripDuration;
    
    if (items.length === 0) return null;

    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">
          {typeLabel} (Suggested: {suggestedQuantity})
        </h3>
        <div className="space-y-2">
          {items.map((item) => {
            const isAdded = selectedItems.some((selected) => selected.id === item.id);
            const quantity = quantities[item.id] || suggestedQuantity;
            
            return (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <p className="text-sm text-gray-600">
                    {(item.weight * quantity).toFixed(1)} {travelDetails.unit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={isAdded}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    disabled={isAdded}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={isAdded ? "secondary" : "default"}
                    onClick={() => !isAdded && handleAddItem(item)}
                    disabled={isAdded}
                  >
                    {isAdded ? "Added" : "Add to Bag"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Weather Forecast</h3>
        <p className="text-blue-700">
          Your {tripDuration}-day trip to <span className="font-semibold">{travelDetails.destination}</span>
        </p>
        <p className="text-blue-700 mt-1">
          From {travelDetails.startDate} to {travelDetails.endDate}
        </p>
      </motion.div>
      
      <WeightIndicator
        currentWeight={totalWeight}
        weightLimit={travelDetails.weightLimit}
        unit={travelDetails.unit}
      />

      <div className="space-y-6">
        {renderClothingSection("top")}
        {renderClothingSection("bottom")}
        {renderClothingSection("shoes")}
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