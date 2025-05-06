"use client"

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../services/AuthService";
import { ITokenUser } from "@/app/types";

interface IUserProviderValues {
  user: ITokenUser | null;
  isLoading: boolean;
  setUser: (user: ITokenUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ITokenUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  // console.log(user);

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context == undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
