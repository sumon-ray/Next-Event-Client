/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ReviewFilter } from "@/app/types/userRowProps";
import { cookies } from 'next/headers';
import axios from "axios";



export const createReview = async (reviewData: any) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not found");
    }

    const apiUrl = `${baseUrl}/review`;
    const response = await axios.post(apiUrl, reviewData, {
      headers: {
        Authorization: accessToken,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error("createReview error:", error?.response || error.message);
    throw new Error("Failed to create review");
  }
};


const buildQueryString = (query: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  return params.toString();
};


export const getAllReview = async (filter: ReviewFilter = {}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined.");
    }

    const queryString = buildQueryString(filter);
    const url = `${baseUrl}/review${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getAllReview error:", error);
    return null;
  }
};



export const updateReview = async (id: string, updateData: any) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const apiUrl = `${baseUrl}/review/${id}`;
    const response = await axios.patch(apiUrl, updateData, {
      headers: {
        Authorization: accessToken,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error("updateReview error:", error?.response || error.message);
    throw new Error("Failed to update review");
  }
};

export const ReviewDetails = async (id: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const apiUrl = `${baseUrl}/review/${id}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error: any) {
    console.error("ReviewDetails error:", error?.response || error.message);
    throw new Error("Failed to fetch review details");
  }
};


export const deleteReview = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const apiUrl = `${baseUrl}/review/${id}`;
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: accessToken,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error("deleteReview error:", error?.response || error.message);
    throw new Error("Failed to delete review");
  }
};
