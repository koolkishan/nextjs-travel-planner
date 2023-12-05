"use client";
import { apiClient } from "@/lib";
import { USER_API_ROUTES } from "@/utils";
import axios from "axios";
import React, { useEffect } from "react";

const SearchFlights = () => {
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

  return (
    <div>
      {flightData.map((data) => {
        return <div key={data.id}></div>;
      })}
    </div>
  );
};

export default SearchFlights;