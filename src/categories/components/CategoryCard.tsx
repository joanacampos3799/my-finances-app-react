import { TbArrowBarToDown, TbArrowBarUp } from "react-icons/tb";

import { FormatNumber, HStack, Icon } from "@chakra-ui/react";
import Category from "../model/CategoryList";
import ListCard from "../../common/components/ListCard";
import CategoryDetails from "./CategoryDetails";

interface Props {
  category: Category;
}
const CategoryCard = ({ category }: Props) => {
  return (
    <ListCard data={category} icon={category.Icon}>
      <HStack width={"full"} justifyContent="space-between">
        {category.MonthlySpent != null && (
          <HStack>
            <Icon color={"red.600"} as={TbArrowBarUp} />

            <FormatNumber
              value={category.MonthlySpent}
              style="currency"
              currency="EUR"
            ></FormatNumber>
          </HStack>
        )}
        {category.MonthlyEarned != null && (
          <HStack>
            <Icon color={"green.400"} as={TbArrowBarToDown} />
            <FormatNumber
              value={category.MonthlyEarned}
              style="currency"
              currency="EUR"
            ></FormatNumber>
          </HStack>
        )}
        {category.Id !== undefined && !category.deleted && (
          <CategoryDetails id={category.Id} />
        )}
      </HStack>
    </ListCard>
  );
};

export default CategoryCard;
