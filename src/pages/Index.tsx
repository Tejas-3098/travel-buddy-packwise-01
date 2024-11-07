import { useState, useEffect } from "react";
import InitialForm from "@/components/InitialForm";
import ActivitySelection from "@/components/ActivitySelection";
import PackingListReview from "@/components/PackingListReview";
import FinalPackingList from "@/components/FinalPackingList";
import CompletionPage from "@/components/CompletionPage";
import WeatherSuggestions from "@/components/WeatherSuggestions";
import { PackingItem, TravelDetails } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";

type Step = "initial" | "weather" | "activities" | "review" | "final" | "completion";

const Index = () => {
  const [step, setStep] = useState<Step>("initial");
  const [travelDetails, setTravelDetails] = useState<TravelDetails | null>(null);
  const [selectedItems, setSelectedItems] = useState<PackingItem[]>([]);
  const [weatherItems, setWeatherItems] = useState<PackingItem[]>([]);
  const { toast } = useToast();

  const fetchWeatherSuggestions = async (city: string, startDate: string, endDate: string) => {
    try {
      const response = await fetch(`http://localhost:5001/api/packing-suggestions?city=${encodeURIComponent(city)}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather suggestions');
      }
      const data = await response.json();
      
      const items: PackingItem[] = data.itemSuggestions.map((item: any) => ({
        ...item,
        category: "weather",
        packed: false,
        quantity: 1
      }));

      toast({
        title: "Weather Analysis",
        description: data.message,
      });

      return items;
    } catch (error) {
      console.error('Error fetching weather suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch weather-based suggestions. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  const handleInitialSubmit = async (details: TravelDetails) => {
    setTravelDetails(details);
    const items = await fetchWeatherSuggestions(
      details.destination,
      details.startDate,
      details.endDate
    );
    
    setWeatherItems(items);
    setSelectedItems(details.essentials.map(item => ({
      ...item,
      category: "essential" as const,
      packed: false,
      quantity: 1
    })));
    setStep("weather");
  };

  const handleAddWeatherItem = (item: PackingItem) => {
    setSelectedItems(prev => [...prev, item]);
  };

  const handleActivitySubmit = (items: PackingItem[]) => {
    setSelectedItems(items);
    setStep("review");
  };

  const handleReviewSubmit = (items: PackingItem[]) => {
    setSelectedItems(items);
    setStep("final");
  };

  const handleFinalComplete = () => {
    setStep("completion");
  };

  if (!travelDetails && step !== "initial") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Travel Buddy</h1>
          <p className="text-lg text-gray-600 italic">"Pack Smart, Travel Light, Adventure Right"</p>
        </div>

        {step === "initial" && (
          <InitialForm onSubmit={handleInitialSubmit} />
        )}
        {step === "weather" && travelDetails && (
          <WeatherSuggestions
            weatherItems={weatherItems}
            selectedItems={selectedItems}
            travelDetails={travelDetails}
            onAddItem={handleAddWeatherItem}
            onNext={() => setStep("activities")}
            onBack={() => setStep("initial")}
          />
        )}
        {step === "activities" && travelDetails && (
          <ActivitySelection
            travelDetails={travelDetails}
            onNext={handleActivitySubmit}
            onBack={() => setStep("weather")}
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
            onComplete={handleFinalComplete}
          />
        )}
        {step === "completion" && (
          <CompletionPage
            onBack={() => setStep("final")}
          />
        )}
      </div>
    </div>
  );
};

export default Index;