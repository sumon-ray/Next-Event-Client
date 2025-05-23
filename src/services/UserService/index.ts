/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async () => {
  try {
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


    const res = await fetch(`${baseUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      
      },
      credentials: "include",
      cache: "no-cache",
    });

   
  
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
if(!accessToken){
  throw new Error("You are not authorized");
}
    const res = await fetch(`${baseUrl}/user/delete/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: accessToken ,
      },
      credentials: "include",
    });

  

    return await res.json();
  } catch (error: any) {
    console.error("deleteUser error:", error?.message);
   
  }
};
export const blockUser = async (id: string) => {
  try {
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
if(!accessToken){
  throw new Error("You are not authorized");
}
    const res = await fetch(`${baseUrl}/user/block/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: accessToken,
      },
      credentials: "include",
    });

  

    return await res.json();
  } catch (error: any) {
    console.error("Block User error:", error?.message);
   
  }
};


