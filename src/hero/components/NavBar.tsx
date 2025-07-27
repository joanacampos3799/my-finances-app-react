import {
  Icon,
  Flex,
  Heading,
  Button,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import { GiReceiveMoney } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import NavBarButton from "./NavBarButton";
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
import { useState } from "react";
import { BiCategory } from "react-icons/bi";

const NavBar = () => {
  const location = useLocation();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { open, onOpen, onClose } = useDisclosure();
  const activePage = location.pathname;
  return (
    <Flex
      borderTopEndRadius={"lg"}
      pos={"sticky"}
      left={"5"}
      h={"100vh"}
      bgColor={"teal.500"}
      w={sideBarOpen ? "200px" : "75px"}
      direction={"column"}
      justifyContent="space-between"
    >
      <Flex p="5px" flexDir="column" w="100%" alignItems={"flex-start"}>
        <Button
          variant={"solid"}
          colorPalette={"teal"}
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          <Flex
            direction={"row"}
            alignItems={"flex-start"}
            w="fit-content"
            fontSize="4xl"
          >
            <Icon boxSize={6}>
              <GiReceiveMoney />
            </Icon>

            <Heading ml={2} display={sideBarOpen ? "flex" : "none"}>
              MoneyTrack.
            </Heading>
          </Flex>
        </Button>
      </Flex>
      <SignedIn>
        <Flex flexDir={"column"} gap={3} as="nav">
          <NavBarButton
            link="/s/dashboard"
            icon={LuHome}
            isOpen={sideBarOpen}
            active={activePage === "/s/dashboard"}
            title="Dashboard"
          />
          <NavBarButton
            link="/s/categories"
            title="Categories"
            icon={BiCategory}
            isOpen={sideBarOpen}
            active={activePage === "/s/categories"}
          />
          <NavBarButton
            link="/s/institutions"
            title="Institutions"
            icon={LuLandmark}
            isOpen={sideBarOpen}
            active={activePage === "/s/institutions"}
          />
          <NavBarButton
            link="/s/accounts"
            title="Accounts"
            icon={LuWalletCards}
            isOpen={sideBarOpen}
            active={activePage === "/s/accounts"}
          />
          <NavBarButton
            link="/s/fixed-transactions"
            title="Fixed Transactions"
            icon={LuCalendarClock}
            isOpen={sideBarOpen}
            active={activePage === "/s/fixed-transactions"}
          />
          <NavBarButton
            link="/s/transactions"
            title="Transactions"
            icon={LuLineChart}
            isOpen={sideBarOpen}
            active={activePage === "/s/transactions"}
          />
        </Flex>
      </SignedIn>

      <Flex
        p="5px"
        flexDir="column"
        w="100%"
        alignItems={sideBarOpen ? "flex-start" : "center"}
        mb={4}
      >
        <NavBarButton
          link="/s/settings"
          title="Settings"
          icon={LuSettings}
          isOpen={sideBarOpen}
          active={activePage === "/s/settings"}
        />
        <SignedIn>
          <Flex
            mt={30}
            ml={sideBarOpen ? 5 : 0}
            flexDir="column"
            w="100%"
            alignItems={sideBarOpen ? "flex-start" : "center"}
          >
            <UserButton />
          </Flex>
        </SignedIn>
        <SignedOut>
          <NavBarButton
            link="/sign-in"
            title="Sign In"
            icon={LuLogIn}
            isOpen={sideBarOpen}
            active={activePage === "/sign-in"}
          />
          <NavBarButton
            link="/sign-up"
            title="Get Started"
            icon={LuClipboardEdit}
            isOpen={sideBarOpen}
            active={activePage === "/sign-up"}
          />
        </SignedOut>
      </Flex>
    </Flex>
  );
};

export default NavBar;
