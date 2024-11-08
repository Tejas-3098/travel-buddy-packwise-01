import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { isWeightValid } from "@/utils/calculations";
import { EssentialItem } from "@/types/types";

interface EssentialItemInputProps {
  unit: "kg" | "lb";
  onAdd: (item: EssentialItem) => void;
}

const EssentialItemInput = ({ unit, onAdd }: EssentialItemInputProps) => {
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
    <div className="flex gap-2">
      <Input
        placeholder="Item name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Weight"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
          className="w-24"
        />
        <span className="text-sm text-gray-600">{unit}</span>
      </div>
      <Button type="button" onClick={handleAddEssential} size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EssentialItemInput;