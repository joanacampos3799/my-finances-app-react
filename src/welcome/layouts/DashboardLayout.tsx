import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { useAuthActions } from "../../auth/hooks/useAuthActions";

export default function DashboardLayout() {
  const { isSignedIn, userId, isLoaded } = useAuth();
  const { userId: Id, userToken } = useLoginData();
  const navigate = useNavigate();
  const { signin } = useAuthActions();
  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    } else if (isSignedIn && !userToken && !Id) {
      signin();
    }
  }, [isLoaded, userId, navigate, signin, userToken, Id, isSignedIn]);

  if (!isLoaded) return <Spinner />;

  return (
    <Box>
      <Outlet />
    </Box>
  );
}
