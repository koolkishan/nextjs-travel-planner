"use server";
import { NextResponse } from "next/server";
import { jwtVerify, decodeJwt } from "jose";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const secret = new TextEncoder().encode(process.env.JWT_KEY as string);
  try {
    if (!request.url.includes("/login")) {
      const token = request.cookies.get("access_token");
      if (token) {
        if (!jwtVerify(token?.value, secret)) {
          return NextResponse.redirect(
            new URL("/login?msg='JWT Expired.'", request.url)
          );
        }
        const { isAdmin } = decodeJwt(token.value);
        if (isAdmin) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(
            new URL("/?msg='Not Admin'", request.url)
          );
        }
      } else {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } else {
      return NextResponse.next();
    }
  } catch (err) {
    if (err instanceof Error && err.name === "JWTExpired") {
      return NextResponse.redirect(
        new URL("/login?msg='Jwt Expired'", request.url)
      );
    }
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
