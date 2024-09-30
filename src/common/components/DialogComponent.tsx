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

interface Props {
  size: ConditionalValue<"sm" | "md" | "lg" | "xl" | "xs" | "full" | undefined>;
  icon?: string;
  iconColor?: string;
  title: string;
  updating?: boolean;
  footer?: JSX.Element;
  handleUpdate?: () => void;
  setUpdating?: React.Dispatch<React.SetStateAction<boolean>>;
}
const DialogComponent = ({
  size,
  footer,
  icon,
  iconColor,
  title,
  children,
}: PropsWithChildren<Props>) => {
  const iconPack = useIconPack();
  return (
    <DialogRoot size={size} centered motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button
          h="40px"
          w="40px"
          variant={"outline"}
          color={"teal.500"}
          borderRadius={"md"}
        >
          <LuSearch />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <DialogTitle>
              <HStack>
                {icon && (
                  <Icon
                    boxSize={4}
                    color={iconColor ?? "teal.800"}
                    as={iconPack?.find((i) => i.name === icon)?.icon}
                  />
                )}
                <Heading color={"teal.800"}>{title}</Heading>
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
