"use client";

export default function authToken() {
  let currentUser;
  if (typeof window !== "undefined") {
    currentUser = localStorage.getItem("currUser");
    currentUser = JSON.parse(currentUser);
    // return currentUser.accessToken
    return { Authorization: `Bearer ${currentUser.accessToken}` };
  }

  return null;
}

export function getUserID() {
  let currentUser;
  if (typeof window !== "undefined") {
    currentUser = localStorage.getItem("currUser");
    currentUser = JSON.parse(currentUser);
    return currentUser?.id;
  }

  return null;
}
