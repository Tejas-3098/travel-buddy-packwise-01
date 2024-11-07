import { useState } from "react";
import InitialForm from "@/components/InitialForm";
import ActivitySelection from "@/components/ActivitySelection";
import PackingListReview from "@/components/PackingListReview";
import FinalPackingList from "@/components/FinalPackingList";
import { PackingItem, TravelDetails } from "@/types/types";

type Step = "initial" | "activities" | "review" | "final";

const Index = () => {
  const [step, setStep] = useState<Step>("initial");
  const [travelDetails, setTravelDetails] = useState<TravelDetails | null>(null);
  const [selectedItems, setSelectedItems] = useState<PackingItem[]>([]);

  const handleInitialSubmit = (details: TravelDetails) => {
    setTravelDetails(details);
    setStep("activities");
  };

  const handleActivitySubmit = (items: PackingItem[]) => {
    setSelectedItems(items);
    setStep("review");
  };

  const handleReviewSubmit = (items: PackingItem[]) => {
    setSelectedItems(items);
    setStep("final");
  };

  if (!travelDetails && step !== "initial") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        {step === "initial" && (
          <InitialForm onSubmit={handleInitialSubmit} />
        )}
        {step === "activities" && travelDetails && (
          <ActivitySelection
            travelDetails={travelDetails}
            onNext={handleActivitySubmit}
            onBack={() => setStep("initial")}
          />
        )}
        {step === "review" && travelDetails && (
          <PackingListReview
            items={selectedItems}
            weightLimit={travelDetails.weightLimit}
            unit={travelDetails.unit}
            onNext={handleReviewSubmit}
            onBack={() => setStep("activities")}
          />
        )}
        {step === "final" && (
          <FinalPackingList
            items={selectedItems}
            onBack={() => setStep("review")}
          />
        )}
      </div>
    </div>
  );
};

export default Index;