// "use server";

import { cookies } from "next/headers";

// // Function to update the user profile
// export const updateProfile = async (data: {
//   name: string;
//   email: string;
//   profileImage: string;
//   phoneNumber: string;
//   address: string;
//   occupation: string;
// }) => {
//   try {
//     const accessToken = cookieStore.get("accessToken")?.value;

//     if (!accessToken) {
//       throw new Error("Access token not found");
//     }

//     const url = `${process.env.NEXT_PUBLIC_API_URL}/profiles/${data.userId}`; // Assuming the endpoint expects the userId in the URL

//     const res = await fetch(url, {
//       method: "PATCH",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,  // Properly prefix the token with "Bearer"
//       },
//       body: JSON.stringify(data),
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to update profile: ${res.statusText}`);
//     }

//     const responseData = await res.json();
//     return responseData;
//   } catch (error) {
//     console.error("updateProfile error:", error);
//     return null;
//   }
// };



// Function to get events created by the user

  export const getMyCreatedEvent = async () => {
      try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
    
        if (!accessToken) {
          throw new Error('Access token not found');
        }
    
        const url = `${process.env.NEXT_PUBLIC_API_URL}/event/my-event`;
    
        const res = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        });
    
        if (!res.ok) {
          throw new Error(`Failed to fetch invites: ${res.statusText}`);
        }
    
        const data = await res.json();
        return data;
      } catch (error) {
        console.error('getAllInvites error:', error);
        return null;
      }
    };


