import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const trips = await prisma.trips.findMany({
      orderBy: { scrapedOn: "desc" },
    });
    if (trips) {
      return NextResponse.json(
        {
          trips,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ msg: "No trips found." }, { status: 404 });
    }
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
