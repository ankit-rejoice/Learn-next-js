"use client";

import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { verifyOTP } from "@/provider/redux/slices/authSlice";

function VerifyEmailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = useCookies();

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const key = searchParams.get("key") || "";
  const type = searchParams.get("type") || "";

  const [header, payload, signature] = token.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  console.log(decodedPayload);

  useEffect(() => {
    const data = {
      email_token: token,
      otp: parseInt(key),
    };

    dispatch(verifyOTP(data)).then((res) => {
      console.log("res==>", res.payload);

      if (
        res.payload === "User verified successfully" ||
        res.payload === "User already verified!"
      ) {
        // router.push(`/login?email=${decodedPayload?.email}`);
      } else {
        // router.push(`/forget-password/send-otp?email=${decodedPayload?.email}`);
      }
      router.push(`/forget-password/send-otp?email=${decodedPayload?.email}`);
    });
  }, []);
  return <div>VerifyEmailPage</div>;
}

export default VerifyEmailPage;
