/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async () => {
  try {
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${baseUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken || "",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }
  
const data= await res.json()

    return data;
  } catch (error: any) {
    console.error("getAllUser error:", error?.message);
    throw new Error("Failed to fetch users");
  }
};

export const deleteUser = async (id: string) => {
  try {
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${baseUrl}/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken || "",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete user: ${res.statusText}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error("deleteUser error:", error?.message);
    throw new Error("Failed to delete user");
  }
};

export const getUserAllReviews = async (userId: string) => {
  try {
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

    const res = await fetch(`${baseUrl}/review/user/${userId}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user reviews: ${res.statusText}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error("getUserAllReviews error:", error?.message);
    throw new Error("Failed to fetch user reviews");
  }
};
