

import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const getAllInvites = async () => {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
  
      if (!accessToken) {
        throw new Error('Access token not found');
      }
  
      const url = `${process.env.NEXT_PUBLIC_API_URL}/invites`;
  
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
  import { toast } from "sonner";

export const createInvites = async ( payload) => {
 
    try {  
      const response = await fetch(`${baseUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        body: JSON.stringify({
            payload
        })
        },
        credentials: "include",
        
      });
      const data = await response.json();
      
      return data?.data;
    
    } catch (error) {
   toast.error("Something went wrong from event getUsers")
     
     
    }
  };