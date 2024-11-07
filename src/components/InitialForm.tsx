import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { EssentialItem } from "@/types/types";
import { isWeightValid } from "@/utils/calculations";
import { useToast } from "@/components/ui/use-toast";

interface InitialFormProps {
  onSubmit: (weightLimit: number, unit: "kg" | "lb", essentials: EssentialItem[]) => void;
}

const InitialForm = ({ onSubmit }: InitialFormProps) => {
  const [weightLimit, setWeightLimit] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [essentials, setEssentials] = useState<EssentialItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", weight: "" });
  const { toast } = useToast();

  const handleAddEssential = () => {
    if (!newItem.name || !newItem.weight) {
      toast({
        title: "Error",
        description: "Please fill in both name and weight",
        variant: "destructive",
      });
      return;
    }

    const weight = parseFloat(newItem.weight);
    if (!isWeightValid(weight)) {
      toast({
        title: "Invalid Weight",
        description: "Weight must be between 0 and 100",
        variant: "destructive",
      });
      return;
    }

    setEssentials([
      ...essentials,
      {
        id: crypto.randomUUID(),
        name: newItem.name,
        weight,
        unit,
      },
    ]);
    setNewItem({ name: "", weight: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limit = parseFloat(weightLimit);
    
    if (!isWeightValid(limit)) {
      toast({
        title: "Invalid Weight Limit",
        description: "Weight limit must be between 0 and 100",
        variant: "destructive",
      });
      return;
    }

    onSubmit(limit, unit, essentials);
  };

  return (
    <Card className="p-6 max-w-md mx-auto space-y-6 animate-slideIn">
      <h2 className="text-2xl font-bold text-center text-primary">Welcome to Travel Buddy</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="weightLimit">Total weight limit</Label>
          <div className="flex gap-2">
            <Input
              id="weightLimit"
              type="number"
              value={weightLimit}
              onChange={(e) => setWeightLimit(e.target.value)}
              placeholder="Enter weight limit"
              className="flex-1"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "kg" | "lb")}
              className="px-3 py-2 border rounded-md"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Essential Items</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Weight"
              value={newItem.weight}
              onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
              className="w-24"
            />
            <Button type="button" onClick={handleAddEssential} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {essentials.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>{item.name}</span>
                <div className="flex items-center gap-2">
                  <span>{item.weight} {item.unit}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEssentials(essentials.filter((i) => i.id !== item.id))}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Continue to Activities
        </Button>
      </form>
    </Card>
  );
};

export default InitialForm;