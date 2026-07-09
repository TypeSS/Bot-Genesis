import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";

export default async function proxy(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session && req.nextUrl.pathname.startsWith("/dashboard"))
    return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
