"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import { sendOTP } from "@/provider/redux/slices/authSlice";

export default () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  console.log(email);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: email,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("email is required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      dispatch(sendOTP(values)).then((res) => {
        console.log("res=>", res);
        // router.push(`/forget-password/change-password?email=${values?.email}`);
        if (email) {
          toast.success("Please Check email for varification");
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
              <form
                onSubmit={validation.handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Enter email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    disabled={email !== ""}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    placeholder="cajusec@mailinator.com"
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

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {email ? "Resend Verification Link" : "Submit"}
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
