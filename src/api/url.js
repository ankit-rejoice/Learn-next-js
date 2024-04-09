let url = "";

if (typeof window !== "undefined") {
  url = window.location.href;
}

export let MAIN_URL;
let local = "http://127.0.0.1:8000/";
let prod = "https://4fc0-2405-201-200d-1c68-5450-7636-68a0-cd31.ngrok-free.app/api/v1/";

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
