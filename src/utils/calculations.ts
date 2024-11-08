import { EssentialItem, PackingItem } from "@/types/types";

export const convertWeight = (weight: number, from: "kg" | "lb", to: "kg" | "lb"): number => {
  if (from === to) return weight;
  return from === "kg" ? weight * 2.20462 : weight / 2.20462;
};

export const calculateTotalWeight = (items: (EssentialItem | PackingItem)[], unit: "kg" | "lb"): number => {
  return items.reduce((total, item) => {
    const itemWeight = 'quantity' in item ? (item.weight * (item.quantity || 1)) : item.weight;
    const convertedWeight = item.unit === unit ? itemWeight : convertWeight(itemWeight, item.unit, unit);
    return total + convertedWeight;
  }, 0);
};

export const isWeightValid = (weight: number): boolean => {
  return weight >= 0 && weight <= 100;
};