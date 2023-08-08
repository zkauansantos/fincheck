import React, { createContext, useCallback, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { localStorageKeys } from "../config/localStorageKeys";
import { usersService } from "../services/usersService";
import { toast } from "react-hot-toast";
import LaunchScreen from "../../view/components/LaunchScreen";
import { User } from "../entities/User";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | undefined;
  signin: (jwtAcessToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedJwtAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedJwtAccessToken;
  });

  const { isError, isSuccess, isFetching, remove, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: isAuthenticated,
    staleTime: Infinity,
  });

  const signin = useCallback((jtwAccessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, jtwAccessToken);

    setIsAuthenticated(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setIsAuthenticated(false);
    remove();
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isSuccess && isAuthenticated,
        signin,
        user: data,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
