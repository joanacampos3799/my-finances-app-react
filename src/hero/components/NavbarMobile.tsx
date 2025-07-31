import React, { useState } from "react";
import DrawerComponent from "../../common/components/DrawerComponent";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerRoot,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { GiReceiveMoney } from "react-icons/gi";
import { Button, DrawerContent, Flex } from "@chakra-ui/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import {
  LuCalendarClock,
  LuClipboardEdit,
  LuHome,
  LuLandmark,
  LuLineChart,
  LuLogIn,
  LuSettings,
  LuWalletCards,
} from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import NavBarButtonMobile from "./NavBarButtonMobile";

const NavbarMobile = () => {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const location = useLocation();
  const activePage = location.pathname;
  return (
    <DrawerRoot
      open={navBarOpen}
      size={"full"}
      placement={"start"}
      onOpenChange={(e) => setNavBarOpen(e.open)}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          h="40px"
          w="40px"
          bgColor={"teal.500"}
          borderRadius={"md"}
          m={1}
        >
          <GiReceiveMoney />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        position="fixed"
        height="50vh"
        width="95vw"
        mt={"48px"}
        rounded={"md"}
      >
        <DrawerBody>
          <SignedIn>
            <Flex flexDir={"column"} gap={3} as="nav">
              <NavBarButtonMobile
                link="/s/dashboard"
                icon={LuHome}
                active={activePage === "/s/dashboard"}
                title="Dashboard"
              />
              <NavBarButtonMobile
                link="/s/categories"
                title="Categories"
                icon={BiCategory}
                active={activePage === "/s/categories"}
              />
              <NavBarButtonMobile
                link="/s/institutions"
                title="Institutions"
                icon={LuLandmark}
                active={activePage === "/s/institutions"}
              />
              <NavBarButtonMobile
                link="/s/accounts"
                title="Accounts"
                icon={LuWalletCards}
                active={activePage === "/s/accounts"}
              />
              <NavBarButtonMobile
                link="/s/fixed-transactions"
                title="Fixed Transactions"
                icon={LuCalendarClock}
                active={activePage === "/s/fixed-transactions"}
              />
              <NavBarButtonMobile
                link="/s/transactions"
                title="Transactions"
                icon={LuLineChart}
                active={activePage === "/s/transactions"}
              />
            </Flex>
          </SignedIn>

          <NavBarButtonMobile
            link="/s/settings"
            title="Settings"
            icon={LuSettings}
            active={activePage === "/s/settings"}
          />
          <SignedIn>
            <Flex
              mt={30}
              ml={5}
              flexDir="column"
              w="100%"
              alignItems={"flex-start"}
            >
              <UserButton />
            </Flex>
          </SignedIn>
          <SignedOut>
            <NavBarButtonMobile
              link="/sign-in"
              title="Sign In"
              icon={LuLogIn}
              active={activePage === "/sign-in"}
            />
            <NavBarButtonMobile
              link="/sign-up"
              title="Get Started"
              icon={LuClipboardEdit}
              active={activePage === "/sign-up"}
            />
          </SignedOut>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default NavbarMobile;
