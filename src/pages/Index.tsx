import { useState } from "react";
import InitialForm from "@/components/InitialForm";
import ActivitySelection from "@/components/ActivitySelection";
import WeatherSuggestions from "@/components/WeatherSuggestions";
import PackingListReview from "@/components/PackingListReview";
import CompletionPage from "@/components/CompletionPage";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PackingItem, TravelDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [travelDetails, setTravelDetails] = useState<TravelDetails>({
    destination: "",
    startDate: "",
    endDate: "",
    weightLimit: 0,
    unit: "kg",
    essentials: [],
    weatherItems: []
  });
  const [packingItems, setPackingItems] = useState<PackingItem[]>([]);
  const navigate = useNavigate();

  const fetchWeatherSuggestions = async () => {
    try {
      const response = await fetch(`/api/packing-suggestions?city=${travelDetails.destination}&startDate=${travelDetails.startDate}&endDate=${travelDetails.endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Failed to fetch weather data. Please try again.");
      throw error;
    }
  };

  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ['weather', travelDetails.destination, travelDetails.startDate, travelDetails.endDate],
    queryFn: fetchWeatherSuggestions,
    enabled: currentStep === 2 && !!travelDetails.destination && !!travelDetails.startDate && !!travelDetails.endDate
  });

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/logout");
    } catch (error) {
      toast.error("Error signing out. Please try again.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <InitialForm
            onSubmit={(details: TravelDetails) => {
              setTravelDetails(details);
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <WeatherSuggestions
            weatherItems={weatherData?.itemSuggestions || []}
            selectedItems={packingItems}
            travelDetails={travelDetails}
            onAddItem={(item: PackingItem) => {
              setPackingItems([...packingItems, item]);
            }}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
            isLoading={isWeatherLoading}
            weatherMessage={weatherData?.message}
          />
        );
      case 3:
        return (
          <ActivitySelection
            travelDetails={travelDetails}
            onNext={(items: PackingItem[]) => {
              setPackingItems(items);
              setCurrentStep(4);
            }}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <PackingListReview
            items={packingItems}
            weightLimit={travelDetails.weightLimit}
            unit={travelDetails.unit}
            onNext={(items: PackingItem[]) => {
              setPackingItems(items);
              setCurrentStep(5);
            }}
            onBack={() => setCurrentStep(3)}
          />
        );
      case 5:
        return <CompletionPage onBack={() => setCurrentStep(4)} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
      {renderStep()}
    </div>
  );
};

export default Index;