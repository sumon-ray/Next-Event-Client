"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import {jwtDecode} from "jwt-decode";
import { toast } from "sonner";




const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL 
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
      `${baseUrl}/user/register`,
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
    toast.error("Registration failed");
  }
};

export const loginUser = async (userData: FieldValues) => {
  console.log(loginUser);
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
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
    toast.error("Registration failed")
    console.error(error);
  }
};


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


export const logOut = async () => {
  (await cookies()).delete("accessToken");
};
