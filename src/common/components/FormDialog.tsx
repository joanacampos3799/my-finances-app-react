import { PropsWithChildren, useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { LuPenLine } from "react-icons/lu";
interface Props {
  label: string;
  initialEl: HTMLElement | null;
  formName: string;
  update?: boolean;
}
const FormDialog = ({
  initialEl,
  label,
  children,
  formName,
  update,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      initialFocusEl={() => initialEl}
    >
      <DialogTrigger asChild>
        {update ? (
          <Button h="40px" w="40px" bgColor={"teal.500"} borderRadius={"md"}>
            <LuPenLine />
          </Button>
        ) : (
          <Button bgColor={"teal.500"} aria-label="Add">
            Add {label}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader color={"teal.800"} fontSize="lg" fontWeight="bold">
          {update ? "Update" : "Add a new"} {label}
        </DialogHeader>

        <DialogBody>{children}</DialogBody>

        <DialogFooter>
          <Button
            variant={"outline"}
            colorPalette={"teal"}
            borderColor={"teal.500"}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            bgColor={"teal.500"}
            onClick={() => setOpen(false)}
            type="submit"
            form={formName}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default FormDialog;
