import { NextRequest, NextResponse } from "next/server";
import { getCookies } from "next-client-cookies/server";

const protectedRoutes = ["/home"];
const authRoutes = ["/login"];
export default function middleware(request) {
  const cookies = getCookies();
  const currentUser = cookies.get("currUser");

  if (!currentUser && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absolutePath = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absolutePath.toString());
  }
  if (currentUser && authRoutes.includes(request.nextUrl.pathname)) {
    const absolutePath = new URL("/home", request.nextUrl.origin);
    return NextResponse.redirect(absolutePath.toString());
  }

  if (currentUser && request.nextUrl.pathname === "/") {
    const absolutePath = new URL("/home", request.nextUrl.origin);
    return NextResponse.redirect(absolutePath.toString());
  }

  // if (!currentUser && request.nextUrl.pathname === "/") {
  //   const absolutePath = new URL("/", request.nextUrl.origin);
  //   return NextResponse.redirect(absolutePath.toString());
  // }
}
