import {
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  DrawerOverlay,
  Drawer,
  Box,
  FormLabel,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import IconPicker from "./IconPicker";
import { useRef, useState } from "react";
import useAddCategory from "../hooks/useAddCategory";
import { BsChevronDown } from "react-icons/bs";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { movementTypes } from "../../common/constants";
import MovementType from "../../movement-types/MovementType";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const NewCategoryDrawer = ({ isOpen, onClose }: Props) => {
  const [icon, setIcon] = useState("");
  const [selectedTT, setSelectedTT] = useState<MovementType>();
  const { userId } = useLoginData();
  const ref = useRef<HTMLInputElement>(null);
  const addCategory = useAddCategory(() => {
    setIcon("");
    if (ref.current) ref.current.value = "";
    setSelectedTT(undefined);
    onClose();
  });
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add a new Category</DrawerHeader>

        <DrawerBody>
          <form
            id="category-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (ref.current && ref.current.value) {
                addCategory({
                  Name: ref.current?.value,
                  Icon: icon,
                  CategoryType: selectedTT!!.id,
                  userId: userId!!,
                });
              }
            }}
          >
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  ref={ref}
                  id="name"
                  placeholder="Please enter Category name"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="icon">Choose an Icon</FormLabel>
                <IconPicker iconParam={icon} setIconParam={setIcon} />
              </Box>

              <Box>
                <Menu>
                  <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                    {selectedTT?.name || "Select Category Type"}
                  </MenuButton>
                  <MenuList>
                    {movementTypes?.map((tt) => (
                      <MenuItem onClick={() => setSelectedTT(tt)} key={tt.id}>
                        {tt.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit" form="category-form">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewCategoryDrawer;
