import { Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { LinkButton } from "../../components/ui/link-button";

interface Props {
  title: string;
  link: string;
  icon: IconType;
  isOpen: boolean;
  active: boolean;
}
const NavBarButton = ({ active, title, link, isOpen, icon }: Props) => {
  return (
    <Flex
      mt={25}
      flexDir="column"
      w="100%"
      paddingX={"10px"}
      alignItems={isOpen ? "flex-start" : "center"}
    >
      <LinkButton
        href={link}
        bgColor={active ? "teal.300" : "teal.500"}
        p={3}
        justifyContent={"flex-start"}
        borderRadius={8}
        _hover={{ textDecor: "none", backgroundColor: "teal.300" }}
        w={isOpen ? "full" : "fit-content"}
      >
        <Flex direction={"row"} alignItems={"flex-start"} w="fit-content">
          <Icon as={icon} fontSize="xl" color={active ? "teal.500" : "white"} />
          <Text
            ml={2}
            display={isOpen ? "flex" : "none"}
            color={active ? "teal.600" : "white"}
          >
            {title}
          </Text>
        </Flex>
      </LinkButton>
    </Flex>
  );
};

export default NavBarButton;
