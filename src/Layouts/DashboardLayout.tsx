import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import { useUserStore } from "../stores/userStore";

export default function DashboardLayout() {
  const { getToken, userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const fetchUserId = async () => {
    const token = await getToken();
    if (token) {
      const user = useUser(token).data;
      if (user) {
        const { setUserId } = useUserStore();
        setUserId(user.userId);
      }
    }
  };

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
    fetchUserId();
  }, [isLoaded]);

  if (!isLoaded) return <Text>Loading...</Text>;

  return <Outlet />;
}
