"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Verify2FACode,
  activeOrdeactivate2FA,
  verifyOTP,
} from "@/provider/redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { verifyRecoveryKeyAction } from "./verifyRecoveryKeyAction";
import QRCodeModal from "@/components/QRCodeModal";

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = useCookies();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const user_id = searchParams.get("user_id");

  const [addRecoveryKey, setAddRecoveryKey] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      otp: "",
      email: email,
      user_id: user_id,
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Otp is required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));

      if (user_id) {
        let payload = {
          user_id: values.user_id,
          otp: values.otp,
          inside_flage: true,
        };

        dispatch(Verify2FACode(payload)).then((res) => {
          if (res?.payload?.message === "Invalid verification code") {
            toast.error("Invalid verification code, please try again");
          } else if (res?.payload?.id) {
            console.log("currUser", res.payload);

            cookies.set("currUser", JSON.stringify(res.payload));
            router.push("/update-profile");

            // dispatch(getProfile());
          }
        });
      } else {
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
      }
    },
  });

  const addRecoveryKeyvalidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      recover_key: "",
      email: email,
      user_id: user_id,
    },
    validationSchema: Yup.object({
      recover_key: Yup.string().required("RecoverY Key is required"),
    }),
    onSubmit: async (values) => {
      console.log(JSON.stringify(values));

      if (user_id) {
        let payload = {
          user_id: values.user_id,
          recover_key: values.recover_key,
        };

        try {
          const res = await verifyRecoveryKeyAction(payload);
          console.log("res", res);

          if (res && res.status === 200) {
            setData({
              base64_image: res?.data?.base64_image,
              id: res?.data?.id,
              message: res?.data?.message,
              secret_key: res?.data?.secret_key,
              recover_key: values.recover_key,
            });
            openModal();
          } else {
            toast.error(res || "An error occurred");
          }
        } catch (error) {
          console.error("An error occurred:", error);
          toast.error("An error occurred");
        }
      }
    },
  });

  const handleAddRecoveryKey = () => {
    setAddRecoveryKey(!addRecoveryKey);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const active2FA = (e) => {
    let apiData = {
      user_id: data?.id,
      enable_2fa: true,
      secret_key: data?.secret_key,
      recover_key: data?.recover_key,
    };
    dispatch(activeOrdeactivate2FA(apiData)).then((res) => {
      console.log("res==>", res);
      toast.success("2FA enabled successfully");
      handleAddRecoveryKey();
    });
  };

  const ValidateCode = (otp) => {
    let payload = {
      user_id: user_id,
      otp: otp,
      inside_flage: false,
      secret_key: data?.secret_key,
      recover_key: data?.recover_key,
    };

    dispatch(Verify2FACode(payload)).then((res) => {
      if (res?.payload?.message === "Invalid verification code") {
        toast.error("Invalid verification code, please try again");
      } else if (res?.payload?.message === "OTP verified successfully") {
        active2FA();
        closeModal();
      } else if (res?.payload?.auth_2fa) {
        cookies.set("currUser", JSON.stringify(res.payload));
        dispatch(getProfile());
        closeModal();
      }
    });
  };
  return (
    <>
      <QRCodeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data}
        ValidateCode={ValidateCode}
      />
      <section className="bg-gray-50 :bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {addRecoveryKey ? (
                <>
                  <form
                    onSubmit={addRecoveryKeyvalidation.handleSubmit}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="recover_key"
                        className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                      >
                        Enter Recovery Key
                      </label>
                      <input
                        type="text"
                        name="recover_key"
                        id="recover_key"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                        placeholder=""
                        required=""
                        value={addRecoveryKeyvalidation.values.recover_key}
                        onBlur={addRecoveryKeyvalidation.handleBlur}
                        onChange={addRecoveryKeyvalidation.handleChange}
                      />
                      {addRecoveryKeyvalidation.errors.recover_key &&
                      addRecoveryKeyvalidation.touched.recover_key ? (
                        <div className="text-red-500">
                          {addRecoveryKeyvalidation.errors.recover_key}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                  </form>
                  <h1 onClick={handleAddRecoveryKey} className="text-blue-600">
                    Verify OTP
                  </h1>
                </>
              ) : (
                <>
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
                        type="text"
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
                        <div className="text-red-500">
                          {validation.errors.otp}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Verify OTP
                    </button>
                  </form>
                  <h1 onClick={handleAddRecoveryKey} className="text-blue-600">
                    Add Recovery Key
                  </h1>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
