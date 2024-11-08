import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WeightInput from "./WeightInput";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { isWeightValid } from "@/utils/calculations";
import { EssentialItem } from "@/types/types";

interface EssentialItemFormProps {
  unit: "kg" | "lb";
  onAdd: (item: EssentialItem) => void;
}

const EssentialItemForm = ({ unit, onAdd }: EssentialItemFormProps) => {
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

    onAdd({
      id: crypto.randomUUID(),
      name: newItem.name,
      weight,
      unit,
    });
    setNewItem({ name: "", weight: "" });
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        placeholder="Item name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        className="flex-1"
      />
      <WeightInput
        value={newItem.weight}
        unit={unit}
        onChange={(value) => setNewItem({ ...newItem, weight: value })}
      />
      <Button 
        type="button" 
        onClick={handleAddEssential}
        className="whitespace-nowrap px-4"
      >
        Add to Bag
      </Button>
    </div>
  );
};

export default EssentialItemForm;