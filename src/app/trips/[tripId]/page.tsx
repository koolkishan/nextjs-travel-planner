"use client";
import { apiClient } from "@/lib";
import { USER_API_ROUTES, removeHtmlTags } from "@/utils";

import React, { useEffect, useState } from "react";
import {
  FaCalendar,
  FaCheck,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { IoPerson, IoPricetag } from "react-icons/io5";

import { Images } from "./components/images";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import { Iteniary } from "./components/Iteniary";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { TripType } from "@/types/trip";

const Trip = ({ params: { tripId } }: { params: { tripId: string } }) => {
  const router = useRouter();
  const { userInfo } = useAppStore();
  const [tripData, setTripData] = useState<TripType | undefined>(undefined);

  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiClient.get(
          `${USER_API_ROUTES.TRIPDATA}?id=${tripId}`
        );
        setTripData(data.data);
      } catch (err) {
        console.log({ err });
      }
    };

    getData();
  }, [tripId]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value
      ? new Date(event.target.value)
      : new Date();
    setDate(newDate);
  };

  const bookTrip = async () => {
    const isoDate = date.toISOString();

    const response = await apiClient.post(USER_API_ROUTES.CREATE_BOOKING, {
      bookingId: tripData?.id,
      bookingType: "trips",
      userId: userInfo?.id,
      taxes: 3300,
      date: isoDate,
    });
    if (response.data.client_secret) {
      router.push(`/checkout?client_secret=${response.data.client_secret}`);
    }
  };

  return (
    <div>
      {tripData && (
        <>
          <Images images={tripData?.images} />
          <div className="grid grid-cols-3 my-10 gap-10 mx-32">
            <div className="col-span-2 ">
              <div className="bg-white px-5 py-5 rounded-lg flex flex-col gap-10 text-blue-text-title">
                <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 flex flex-col gap-5">
                  <div className=" border-b-2 border-dotted border-gray-400 flex justify-between w-full pb-5">
                    <h1 className="text-3xl ">
                      <strong className="font-medium">{tripData?.name}</strong>
                    </h1>
                    <ul className="flex  gap-4 text-2xl items-center">
                      <li className="cursor-pointer text-blue-500 bg-blue-100 p-3 rounded-full">
                        <FaFacebook />
                      </li>
                      <li className="cursor-pointer text-blue-500 bg-blue-100 p-3 rounded-full">
                        <FaInstagram />
                      </li>
                      <li className="cursor-pointer text-blue-500 bg-blue-100 p-3 rounded-full">
                        <FaTwitter />
                      </li>
                      <li className="cursor-pointer text-blue-500 bg-blue-100 p-3 rounded-full">
                        <FaWhatsapp />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="grid grid-cols-2 gap-5">
                      <li>
                        <span>Trip ID: </span>
                        <span className="text-blue-500">{tripData.id}</span>
                      </li>
                      <li>
                        <span>Duration: </span>
                        <span className="text-blue-500">
                          {tripData.days} Days, {tripData.nights} Nights
                        </span>
                      </li>
                      <li className="flex gap-4">
                        <span>Locations Covered: </span>
                        <ul className="flex flex-col gap-5 ">
                          {tripData?.destinationItinerary.map((destination) => {
                            return (
                              <li
                                className="flex items-center   w-full text-blue-500"
                                key={destination.place}
                              >
                                <span>{destination.place}</span>
                                <span>
                                  &nbsp;{destination.totalNights} nights
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
                  <h3 className="text-2xl">
                    <strong className="font-medium">Overview</strong>
                  </h3>
                  <p>{removeHtmlTags(tripData?.description)}</p>
                </div>
                <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
                  <h3 className="text-2xl">
                    <strong className="font-medium">Tour Highlights</strong>
                  </h3>
                  <ul className="grid grid-cols-4 gap-5 mt-3">
                    {tripData?.themes.map((theme) => (
                      <li className="flex gap-2 items-center " key={theme}>
                        <span className="text-sm text-blue-500 bg-blue-100 p-2 rounded-full">
                          <FaCheck />
                        </span>
                        <span>{theme}</span>
                      </li>
                    ))}
                    {tripData?.inclusions.map((theme) => (
                      <li className="flex gap-2 items-center" key={theme}>
                        <span className="text-sm text-blue-500 bg-blue-100 p-2 rounded-full">
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
                  <div>
                    <Iteniary data={tripData.detailedIntineary} />
                  </div>
                </div>
                <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
                  <h3 className="text-2xl">
                    <strong className="font-medium">Location Overview</strong>
                  </h3>
                  <div>
                    <Tabs variant="bordered" color="primary">
                      {tripData.destinationDetails.map((city) => (
                        <Tab
                          key={city.name}
                          title={city.name}
                          className="flex gap-5"
                        >
                          <div className="relative h-[200px] w-[20vw]">
                            <Image src={city.image} alt={city.name} fill />
                          </div>
                          <p className="flex-1">{city.description}</p>
                        </Tab>
                      ))}
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white px-5 py-5 rounded-lg flex flex-col gap-10 h-max text-blue-text-title">
              <div className="flex flex-col gap-3 ">
                <h1 className="font-medium text-2xl">Price</h1>
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-2">
                    <IoPricetag className="text-3xl" />
                    <span className="text-2xl">From</span>
                  </div>
                  <span className="text-4xl font-bold ">₹{tripData.price}</span>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Input
                  endContent={<FaCalendar />}
                  placeholder="Check-in Check-out"
                  type="date"
                  onChange={handleDateChange}
                />
                <Input
                  endContent={<IoPerson />}
                  placeholder="Guests"
                  type="number"
                />
              </div>
              <ul className=" flex flex-col gap-2 ">
                <li className="flex justify-between">
                  <span>Base Price</span>
                  <span>₹{tripData.price}</span>
                </li>
                <li className="flex justify-between">
                  <span>State Price</span>
                  <span>₹800</span>
                </li>
                <li className="flex justify-between">
                  <span>Night Charge</span>
                  <span>₹500</span>
                </li>
                <li className="flex justify-between">
                  <span>Convience Fee</span>
                  <span>₹2000</span>
                </li>
                <li className="flex justify-between">
                  <span>Total</span>
                  <span>₹{tripData.price + 3300}</span>
                </li>
              </ul>
              <Button
                color="primary"
                size="lg"
                className="rounded-full"
                onClick={() => {
                  userInfo && bookTrip();
                }}
              >
                {userInfo ? "Book Trip" : "Login to Book Trip"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Trip;
