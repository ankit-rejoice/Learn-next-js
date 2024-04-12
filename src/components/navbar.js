"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { getUserID } from "@/helpers/jwt-token-access/auth-token-header";

import { useCookies } from "next-client-cookies";

function Navbar() {
  const router = useRouter();
  const cookies = useCookies();

  const currUser = cookies.get("currUser");

  const [isLogin, setIsLogin] = useState(cookies.get("currUser"));

  useEffect(() => {
    setIsLogin(currUser);
  }, [currUser]);

  const handleLogoutClick = () => {
    router.push("/logout");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignInClick = () => {
    router.push("/register");
  };

  const logoutOption = { value: "logout", label: "Logout" };
  const dropdownOptions = isLogin ? [logoutOption] : [];

  const dropdownStyles = {
    control: () => ({
      width: "100%",
      cursor: "pointer",
      padding: "10px",
      border: "none",
      borderBottom: "1px solid #d1d5db",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#E5E7EB" : "white",
      color: state.isSelected ? "black" : "#4B5563",
      padding: "10px",
    }),
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Next App
            </span>
          </div>
        </Link>
        <button
          data-collapse-toggle="Navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="Navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="Navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isLogin ? (
              <>
                <li>
                  <Link href="/">
                    <div className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                      Home
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <div className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      About
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <div className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Services
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing">
                    <div className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Pricing
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/update-profile">
                    <div className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Profile
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    onClick={handleLogoutClick}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </div>
                </li>

                {/* {isLogin && (
                <div className="hidden md:block md:w-auto">
                  <Dropdown options={dropdownOptions} onChange={handleLogoutClick} />
                </div>
              )} */}
              </>
            ) : (
              <>
                <li>
                  <div
                    onClick={handleLoginClick}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </div>
                </li>
                <li>
                  <div
                    onClick={handleSignInClick}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    SignIn
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
