/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ReviewFilter } from "@/app/types/userRowProps";
import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const buildQueryString = (query: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  return params.toString();
};

export const createReview = async (reviewData: any) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not found");
    }

    const apiUrl = `${baseUrl}/review`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      credentials: 'include',
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create review: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("createReview error:", error?.message);
    throw new Error("Failed to create review");
  }
};

export const getAllReview = async (filter: ReviewFilter = {}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

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

    return await res.json();
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

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const apiUrl = `${baseUrl}/review/${id}`;
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      credentials: 'include',
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update review: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("updateReview error:", error?.message);
    throw new Error("Failed to update review");
  }
};

export const ReviewDetails = async (id: string) => {
  try {
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const apiUrl = `${baseUrl}/review/${id}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch review details... ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("ReviewDetails error:", error?.message);
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

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const apiUrl = `${baseUrl}/review/${id}`;
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: accessToken,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete review... ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("deleteReview error...", error?.message);
    throw new Error("Failed to delete review");
  }
};


export const myAllReviews = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not found");
    }
    console.log("id.....",id)
    const res = await fetch(`${baseUrl}/review/my-review/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    });
    const response = await res.json();
     if (!res.ok) {
      throw new Error(response.message || "Failed to fetch reviews");
    }
    return response.data; 
   } catch (error) {
    console.error("myAllReviews error:", error);
    throw error;
  }
};


export const getReviewsByEvent = async (id: string) => {
  console.log('getReviewsByEvent called with id:', id);

  try {
    
    if (!id || typeof id !== 'string' || id.trim() === '') {
      console.error('Invalid eventId:', id);
      throw new Error('Invalid or missing event ID');
    }
  
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_API_URL is not defined');
      throw new Error('NEXT_PUBLIC_API_URL is not defined');
    }

    const apiUrl = `${baseUrl}/review/events/${encodeURIComponent(id)}`;
    console.log('Fetching reviews from:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error:', response.status, errorText);
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('API response:', JSON.stringify(result, null, 2));

    if (!result.success || !result.data) {
    
      return [];
    }
   
    result.data.forEach((review, index) => {
      console.log(`Review ${index} eventId:`, review.eventId || 'MISSING');
    });

    return result.data || [];
  } catch (error: any) {
    console.error('getReviewsByEvent error:', error.message);
    return [];
  }
};