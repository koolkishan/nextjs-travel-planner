"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Button,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { CurrentlyScrapingTable } from "./components/currently-scraping-table";
import axios from "axios";

const ScrapeTrips = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<undefined | string>(
    undefined
  );
  const [jobs, setJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState(0);

  const searchCities = async (searchQuery: string) => {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=kishan&style=SHORT`
    );
    const parsed = await response.json();
    setCities(
      parsed?.geonames.map((city: { name: string }) => city.name) ?? []
    );
  };

  const startScraping = async () => {
    const response = await fetch("http://localhost:3000/api/admin/createJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url:
          "https://packages.yatra.com/holidays/intl/search.htm?destination=" +
          selectedCity,
        jobType: { type: "location" },
      }),
    });
    console.log({ response });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "http://localhost:3000/api/admin/jobDetails"
      );
      setJobs(data.data.jobs);
      setOngoingJobs(data.data.onGoingJobs);
    };
    const interval = setInterval(() => getData(), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onGoingJobColor = () => {
    if (ongoingJobs <= 5) return "bg-green-500";
    else if (ongoingJobs <= 10) return "bg-orange-500";
    else return "bg-red-500";
  };

  const onGoingJobTextColor = () => {
    if (ongoingJobs <= 5) return "text-green-500";
    else if (ongoingJobs <= 10) return "text-orange-500";
    else return "text-red-500";
  };

  return (
    <section className="m-10 grid grid-cols-3 gap-5">
      <Card className="col-span-2">
        <CardBody>
          <Tabs>
            <Tab key="lcoation" title="Location">
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
            </Tab>
            <Tab key="url" title="URL">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="id" title="ID">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col gap-5 ">
          <div>
            {selectedCity && (
              <h1 className="text-xl">Scrape data for {selectedCity}</h1>
            )}
          </div>
          <Button
            onClick={startScraping}
            size="lg"
            className="w-full"
            color="primary"
          >
            Scrape
          </Button>
        </CardFooter>
      </Card>

      <Card className="min-w-[300px]">
        <CardHeader>Current Queue</CardHeader>
        <CardBody className="flex items-center justify-center">
          <div
            className={`h-52 w-52 ${onGoingJobColor()} rounded-full  flex items-center justify-center`}
          >
            <div className="h-44 w-44 bg-white rounded-full flex items-center justify-center">
              <h4 className={`text-6xl font-bold ${onGoingJobTextColor()}`}>
                {ongoingJobs}
              </h4>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="col-span-3">
        <CurrentlyScrapingTable jobs={jobs} />
      </div>
    </section>
  );
};

export default ScrapeTrips;
