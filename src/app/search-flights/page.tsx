"use client";
import ScrapingLoader from "@/components/loaders/scraping-loader";
import { apiClient } from "@/lib";
import { useAppStore } from "@/store";
import { USER_API_ROUTES } from "@/utils";
import { cityAirportCode } from "@/utils/city-airport-codes";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchFlights = () => {
  const { setScrapingType, setScraping, setScrappedFlights } = useAppStore();
  const router = useRouter();
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
  const [loadingJobId, setLoadingJobId] = useState<number | undefined>(
    undefined
  );

  const startScraping = async () => {
    if (source && destination && flightDate) {
      const data = await apiClient.get(
        `${USER_API_ROUTES.FLIGHT_SCRAPE}?source=${source}&destination=${destination}&date=${flightDate}`
      );
      if (data.data.id) {
        setLoadingJobId(data.data.id);
        setScraping(true);
        setScrapingType("flight");
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
        `${USER_API_ROUTES.FLIGHT_SCRAPE_STATUS}?jobId=${loadingJobId}`
      );
      console.log({ response });
      if (response.data.status) {
        setScrappedFlights(response.data.flights);

        clearInterval(jobIntervalRef.current);
        setScraping(false);
        setScrapingType(undefined);
        router.push("/flights");
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const [source, setSource] = useState("");
  const [sourceOptions, setSourceOptions] = useState([]);

  const [destination, setDestination] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);

  const [flightDate, setFlightDate] = useState("");
  const [jobInterval, setJobInterval] = useState<any>(undefined);
  const [flights, setFlights] = useState([]);

  const handleSourceChange = (query: string) => {
    const lowercaseQuery = query.toLowerCase();

    const matchingCities = Object.entries(cityAirportCode)
      .filter(([code, city]) => city.toLowerCase().includes(lowercaseQuery))
      .map(([code, city]) => ({ code, city }))
      .splice(0, 5);

    setSourceOptions(matchingCities);
  };

  const handleDestinationChange = (query: string) => {
    const lowercaseQuery = query.toLowerCase();

    const matchingCities = Object.entries(cityAirportCode)
      .filter(([code, city]) => city.toLowerCase().includes(lowercaseQuery))
      .map(([code, city]) => ({ code, city }))
      .splice(0, 5);

    setDestinationOptions(matchingCities);
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="absolute left-0 top-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-hidden overflow-x-hidden">
        <Image src="/flight-search.png" fill alt="Search" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="absolute h-[50vh] w-[60vw] flex flex-col gap-5">
        {flightData.map((data) => {
          return (
            <div
              key={data.id}
              className="flex items-center justify-center h-[60vh]"
            >
              <div className="grid grid-cols-3 items-center justify-center h-[40vh] px-10  w-[50vw] gap-5">
                <div>
                  <Input
                    classNames={{
                      base: "max-w-full sm:max-w-[10rem] h-10",
                      mainWrapper: "h-full",
                      input: "text-small",
                      inputWrapper:
                        "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<FaSearch size={18} />}
                    type="search"
                    onChange={(e) => {
                      setSource(e.target.value);
                      handleSourceChange(e.target.value);
                    }}
                    value={source}
                    onClear={() => setSource("")}
                  />

                  <div className="w-full  h-max max-w-[260px] border-small   rounded-small border-default-200 mt-5">
                    <Listbox
                      aria-label="Actions"
                      onAction={(key) => {
                        setSource(key as string);
                        setSourceOptions([]);
                      }}
                      emptyContent="No results found."
                    >
                      {sourceOptions.map(({ city, code }) => (
                        <ListboxItem
                          key={code}
                          color="primary"
                          className="text-primary-500"
                        >
                          {city}
                        </ListboxItem>
                      ))}
                    </Listbox>
                  </div>
                </div>
                <div>
                  <Input
                    classNames={{
                      base: "max-w-full sm:max-w-[10rem] h-10",
                      mainWrapper: "h-full",
                      input: "text-small",
                      inputWrapper:
                        "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<FaSearch size={18} />}
                    type="search"
                    onChange={(e) => {
                      setDestination(e.target.value);
                      handleDestinationChange(e.target.value);
                    }}
                    value={destination}
                    onClear={() => setDestination("")}
                  />

                  <div className="w-full  h-max max-w-[260px] border-small   rounded-small border-default-200 mt-5">
                    <Listbox
                      aria-label="Actions"
                      onAction={(key) => {
                        setDestination(key as string);
                        setDestinationOptions([]);
                      }}
                      emptyContent="No results found."
                    >
                      {destinationOptions.map(({ city, code }) => (
                        <ListboxItem
                          key={code}
                          color="primary"
                          className="text-primary-500"
                        >
                          {city}
                        </ListboxItem>
                      ))}
                    </Listbox>
                  </div>
                </div>
                <Input
                  type="date"
                  placeholder="Date"
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                />
                <button onClick={startScraping}>Search Flights</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFlights;
