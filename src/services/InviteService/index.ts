"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllInvites = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const url = `${baseUrl}/invites`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch invites: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getAllInvites error:", error);
    return null;
  }
};

export const getAllMyReceivedInvites = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const url = `${baseUrl}/invites/my-all-received-invites`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      next: { tags: ["RECEIVED-INVITES"], revalidate: 5 },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getAllInvites error:", error);
    return null;
  }
};
export const getMyAllSentInvites = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    console.log("🚀 ~ getMyAllSentInvites ~ accessToken:", accessToken);

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const url = `${baseUrl}/invites/my-all-sent-invites`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      next: { tags: ["SENT-INVITES"] },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("getAllInvites error:", error);
    return null;
  }
};
export const sendInvitation = async (payload: {
  eventId: string;
  inviteReceiverId: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const response = await fetch(`${baseUrl}/invites/sent-invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Something went wrong from event sendInvitaion ", error);
  }
};

export const deleteInvite = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const response = await fetch(`${baseUrl}/invites/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      credentials: "include",
    });
    const data = await response.json();
    revalidateTag("SENT-INVITES");
    revalidateTag("RECEIVED-INVITES");

    return data;
  } catch (error) {
    console.error("Something went wrong from event sendInvitaion ", error);
  }
};

export const acceptInvite = async (inviteId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const response = await fetch(
      `${baseUrl}/invites/accept-invite/${inviteId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    revalidateTag("SENT-INVITES");
    revalidateTag("RECEIVED-INVITES");

    return data;
  } catch (error) {
    console.error("Something went wrong from event send Invitaion ", error);
  }
};

export const rejectInvite = async (inviteId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const response = await fetch(
      `${baseUrl}/invites/reject-invite/${inviteId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    revalidateTag("SENT-INVITES");
    revalidateTag("RECEIVED-INVITES");

    return data;
  } catch (error) {
    console.error("Something went wrong from event send Invitaion ", error);
  }
};
