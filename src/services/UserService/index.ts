/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { IQuery } from "../EventService";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (queryObj?: IQuery) => {
 const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
     let query = "";
    if (queryObj) {
      const params = new URLSearchParams(
        Object.entries(queryObj)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      );
      query = params.toString();
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken || '',
      },
      credentials: 'include',
    });
    // console.log(response);

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    throw error;
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


