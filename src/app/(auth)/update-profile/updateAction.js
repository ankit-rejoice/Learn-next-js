"use client";
import axios from "axios";
import { BASE_URL } from "@/api/url";
import authHeader from "@/helpers/jwt-token-access/auth-token-header";

export const updateAction = async (apiData) => {
  const FormData = require("form-data");
  let data = new FormData();
  data.append("username", apiData?.username);
  console.log("updateAction called");
  try {
    const response = await axios.post(BASE_URL + "update-profile", data, {
      headers: authHeader(),
    });

    console.log("response", response);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.data) {
      return error.response.data.message || error.message;
    } else {
      return "An error occurred.";
    }
  }
};

export const updateProfileAction = async (image) => {
  const FormData = require("form-data");

  const formData = new FormData();
  formData.append("pro_dp", image);
  console.log("updateProfileAction");
  try {
    const response = await axios.post(BASE_URL + "update-profile", formData, {
      headers: authHeader(),
    });

    console.log("response", response);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.data) {
      return error.response.data.message || error.message;
    } else {
      return "An error occurred.";
    }
  }
};
