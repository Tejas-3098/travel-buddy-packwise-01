import { Input } from "@/components/ui/input";

interface WeightInputProps {
  value: string;
  unit: "kg" | "lb";
  onChange: (value: string) => void;
}

const WeightInput = ({ value, unit, onChange }: WeightInputProps) => {
  return (
    <div className="relative w-32">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Weight`}
        className="pr-12 w-full"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        {unit}
      </span>
    </div>
  );
};

export default WeightInput;