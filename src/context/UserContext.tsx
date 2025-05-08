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
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  // console.log(user)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const decodedData = jwtDecode<IUser>(accessToken);
          setUser(decodedData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    handleUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoading, setUser, setIsLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default UserProvider;
