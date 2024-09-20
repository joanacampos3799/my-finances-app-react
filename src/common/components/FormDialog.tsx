import React, { PropsWithChildren, useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Card } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
interface Props {
  isEmpty: boolean;
  label: string;
  initialEl: HTMLElement | null;
  formName: string;
}
const FormDialog = ({
  isEmpty,
  initialEl,
  label,
  children,
  formName,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot
      motionPreset="slide-in-bottom"
      centered
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      initialFocusEl={() => initialEl}
    >
      <DialogTrigger asChild>
        {isEmpty ? (
          <Button aria-label="Add">New {label}</Button>
        ) : (
          <Card.Root variant={"elevated"} height={"8rem"}>
            <Card.Body>
              <Button variant={"plain"} width={"full"} height={"full"}>
                <LuPlus />
              </Button>
            </Card.Body>
          </Card.Root>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader fontSize="lg" fontWeight="bold">
          Add a new {label}
        </DialogHeader>

        <DialogBody>{children}</DialogBody>

        <DialogFooter>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => setOpen(false)}
            type="submit"
            form={formName}
            ml={3}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default FormDialog;
