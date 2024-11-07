import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Trash2 } from "lucide-react";
import WeightIndicator from "./WeightIndicator";
import { PackingItem } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";

interface PackingListReviewProps {
  items: PackingItem[];
  weightLimit: number;
  unit: "kg" | "lb";
  onNext: (items: PackingItem[]) => void;
  onBack: () => void;
}

const PackingListReview = ({ items: initialItems, weightLimit, unit, onNext, onBack }: PackingListReviewProps) => {
  const [items, setItems] = useState<PackingItem[]>(initialItems);

  const handleQuantityChange = (itemId: string, delta: number) => {
    setItems(items.map(item => 
      item.id === itemId
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
        : item
    ));
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const totalWeight = calculateTotalWeight(items, unit);

  return (
    <Card className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Review Packing List</h2>

      <WeightIndicator
        currentWeight={totalWeight}
        weightLimit={weightLimit}
        unit={unit}
      />

      <div className="space-y-4">
        {["essential", "activity"].map((category) => (
          <div key={category} className="space-y-2">
            <h3 className="font-semibold capitalize">{category} Items</h3>
            <div className="space-y-2">
              {items
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {item.weight * (item.quantity || 1)} {item.unit}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Activities
        </Button>
        <Button onClick={() => onNext(items)}>
          Finalize Packing List
        </Button>
      </div>
    </Card>
  );
};

export default PackingListReview;