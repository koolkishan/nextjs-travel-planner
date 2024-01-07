import { apiClient } from "@/lib";
import { USER_API_ROUTES } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Featured = () => {
  const [cities, setCities] = useState<
    { name: string; image: string; trips: number }[]
  >([]);

  useEffect(() => {
    const getUniqueCities = async () => {
      try {
        const response = await apiClient.get(
          USER_API_ROUTES.GET_UNIQUE_TRIP_CITIES
        );
        setCities(response.data.cities);
      } catch (error) {
        console.log({ error });
      }
    };
    getUniqueCities();
  }, []);

  return (
    <div className="my-[20vh] h-full relative z-30 mx-20 pt-10 text-center">
      <h1 className="text-4xl font-bold mb-2">Featured places to stay</h1>
      <p className="text-lg font-medium mb-5 text-gray-500">
        Popular places to stay that Arklyte recommends for you
      </p>
      <div className="grid grid-cols-4 gap-5 mx-48">
        {cities.map((place) => (
          <div
            className="flex gap-5 border border-gray-200 p-5 cursor-pointer  rounded-3xl shadow-sm justify-center items-center hover:shadow-lg transition-all duration-300"
            key={place.name}
          >
            <div className="relative h-24 w-24">
              <Image
                src={place.image}
                alt="city"
                fill
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1 text-start">
              <h3>
                <strong>{place.name}</strong>
              </h3>
              <p className="text-gray-600">{place.trips} trips found</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
