import { createContext } from "react";
import { getLoggedUserData } from "../services/AuthServices";
import { useEffect } from "react";
import { authContext } from "./AuthContext";
import { useState } from "react";

export const userContext = createContext;

export default function UserContextProvider({ children }) {
  const { token } = authContext;

  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getUserData() {
    setIsLoading(true);
    try {
      const { data } = await getLoggedUserData();
      console.log(data);
      setUserData(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <UserContextProvider value={{ userData, isLoading }}>
      {children}
    </UserContextProvider>
  );
}
