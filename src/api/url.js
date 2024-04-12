let url = "";

if (typeof window !== "undefined") {
  url = window.location.href;
}

export let MAIN_URL;
let local = "http://127.0.0.1:8000/";
let prod = "http://192.168.29.112:8080/api/v1/";

if (
  url.includes("netlify") ||
  url.includes("localhost") ||
  url.includes("127.0.0.1")
) {
  MAIN_URL = prod;
} else {
  MAIN_URL = prod;
}

export const BASE_URL = MAIN_URL;
