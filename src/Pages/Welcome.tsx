import { Box, Center, Icon } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa6";
import Description from "../components/Description";
import { useAuth } from "@clerk/clerk-react";
import { useAuthActions } from "../hooks/useAuthActions";
import { useEffect } from "react";

export default function WelcomePage() {
  const { signout } = useAuthActions();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) signout();
  }, [isSignedIn, signout]);

  return (
    <Box h="calc(90hv)" w="inherit">
      <Center
        bgGradient="linear(to-r, purple.300, orange.200, pink.200)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        h="calc(80vh)"
      >
        Welcome to your Finances Tracker
      </Center>
      <Icon
        className="arrow bounce"
        as={FaAngleDown}
        color="gray.400"
        boxSize={6}
      />
      <Description />
    </Box>
  );
}
