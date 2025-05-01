"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
export const registerUser = async (userData: FieldValues) => {
  try {
    const formData = new FormData();
    const { file, ...restData } = userData;

    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }

    formData.append("data", JSON.stringify(restData));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const userInfo = await res.json();
    // console.log(userInfo)
    if (userInfo.success) {
      (await cookies()).set("accessToken", userInfo.data.accessToken);
    }

    return userInfo;
  } catch (error) {
    console.log(error);
    throw new Error("Registration failed");
  }
};


// export const loginUser = async (userData: FieldValues) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });
//     const userInfo = await res.json();
//     if (userInfo.success) {
//       (await cookies()).set("accessToken", userInfo.data.accessToken);
//     }

//     return userInfo;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getCurrentUser = async () => {
//   const accessToken = (await cookies()).get("accessToken")?.value;
//   if (accessToken) {
//     const decodedData =jwtDecode(accessToken);
//     return decodedData;
//   } else {
//     return null;
//   }
// };



// LogOut
export const logOut = async()=>{
     (await cookies()).delete("accessToken")
}