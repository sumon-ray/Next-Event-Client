"use client";
import { IUser } from "@/app/types";
import { getCurrentUser } from "@/services/AuthService/getCurrentUser";
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
}
const UserContext = createContext<IUserProviderValues | undefined>(undefined);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();

    if (user) {
      setUser(user as IUser);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context == undefined) {
    throw new Error("useUser must be used within the userProvider ");
  }
  return context;
};

export default UserProvider;
