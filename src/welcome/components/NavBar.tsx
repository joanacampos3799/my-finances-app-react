import { HStack, Icon } from "@chakra-ui/react";
import { SignedIn, UserButton, SignedOut, useAuth } from "@clerk/clerk-react";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import NavBarButton from "./NavBarButton";

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
          <NavBarButton link="/s/categories" title="Categories" />
          <NavBarButton
            link="/s/banks-accounts"
            title="Manage Banks & Accounts"
          />
          <NavBarButton
            link="/s/fixed-transactions"
            title="Manage Fixed Transactions"
          />
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
