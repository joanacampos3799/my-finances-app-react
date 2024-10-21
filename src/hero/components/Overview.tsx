import { Flex, Heading, Text, Image } from "@chakra-ui/react";
import overview from "../../assets/images/overview.png";
const Overview = () => {
  return (
    <Flex w="100%" direction={"row"} h="75vh" id="features">
      <Flex w="50%">
        <Image src={overview} />
      </Flex>
      <Flex direction={"column"} w="50%" justifyContent={"center"} gap={2}>
        <Heading color={"teal.700"}>What Can You Do with MoneyTrack.?</Heading>
        <Text>
          MoneyTrack helps you take control of your finances by managing
          accounts, setting budgets, tracking transactions, and reaching
          financial goals— all in one place.
        </Text>
        <Text>
          With MoneyTrack., you can see where your money is going, plan for the
          future, and make smarter financial decisions - all in one app
        </Text>
      </Flex>
    </Flex>
  );
};

export default Overview;
