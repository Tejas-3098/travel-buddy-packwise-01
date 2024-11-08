export interface EssentialItem {
  id: string;
  name: string;
  weight: number;
  unit: "kg" | "lb";
}

export interface Activity {
  id: string;
  name: string;
  items: PackingItem[];
}

export interface PackingItem extends EssentialItem {
  category: "essential" | "activity" | "weather";
  type?: "top" | "bottom" | "shoes" | "accessory";
  packed: boolean;
  quantity: number;
  suggestedQuantity?: number;
  message?: string;  // Added this optional property
}

export interface TravelDetails {
  weightLimit: number;
  unit: "kg" | "lb";
  essentials: EssentialItem[];
  destination: string;
  startDate: string;
  endDate: string;
  weatherItems?: PackingItem[];  // Add this optional property
}

export interface PackingList {
  essentialItems: EssentialItem[];
  activities: Activity[];
  totalWeight: number;
  weightLimit: number;
  unit: "kg" | "lb";
}
