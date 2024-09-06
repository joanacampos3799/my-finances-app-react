import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import CategoryGrid from "../components/CategoryGrid";
import NewCategoryDrawer from "../components/NewCategoryDrawer";
import useCategories from "../hooks/useCategories";
import { useMutationState } from "@tanstack/react-query";
import { mutationKeys } from "../../common/constants";
import Category from "../Category";
import { FetchResponse } from "../../common/apiClient";

const CategoriesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = useCategories();
  const pendingData = useMutationState({
    filters: { mutationKey: [mutationKeys.addCategory], status: "pending" },
    select: (mutation) => {
      const data: Category[] = mutation.state.variables as Category[];
      const resp: FetchResponse<Category> = {
        data: data,
        count: data.length,
      };
      return resp;
    },
  });

  const pendingCats = pendingData ? pendingData[0] : null;

  const catData = pendingCats?.data ?? categories.data;
  const catCount = pendingCats ? pendingCats?.count : categories.count;
  return (
    <>
      {!catData || catCount === 0 ? (
        <NoCategoriesComponent />
      ) : (
        <Box>
          <Center>
            <Heading>Categories</Heading>
          </Center>
          <HStack justifyContent="end">
            <Button onClick={onOpen}>Add Category</Button>
          </HStack>

          <NewCategoryDrawer
            isOpen={isOpen}
            onClose={onClose}
          ></NewCategoryDrawer>
          <CategoryGrid categories={catData} />
        </Box>
      )}
    </>
  );
};

const NoCategoriesComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center>
      <Button size="bg" height="100px" width="200px" onClick={onOpen}>
        Add a new Category
      </Button>
      <NewCategoryDrawer isOpen={isOpen} onClose={onClose}></NewCategoryDrawer>
    </Center>
  );
};

export default CategoriesPage;
