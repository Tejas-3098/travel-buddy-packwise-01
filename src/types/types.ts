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

export interface PackingItem {
  id: string;
  name: string;
  weight: number;
  unit: "kg" | "lb";
  category: "essential" | "activity" | "weather";
  packed: boolean;
}

export interface PackingList {
  essentialItems: EssentialItem[];
  activities: Activity[];
  totalWeight: number;
  weightLimit: number;
  unit: "kg" | "lb";
}