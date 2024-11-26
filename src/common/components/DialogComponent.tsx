import { PropsWithChildren } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { LuSearch } from "react-icons/lu";
import {
  ConditionalValue,
  Flex,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useIconPack } from "../hooks/useIconPack";
import { FaPen } from "react-icons/fa6";

interface Props {
  size: ConditionalValue<
    "sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full" | undefined
  >;
  icon?: string;
  iconColor?: string;
  title: string;
  updating?: boolean;
  footer?: JSX.Element;
  isDetails?: boolean;
  handleUpdate?: () => void;
  setUpdating?: React.Dispatch<React.SetStateAction<boolean>>;
}
const DialogComponent = ({
  size,
  footer,
  icon,
  iconColor,
  title,
  isDetails = true,
  children,
}: PropsWithChildren<Props>) => {
  const iconPack = useIconPack();

  const IconEl =
    icon != undefined ? iconPack?.find((i) => i.name === icon)?.icon!! : FaPen;
  return (
    <DialogRoot size={size} motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        {isDetails ? (
          <Button
            h="40px"
            w="40px"
            variant={"outline"}
            borderColor={"teal.500"}
            borderRadius={"md"}
            colorPalette={"teal"}
          >
            <LuSearch />
          </Button>
        ) : (
          <Button size={"xs"} colorPalette={"teal"}>
            View Goals
          </Button>
        )}
      </DialogTrigger>
      <DialogContent borderRadius={"xl"} offset={"center"}>
        <DialogHeader>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <DialogTitle>
              <HStack>
                {icon !== undefined && IconEl !== undefined && (
                  <Icon boxSize={4} color={iconColor ?? "teal.700"}>
                    <IconEl />
                  </Icon>
                )}
                <Heading color={"teal.700"}>{title}</Heading>
              </HStack>
            </DialogTitle>
            <DialogCloseTrigger />
          </Flex>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter> {footer}</DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogComponent;
