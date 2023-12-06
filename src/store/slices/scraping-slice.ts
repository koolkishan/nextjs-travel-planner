import { StateCreator } from "zustand";

export interface ScrapingSlice {
  isScraping: boolean;
  setScraping: (isScraping: boolean) => void;
  scrapingType: "hotel" | "flight" | undefined;
  setScrapingType: (scrapingType: "hotel" | "flight" | undefined) => void;
}

export const createScrapingSlice: StateCreator<ScrapingSlice> = (set, get) => ({
  isScraping: false,
  setScraping: (isScraping) => set({ isScraping }),
  scrapingType: undefined,
  setScrapingType: (scrapingType) => set({ scrapingType }),
});
