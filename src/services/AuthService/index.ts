"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import {jwtDecode} from "jwt-decode";

import AppError from '../../../../Next-Event-Server-Side/src/app/errors/AppError';
export const registerUser = async (userData: FieldValues) => {
  try {
    const formData = new FormData();
    const { file, ...restData } = userData;

    if (file) {
      formData.append("file", file);
    } else {
      console.warn("⚠️ No file selected to upload.");
    }

    formData.append("data", JSON.stringify(restData));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const userInfo = await res.json();

    return userInfo;
  } catch (error) {
    console.error(error);
    throw new AppError(404,"Registration failed");
  }
};

export const loginUser = async (userData: FieldValues) => {
  console.log(loginUser);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const userInfo = await res.json();
    if (userInfo.success) {
      (await cookies()).set("accessToken", userInfo.data.accessToken);
    }

    return userInfo;
  } catch (error) {
    console.error(error);
  }
};

// get current user
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (accessToken) {
    const decodedData =jwtDecode(accessToken);
    console.log(decodedData)
    return decodedData;
  } else {
    return null;
  }
};

// LogOut
export const logOut = async () => {
  (await cookies()).delete("accessToken");
};
