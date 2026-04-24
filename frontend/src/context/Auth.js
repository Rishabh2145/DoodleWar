"use client"
import { createContext, useContext } from "react";
import { useUserQuery } from "@/store/api/user/profile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isError } = useUserQuery();

  const user = data?.user || null;

  return (
    <AuthContext.Provider value={{ user, loading: isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);