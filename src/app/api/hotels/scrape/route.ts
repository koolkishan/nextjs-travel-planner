import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { importQueue } from "../../../../lib/queue";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");

    const url = "https://www.kayak.co.in/stays";
    const response = await prisma.jobs.create({
      data: { url, jobType: { type: "hotels", location } },
    });

    await importQueue.add("new location", {
      url,
      jobType: { type: "hotels" },
      id: response.id,
      location,
    });

    return NextResponse.json(
      { msg: "Job Running", id: response.id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
