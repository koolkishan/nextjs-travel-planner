import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51DpVXWGc9EcLzRLBNKni929hB026lACv6toMfjH1FPtIXfYgIrhXzjolcYzDDl2VwtvmyPF20PJ1JaMUCTNoEwDN00FN8hrRZL"
);

export async function POST(request: Request) {
  try {
    const { bookingId, bookingType, userId, taxes, date } =
      await request.json();

    let bookingDetails;
    switch (bookingType) {
      case "trips":
        bookingDetails = await prisma.trips.findUnique({
          where: { id: bookingId },
        });
        break;
      case "hotels":
        bookingDetails = await prisma.hotels.findUnique({
          where: { id: parseInt(bookingId) },
        });
        break;
      case "flights":
        bookingDetails = await prisma.flights.findUnique({
          where: { id: parseInt(bookingId) },
        });
        break;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: bookingDetails.price + taxes,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const response = await prisma.bookings.create({
      data: {
        bookingType,
        bookingTypeId: bookingId.toString(),
        user: { connect: { id: userId } },
        paymentIntent: paymentIntent.id,
        totalAmount: bookingDetails?.price + taxes,
        date,
      },
    });

    return NextResponse.json(
      {
        client_secret: paymentIntent.client_secret,
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

export async function PATCH(request: Request) {
  try {
    const { paymentIntent } = await request.json();

    if (paymentIntent) {
      const response = await prisma.bookings.update({
        where: { paymentIntent },
        data: {
          isCompleted: true,
        },
      });
      return NextResponse.json(
        {
          status: "Payment Successfull.",
        },
        { status: 200 }
      );
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
