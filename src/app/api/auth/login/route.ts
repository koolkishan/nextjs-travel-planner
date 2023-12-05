import { NextResponse } from "next/server";
import { SHA256 as sha256 } from "crypto-js";
import { SignJWT } from "jose";
import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_KEY as string);
const alg = "HS256";
const createToken = async (email: string, userId: number) => {
  return await new SignJWT({ email, userId })
    .setProtectedHeader({ alg })
    .setExpirationTime("48h")
    .sign(secret);
};

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password is required." },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email, password: sha256(password).toString() },
    });

    if (!user) {
      return NextResponse.json(
        { msg: "Invalid Email or Password" },
        { status: 404 }
      );
    } else {
      cookies().set("access_token", await createToken(user.email, user.id));

      return NextResponse.json(
        {
          access_token: createToken(user.email, user.id),
          userInfo: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            // profilePicture: user.profilePicture,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}