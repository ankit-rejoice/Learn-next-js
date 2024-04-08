import { NextRequest, NextResponse } from "next/server";
import { useSelector } from "react-redux";

const protectedRoutes = ["/", "/home"];
export default function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;

  console.log("currentUser",currentUser)
}
