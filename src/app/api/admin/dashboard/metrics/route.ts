import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.count();
    const hotels = await prisma.hotels.count();
    const trips = await prisma.trips.count();
    const flights = await prisma.flights.count();
    const bookings = await prisma.bookings.count();
    return NextResponse.json(
      {
        users,
        hotels,
        trips,
        flights,
        bookings,
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
