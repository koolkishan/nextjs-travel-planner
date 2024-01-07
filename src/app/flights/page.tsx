"use client";
import { apiClient } from "@/lib";
import { useAppStore } from "@/store";
import { USER_API_ROUTES } from "@/utils";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineFlight } from "react-icons/md";

const Flights = () => {
  const router = useRouter();
  const getRandomNumber = () => Math.floor(Math.random() * 41);
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const { scrapedFlights, userInfo } = useAppStore();

  const bookFlight = async (flightId: number) => {
    const isoDate = date
      ? new Date(date).toISOString()
      : new Date().toISOString();

    const response = await apiClient.post(USER_API_ROUTES.CREATE_BOOKING, {
      bookingId: flightId,
      bookingType: "flights",
      userId: userInfo?.id,
      taxes: 30,
      date: isoDate,
    });

    if (response.data.client_secret) {
      router.push(`/checkout?client_secret=${response.data.client_secret}`);
    }
  };
  return (
    <div className="m-10 px-[20vw] min-h-[80vh]">
      <Button
        className="my-5"
        variant="shadow"
        color="primary"
        size="lg"
        onClick={() => router.push("/search-flights")}
      >
        <FaChevronLeft />
        Go Back
      </Button>
      <div className=" flex-col flex gap-5">
        {scrapedFlights.length === 0 && (
          <div className="flex items-center justify-center mt-10   py-5 px-10 rounded-lg text-red-500 bg-red-100 font-medium">
            No Flights Found
          </div>
        )}
        {scrapedFlights.map((flight) => {
          const seatsLeft = getRandomNumber();
          return (
            <div
              key={flight.id}
              className="grid grid-cols-12  border border-gray-200 rounded-xl font-medium drop-shadow-md"
            >
              <div className="col-span-9 bg-white rounded-l-xl p-10 flex flex-col gap-5">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col gap-3 font-medium">
                    <div>
                      <div className="relative w-20 h-16">
                        <Image src={flight.logo} alt="airline name" fill />
                      </div>
                    </div>
                    <div>{flight.name}</div>
                  </div>
                  <div className="col-span-3 flex justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="text-blue-600">From</div>
                      <div>
                        <span className="text-3xl">
                          <strong>{flight.departureTime}</strong>
                        </span>
                      </div>
                      <div>{flight.from}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 ">
                      <div className="bg-violet-100 w-max p-3 text-4xl text-blue-600 rounded-full">
                        <MdOutlineFlight />
                      </div>
                      <div className="">
                        <span className="text-lg">
                          <strong>Non-stop</strong>
                        </span>
                      </div>
                      <div>{flight.duration}</div>
                    </div>
                    <div className="flex flex-col h-full gap-1">
                      <div className="text-blue-600">To</div>
                      <div>
                        <span className="text-3xl">
                          <strong>{flight.arrivalTime}</strong>
                        </span>
                      </div>
                      <div>{flight.to}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-10 bg-violet-100 p-3 rounded-lg">
                  <div className="flex">
                    <span>Airplane:&nbsp;&nbsp;</span>
                    <span className="text-blue-600 font-semibold">
                      Boeing 787
                    </span>
                  </div>
                  <div className="flex">
                    <span>Travel Class:&nbsp;&nbsp;</span>
                    <span className="text-green-500 font-semibold">
                      Economy
                    </span>
                  </div>
                </div>
                <div className="flex justify-between font-medium">
                  <div>
                    Refundable <span className="text-blue-600"> $5 ecash</span>
                  </div>
                  <div
                    className={`${
                      seatsLeft > 20 ? "text-green-500 " : "text-red-500"
                    }`}
                  >
                    Only {seatsLeft} Seats Left
                  </div>
                  <div className="cursor-pointer">Flight Details</div>
                </div>
              </div>
              <div className="bg-violet-100 rounded-r-xl h-full flex flex-col items-center justify-center gap-5 col-span-3">
                <div>
                  <div>
                    <span className="line-through font-light">
                      ${flight.price + 140}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-5xl font-bold">${flight.price}</span>
                    <span className="text-blue-600">20% OFF</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  radius="full"
                  size="lg"
                  color="primary"
                  onClick={() => {
                    if (userInfo) bookFlight(flight.id);
                  }}
                >
                  {userInfo ? "Book Now" : "Login to Book"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flights;
