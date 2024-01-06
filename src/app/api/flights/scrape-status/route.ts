import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");
    if (jobId) {
      const isValidJob = await prisma.jobs.findUnique({
        where: { id: parseInt(jobId) },
      });

      if (!isValidJob) {
        return NextResponse.json(
          { message: "Invalid job id.", status: false },
          { status: 400 }
        );
      }
      if (isValidJob.isComplete) {
        const flights = await prisma.flights.findMany({
          where: { jobId: parseInt(jobId) },
        });
        return NextResponse.json(
          { msg: "Job Completed", flights, status: true },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { msg: "Job Incomplete", status: false },
          { status: 200 }
        );
      }
    }
    return NextResponse.json(
      { message: "Job id is required.", status: false },
      { status: 400 }
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
