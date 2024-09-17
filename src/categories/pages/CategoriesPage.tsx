import { Box, Center, Heading } from "@chakra-ui/react";
import CategoryGrid from "../components/CategoryGrid";
import NewCategoryDrawer from "../components/NewCategoryDrawer";
import useCategories from "../hooks/useCategories";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";
import Category from "../Category";
import { EmptyState } from "../../components/ui/empty-state";
import { BiCategory } from "react-icons/bi";
import { HelperEntity } from "../../common/helper";
const CategoriesPage = () => {
  const categories = useCategories();
  const pendingData = useMutationState({
    filters: {
      mutationKey: [queryKeys.categories],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as Category;
    },
  });
  const pendingCat = pendingData ? pendingData[0] : null;
  let catData = categories.data;
  let catCount = categories.count;

  const helper = new HelperEntity<Category>();
  if (pendingCat) {
    const { tCount, tData } = helper.getPendingData(categories, pendingCat);
    catData = tData;
    catCount = tCount;
  }

  return (
    <Box>
      <Center>
        <Heading size="3xl">Categories</Heading>
      </Center>
      {!catData || catCount === 0 ? (
        <EmptyState
          paddingTop="10%"
          icon={<BiCategory />}
          title="Start adding categories"
          description="Add a new Category to get started"
        >
          <NewCategoryDrawer isEmpty={true} />
        </EmptyState>
      ) : (
        <>
          <CategoryGrid categories={catData} />
        </>
      )}
    </Box>
  );
};

export default CategoriesPage;
