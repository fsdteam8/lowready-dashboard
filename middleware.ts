// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow requests to:
  if (
    pathname.startsWith("/login") || // login page
    pathname.startsWith("/api/auth") || // NextAuth API
    pathname.startsWith("/_next") || // Next.js internals
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ✅ Check if user is logged in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/:path*"],
};
