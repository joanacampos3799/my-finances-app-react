import { Flex, Heading, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { LinkButton } from "../../components/ui/link-button";

const Header = () => {
  return (
    <Flex justifyContent={"space-between"} p="15px" h="10vh">
      <HStack>
        <Icon as={GiReceiveMoney} color={"teal.500"} boxSize={8} />
        <Heading color={"teal.500"}>MoneyTrack.</Heading>
      </HStack>
      <HStack gap={2}>
        <LinkButton variant="plain" colorPalette={"teal"} href="/pricing">
          Plans
        </LinkButton>
        <LinkButton variant={"plain"} colorPalette={"teal"} href="/about-us">
          About Us
        </LinkButton>
        <LinkButton colorPalette={"teal"} href="/sign-in">
          Sign In
        </LinkButton>
      </HStack>
    </Flex>
  );
};

export default Header;