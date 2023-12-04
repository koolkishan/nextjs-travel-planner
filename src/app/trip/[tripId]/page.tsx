"use client";
import { apiClient } from "@/lib";
import { USER_API_ROUTES } from "@/utils";

import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const Trip = ({ params: { tripId } }: { params: { tripId: string } }) => {
  const [tripData, setTripData] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiClient.get(
          `${USER_API_ROUTES.TRIPDATA}?id=${tripId}`
        );
        setTripData(data.data);
        console.log({ data });
      } catch (err) {
        console.log({ err });
      }
    };

    getData();
  }, [tripId]);

  return (
    <div className="grid grid-cols-3 my-10 gap-10 mx-32">
      <div className="col-span-2 ">
        <div className="bg-white px-5 py-5 rounded-lg flex flex-col gap-10">
          <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200">
            <h1 className="text-3xl">
              <strong className="font-medium">{tripData?.name}</strong>
            </h1>
          </div>
          <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
            <h3 className="text-2xl">
              <strong className="font-medium">Overview</strong>
            </h3>
            <p>{tripData?.description}</p>
          </div>
          <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
            <h3 className="text-2xl">
              <strong className="font-medium">Tour Highlights</strong>
            </h3>
            <ul className="grid grid-cols-4">
              {tripData?.themes.map((theme) => (
                <li className="flex gap-2 items-center">
                  <span className="text-sm ">
                    <FaCheck />
                  </span>
                  <span>{theme}</span>
                </li>
              ))}
              {tripData?.inclusions.map((theme) => (
                <li className="flex gap-2 items-center">
                  <span className="text-sm ">
                    <FaCheck />
                  </span>
                  <span>{theme}</span>
                </li>
              ))}
              <li></li>
            </ul>
          </div>
          <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
            <h3 className="text-2xl">
              <strong className="font-medium">Itinerary</strong>
            </h3>
          </div>
          <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
            <h3 className="text-2xl">
              <strong className="font-medium">Location Overview</strong>
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-white px-5 py-5 rounded-lg flex flex-col gap-10 h-max"></div>
    </div>
  );
};

export default Trip;
