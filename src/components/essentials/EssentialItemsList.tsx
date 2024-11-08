import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { EssentialItem } from "@/types/types";

interface EssentialItemsListProps {
  items: EssentialItem[];
  onRemove: (id: string) => void;
}

const EssentialItemsList = ({ items, onRemove }: EssentialItemsListProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span>{item.name}</span>
          <div className="flex items-center gap-2">
            <span>{item.weight} {item.unit}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EssentialItemsList;