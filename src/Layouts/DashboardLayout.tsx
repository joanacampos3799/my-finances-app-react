import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import useUserStore from "../stores/userStore";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const { setUserId } = useUserStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  const user = useUser(userId!!);
  React.useEffect(() => {
    if (user && user.data) {
      setUserId(user.data.userId);
    }
  }, [user.data]);

  if (!isLoaded) return <Text>Loading...</Text>;

  return <Outlet />;
}
