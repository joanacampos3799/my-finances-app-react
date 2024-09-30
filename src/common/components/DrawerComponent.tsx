import { PropsWithChildren, useState } from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { ConditionalValue, Flex } from "@chakra-ui/react";
import { LuPenLine } from "react-icons/lu";

interface Props {
  placement: ConditionalValue<"start" | "end" | "top" | "bottom" | undefined>;
  size?: ConditionalValue<
    "sm" | "md" | "lg" | "xl" | "xs" | "full" | undefined
  >;
  update?: boolean;
  name: string;
  formName: string;
  refElement: HTMLElement | null;
}
const DrawerComponent = ({
  children,
  placement,
  size,
  name,
  formName,
  refElement,
  update,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  return (
    <DrawerRoot
      open={open}
      size={size ?? "sm"}
      placement={placement}
      initialFocusEl={() => refElement}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        {update ? (
          <Button h="40px" w="40px" bgColor={"teal.500"} borderRadius={"md"}>
            <LuPenLine />
          </Button>
        ) : (
          <Button bgColor={"teal.500"}>Add {name}</Button>
        )}
      </DrawerTrigger>
      <DrawerContent offset="4" rounded="md">
        <DrawerHeader width={"full"}>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <DrawerTitle color={"teal.800"}>Add a new {name}</DrawerTitle>
            <DrawerCloseTrigger boxSize={4} m={0} display={"inline-flex"} />
          </Flex>
        </DrawerHeader>

        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>
          <Button
            color={"teal.500"}
            borderColor={"teal.500"}
            colorPalette={"teal"}
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            colorPalette={"teal"}
            type="submit"
            onClick={() => setOpen(false)}
            form={formName}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default DrawerComponent;
