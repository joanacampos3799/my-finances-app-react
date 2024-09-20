import { PropsWithChildren, useState } from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { Card, ConditionalValue } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

interface Props {
  isEmpty: boolean;
  placement: ConditionalValue<"start" | "end" | "top" | "bottom" | undefined>;
  name: string;
  formName: string;
  refElement: HTMLElement | null;
}
const DrawerComponent = ({
  children,
  isEmpty,
  placement,
  name,
  formName,
  refElement,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  return (
    <DrawerRoot
      open={open}
      size="sm"
      placement={placement}
      initialFocusEl={() => refElement}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DrawerBackdrop position="fixed" />
      <DrawerTrigger asChild>
        {isEmpty ? (
          <Button>Add {name}</Button>
        ) : (
          <Card.Root variant={"elevated"} height={"8rem"}>
            <Card.Body>
              <Button variant={"plain"} width={"full"} height={"full"}>
                <LuPlus />
              </Button>
            </Card.Body>
          </Card.Root>
        )}
      </DrawerTrigger>
      <DrawerContent offset="4" rounded="md">
        <DrawerCloseTrigger />
        <DrawerHeader>Add a new {name}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => setOpen(false)} form={formName}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default DrawerComponent;
