/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const trips = await prisma.trips.findMany({
      select: {
        destinationItinerary: true,
        destinationDetails: true,
      },
    });

    // Process the JSON data to get unique cities and corresponding images
    const cities = {};
    trips.forEach((trip) => {
      const itinerary = trip.destinationItinerary;
      const details = trip.destinationDetails;

      itinerary.forEach((destination) => {
        if (!cities[destination.place]) {
          const cityDetails = details.find(
            (detail) => detail.name === destination.place
          );
          cities[destination.place] = {
            trips: 0,
            image: cityDetails ? cityDetails.image : "/home/home-bg.png",
          };
        }
        cities[destination.place].trips += 1;
      });
    });

    // Convert the cities object to an array and limit to 8 unique cities
    const uniqueCitiesArray = Object.keys(cities)
      .slice(0, 8)
      .map((cityName) => ({
        name: cityName,
        ...cities[cityName],
      }));

    return NextResponse.json({ cities: uniqueCitiesArray });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
  return NextResponse.json(
    { message: "An unexpected error occurred." },
    { status: 500 }
  );
}
