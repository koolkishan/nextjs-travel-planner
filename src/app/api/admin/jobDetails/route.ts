import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.jobs.findMany({ orderBy: { createdAt: "desc" } });
    const onGoingJobs = await prisma.jobs.findMany({
      where: { isComplete: false },
    });

    return NextResponse.json(
      {
        jobs,
        onGoingJobs: onGoingJobs?.length ?? 0,
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
