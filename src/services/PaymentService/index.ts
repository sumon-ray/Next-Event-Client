"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { IQuery } from "../EventService";

const buildQueryString = (query: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "all") {
      params.append(key, String(value));
    }
  });
  return params.toString();
};

export const makePayment = async (payload: {
  eventId: string;
  method: "Online" | "COD";
}) => {
  try {
    // console.log(payload);
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    // console.log('Access Token:', accessToken);

    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/make-payment`;
    const dataToSend = {
      eventId: payload.eventId,
      method: payload.method,
    };
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    const data = await res.json();
    revalidateTag("MY-PAYMENTS");
    return data;
  } catch (error) {
    console.error("getAllPayment error:", error);
    return null;
  }
};

export const paymentValidate = async (tran_id: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    // console.log('Access Token:', accessToken);

    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/init-payments/check-validate-payment?tran_id=${tran_id}`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    const data = await res.json();
    revalidateTag("MY-PAYMENTS");
    return data;
  } catch (error) {
    console.log(error);
  }
};



export const getAllPayment = async (queryObj: IQuery) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
      const query = new URLSearchParams(
      Object.entries(queryObj)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    ).toString();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments?${query}`, {
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


export const getMyPaymentsHistory = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/my-payments`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
       next: { tags: ["MY-PAYMENTS"] },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getMyPaymentsHistory error:", error);
    return null;
  }
}