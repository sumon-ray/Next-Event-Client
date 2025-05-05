"use client";
import { TTokenUser } from "@/app/types";
import { getCurrentUser } from "@/services/AuthService";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   image: string;
//   profileImage:string
// }
interface IUserProviderValues {
  user: TTokenUser | null;
  isLoading: boolean;
  setUser: (user: TTokenUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TTokenUser | null>(null);
  // console.log(user)
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();

    if (user) {
      setUser(user as TTokenUser);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);
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
