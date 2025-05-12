"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const createParticipant = async (id: string) => {
  console.log(id);
  const payload = {
    eventId: id,
  }
//   console.log(payload, "payload");
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${baseUrl}/participants/create-participant`, {
      method: "POST",
      body: JSON.stringify(payload),
      credentials: "include",
      headers: {
         "Content-Type": "application/json",
        Authorization: accessToken || "",
      },
    });

    const data = await res.json();
      revalidateTag("user-events");
    return data;
  } catch (error) {
    console.log("🚀 ~ createParticipant ~ error:", error);
  }
};
