import React, { createContext } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ isAuthenticated: false }}>
      {children}
    </AuthContext.Provider>
  );
}
