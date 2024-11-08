import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import WeightIndicator from "./WeightIndicator";
import { PackingItem } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";
import { useToast } from "@/components/ui/use-toast";

interface PackingListReviewProps {
  items: PackingItem[];
  weightLimit: number;
  unit: "kg" | "lb";
  onNext: (items: PackingItem[]) => void;
  onBack: () => void;
}

const PackingListReview = ({ items: initialItems, weightLimit, unit, onNext, onBack }: PackingListReviewProps) => {
  const [items, setItems] = useState<PackingItem[]>(initialItems);
  const { toast } = useToast();
  const totalWeight = calculateTotalWeight(items, unit);

  useEffect(() => {
    if (totalWeight > weightLimit) {
      toast({
        title: "Weight Limit Exceeded",
        description: `Your total weight (${totalWeight.toFixed(1)} ${unit}) exceeds the limit of ${weightLimit} ${unit}`,
        variant: "destructive",
      });
    }
  }, [totalWeight, weightLimit, unit, toast]);

  const handleQuantityChange = (itemId: string, delta: number) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, (item.quantity || 1) + delta);
        const weightDifference = item.weight * delta;
        const newTotalWeight = totalWeight + weightDifference;
        
        if (newTotalWeight > weightLimit) {
          toast({
            title: "Weight Limit Warning",
            description: "This change would exceed your weight limit",
            variant: "destructive",
          });
          return item;
        }
        
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    const itemToRemove = items.find(item => item.id === itemId);
    if (itemToRemove?.category === 'essential') {
      toast({
        title: "Cannot Remove Essential Item",
        description: "Essential items cannot be removed from the packing list",
        variant: "destructive",
      });
      return;
    }
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto space-y-6 card-glass">
      <h2 className="text-2xl font-bold text-center">Review Packing List</h2>

      <WeightIndicator
        currentWeight={totalWeight}
        weightLimit={weightLimit}
        unit={unit}
      />

      <div className="space-y-4">
        {["essential", "weather", "activity"].map(category => {
          const categoryItems = items.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              <h3 className="font-semibold capitalize bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {category} Items
              </h3>
              <div className="space-y-2">
                {categoryItems.map(item => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 rounded-lg card-glass"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {(item.weight * (item.quantity || 1)).toFixed(1)} {unit}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="hover:border-primary/50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="hover:border-primary/50"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        {item.category !== 'essential' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="hover:border-primary/50"
        >
          Back to Activities
        </Button>
        <Button 
          onClick={() => onNext(items)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Finalize Packing List
        </Button>
      </div>
    </Card>
  );
};

export default PackingListReview;
