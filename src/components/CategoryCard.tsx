import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  Icon,
  Heading,
  Text,
} from "@chakra-ui/react";
import Category from "../entities/Category";
import { iconMap } from "../constants";
import { TbArrowBarToDown, TbArrowBarUp } from "react-icons/tb";

interface Props {
  category: Category;
}
const CategoryCard = ({ category }: Props) => {
  return (
    <Card>
      <CardHeader>
        <HStack>
          <Icon as={iconMap[category.Icon]}></Icon>
          <Heading>{category.Name}</Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        {category.MonthlySpent && (
          <HStack>
            <Icon as={TbArrowBarUp}> </Icon>
            <Text>{category.MonthlySpent}€</Text>
          </HStack>
        )}
        {category.MonthlyEarned && (
          <HStack>
            <Icon as={TbArrowBarToDown}> </Icon>
            <Text>{category.MonthlyEarned}€</Text>
          </HStack>
        )}
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
