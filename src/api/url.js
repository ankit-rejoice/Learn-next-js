let url = "";

if (typeof window !== "undefined") {
  url = window.location.href;
}

export let MAIN_URL;
let local = "http://127.0.0.1:8000/";
let prod = "https://7689-2405-201-200d-1c68-2c0d-a7fb-547c-d978.ngrok-free.app/api/v1/";

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
