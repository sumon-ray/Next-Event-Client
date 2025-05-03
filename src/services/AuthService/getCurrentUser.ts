"use client";

import { IUser } from "@/app/types";
import { jwtDecode } from "jwt-decode";

// get current user
export const getCurrentUser = async () => {
  const accessToken = await localStorage.getItem("accessToken");
  if (accessToken) {
    const decodedData = jwtDecode<IUser>(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

// LogOut
export const logOut = () => {
  localStorage.removeItem("accessToken");
};
