import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { apiClient } from "@/lib";
import { USER_API_ROUTES } from "@/utils";

const Suggestions = () => {
  const [hotels, setHotels] = useState<
    {
      city: string;
      hotelsForCity: {
        id: number;
        name: string;
        image: string;
        price: number;
        jobId: number;
        location: string;
        scrappedOn: Date;
      }[];
    }[]
  >([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const getUniqueCities = async () => {
      try {
        const response = await apiClient.get(USER_API_ROUTES.GET_CITY_HOTELS);
        setHotels(response.data.hotels);
        setCities(response.data.cities);
        if (response.data.cities.length)
          setSelectedCity(response.data.cities[0]);
      } catch (error) {
        console.log({ error });
      }
    };
    getUniqueCities();
  }, []);

  return (
    <div className="mx-56">
      <h1 className="text-4xl font-bold mb-2">Suggestions for discovery</h1>
      <p className="text-lg font-medium mb-5 text-gray-500">
        Popular places to recommend for you
      </p>
      <div>
        <div className="flex justify-between">
          <ul className="flex gap-5 mb-5">
            {cities.map((city) => (
              <li key={city}>
                <Button
                  color="secondary"
                  variant={selectedCity === city ? "solid" : "ghost"}
                  className="capitalize"
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="ghost" color="danger">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-x-10 gap-y-10 mb-10">
          {selectedCity &&
            hotels
              .filter((hotel) => hotel.city === selectedCity)
              .flatMap((hotel) =>
                hotel.hotelsForCity.map((cityHotel) => (
                  <div
                    key={cityHotel.id}
                    className="flex flex-col items-center justify-center cursor-pointer shadow-md rounded-2xl p-4 border border-neutral-200"
                  >
                    <div className="mb-3 relative w-full h-48">
                      <Image
                        src={cityHotel.image}
                        alt="hotel"
                        fill
                        className="rounded-2xl"
                      />
                    </div>
                    <div className="w-full flex flex-col items-start">
                      <h3 className="font-semibold capitalize text-neutral-900 text-base">
                        {cityHotel.name}
                      </h3>
                      <div>
                        <span className="capitalize">{hotel.city}</span>
                      </div>
                      <span className="text-sm text-neutral-500 font-normal">
                        <strong className="text-black">
                          ${cityHotel.price}
                        </strong>{" "}
                        /night
                      </span>
                    </div>
                  </div>
                ))
              )}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
