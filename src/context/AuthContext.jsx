import { useState } from "react";
import { createContext } from "react";
import { getLoggedUserData } from "../services/AuthServices";
import { useEffect } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
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
    <authContext.Provider value={{ token, setToken, userData, isLoading }}>
      {children}
    </authContext.Provider>
  );
}
