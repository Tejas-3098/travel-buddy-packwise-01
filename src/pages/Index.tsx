import { useState } from "react";
import InitialForm from "@/components/InitialForm";
import { PackingList, EssentialItem } from "@/types/types";

const Index = () => {
  const [packingList, setPackingList] = useState<PackingList | null>(null);

  const handleInitialSubmit = (weightLimit: number, unit: "kg" | "lb", essentials: EssentialItem[]) => {
    setPackingList({
      essentialItems: essentials,
      activities: [],
      totalWeight: 0,
      weightLimit,
      unit,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        {!packingList ? (
          <InitialForm onSubmit={handleInitialSubmit} />
        ) : (
          <div>Activity selection coming in next iteration</div>
        )}
      </div>
    </div>
  );
};

export default Index;