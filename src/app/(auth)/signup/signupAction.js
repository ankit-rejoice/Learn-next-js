"use server";
const axios = require("axios");

import { BASE_URL } from "@/api/url";
import { redirect } from "next/navigation";

export default async function signupAction(currentState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  let data = JSON.stringify({
    email: email,
    password: password,
    username: username,
  });

  let config = {
    method: "post",
    url: BASE_URL + "register",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let res;
  try {
    res = await axios.request(config);
    // Check if the response status is not in the 2xx range (indicating an error)
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    // If the request fails or the response status is not in the 2xx range, handle the error
    console.error("Error:", error);
    if (error.response && error.response.data) {
      // If the error response contains data, return the error message from the backend
      return error.response.data.message || error.message;
    } else {
      // Otherwise, return a generic error message
      return "An error occurred.";
    }
  }

  if (res.status === 200) {
    redirect("/login");
  }
}
