import {
  Card,
  CardHeader,
  CardBody,
  HStack,
  Icon,
  Heading,
  Text,
  Tooltip,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Category from "../entities/Category";
import { TbArrowBarToDown, TbArrowBarUp } from "react-icons/tb";
import { useIconPack } from "../hooks/useIconPack";
import { movementTypes } from "../constants";
import { FaEraser, FaPen } from "react-icons/fa6";
import { useRef } from "react";

interface Props {
  category: Category;
}
const CategoryCard = ({ category }: Props) => {
  const iconPack = useIconPack();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(iconPack?.length);
  return (
    <Card>
      <CardHeader>
        <HStack justifyContent="space-between">
          <HStack justifyContent="center">
            <Icon
              as={iconPack?.find((icon) => icon.name === category.Icon)?.icon}
            ></Icon>
            <Heading>{category.Name}</Heading>
          </HStack>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="Delete"
            onClick={onOpen}
            icon={<FaEraser />}
          />
        </HStack>
      </CardHeader>
      <CardBody>
        <HStack justifyContent="space-between">
          {category.MonthlySpent != null && (
            <HStack>
              <Tooltip
                hasArrow
                label={movementTypes[category.CategoryType].name}
              >
                <span>
                  <Icon as={TbArrowBarUp} />
                </span>
              </Tooltip>

              <Text>{category.MonthlySpent.toFixed(2)}€</Text>
            </HStack>
          )}
          {category.MonthlyEarned != null && (
            <HStack>
              <Icon as={TbArrowBarToDown} />
              <Text>{category.MonthlyEarned.toFixed(2)}€</Text>
            </HStack>
          )}
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="Edit"
            icon={<FaPen />}
          />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
