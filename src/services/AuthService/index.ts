"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const formData = new FormData();
    const { file, ...restData } = userData;

    if (file) {
      formData.append("file", file);
    } else {
      console.log("⚠️ No file selected to upload.");
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
  }
};

export const loginUser = async (userData: FieldValues) => {
  // console.log(loginUser);
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



export const ForgetPassword = async (userData: FieldValues) => {
  try {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to send reset link");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

