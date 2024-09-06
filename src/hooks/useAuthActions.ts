import { useLoginData } from "../contexts/AuthContext";
import useUser from "./useUser";
import { useAuth } from "@clerk/clerk-react";



interface UseAuth {
  signin: () => Promise<void>;
  signout: () => void;
}

export function useAuthActions(): UseAuth {
  const { setLoginData, clearLoginData } = useLoginData();

  //const SERVER_ERROR = "There was an error contacting the server.";
  const {userId: id} = useAuth()
  const userData = useUser(id)

  async function authServerCall(
    
  ): Promise<void> {
    
      if (userData?.userId && userData.userToken) {
        
        setLoginData({ userId: userData.userId, userToken: userData.userToken});
      }
  }

  async function signin(): Promise<void> {
    authServerCall();
  }

  function signout(): void {
    clearLoginData();  
  }
  return {
    signin,
    signout,
  };
}
