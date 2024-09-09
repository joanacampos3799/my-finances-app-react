import IconPicker from "./IconPicker";
import { useRef, useState } from "react";
import useAddCategory from "../hooks/useAddCategory";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { movementTypes } from "../../common/constants";
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
import { Box, Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import { FaPlus } from "react-icons/fa6";

interface Props {
  isEmpty: boolean;
}
const NewCategoryDrawer = ({ isEmpty }: Props) => {
  const [icon, setIcon] = useState("");
  const [selectedTT, setSelectedTT] = useState<string[]>([]);
  const { userId } = useLoginData();
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const addCategory = useAddCategory(() => {
    setIcon("");
    if (ref.current) ref.current.value = "-1";
    setSelectedTT([]);
    setOpen(false);
  });
  const movementTypesSelect = movementTypes.map((movementType) => {
    const mappedMovement = { label: movementType.name, value: movementType.id };
    return mappedMovement;
  });
  return (
    <DrawerRoot
      open={open}
      size="sm"
      placement="end"
      initialFocusEl={() => ref.current}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DrawerBackdrop position="fixed" />
      <DrawerTrigger asChild>
        {isEmpty ? (
          <Button>Add Category</Button>
        ) : (
          <Card.Root variant={"elevated"}>
            <Card.Body>
              <Button variant={"plain"} width={"full"} height={"full"}>
                <FaPlus />
              </Button>
            </Card.Body>
          </Card.Root>
        )}
      </DrawerTrigger>
      <DrawerContent offset="4" rounded="md">
        <DrawerCloseTrigger />
        <DrawerHeader>Add a new Category</DrawerHeader>

        <DrawerBody>
          <form
            id="new-category-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (ref.current && ref.current.value) {
                addCategory({
                  Name: ref.current?.value,
                  Icon: icon,
                  CategoryType: movementTypes[+selectedTT[0]].id,
                  userId: userId!!,
                });
              }
            }}
          >
            <Stack>
              <Box>
                <Field label="Choose an Icon">
                  <IconPicker
                    iconSize={8}
                    iconParam={icon}
                    setIconParam={setIcon}
                  />
                </Field>
              </Box>

              <Box>
                <Field label="Name" required>
                  <Input
                    ref={ref}
                    id="name"
                    placeholder="Please enter Category name"
                  />
                </Field>
              </Box>

              <Box paddingTop="5px">
                <SelectRoot
                  items={movementTypesSelect}
                  variant="outline"
                  value={selectedTT}
                  onValueChange={(e) => setSelectedTT(e.value)}
                  positioning={{ sameWidth: true, placement: "bottom" }}
                >
                  <SelectLabel>Select a Category Type </SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select Category Type" />
                  </SelectTrigger>
                  <SelectContent portalled={false} width="full">
                    {movementTypesSelect?.map((ct) => (
                      <SelectItem item={ct} key={ct.value}>
                        {ct.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Box>
            </Stack>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="new-category-form">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default NewCategoryDrawer;
