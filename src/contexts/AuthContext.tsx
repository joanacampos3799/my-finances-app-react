import { createContext, useContext } from "react";

import User from "../entities/User";
import { UUID } from "crypto";
import useAuthStore from "../stores/useAuthSore";

type AuthContextValue = {
  userId: UUID | undefined;
  userToken: string | undefined;
  setLoginData: (loginData: User) => void;
  clearLoginData: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useLoginData = () => {
  const authId = useContext(AuthContext);
  if (!authId) {
    throw new Error(
      "Error! AuthContext called from outside the AuthContextProvider"
    );
  }

  return authId;
};

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const { user, setUser, clearUser } = useAuthStore();

  // can't destructure since loginData might be null
  const userId = user?.userId;
  const userToken = user?.userToken;

  const setLoginData = ({ userId: Id, userToken: Token }: User) => {
    if (userId !== Id || userToken !== Token) {
      setUser({ userId: Id, userToken: Token });
    }
  };

  const clearLoginData = () => {
    if (userId || userToken) clearUser();
  };

  return (
    <AuthContext.Provider
      value={{ userId, userToken, clearLoginData, setLoginData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
