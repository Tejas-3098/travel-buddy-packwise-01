import { useState } from "react";
import InitialForm from "@/components/InitialForm";
import ActivitySelection from "@/components/ActivitySelection";
import WeatherSuggestions from "@/components/WeatherSuggestions";
import PackingListReview from "@/components/PackingListReview";
import CompletionPage from "@/components/CompletionPage";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const navigate = useNavigate();

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
        return <InitialForm onNext={(data) => {
          setFormData(data);
          setCurrentStep(2);
        }} formData={formData} />;
      case 2:
        return <ActivitySelection onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />;
      case 3:
        return <WeatherSuggestions onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} destination={formData.destination} />;
      case 4:
        return <PackingListReview onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />;
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