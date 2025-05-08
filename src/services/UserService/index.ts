import axios from "axios";

export const getAllUser = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
  }

  const apiUrl = `${baseUrl}/user`; 
  const response = await axios.get(apiUrl, {
    // withCredentials: true
  });
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const updateUser = async (id: string, data: any) => {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     if (!baseUrl) {
//       throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
//     }
  
//     const apiUrl = `${baseUrl}/user/${id}`;
//     const response = await axios.patch(apiUrl, data); 
//     return response.data;
//   };
  
export const daleteUser = async (id:string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
  }
  const apiUrl = `${baseUrl}/user/${id}`; 
  const response = await axios.delete(apiUrl);
  return response.data;
};



export const getUserAllReviews = async (userId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
  }

  const apiUrl = `${baseUrl}/review/user/${userId}`;
  const response = await axios.get(apiUrl);
  return response.data;
};