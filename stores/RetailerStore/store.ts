import { persist } from "zustand/middleware";
import { create } from "zustand/react";

const retailers = [
  "albert_heijn",
  "jumbo",
  "aldi",
  "lidl",
  "ekoplaza",
  "plus",
  "poiesz",
  "spar",
  "nettorama",
  "boni",
  "coop",
  "gewoon_coop",
  "mcd",
  "boons_markt",
  "dagwinkel",
  "amazing_oriental",
  "dekamarkt",
  "hoogvliet",
  "vomar",
  "dirk",
] as const;

export type Retailer = (typeof retailers)[number];

export type RetailerStore = {
  selectedRetailers: Retailer[];
  setSelectedRetailers: (retailers: Retailer[]) => void;
};

export const useRetailerStore = create<RetailerStore>()(
  persist(
    (set) => ({
      selectedRetailers: [],
      setSelectedRetailers: (retailers) =>
        set({ selectedRetailers: retailers }),
    }),
    {
      name: "retailers",
    },
  ),
);
