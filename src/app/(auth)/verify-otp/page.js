"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOTP } from "@/provider/redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  console.log("email: " + email);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      otp: "",
      email: email,
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Otp is required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      dispatch(verifyOTP(values)).then((res) => {
        if (
          res?.payload?.message === "User verified successfully" ||
          res?.payload?.message === "User already verified!"
        ) {
          // router.push(`/login?email=${values?.email}`);
        } else {
          toast.error(res?.payload?.message);
        }
        console.log("res=>", res);
      });
    },
  });
  return (
    <>
      <section className="bg-gray-50 :bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                onSubmit={validation.handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    id="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    placeholder="1234"
                    required=""
                    value={validation.values.otp}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                  />
                  {validation.errors.otp && validation.touched.otp ? (
                    <div className="text-red-500">{validation.errors.otp}</div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
