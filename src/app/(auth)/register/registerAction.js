// registerAction.js
import axios from "axios";
import { BASE_URL } from "@/api/url";

export const registerAction = async (data) => {
  try {
    const response = await axios.post(BASE_URL + "register", data, {
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
