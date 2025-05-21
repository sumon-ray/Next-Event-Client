"use server";

import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const getMeta = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const response = await fetch(`${baseUrl}/meta/all-meta-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken || "",
      },
      credentials: "include",
      next: { tags: ["META"]},
    });
    const data = await response.json();
    

    return data;
  } catch (error) {
    console.log("🚀 ~ getMeta ~ error:", error);
  }
};