"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { registerAction } from "./registerAction";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: "ankit",
      email: "ankit271.rejoice@gamil.com",
      password: "123456",
      confirm_password: "123456",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await registerAction(values);
        console.log("res", res);

        if (res && res.status === 200) {
          // router.push("/login");
          setIsRegister(true)
          toast.success(res?.data?.message);
        } else {
          toast.error(res || "An error occurred");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred");
      }
    },
  });
  return (
    <>
      <section className="bg-gray-50 :bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
            {!isRegister ? (
              <>
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
                    Sign Up
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={validation.handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                      >
                        Enter UserName
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                        value={validation.values.username}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                      />
                      {validation.errors.username &&
                      validation.touched.username ? (
                        <div className="text-red-500">
                          {validation.errors.username}
                        </div>
                      ) : null}
                    </div>

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
                      {validation.errors.password &&
                      validation.touched.password ? (
                        <div className="text-red-500">
                          {validation.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
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
                      Sign Up
                    </button>

                    <p className="text-sm font-light text-gray-500 :text-gray-400">
                      Have an account yet?{" "}
                      <Link
                        href="/login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign In
                      </Link>
                    </p>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div
                  className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Note:</strong>
                  <span className="block sm:inline">
                    Please verify your email to complete registration. Check
                    your inbox for further instructions.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
