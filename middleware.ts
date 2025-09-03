export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // Protect everything except API, Next.js internals, favicon, and login page
    "/((?!api|_next/|favicon.ico|login).*)",
  ],
};
