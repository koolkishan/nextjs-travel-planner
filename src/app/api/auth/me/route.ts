import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { decodeJwt, jwtVerify } from "jose";

export async function GET(request: NextRequest) {
  console.log("in me");
  const secret = new TextEncoder().encode(process.env.JWT_KEY as string);
  try {
    const token = request.cookies.get("access_token");
    console.log("in token", token);
    if (token) {
      if (!jwtVerify(token?.value, secret)) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      const { userId, isAdmin } = decodeJwt(token.value);
      console.log({ userId, isAdmin });
      if (!isAdmin) {
        const user = await prisma.user.findUnique({
          where: { id: parseInt(userId as string) },
        });
        if (user) {
          return NextResponse.json(
            {
              userInfo: {
                id: user.id,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
              },
            },
            { status: 200 }
          );
        }
      } else {
        return NextResponse.json({});
      }
    } else {
      return NextResponse.json({});
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
