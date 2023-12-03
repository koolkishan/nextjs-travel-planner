import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
// import { scrapingQueue } from "../../../temp/queue";

import { importQueue } from "../../../../lib/queue";

export async function POST(request: Request) {
  try {
    const { url, jobType } = await request.json();
    const response = await prisma.jobs.create({ data: { url, jobType } });
    console.log({ response });
    await importQueue.add("new location", { url, jobType, id: response.id });
    return NextResponse.json(
      {
        jobCreated: true,
      },
      { status: 201 }
    );
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
