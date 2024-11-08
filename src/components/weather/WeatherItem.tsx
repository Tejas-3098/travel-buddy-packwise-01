import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { PackingItem } from "@/types/types";

interface WeatherItemProps {
  item: PackingItem;
  quantity: number;
  unit: string;
  isAdded: boolean;
  onQuantityChange: (itemId: string, delta: number) => void;
  onAddItem: (item: PackingItem) => void;
  onRemoveItem: (itemId: string) => void;
}

const WeatherItem = ({
  item,
  quantity,
  unit,
  isAdded,
  onQuantityChange,
  onAddItem,
  onRemoveItem,
}: WeatherItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <span className="font-medium">{item.name}</span>
        <p className="text-sm text-gray-600">
          Weight: {(item.weight * quantity).toFixed(1)} {unit}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onQuantityChange(item.id, -1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onQuantityChange(item.id, 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {isAdded ? (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onRemoveItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={() => onAddItem(item)}
            className="min-w-[100px]"
          >
            Add to Bag
          </Button>
        )}
      </div>
    </div>
  );
};

export default WeatherItem;