import React, { PropsWithChildren, useState } from "react";
import DrawerComponent from "./DrawerComponent";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerRoot,
  DrawerTrigger,
} from "../../components/ui/drawer";

import { Button, DrawerContent, Flex } from "@chakra-ui/react";

import { LuAlignJustify } from "react-icons/lu";

const HamburgerMenu = ({ children }: PropsWithChildren) => {
  const [navBarOpen, setNavBarOpen] = useState(false);

  return (
    <DrawerRoot
      open={navBarOpen}
      size={"full"}
      placement={"end"}
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
          <LuAlignJustify />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        height="20vh"
        width="95vw"
        mt={"48px"}
        position="fixed"
        rounded="md"
      >
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default HamburgerMenu;
