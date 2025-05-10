/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const getAllUsers = async ( ) => {
 
    try {  
      const response = await fetch(`${baseUrl}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "force-cache",
      });
      const data = await response.json();
      
      return data?.data;
    
    } catch (error) {
   toast.error("Something went wrong from event getUsers")
     
     
    }
  };