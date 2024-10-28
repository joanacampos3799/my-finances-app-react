import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Flex } from "@chakra-ui/react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { LoadingOverlay } from "../../components/ui/loading-overlay";
const SharedLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <LoadingOverlay />;
  return (
    <>
      {isSignedIn ? (
        <Flex direction={"row"} w="100%" h="calc(100vh)">
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
      ) : (
        <Flex direction={"column"}>
          <Header />
          <Outlet />
          <Footer />
        </Flex>
      )}
    </>
  );
};

export default SharedLayout;
