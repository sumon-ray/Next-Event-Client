"use client";

import { IUser } from "@/app/types";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

  useEffect(() => {
    const loadUser = () => {
      if (status === "authenticated" && session?.user) {
        const sessionUser: IUser = {
          id: "",
          name: session.user.name || "",
          email: session.user.email || "",
          password: "",
          address: null,
          bio: null,
          gender: null,
          occupation: null,
          phoneNumber: "",
          profileImage: session.user.image || "",
          image: session.user.image || "",
          role: "USER",
          isSocialLogin: true,
          isDeleted: false,
          isBlocked: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setUser(sessionUser);
      } else {
        const storedUserProfile = localStorage.getItem("userProfile");
        if (storedUserProfile) {
          setUser(JSON.parse(storedUserProfile));
        } else {
          const accessToken = localStorage.getItem("accessToken");
          if (accessToken) {
            const decoded = jwtDecode<IUser>(accessToken);
            setUser(decoded);
          } else {
            setUser(null);
          }
        }
      }

      setIsLoading(false);
    };

    loadUser();
  }, [session, status]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
    }
  }, [user]);

  const updateProfile = (updatedUser: IUser) => {
    setUser(updatedUser);
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
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
