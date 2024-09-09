import { SimpleGrid } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";
import Category from "../Category";
import NewCategoryDrawer from "./NewCategoryDrawer";

interface Props {
  categories: Category[];
}
const CategoryGrid = ({ categories }: Props) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 5 }} gap={6} padding="10px">
      {categories.map((category) => (
        <CategoryCard key={category.Id} category={category} />
      ))}
      <NewCategoryDrawer isEmpty={false} />
    </SimpleGrid>
  );
};

export default CategoryGrid;
