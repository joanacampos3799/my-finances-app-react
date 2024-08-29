import { HStack, Icon, Text } from "@chakra-ui/react";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack padding="10px" justify="space-between">
      <Link to="/">
        <Icon as={GiReceiveMoney} boxSize={8} />
      </Link>
      <HStack>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </SignedOut>
      </HStack>
    </HStack>
  );
};

export default NavBar;
