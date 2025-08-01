import { Box, Flex, FormatNumber, Heading, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  value: number;
  title: string;
  IconEl: IconType;
}
const ValueKPIComponent = ({ value, title, IconEl }: Props) => {
  return (
    <Flex bgColor={"white"} direction={"row"} borderRadius={"md"} gap={2} p={4}>
      <Flex alignItems={"center"}>
        <Box
          borderRadius={"full"}
          bgColor={"teal.100"}
          boxSize={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            alignItems={"center"}
            justifyContent={"center"}
            color={"teal.700"}
            boxSize={6}
          >
            <IconEl />
          </Icon>
        </Box>
      </Flex>

      <Flex direction={"column"}>
        <Text fontSize={"sm"} color={"gray.500"}>
          {title}
        </Text>
        <Heading size={"2xl"}>
          <FormatNumber value={value} style="currency" currency="eur" />
        </Heading>
      </Flex>
    </Flex>
  );
};

export default ValueKPIComponent;
