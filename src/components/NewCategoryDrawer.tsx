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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import IconPicker from "./IconPicker";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const NewCategoryDrawer = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add a new Category</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" placeholder="Please enter Category name" />
            </Box>

            <Box>
              <FormLabel htmlFor="icon">Choose an Icon</FormLabel>
              <IconPicker />
            </Box>

            <Box>
              <FormLabel htmlFor="owner">Select Type</FormLabel>
              <Select id="owner" defaultValue="1">
                <option value="0">Both</option>
                <option value="1">Expense</option>
                <option value="2">Income</option>
              </Select>
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewCategoryDrawer;
