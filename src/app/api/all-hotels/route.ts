import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const hotels = await prisma.hotels.findMany({
      orderBy: { scrappedOn: "desc" },
    });
    console.log({ hotels });
    if (hotels) {
      return NextResponse.json(
        {
          hotels,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ msg: "No hotels found." }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
