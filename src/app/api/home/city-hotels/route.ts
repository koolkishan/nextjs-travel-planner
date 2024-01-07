import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const maxHotelsPerCity = 8;
    const randomCities = await prisma.hotels.findMany({
      select: {
        location: true,
      },
      distinct: ["location"],
      take: 5, // Limit to 5 random cities
      orderBy: {
        scrappedOn: "desc",
      },
    });

    const citiesArray = randomCities.map((city) => city.location.toLowerCase());

    const hotelsByCities = await Promise.all(
      citiesArray.map(async (city) => {
        const hotelsForCity = await prisma.hotels.findMany({
          where: {
            location: {
              equals: city,
            },
          },
          take: maxHotelsPerCity, // Limit the number of hotels per city
        });
        return { city, hotelsForCity };
      })
    );

    return NextResponse.json({
      hotels: hotelsByCities,
      cities: citiesArray,
    });
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
