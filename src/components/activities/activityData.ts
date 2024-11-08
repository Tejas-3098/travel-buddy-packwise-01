import { Briefcase, Mountain, Backpack, Wind, Waves, Heart, Tent, Camera, Utensils, Snowflake } from "lucide-react";

export const ACTIVITIES = [
  { 
    id: "hiking", 
    name: "Hiking", 
    icon: <Mountain className="h-5 w-5" />,
    items: [
      { id: "boots", name: "Hiking Boots", weight: 1.5, unit: "kg" },
      { id: "backpack", name: "Day Backpack", weight: 0.5, unit: "kg" },
      { id: "poles", name: "Hiking Poles", weight: 0.5, unit: "kg" },
    ]
  },
  { 
    id: "beach", 
    name: "Beach", 
    icon: <Waves className="h-5 w-5" />,
    items: [
      { id: "swimsuit", name: "Swimsuit", weight: 0.2, unit: "kg" },
      { id: "sunscreen", name: "Sunscreen", weight: 0.3, unit: "kg" },
      { id: "beachtowel", name: "Beach Towel", weight: 0.5, unit: "kg" },
    ]
  },
  { 
    id: "formal", 
    name: "Formal Event", 
    icon: <Heart className="h-5 w-5" />,
    items: [
      { id: "suit", name: "Suit/Dress", weight: 1.0, unit: "kg" },
      { id: "shoes", name: "Formal Shoes", weight: 0.8, unit: "kg" },
      { id: "accessories", name: "Accessories", weight: 0.3, unit: "kg" },
    ]
  },
  { 
    id: "business", 
    name: "Business", 
    icon: <Briefcase className="h-5 w-5" />,
    items: [
      { id: "laptop", name: "Laptop & Charger", weight: 2.0, unit: "kg" },
      { id: "documents", name: "Documents", weight: 0.5, unit: "kg" },
      { id: "businessattire", name: "Business Attire", weight: 2.0, unit: "kg" },
    ]
  },
  { 
    id: "backpacking", 
    name: "Backpacking", 
    icon: <Backpack className="h-5 w-5" />,
    items: [
      { id: "sleepingbag", name: "Sleeping Bag", weight: 1.5, unit: "kg" },
      { id: "tent", name: "Lightweight Tent", weight: 2.0, unit: "kg" },
      { id: "cookingkit", name: "Cooking Kit", weight: 0.8, unit: "kg" },
    ]
  },
  { 
    id: "paragliding", 
    name: "Paragliding", 
    icon: <Wind className="h-5 w-5" />,
    items: [
      { id: "helmet", name: "Helmet", weight: 0.8, unit: "kg" },
      { id: "gloves", name: "Gloves", weight: 0.2, unit: "kg" },
      { id: "goggles", name: "Goggles", weight: 0.2, unit: "kg" },
    ]
  },
  { 
    id: "camping", 
    name: "Camping", 
    icon: <Tent className="h-5 w-5" />,
    items: [
      { id: "tent", name: "Tent", weight: 3.0, unit: "kg" },
      { id: "sleepingbag", name: "Sleeping Bag", weight: 1.5, unit: "kg" },
      { id: "flashlight", name: "Flashlight", weight: 0.3, unit: "kg" },
    ]
  },
  { 
    id: "photography", 
    name: "Photography", 
    icon: <Camera className="h-5 w-5" />,
    items: [
      { id: "camera", name: "Camera", weight: 1.5, unit: "kg" },
      { id: "lenses", name: "Extra Lenses", weight: 1.0, unit: "kg" },
      { id: "tripod", name: "Tripod", weight: 1.2, unit: "kg" },
    ]
  },
  { 
    id: "dining", 
    name: "Fine Dining", 
    icon: <Utensils className="h-5 w-5" />,
    items: [
      { id: "formalwear", name: "Formal Wear", weight: 1.0, unit: "kg" },
      { id: "dressshoes", name: "Dress Shoes", weight: 0.8, unit: "kg" },
    ]
  },
  { 
    id: "skiing", 
    name: "Skiing", 
    icon: <Snowflake className="h-5 w-5" />,
    items: [
      { id: "skijacket", name: "Ski Jacket", weight: 2.0, unit: "kg" },
      { id: "skipants", name: "Ski Pants", weight: 1.5, unit: "kg" },
      { id: "thermals", name: "Thermal Wear", weight: 0.5, unit: "kg" },
      { id: "gloves", name: "Ski Gloves", weight: 0.3, unit: "kg" },
    ]
  },
] as const;
