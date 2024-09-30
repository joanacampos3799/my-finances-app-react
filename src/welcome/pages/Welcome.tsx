import { Box, Center, Icon, Text } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa6";

import { useAuth } from "@clerk/clerk-react";

import { useEffect } from "react";
import { useAuthActions } from "../../auth/hooks/useAuthActions";
import Description from "../components/Description";

export default function WelcomePage() {
  const { signout } = useAuthActions();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) signout();
  }, [isSignedIn, signout]);

  return (
    <Box h="calc(90hv)" w="inherit">
      <Center h="calc(80vh)">
        <Text fontSize="6xl" fontWeight="extrabold" color={"green.600"}>
          Welcome to your Finances Tracker
        </Text>
      </Center>
      <Icon
        className="arrow bounce"
        as={FaAngleDown}
        color="green.400"
        boxSize={6}
      />
      <Description />
    </Box>
  );
}
