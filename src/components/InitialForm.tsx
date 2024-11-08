import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { EssentialItem, TravelDetails } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";
import EssentialItemForm from "./essentials/EssentialItemForm";

interface InitialFormProps {
  onSubmit: (details: TravelDetails) => void;
}

const InitialForm = ({ onSubmit }: InitialFormProps) => {
  const [weightLimit, setWeightLimit] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [essentials, setEssentials] = useState<EssentialItem[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limit = parseFloat(weightLimit);
    
    if (!destination || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all travel details",
        variant: "destructive",
      });
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast({
        title: "Invalid Dates",
        description: "Start date must be before end date",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      weightLimit: limit,
      unit,
      essentials,
      destination,
      startDate,
      endDate,
    });
  };

  return (
    <Card className="p-6 max-w-md mx-auto space-y-6 animate-slideIn">
      <h2 className="text-2xl font-bold text-center text-primary">Welcome to Travel Buddy</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="destination">Destination City</Label>
          <Input
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination city"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

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
          <EssentialItemForm 
            unit={unit} 
            onAdd={(item) => setEssentials([...essentials, item])} 
          />

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