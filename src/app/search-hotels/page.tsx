"use client";
import ScrapingLoader from "@/components/loaders/scraping-loader";
import { apiClient } from "@/lib";
import { useAppStore } from "@/store";
import { USER_API_ROUTES } from "@/utils";
import { cityAirportCode } from "@/utils/city-airport-codes";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchHotels = () => {
  const { setScrapingType, setScraping } = useAppStore();

  const [loadingJobId, setLoadingJobId] = useState<number | undefined>(
    undefined
  );

  const startScraping = async () => {
    if (selectedCity) {
      const data = await apiClient.get(
        `${USER_API_ROUTES.HOTELS_SCRAPE}?location=${selectedCity}`
      );
      if (data.data.id) {
        setLoadingJobId(data.data.id);
        setScraping(true);
        setScrapingType("hotel");
      }
    }
  };

  const jobIntervalRef = useRef<any>(undefined);

  useEffect(() => {
    if (loadingJobId) {
      const interval = setInterval(() => checkIfJobCompleted(), 3000);
      jobIntervalRef.current = interval;
    }

    return () => {
      if (jobIntervalRef.current) clearInterval(jobIntervalRef.current);
    };
  }, [loadingJobId]);

  const checkIfJobCompleted = async () => {
    try {
      const response = await apiClient.get(
        `${USER_API_ROUTES.HOTELS_SCRAPE_STATUS}?jobId=${loadingJobId}`
      );
      console.log({ response });
      if (response.data.status) {
        // set(response.data.flights);
        clearInterval(jobIntervalRef.current);
        setScraping(false);
        setScrapingType(undefined);
        console.log({ response });
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<undefined | string>(
    undefined
  );

  const searchCities = async (searchQuery: string) => {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=kishan&style=SHORT`
    );
    const parsed = await response.json();
    setCities(
      parsed?.geonames.map((city: { name: string }) => city.name) ?? []
    );
  };

  return (
    <div>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="grid grid-cols-3 items-center justify-center h-[40vh] px-10  w-[50vw] gap-5">
          <Input
            type="text"
            label="Search for a Location"
            onChange={(e) => searchCities(e.target.value)}
          />

          <div className="w-full min-h-[200px] max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-5">
            <Listbox
              aria-label="Actions"
              onAction={(key) => setSelectedCity(key as string)}
            >
              {cities.map((city) => (
                <ListboxItem
                  key={city}
                  color="primary"
                  className="text-primary-500"
                >
                  {city}
                </ListboxItem>
              ))}
            </Listbox>
          </div>

          <button onClick={startScraping}>Search Hotels</button>
        </div>
      </div>
    </div>
  );
};

export default SearchHotels;
