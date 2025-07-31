import { Flex, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { LinkButton } from "../../components/ui/link-button";
interface Props {
  title: string;
  link: string;
  icon: IconType;
  active: boolean;
}
const NavBarButtonMobile = ({ icon, title, link, active }: Props) => {
  const ButtonIcon = icon;
  return (
    <Flex flexDir="column" w="100%" alignItems={"flex-start"}>
      <LinkButton
        href={link}
        bgColor={"white"}
        p={3}
        justifyContent={"flex-start"}
        borderRadius={8}
        w={"full"}
      >
        <Flex
          direction={"row"}
          alignItems={"flex-start"}
          w="fit-content"
          color={active ? "teal.600" : "black"}
          fontSize="xl"
        >
          <ButtonIcon />

          <Text ml={2} display={"flex"} fontSize={"sm"}>
            {title}
          </Text>
        </Flex>
      </LinkButton>
    </Flex>
  );
};

export default NavBarButtonMobile;
