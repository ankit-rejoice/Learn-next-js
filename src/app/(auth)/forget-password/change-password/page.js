"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { forgotPassword } from "@/provider/redux/slices/authSlice";

export default () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: email,
      otp: "",
      NewPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      otp: Yup.string().required("OTP  is required"),
      NewPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));

      dispatch(forgotPassword(values)).then((res) => {
        if (res?.payload?.message === "Password reset successfully") {
          router.push(`/login?email=${values?.email}`);
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
                Change Password
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
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="eamil"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    placeholder="Enter Your Email"
                    required=""
                    disabled
                    value={validation.values.email}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                  />
                  {validation.errors.oldpassword &&
                  validation.touched.oldpassword ? (
                    <div className="text-red-500">
                      {validation.errors.oldpassword}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    id="otp"
                    placeholder="Enter OTP"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    required=""
                    value={validation.values.otp}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                  />
                  {validation.errors.otp && validation.touched.otp ? (
                    <div className="text-red-500">{validation.errors.otp}</div>
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
                    name="NewPassword"
                    id="NewPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    required=""
                    value={validation.values.NewPassword}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                  />
                  {validation.errors.NewPassword &&
                  validation.touched.NewPassword ? (
                    <div className="text-red-500">
                      {validation.errors.NewPassword}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
