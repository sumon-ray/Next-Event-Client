"use client";

import { IUser } from "@/app/types";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  updateProfile: (updatedUser: IUser) => void;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserProfile = localStorage.getItem("userProfile");
    if (storedUserProfile) {
      const userProfile = JSON.parse(storedUserProfile);
      setUser(userProfile);
    } else {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedData = jwtDecode<IUser>(accessToken);
        setUser(decodedData);
      } else {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const updateProfile = (updatedUser: IUser) => {
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateProfile, isLoading, setIsLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
