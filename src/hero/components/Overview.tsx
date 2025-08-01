import { Flex, Heading, Text, Image } from "@chakra-ui/react";
import overview from "../../assets/images/overview.png";
const Overview = () => {
  return (
    <Flex
      w="100%"
      direction={{ base: "column", md: "row" }}
      h={{ base: "auto", md: "75vh" }}
      id="features"
    >
      <Flex
        w={{ base: "100%", md: "90%" }}
        order={{ base: 1, md: 0 }}
        justifyContent={"center"}
      >
        <Image
          src={overview}
          objectFit="contain"
          w={{ base: "100%", md: "90%" }}
          h={{ base: "200px", md: "auto" }}
          borderRadius="md"
          alt="Overview"
        />
      </Flex>
      <Flex
        direction={"column"}
        w={{ base: "100%", md: "50%" }}
        justifyContent={"center"}
        gap={2}
      >
        <Heading color={"teal.700"}>What Can You Do with MoneyTrack.?</Heading>
        <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
          MoneyTrack helps you take control of your finances by managing
          accounts, setting budgets, tracking transactions, and reaching
          financial goals— all in one place.
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
          With MoneyTrack., you can see where your money is going, plan for the
          future, and make smarter financial decisions - all in one app
        </Text>
      </Flex>
    </Flex>
  );
};

export default Overview;
