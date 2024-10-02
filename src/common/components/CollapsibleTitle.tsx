import { Heading, Text } from "@chakra-ui/react";
import { Collapsible } from "@chakra-ui/react/collapsible";

interface Props {
  title: string;
  description: string;
}
const CollapsibleTitle = ({ title, description }: Props) => {
  return (
    <Collapsible.Root unmountOnExit>
      <Collapsible.Trigger paddingY="3">
        <Heading fontWeight={"bold"} size="3xl" color={"teal.700"}>
          {title}
        </Heading>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Text mt={5} width={{ lg: "50%" }} color={"gray.600"}>
          {description}
        </Text>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default CollapsibleTitle;
