import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

export async function GET() {
  try {
    // Get data for the last 7 days or as per your requirement
    const startDate = startOfDay(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
    );
    const endDate = endOfDay(new Date());

    const hotels = await prisma.hotels.groupBy({
      by: ["scrappedOn"],
      _count: true,
      where: {
        scrappedOn: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const flights = await prisma.flights.groupBy({
      by: ["scrappedOn"],
      _count: true,
      where: {
        scrappedOn: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const trips = await prisma.trips.groupBy({
      by: ["scrapedOn"],
      _count: true,
      where: {
        scrapedOn: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return NextResponse.json(
      {
        hotels,
        trips,
        flights,
      },
      { status: 200 }
    );
  } catch (error) {
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
