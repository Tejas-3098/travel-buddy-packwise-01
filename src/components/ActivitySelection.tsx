import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import WeightIndicator from "./WeightIndicator";
import { Activity, PackingItem, TravelDetails } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";
import { Briefcase, Mountain, Backpack, Wind, Waves, Heart, Tent, Camera, Utensils, Snowflake } from "lucide-react";

interface ActivitySelectionProps {
  travelDetails: TravelDetails;
  onNext: (items: PackingItem[]) => void;
  onBack: () => void;
}

const ACTIVITIES = [
  { 
    id: "hiking", 
    name: "Hiking", 
    icon: <Mountain className="h-5 w-5" />,
    items: [
      { id: "boots", name: "Hiking Boots", weight: 1.5, unit: "kg" },
      { id: "backpack", name: "Day Backpack", weight: 0.5, unit: "kg" },
      { id: "poles", name: "Hiking Poles", weight: 0.5, unit: "kg" },
    ]
  },
  { 
    id: "beach", 
    name: "Beach", 
    icon: <Waves className="h-5 w-5" />,
    items: [
      { id: "swimsuit", name: "Swimsuit", weight: 0.2, unit: "kg" },
      { id: "sunscreen", name: "Sunscreen", weight: 0.3, unit: "kg" },
      { id: "beachtowel", name: "Beach Towel", weight: 0.5, unit: "kg" },
    ]
  },
  { 
    id: "formal", 
    name: "Formal Event", 
    icon: <Heart className="h-5 w-5" />,
    items: [
      { id: "suit", name: "Suit/Dress", weight: 1.0, unit: "kg" },
      { id: "shoes", name: "Formal Shoes", weight: 0.8, unit: "kg" },
      { id: "accessories", name: "Accessories", weight: 0.3, unit: "kg" },
    ]
  },
  { 
    id: "business", 
    name: "Business", 
    icon: <Briefcase className="h-5 w-5" />,
    items: [
      { id: "laptop", name: "Laptop & Charger", weight: 2.0, unit: "kg" },
      { id: "documents", name: "Documents", weight: 0.5, unit: "kg" },
      { id: "businessattire", name: "Business Attire", weight: 2.0, unit: "kg" },
    ]
  },
  { 
    id: "backpacking", 
    name: "Backpacking", 
    icon: <Backpack className="h-5 w-5" />,
    items: [
      { id: "sleepingbag", name: "Sleeping Bag", weight: 1.5, unit: "kg" },
      { id: "tent", name: "Lightweight Tent", weight: 2.0, unit: "kg" },
      { id: "cookingkit", name: "Cooking Kit", weight: 0.8, unit: "kg" },
    ]
  },
  { 
    id: "paragliding", 
    name: "Paragliding", 
    icon: <Wind className="h-5 w-5" />,
    items: [
      { id: "helmet", name: "Helmet", weight: 0.8, unit: "kg" },
      { id: "gloves", name: "Gloves", weight: 0.2, unit: "kg" },
      { id: "goggles", name: "Goggles", weight: 0.2, unit: "kg" },
    ]
  },
  { 
    id: "camping", 
    name: "Camping", 
    icon: <Tent className="h-5 w-5" />,
    items: [
      { id: "tent", name: "Tent", weight: 3.0, unit: "kg" },
      { id: "sleepingbag", name: "Sleeping Bag", weight: 1.5, unit: "kg" },
      { id: "flashlight", name: "Flashlight", weight: 0.3, unit: "kg" },
    ]
  },
  { 
    id: "photography", 
    name: "Photography", 
    icon: <Camera className="h-5 w-5" />,
    items: [
      { id: "camera", name: "Camera", weight: 1.5, unit: "kg" },
      { id: "lenses", name: "Extra Lenses", weight: 1.0, unit: "kg" },
      { id: "tripod", name: "Tripod", weight: 1.2, unit: "kg" },
    ]
  },
  { 
    id: "dining", 
    name: "Fine Dining", 
    icon: <Utensils className="h-5 w-5" />,
    items: [
      { id: "formalwear", name: "Formal Wear", weight: 1.0, unit: "kg" },
      { id: "dressshoes", name: "Dress Shoes", weight: 0.8, unit: "kg" },
    ]
  },
  { 
    id: "skiing", 
    name: "Skiing", 
    icon: <Snowflake className="h-5 w-5" />,
    items: [
      { id: "skijacket", name: "Ski Jacket", weight: 2.0, unit: "kg" },
      { id: "skipants", name: "Ski Pants", weight: 1.5, unit: "kg" },
      { id: "thermals", name: "Thermal Wear", weight: 0.5, unit: "kg" },
      { id: "gloves", name: "Ski Gloves", weight: 0.3, unit: "kg" },
    ]
  },
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
        item.category === "essential" || 
        item.category === "weather" ||  // Keep weather items
        !ACTIVITIES.find(a => a.id === activityId)?.items.some(i => i.id === item.id)
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
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">Travel Buddy</h1>
        <p className="text-lg text-gray-600 italic">"Pack Smart, Travel Light, Adventure Right"</p>
      </div>

      <Card className="p-6 space-y-6">
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
                  <span className="text-gray-600">{item.weight} {item.unit}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg">Available Activities</Label>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className={`p-4 border rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                  selectedActivities.includes(activity.id)
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                onClick={() => handleActivityToggle(activity.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  {activity.icon}
                  <h3 className="font-semibold">{activity.name}</h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
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
    </div>
  );
};

export default ActivitySelection;