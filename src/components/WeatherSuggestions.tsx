import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WeightIndicator from "./WeightIndicator";
import { PackingItem, TravelDetails } from "@/types/types";
import { Plus } from "lucide-react";
import { calculateTotalWeight } from "@/utils/calculations";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

  return (
    <Card className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Weather-Based Suggestions</h2>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Alert className="bg-gradient-to-r from-blue-50 to-blue-100">
          <AlertDescription className="text-center py-4">
            Based on the weather forecast for {travelDetails.destination}, 
            the average temperature during your trip from {travelDetails.startDate} to {travelDetails.endDate} 
            will be predominantly sunny with an average temperature of 25°C.
          </AlertDescription>
        </Alert>
      </motion.div>
      
      <WeightIndicator
        currentWeight={totalWeight}
        weightLimit={travelDetails.weightLimit}
        unit={travelDetails.unit}
      />

      <div className="space-y-4">
        {weatherItems.map((item) => {
          const isAdded = selectedItems.some((selected) => selected.id === item.id);
          
          return (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{item.name}</span>
                <p className="text-sm text-gray-600">{item.weight} {item.unit}</p>
              </div>
              <Button
                variant={isAdded ? "secondary" : "default"}
                size="sm"
                onClick={() => !isAdded && onAddItem(item)}
                disabled={isAdded}
              >
                {isAdded ? "Added" : <Plus className="h-4 w-4" />}
              </Button>
            </div>
          );
        })}
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