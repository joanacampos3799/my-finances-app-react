import { FormatNumber, GridItem, HStack, Icon } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";
import NewCategoryDrawer from "./NewCategoryDrawer";
import Grid from "../../common/components/Grid";
import { useState } from "react";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import DeleteCard from "../../common/components/DeleteCard";
import CategoryList from "../model/CategoryList";
import { TbArrowBarToDown, TbArrowBarUp } from "react-icons/tb";

interface Props {
  categories: CategoryList[];
}
const CategoryGrid = ({ categories }: Props) => {
  const [toDelete, setToDelete] = useState<CategoryList[]>([]);
  const [deleting, setDeleting] = useState(false);

  const deleteCategory = useDeleteCategory();

  const handleDelete = () => {
    toDelete.forEach((element) => {
      element.deleted = true;
      deleteCategory(element);
    });
    setToDelete([]);
    setDeleting(false);
  };
  return (
    <Grid
      key={"categories"}
      action={"Delete"}
      name={"Categories"}
      handleDelete={handleDelete}
      addComponent={<NewCategoryDrawer isEmpty={false} />}
      deleting={deleting}
      setDeleting={setDeleting}
    >
      {categories.map((category) => (
        <GridItem key={category.Id}>
          {!deleting ? (
            <CategoryCard category={category} />
          ) : (
            <DeleteCard
              data={category}
              toDelete={toDelete}
              setToDelete={setToDelete}
              icon={category.Icon}
            >
              <HStack>
                {category.MonthlySpent != null && (
                  <HStack>
                    <Icon as={TbArrowBarUp} />

                    <FormatNumber
                      value={category.MonthlySpent}
                      style="currency"
                      currency="EUR"
                    />
                  </HStack>
                )}
                {category.MonthlyEarned != null && (
                  <HStack>
                    <Icon as={TbArrowBarToDown} />
                    <FormatNumber
                      value={category.MonthlyEarned}
                      style="currency"
                      currency="EUR"
                    />
                  </HStack>
                )}
              </HStack>
            </DeleteCard>
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
