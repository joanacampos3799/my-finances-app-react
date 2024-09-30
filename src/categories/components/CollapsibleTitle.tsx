import { Heading, Text } from "@chakra-ui/react";
import { Collapsible } from "@chakra-ui/react/collapsible";

const CollapsibleTitle = () => {
  return (
    <Collapsible.Root unmountOnExit>
      <Collapsible.Trigger paddingY="3">
        <Heading fontWeight={"bold"} size="3xl" color={"teal.700"}>
          Categories
        </Heading>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Text mt={5} width={{ lg: "50%" }} color={"gray.600"}>
          Welcome to the Categories Page, where you can easily manage your
          finances by organizing your transactions into meaningful categories.
        </Text>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default CollapsibleTitle;
