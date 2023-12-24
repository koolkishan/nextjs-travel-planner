"use client";
import { apiClient } from "@/lib";
import { USER_API_ROUTES } from "@/utils";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

const Trips = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCity = searchParams.get("city");
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(
        `${USER_API_ROUTES.GET_CITY_TRIPS}?city=${searchCity}`
      );
      setTrips(response.data.trips);
      console.log({ response });
    };
    if (searchCity) getData();
  }, [searchCity]);

  return (
    <div className="m-10 px-[20vw] min-h-[80vh]">
      <Button
        className="my-5"
        variant="shadow"
        color="primary"
        size="lg"
        onClick={() => router.push("/")}
      >
        <FaChevronLeft />
        Go Back
      </Button>
      <div className=" flex-col flex gap-5">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="grid grid-cols-9 gap-5 rounded-2xl border border-neutral-300"
          >
            {/* Image */}
            <div className="relative w-full h-48 col-span-2 ">
              <Image
                src={trip.images[0]}
                alt="trip"
                fill
                className="rounded-2xl"
              />
            </div>
            <div
              className="col-span-7 pt-5 pr-5 flex flex-col gap-1
            "
            >
              <h2 className="text-lg font-medium capitalize">
                <span className="line-clamp-1">{trip.name} </span>
              </h2>
              <div>
                <ul>
                  {trip.destinationDetails.map((detail) => (
                    <li>{detail.name}</li>
                  ))}
                </ul>
              </div>
              {/* Location */}

              <div>
                <p className="line-clamp-1">{trip.description}</p>
              </div>
              <div>
                <div>{trip.days}days</div>
                <div>{trip.nights} nights</div>
              </div>

              {/* Activities */}
              <div className="flex justify-between">
                <span>{trip.id}</span>
                <span>
                  <strong>${trip.price}</strong> /person
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
