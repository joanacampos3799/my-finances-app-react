import React from "react";
import useCategories from "../hooks/useCategories";
import { SimpleGrid } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";

const CategoryGrid = () => {
  const { data } = useCategories();
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding="10px"
    >
      {data?.results.map((category) => (
        <CategoryCard key={category.Id} category={category} />
      ))}
    </SimpleGrid>
  );
};

export default CategoryGrid;
