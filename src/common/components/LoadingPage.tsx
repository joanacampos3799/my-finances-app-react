import { Flex, Spinner, Text } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Flex
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      bg="gray.100"
      p="10%"
    >
      <Spinner size="xl" color="teal.500" />
      <Text mt={4} fontSize="lg" color="gray.600">
        Loading, please wait...
      </Text>
    </Flex>
  );
};

export default LoadingPage;
