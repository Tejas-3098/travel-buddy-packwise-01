import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import WeightIndicator from "./WeightIndicator";
import { Activity, PackingItem, TravelDetails } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";
import { ACTIVITIES } from "./activities/activityData";
import ActivityList from "./activities/ActivityList";

interface ActivitySelectionProps {
  travelDetails: TravelDetails;
  onNext: (items: PackingItem[]) => void;
  onBack: () => void;
}

const ActivitySelection = ({ travelDetails, onNext, onBack }: ActivitySelectionProps) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  
  const [selectedItems, setSelectedItems] = useState<PackingItem[]>([
    ...travelDetails.essentials.map(item => ({
      ...item,
      category: "essential" as const,
      packed: false,
      quantity: 1,
    })),
    ...(travelDetails.weatherItems || [])
      .filter(item => item.quantity !== 0)
  ]);

  const handleActivityToggle = (activityId: string) => {
    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
      setSelectedItems(selectedItems.filter(item => 
        item.category === "essential" || 
        item.category === "weather" ||
        !ACTIVITIES.find(a => a.id === activityId)?.items.some(i => i.id === item.id)
      ));
    } else {
      setSelectedActivities([...selectedActivities, activityId]);
      const activity = ACTIVITIES.find(a => a.id === activityId);
      if (activity) {
        const newItems = activity.items.map(item => ({
          ...item,
          category: "activity" as const,
          packed: false,
          quantity: 1,
        }));
        setSelectedItems([...selectedItems, ...newItems]);
      }
    }
  };

  const totalWeight = calculateTotalWeight(selectedItems, travelDetails.unit);

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      <Card className="p-6 space-y-6 card-glass">
        <h2 className="text-2xl font-bold text-center text-primary">Select Your Activities</h2>
        
        <WeightIndicator
          currentWeight={totalWeight}
          weightLimit={travelDetails.weightLimit}
          unit={travelDetails.unit}
        />

        <div className="space-y-4">
          <Label className="text-lg">Essential Items</Label>
          <div className="grid gap-2">
            {selectedItems
              .filter(item => item.category === "essential")
              .map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600">
                    {(item.weight * (item.quantity || 1)).toFixed(1)} {travelDetails.unit}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {selectedItems.some(item => item.category === "weather") && (
          <div className="space-y-4">
            <Label className="text-lg">Weather-Related Items</Label>
            <div className="grid gap-2">
              {selectedItems
                .filter(item => item.category === "weather")
                .map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      {item.quantity > 1 && (
                        <span className="text-sm text-gray-500">x{item.quantity}</span>
                      )}
                    </div>
                    <span className="text-gray-600">
                      {(item.weight * (item.quantity || 1)).toFixed(1)} {travelDetails.unit}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <ActivityList 
          activities={ACTIVITIES} 
          selectedActivities={selectedActivities} 
          onActivityToggle={handleActivityToggle}
        />

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={() => onNext(selectedItems)}>
            Review Packing List
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ActivitySelection;
