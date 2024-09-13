import { useRef, useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button, Card, Input } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import useAddBank from "../hooks/useAddBank";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { FaPlus } from "react-icons/fa6";

interface Props {
  isEmpty: boolean;
}
const NewBankModal = ({ isEmpty }: Props) => {
  const [open, setOpen] = useState(false);
  const { userId } = useLoginData();
  const addBank = useAddBank(() => {
    if (ref.current) ref.current.value = "";
    setOpen(false);
  });
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot
      motionPreset="slide-in-bottom"
      centered
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      initialFocusEl={() => ref.current}
    >
      <DialogTrigger asChild>
        {isEmpty ? (
          <Button aria-label="Add">New bank</Button>
        ) : (
          <Card.Root variant={"elevated"}>
            <Card.Body>
              <Button variant={"plain"} width={"full"} height={"full"}>
                <FaPlus />
              </Button>
            </Card.Body>
          </Card.Root>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader fontSize="lg" fontWeight="bold">
          Add a new Bank
        </DialogHeader>

        <DialogBody>
          <form
            id="new-bank-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (ref.current && ref.current.value) {
                addBank({
                  Name: ref.current?.value,
                  userId: userId!!,
                });
              }
            }}
          >
            <Field label="Name">
              <Input ref={ref} placeholder="Add your bank's name" />
            </Field>
          </form>
        </DialogBody>

        <DialogFooter>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="new-bank-form" ml={3}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default NewBankModal;
