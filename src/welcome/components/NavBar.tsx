import { HStack, Icon } from "@chakra-ui/react";
import { SignedIn, UserButton, SignedOut, useAuth } from "@clerk/clerk-react";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import CategoriesButton from "./CategoriesButton";

const NavBar = () => {
  const { isSignedIn } = useAuth();
  const redirect = isSignedIn ? "/s/dashboard" : "/";
  return (
    <HStack padding="10px" justify="space-between">
      <HStack>
        <Link to={redirect}>
          <Icon as={GiReceiveMoney} boxSize={8} />
        </Link>
        <SignedIn>
          <CategoriesButton />
        </SignedIn>
      </HStack>
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
