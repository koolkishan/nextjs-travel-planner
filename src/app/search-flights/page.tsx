"use client";
import ScrapingLoader from "@/components/loaders/scraping-loader";
import { apiClient } from "@/lib";
import { useAppStore } from "@/store";
import { USER_API_ROUTES } from "@/utils";
import { Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect } from "react";

const SearchFlights = () => {
  const { setScrapingType, setScraping } = useAppStore();
  const flightData = [
    {
      id: "Boeing 787",
      name: "Delta Air Lines",
      logo: "https://placewisetw.vercel.app/_next/image?url=%2Fimg%2Fbrand-11.png&w=128&q=75",
      from: "New york",
      to: "London",
      departureTime: "12:10 am",
      arrivalTime: "07:30 pm",
      travelClass: "Economy",
      duration: "02h 15 min",
      price: "320",
    },
  ];

  useEffect(() => {
    const getFlightsData = async () => {
      const data = await apiClient.get(
        `${USER_API_ROUTES.FLIGHT_SCRAPE}?source=AMD&destination=BOM&date=2024-01-03`
      );
      console.log({ data });
    };
    getFlightsData();
  }, []);

  const startScraping = () => {
    setScraping(true);
    setScrapingType("hotel");
  };

  return (
    <div>
      {flightData.map((data) => {
        return (
          <div
            key={data.id}
            className="flex items-center justify-center h-[60vh]"
          >
            <button onClick={startScraping}>Start Scraping</button>
            <div className="flex items-center justify-center h-[40vh] px-10 bg-orange-500 w-[50vw] gap-5">
              <Input type="text" placeholder="From" />
              <Input type="text" placeholder="To" />
              <Input type="date" placeholder="Date" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchFlights;
