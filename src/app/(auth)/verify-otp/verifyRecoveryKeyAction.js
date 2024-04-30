"use client";
import axios from "axios";
import { BASE_URL } from "@/api/url";

export const verifyRecoveryKeyAction = async (data) => {
  console.log("verifyRecoveryKeyAction called");
  try {
    const response = await axios.post(BASE_URL + "verify-recover-key", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data.message || error.message;
    } else {
      return "An error occurred.";
    }
  }
};
