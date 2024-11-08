import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WeightIndicator from "./WeightIndicator";
import { PackingItem, TravelDetails } from "@/types/types";
import { Plus } from "lucide-react";
import { calculateTotalWeight } from "@/utils/calculations";
import { motion } from "framer-motion";

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
  const totalWeight = calculateTotalWeight(selectedItems, travelDetails.unit);

  // Group items by type
  const groupedItems = {
    tops: weatherItems.filter(item => item.type === 'top'),
    bottoms: weatherItems.filter(item => item.type === 'bottom'),
    shoes: weatherItems.filter(item => item.type === 'shoes'),
    accessories: weatherItems.filter(item => !['top', 'bottom', 'shoes'].includes(item.type || ''))
  };

  const renderItemSection = (title: string, items: PackingItem[]) => (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => {
          const isAdded = selectedItems.some((selected) => selected.id === item.id);
          
          return (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{item.name}</span>
                <p className="text-sm text-gray-600">{item.weight} {travelDetails.unit}</p>
              </div>
              <Button
                variant={isAdded ? "secondary" : "default"}
                size="sm"
                onClick={() => !isAdded && onAddItem(item)}
                disabled={isAdded}
              >
                {isAdded ? "Added" : "Add to Bag"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );

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
          Your trip to <span className="font-semibold">{travelDetails.destination}</span>
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
        {renderItemSection("Tops", groupedItems.tops)}
        {renderItemSection("Bottoms", groupedItems.bottoms)}
        {renderItemSection("Shoes", groupedItems.shoes)}
        {renderItemSection("Accessories", groupedItems.accessories)}
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