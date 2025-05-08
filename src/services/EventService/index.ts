"use server";
export interface IQuery {
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
      },
      credentials: "include",
      cache: "no-cache",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    // toast.error("Something went wrong from event getAllEvents");
    console.log(error);
  }
};
export const getSingleEvent = async (slug: string) => {
  try {
    const response = await fetch(`${baseUrl}/events/slug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-cache",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
