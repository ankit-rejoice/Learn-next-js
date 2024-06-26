"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <>
      <
        // className="leading-normal tracking-normal text-white gradient"
        // style={{ fontFamily: "Source Sans Pro, sans-serif" }}
      >
        <div className="pt-24">
          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            {/* Left Col */}
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p className="uppercase tracking-loose w-full">
                What business are you?
              </p>
              <h1 className="my-4 text-5xl font-bold leading-tight">
                Main Hero Message to sell yourself!
              </h1>
              <p className="leading-normal text-2xl mb-8">
                Sub-hero message, not too long and not too short. Make it just
                right!
              </p>
              <button
                onClick={handleLoginClick}
                className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
            {/* Right Col */}
            <div className="w-full md:w-3/5 py-6 text-center">
              <img
                className="w-full md:w-4/5 z-50"
                src="hero.png"
                alt="Hero Image"
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
}
