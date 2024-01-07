"use client";
import React, { useEffect, useState } from "react";
import { Metrics } from "./components/metrics";
import { ScrapingChart } from "./components/scraping-chart";
import ScrapingQueue from "@/components/admin/scraping-queue/scraping-queue";
import { apiClient } from "@/lib";
import { ADMIN_API_ROUTES } from "@/utils/api-routes";

const Dashboard = () => {
  const [users, setusers] = useState(0);
  const [trips, setTrips] = useState(0);
  const [flights, setFlights] = useState(0);
  const [hotels, setHotels] = useState(0);
  const [bookings, setBookings] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(ADMIN_API_ROUTES.DASHBOARD_METRICS);
      console.log({ response });
      setusers(response.data.users);
      setTrips(response.data.trips);
      setFlights(response.data.flights);
      setHotels(response.data.hotels);
      setBookings(response.data.bookings);
    };
    getData();
  }, []);
  return (
    <section className="m-10 flex flex-col gap-10 ">
      <section className="grid grid-cols-5 gap-5">
        <Metrics title="Users" value={users} />
        <Metrics title="Trips" value={trips} />
        <Metrics title="Flights" value={flights} />
        <Metrics title="Hotels" value={hotels} />
        <Metrics title="Bookings" value={bookings} />
      </section>
      <section className=" grid grid-cols-6 gap-2">
        <div className="col-span-4">
          <ScrapingChart />
        </div>
        <div className="col-span-2">
          <ScrapingQueue />
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
