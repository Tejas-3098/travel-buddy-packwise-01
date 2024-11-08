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
    <Card className="p-8 max-w-md mx-auto space-y-6 animate-slideIn bg-white/95 backdrop-blur-sm shadow-xl border-t-4 border-t-primary">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Welcome to Travel Buddy
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium">Destination City</Label>
          <Input
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination city"
            className="transition-all hover:border-primary focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="transition-all hover:border-primary focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-sm font-medium">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="transition-all hover:border-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weightLimit" className="text-sm font-medium">Total weight limit</Label>
          <div className="flex gap-2">
            <Input
              id="weightLimit"
              type="number"
              value={weightLimit}
              onChange={(e) => setWeightLimit(e.target.value)}
              placeholder="Enter weight limit"
              className="flex-1 transition-all hover:border-primary focus:border-primary"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "kg" | "lb")}
              className="px-3 py-2 border rounded-md bg-white hover:border-primary focus:border-primary transition-all"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium">Essential Items</Label>
          <EssentialItemForm 
            unit={unit} 
            onAdd={(item) => setEssentials([...essentials, item])} 
          />

          <div className="space-y-2">
            {essentials.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-100 transition-all hover:border-primary">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{item.weight} {item.unit}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEssentials(essentials.filter((i) => i.id !== item.id))}
                    className="hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
          Continue to Activities
        </Button>
      </form>
    </Card>
  );
};

export default InitialForm;