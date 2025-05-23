"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface IQuery {
    page?: number;
    limit?: number;
  searchTerm?: string;
  isFreeOnly?: boolean;
  minFee?: number;
  maxFee?: number;
  eventStatus?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const getAllEvents = async (queryObj: IQuery) => {
      const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const query = new URLSearchParams(
      Object.entries(queryObj)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    ).toString();

    const response = await fetch(`${baseUrl}/events?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken || "",
      },
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("🚀 ~ getAllEvents ~ error:", error);
  }
};
export const getSingleEvent = async (slug: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const response = await fetch(`${baseUrl}/events/slug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken || "",
      },
      credentials: "include",
      next: { tags: ["user-events"]},
    });
    const data = await response.json();
    

    return data;
  } catch (error) {}
};
export const DeleteEvent = async (id: string) => {
  // console.log(id);
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const response = await fetch(`${baseUrl}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken || "",
      },
      credentials: "include",
    });
    const data = await response.json();
    // console.log(data);
    revalidateTag("user-events");
    return data;
  } catch (error) {
    console.log("🚀 ~ DeleteEvent ~ error:", error);
  }
};
export const getEventsOfUser = async () => {
      const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const response = await fetch(`${baseUrl}/events/profile/my-events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken || "",
      },
      credentials: "include",
      next: { tags: ["user-events"]},
    });
    const data = await response.json();
   

    return data.data;
  } catch (error) {
    console.log("🚀 ~ getEventsOfUser ~ error:", error);
  }
};

export const createEvent = async (payload: any) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${baseUrl}/events`, {
      method: "POST",
      body: payload,
      credentials: "include",
      headers: {
        Authorization: accessToken || "",
      },
    });

    const data = await res.json();
    revalidateTag("user-events");
    return data;
  } catch (error) {
    console.log("🚀 ~ createEvent ~ error:", error);
  }
};

export const UpdateEventById = async (id: string, payload: any) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${baseUrl}/events/update/${id}`, {
      method: "PATCH",
      body: payload,
      credentials: "include",
      headers: {
        Authorization: accessToken || "",
      },
    });

    const data = await res.json();
    revalidateTag("user-events");

    return data;
  } catch (error) {
    console.log("🚀 ~ createEvent ~ error:", error);
  }
};
