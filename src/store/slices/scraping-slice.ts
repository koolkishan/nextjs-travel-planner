import { FlightType } from "@/types/flight";
import { HotelType } from "@/types/hotel";
import { StateCreator } from "zustand";

export interface ScrapingSlice {
  isScraping: boolean;
  setScraping: (isScraping: boolean) => void;
  scrapingType: "hotel" | "flight" | undefined;
  setScrapingType: (scrapingType: "hotel" | "flight" | undefined) => void;
  scrapedFlights: FlightType[];
  setScrappedFlights: (scrappedFlights: FlightType[]) => void;
  scrapedHotels: HotelType[];
  setScrappedHotels: (scrappedHotels: HotelType[]) => void;
}

export const createScrapingSlice: StateCreator<ScrapingSlice> = (set) => ({
  isScraping: false,
  setScraping: (isScraping) => set({ isScraping }),
  scrapingType: undefined,
  setScrapingType: (scrapingType) => set({ scrapingType }),
  scrapedFlights: [],
  setScrappedFlights: (scrapedFlights: FlightType[]) => set({ scrapedFlights }),
  scrapedHotels: [],
  setScrappedHotels: (scrapedHotels: HotelType[]) => set({ scrapedHotels }),
});
