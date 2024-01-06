import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    const bookings = await prisma.bookings.findMany({
      where: {
        userId: userId,
      },
    });

    // Iterate over each booking to fetch additional details based on bookingType
    for (const booking of bookings) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete booking.paymentIntent;
      switch (booking.bookingType) {
        case "hotels":
          const hotel = await prisma.hotels.findUnique({
            where: { id: parseInt(booking.bookingTypeId) },
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          booking.name = hotel ? hotel.name : null;
          break;
        case "trips":
          const trip = await prisma.trips.findUnique({
            where: { id: booking.bookingTypeId },
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          booking.name = trip ? trip.name : null;
          break;
        case "flights":
          const flight = await prisma.flights.findUnique({
            where: { id: parseInt(booking.bookingTypeId) },
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          booking.name = flight ? flight.name : null;
          break;
        default:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          booking.name = null;
      }
    }

    return NextResponse.json(
      {
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
