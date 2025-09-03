import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   console.log("token check", token?.role);

//   if (!token || token?.role !== "admin") {
//     console.log("you are not admin");
//     // return NextResponse.redirect(new URL("/login", req.url));
//   }
  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|login).*)"],
};
