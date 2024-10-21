import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Flex, Heading, HStack, Icon, Spinner } from "@chakra-ui/react";
import { GiReceiveMoney } from "react-icons/gi";
import { LinkButton } from "../../components/ui/link-button";
import { useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
const SharedLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <Spinner />;
  return (
    <>
      {isSignedIn ? (
        <Flex direction={"row"} w="100%" h="calc(100vh)">
          <Flex
            direction={"column"}
            w="100%"
            bgColor={"gray.100"}
            overflow={"auto"}
          >
            <Flex>
              <Flex direction={"column"}>
                <NavBar />
              </Flex>

              <Flex
                direction={"column"}
                w="100%"
                bgColor={"gray.100"}
                overflow={"auto"}
              >
                <Outlet />
                <Footer />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex direction={"column"}>
          <Flex justifyContent={"space-between"} p="15px" h="10vh">
            <HStack>
              <Icon as={GiReceiveMoney} color={"teal.500"} boxSize={8} />
              <Heading color={"teal.500"}>MoneyTrack.</Heading>
            </HStack>

            <LinkButton colorPalette={"teal"} href="/sign-in">
              Sign In
            </LinkButton>
          </Flex>
          <Outlet />
          <Footer />
        </Flex>
      )}
    </>
  );
};

export default SharedLayout;
