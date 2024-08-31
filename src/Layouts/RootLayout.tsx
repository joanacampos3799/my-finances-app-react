import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const PUBLISHABLE_KEY: string =
  process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === "") {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <Box w="100%" h="calc(100vh)">
        <NavBar />
        <Outlet />
      </Box>
    </ClerkProvider>
  );
}
