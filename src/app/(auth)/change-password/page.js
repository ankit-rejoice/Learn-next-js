"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      oldpassword: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      oldpassword: Yup.string().required("Password is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));

      router.push("/login");
    },
  });
  return (
    <>
      <section class="bg-gray-50 :bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={validation.handleSubmit}
                class="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    for="oldpassword"
                    class="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="oldpassword"
                    id="oldpassword"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    placeholder="••••••••"
                    required=""
                    value={validation.values.oldpassword}
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
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
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
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    required=""
                    value={validation.values.confirm_password}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                  />
                  {validation.errors.confirm_password &&
                  validation.touched.confirm_password ? (
                    <div className="text-red-500">
                      {validation.errors.confirm_password}
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
