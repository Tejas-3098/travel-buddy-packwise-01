import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import WeightIndicator from "./WeightIndicator";
import { Activity, EssentialItem, PackingItem, TravelDetails } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";

interface ActivitySelectionProps {
  travelDetails: TravelDetails;
  onNext: (selectedItems: PackingItem[]) => void;
  onBack: () => void;
}

const ACTIVITIES = [
  { id: "hiking", name: "Hiking", items: [
    { id: "boots", name: "Hiking Boots", weight: 1.5, unit: "kg" },
    { id: "backpack", name: "Day Backpack", weight: 0.5, unit: "kg" },
  ]},
  { id: "beach", name: "Beach", items: [
    { id: "swimsuit", name: "Swimsuit", weight: 0.2, unit: "kg" },
    { id: "sunscreen", name: "Sunscreen", weight: 0.3, unit: "kg" },
  ]},
  { id: "formal", name: "Formal Event", items: [
    { id: "suit", name: "Suit/Dress", weight: 1.0, unit: "kg" },
    { id: "shoes", name: "Formal Shoes", weight: 0.8, unit: "kg" },
  ]},
] as const;

const ActivitySelection = ({ travelDetails, onNext, onBack }: ActivitySelectionProps) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<PackingItem[]>(
    travelDetails.essentials.map(item => ({
      ...item,
      category: "essential",
      packed: false,
      quantity: 1,
    }))
  );

  const handleActivityToggle = (activityId: string) => {
    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
      setSelectedItems(selectedItems.filter(item => 
        item.category === "essential" || !ACTIVITIES.find(a => a.id === activityId)?.items.some(i => i.id === item.id)
      ));
    } else {
      setSelectedActivities([...selectedActivities, activityId]);
      const activity = ACTIVITIES.find(a => a.id === activityId);
      if (activity) {
        const newItems = activity.items.map(item => ({
          id: item.id,
          name: item.name,
          weight: item.weight,
          unit: item.unit,
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
    <Card className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Select Activities</h2>
      
      <WeightIndicator
        currentWeight={totalWeight}
        weightLimit={travelDetails.weightLimit}
        unit={travelDetails.unit}
      />

      <div className="space-y-4">
        <Label>Essential Items</Label>
        <div className="grid gap-2">
          {selectedItems
            .filter(item => item.category === "essential")
            .map(item => (
              <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{item.name}</span>
                <span>{item.weight} {item.unit}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Available Activities</Label>
        <div className="grid gap-4 md:grid-cols-2">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedActivities.includes(activity.id)
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50"
              }`}
              onClick={() => handleActivityToggle(activity.id)}
            >
              <h3 className="font-semibold">{activity.name}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                {activity.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.weight} {item.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onNext(selectedItems)}>
          Review Packing List
        </Button>
      </div>
    </Card>
  );
};

export default ActivitySelection;