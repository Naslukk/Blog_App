import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/signup"];

const PROTECTED_ROUTES = [
    "/home",
  "/profile",
  "/dashboard",
  "/create-blog",
  "/settings",
];

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;

  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // User is NOT logged in
  if (!sessionToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User IS logged in
  if (sessionToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/home/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/create-blog/:path*",
    "/settings/:path*",
  ],
};