import {
  Button,
  Drawer,
  DrawerOverlay,
  Heading,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import CategoryGrid from "../components/CategoryGrid";
import NewCategoryDrawer from "../components/NewCategoryDrawer";

const CategoriesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Heading>Categories</Heading>
        <Button onClick={onOpen}> Add Category</Button>
      </HStack>
      <NewCategoryDrawer isOpen={isOpen} onClose={onClose}></NewCategoryDrawer>
      <CategoryGrid />
    </>
  );
};

export default CategoriesPage;
