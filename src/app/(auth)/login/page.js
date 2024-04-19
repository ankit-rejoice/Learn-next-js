"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { logIn } from "@/provider/redux/slices/authSlice";

import { useCookies } from "next-client-cookies";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  const dispatch = useDispatch();
  const cookies = useCookies();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email,
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(logIn(values)).then((res) => {
        if (res?.payload?.id) {
          toast.success("Login Successful");
          cookies.set("currUser", JSON.stringify(res.payload));
          router.push("/home");
        } else if (res?.payload?.data?.auth_2fa) {
          toast.success("Verify OTP");
          router.push(`/verify-otp?user_id=${res?.payload?.data?.id}`);
        }
      });
    },
  });

  return (
    <>
      <section className="bg-gray-50 :bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={validation.handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    value={validation.values.email}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                  />
                  {validation.errors.email && validation.touched.email ? (
                    <div className="text-red-500">
                      {validation.errors.email}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    required=""
                    value={validation.values.password}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                  />
                  {validation.errors.password && validation.touched.password ? (
                    <div className="text-red-500">
                      {validation.errors.password}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-gray-500 :text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="text-sm font-light text-gray-500 :text-gray-400">
                  Forget Password ?{" "}
                  <Link
                    href="/forget-password/send-otp"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Click Here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
