import { Progress } from "@/components/ui/progress";
import { calculateTotalWeight } from "@/utils/calculations";
import { PackingItem } from "@/types/types";

interface WeightIndicatorProps {
  currentWeight: number;
  weightLimit: number;
  unit: "kg" | "lb";
}

const WeightIndicator = ({ currentWeight, weightLimit, unit }: WeightIndicatorProps) => {
  const percentage = (currentWeight / weightLimit) * 100;
  const isOverweight = currentWeight > weightLimit;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Current Weight: {currentWeight.toFixed(1)} {unit}</span>
        <span>Limit: {weightLimit} {unit}</span>
      </div>
      <Progress
        value={Math.min(percentage, 100)}
        className={`h-2 ${isOverweight ? "bg-red-200" : "bg-blue-200"}`}
      />
      {isOverweight && (
        <p className="text-sm text-red-500">
          Warning: You're {(currentWeight - weightLimit).toFixed(1)} {unit} over your limit!
        </p>
      )}
    </div>
  );
};

export default WeightIndicator;