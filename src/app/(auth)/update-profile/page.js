"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Verify2FACode,
  activate2FA,
  activeOrdeactivate2FA,
} from "@/provider/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useCookies } from "next-client-cookies";
import { getProfile } from "@/provider/redux/slices/profileSlice";
import authToken, {
  getUserID,
} from "@/helpers/jwt-token-access/auth-token-header";
import QRCodeModal from "@/components/QRCodeModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAction } from "../register/registerAction";
import { updateAction, updateProfileAction } from "./updateAction";
import { BASE_URL } from "@/api/url";

function UpdateProfilePage() {
  const { profile, status } = useSelector((state) => state.profile);

  const router = useRouter();
  const cookies = useCookies();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const [profileData, setProfileData] = useState(profile);
  const [profileImage, setProfileImage] = useState(null);
  // const [data, setData] = useState();

  console.log("profileData", profileData);

  const updateProfileCallback = useCallback(async () => {
    console.log("use callback updateProfileAction");
    if (profileImage) {
      res = await updateProfileAction(profileImage);

      if (res.status === 200) {
        toast.success("Profile Image updated successfully");
      } else {
        toast.error(res);
      }
    }
    setProfileImage(null);
  }, [profileImage]);

  useEffect(() => {
    updateProfileCallback();
  }, [profileImage]);

  useEffect(() => {
    if (!profileData) {
      dispatch(getProfile())
        .then((res) => {
          setProfileData(res?.payload?.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [profileData]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleActivate2FA = (e) => {
    e.preventDefault();
    dispatch(activate2FA()).then((res) => {
      setData(res?.payload?.data);
      openModal();
    });
  };

  const handleDeactivate2FA = (e) => {
    let apiData = {
      user_id: profileData?.id,
      enable_2fa: false,
      secret_key: data?.secret_key,
      recover_key: data?.recover_key,
    };
    dispatch(activeOrdeactivate2FA(apiData)).then((res) => {
      dispatch(getProfile())
        .then((res) => {
          setProfileData(res?.payload?.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    });
  };

  const active2FA = (e) => {
    let apiData = {
      user_id: profileData?.id,
      enable_2fa: true,
      secret_key: data?.secret_key,
      recover_key: data?.recover_key,
    };
    dispatch(activeOrdeactivate2FA(apiData)).then((res) => {
      dispatch(getProfile())
        .then((res) => {
          setProfileData(res?.payload?.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    });
  };

  const ValidateCode = (otp) => {
    let payload = {
      user_id: getUserID(),
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

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profileData?.email || "",
      username: profileData?.username || "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      username: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("values", values);
      const res = await updateAction(values);
      console.log("res", res);
      if (res?.state === 200) {
        toast.success("User Name Upadated Successfully");
      } else {
        toast.error(res);
      }
    },
  });

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <>
      <QRCodeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data}
        ValidateCode={ValidateCode}
      />
      <section className="py-10 my-auto dark:bg-gray-900">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <div>
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                Profile
              </h1>
              <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
                Update Profile
              </h2>

              <div className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
                <div
                  className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${
                      profileData?.image
                        ? BASE_URL.replace("api/v1/","") + profileData?.image
                        : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080"
                    })`,
                  }}
                  //  className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat"
                >
                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                    <input
                      type="file"
                      name="profile"
                      id="upload_profile"
                      hidden
                      required
                      onChange={handleImageChange}
                    />
                    <label htmlFor="upload_profile">
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <input
                    type="file"
                    name="profile"
                    id="upload_cover"
                    hidden
                    required
                  />
                  <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                    <label
                      htmlFor="upload_cover"
                      className="inline-flex items-center gap-1 cursor-pointer"
                    >
                      Cover
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                {profileData?.auth_2fa ? (
                  <>
                    <button
                      onClick={handleDeactivate2FA}
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    >
                      Deactivate 2FA
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleActivate2FA}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    >
                      Activate 2FA
                    </button>
                  </>
                )}
              </h2>
              <form onSubmit={validation.handleSubmit}>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 mt-6">
                    <label
                      htmlFor="firstName"
                      className="mb-2 dark:text-gray-300"
                    >
                      UserName
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="User name"
                      value={validation.values.username}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mt-6">
                    <label htmlFor="lastName" className=" dark:text-gray-300">
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Email"
                      disabled
                      value={validation.values.email}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                    />
                  </div>
                </div>

                <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                  <button type="submit" className="w-full p-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default UpdateProfilePage;
