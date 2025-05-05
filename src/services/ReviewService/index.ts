import axios from "axios";

export const createReview = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not found");
  }
  const apiUrl = `${baseUrl}/review`; 
  const response = await axios.post(apiUrl);
  return response.data;
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAllReview = async (filter?: { rating?: number; user?: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const queryParams = new URLSearchParams();
  if (filter?.rating) queryParams.append("rating", filter.rating.toString());
  if (filter?.user) queryParams.append("user", filter.user);

  const apiUrl = `${baseUrl}/review`; 
  //const token = localStorage.getItem("accessToken"); 
  const response = await axios.get(apiUrl,
  //    {
  //   headers: {
  //     Authorization: token,
  //   },
  // }
);
  return response.data;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateReview = async (id: string, data: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
  }

  const apiUrl = `${baseUrl}/review/${id}`;
  const response = await axios.patch(apiUrl, data); 
  return response.data;
};

export const ReviewDetails = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
  }

  const apiUrl = `${baseUrl}/review/${id}`; 
  const response = await axios.get(apiUrl);
  return response.data;
};

export const daleteReview = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined ");
  }

  const apiUrl = `${baseUrl}/review/${id}`; 
  const response = await axios.delete(apiUrl);
  return response.data;
};