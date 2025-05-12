"use server";

import { cookies } from "next/headers";

type TUpdatedUserResponse = {
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    occupation?: string;
    profileImage?: string;
  };
};

export const updateProfile = async (
  formData: FormData
): Promise<TUpdatedUserResponse | null> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("can not get accessToken");
    }

    const userId = formData.get("userId") as string;
    if (!userId) throw new Error("can not get userId");

    const url = `${process.env.NEXT_PUBLIC_API_URL}/profiles/${userId}`;

    const res = await fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Authorization: accessToken,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`fail to update user data: ${res.statusText}`);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("updateProfile logs:", error);
    return null;
  }
};

// get profile Info
export const getProfileInfo = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("can not get accessToken");
  }
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`;

  const res = await fetch(uri, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const profileData = await res.json();
  console.log(profileData);
  return profileData;
};



// Function to get events created by the user
export const getMyCreatedEvent = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/event/my-event`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getAllInvites error:", error);
    return null;
  }
};
