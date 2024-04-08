"use client";

import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { logout } from "@/provider/redux/slices/authSlice";

function LogoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = useCookies();

  //   cookies.remove("currUser");
  //         router.push("/login");

  useLayoutEffect(() => {
    dispatch(logout());
    cookies.remove("currUser");
    router.push("/login");  
  }, []);

  return <div>LogoutPage</div>;
}

export default LogoutPage;
