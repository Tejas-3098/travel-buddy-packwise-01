import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PackingItem } from "@/types/types";

interface FinalPackingListProps {
  items: PackingItem[];
  onBack: () => void;
  onComplete: () => void;
}

const FinalPackingList = ({ items, onBack, onComplete }: FinalPackingListProps) => {
  const [packedItems, setPackedItems] = useState<Set<string>>(new Set());

  const togglePacked = (itemId: string) => {
    const newPackedItems = new Set(packedItems);
    if (newPackedItems.has(itemId)) {
      newPackedItems.delete(itemId);
    } else {
      newPackedItems.add(itemId);
    }
    setPackedItems(newPackedItems);
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Your Packing List</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {items.map(item => (
          <Card
            key={item.id}
            className={`p-4 cursor-pointer transition-all card-glass ${
              packedItems.has(item.id)
                ? "bg-green-50/90 border-t-green-500"
                : ""
            }`}
            onClick={() => togglePacked(item.id)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-primary">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity || 1}
                </p>
                <p className="text-sm text-muted-foreground">
                  Weight: {item.weight * (item.quantity || 1)} {item.unit}
                </p>
              </div>
              {packedItems.has(item.id) && (
                <Check className="h-5 w-5 text-green-500" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="hover:border-primary/50"
        >
          Back to Review
        </Button>
        <Button 
          onClick={onComplete}
          className="bg-primary hover:bg-primary/90"
        >
          Complete Packing
        </Button>
      </div>
    </div>
  );
};

export default FinalPackingList;