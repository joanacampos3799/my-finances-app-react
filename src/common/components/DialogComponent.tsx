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
import { LuCheck, LuMaximize2 } from "react-icons/lu";
import { ConditionalValue, Heading, HStack, Icon } from "@chakra-ui/react";
import { useIconPack } from "../hooks/useIconPack";
import { FaPen } from "react-icons/fa6";

interface Props {
  size: ConditionalValue<"sm" | "md" | "lg" | "xl" | "xs" | "full" | undefined>;
  icon?: string;
  name: string;
  isAlert: boolean;
  updating?: boolean;
  handleUpdate?: () => void;
  setUpdating?: React.Dispatch<React.SetStateAction<boolean>>;
}
const DialogComponent = ({
  size,
  icon,
  isAlert,
  updating,
  handleUpdate,
  setUpdating,
  name,
  children,
}: PropsWithChildren<Props>) => {
  const iconPack = useIconPack();
  return (
    <DialogRoot size={size} centered motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <LuMaximize2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <HStack>
              {icon && (
                <Icon
                  boxSize={4}
                  as={iconPack?.find((i) => i.name === icon)?.icon}
                />
              )}
              <Heading>{name} Details</Heading>
            </HStack>
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          {" "}
          {!isAlert && setUpdating && !updating ? (
            <Button onClick={() => setUpdating(true)} variant={"outline"}>
              <FaPen /> Update
            </Button>
          ) : (
            <Button variant={"outline"} onClick={handleUpdate}>
              <LuCheck /> Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogComponent;
