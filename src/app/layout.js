import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/redux/ReduxProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CookiesProvider } from "next-client-cookies/server";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <CookiesProvider>
        <html lang="en">
          <head>
          {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" /> */}
          </head>
          <body className={inter.className}>
            <Navbar />
            {children}
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script> */}
          </body>
        </html>
      </CookiesProvider>
    </ReduxProvider>
  );
}
