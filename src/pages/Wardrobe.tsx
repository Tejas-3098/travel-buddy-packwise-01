import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import WeightIndicator from "@/components/WeightIndicator";
import { PackingItem } from "@/types/types";
import { calculateTotalWeight } from "@/utils/calculations";
import { useToast } from "@/components/ui/use-toast";

const defaultClothes: PackingItem[] = [
  { id: "1", name: "T-Shirt", weight: 0.2, category: "activity", type: "top", unit: "kg", packed: false, quantity: 0 },
  { id: "2", name: "Jeans", weight: 0.5, category: "activity", type: "bottom", unit: "kg", packed: false, quantity: 0 },
  { id: "3", name: "Dress", weight: 0.3, category: "activity", type: "dress", unit: "kg", packed: false, quantity: 0 },
  { id: "4", name: "Sneakers", weight: 0.7, category: "activity", type: "shoes", unit: "kg", packed: false, quantity: 0 },
  { id: "5", name: "Blouse", weight: 0.25, category: "activity", type: "top", unit: "kg", packed: false, quantity: 0 },
  { id: "6", name: "Skirt", weight: 0.35, category: "activity", type: "bottom", unit: "kg", packed: false, quantity: 0 },
  { id: "7", name: "Sandals", weight: 0.4, category: "activity", type: "shoes", unit: "kg", packed: false, quantity: 0 },
];

const Wardrobe = () => {
  const [clothes, setClothes] = useState(defaultClothes);
  const [selectedItems, setSelectedItems] = useState<PackingItem[]>([]);
  const { toast } = useToast();
  const weightLimit = 20; // Example weight limit
  const unit = "kg";

  const handleQuantityChange = (itemId: string, delta: number) => {
    setClothes(prevClothes => prevClothes.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, (item.quantity || 0) + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleAddToBag = (item: PackingItem) => {
    if (item.quantity === 0) {
      toast({
        title: "Cannot add item",
        description: "Please select a quantity greater than 0",
        variant: "destructive",
      });
      return;
    }

    const newTotalWeight = calculateTotalWeight([...selectedItems, item], unit);
    if (newTotalWeight > weightLimit) {
      toast({
        title: "Weight limit exceeded",
        description: "Adding this item would exceed the weight limit",
        variant: "destructive",
      });
      return;
    }

    setSelectedItems(prev => [...prev, { ...item }]);
    setClothes(prev => prev.map(clothingItem => 
      clothingItem.id === item.id ? { ...clothingItem, quantity: 0 } : clothingItem
    ));

    toast({
      title: "Item added",
      description: `${item.name} added to your packing list`,
    });
  };

  const renderClothingSection = (type: string) => {
    const typeItems = clothes.filter(item => item.type === type);
    if (typeItems.length === 0) return null;

    return (
      <div key={type} className="space-y-2">
        <h3 className="font-semibold capitalize">{type}s</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {typeItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span>{item.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {(item.weight * (item.quantity || 0)).toFixed(1)} {unit}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{item.quantity || 0}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleAddToBag(item)}
                    className="ml-2"
                  >
                    Add to Bag
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-8">
      <Card className="p-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">Wardrobe</h2>

        <WeightIndicator
          currentWeight={calculateTotalWeight(selectedItems, unit)}
          weightLimit={weightLimit}
          unit={unit}
        />

        <div className="space-y-6">
          {["top", "bottom", "dress", "shoes"].map(renderClothingSection)}
        </div>

        <div className="pt-4">
          <h3 className="font-semibold mb-2">Selected Items ({selectedItems.length})</h3>
          <div className="space-y-2">
            {selectedItems.map(item => (
              <div key={`${item.id}-${Date.now()}`} className="p-2 bg-gray-50 rounded flex justify-between">
                <span>{item.name}</span>
                <span>{item.quantity}x ({(item.weight * item.quantity).toFixed(1)} {unit})</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Wardrobe;