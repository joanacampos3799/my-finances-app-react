import Category from "../Category";
import { TbArrowBarToDown, TbArrowBarUp } from "react-icons/tb";
import { useIconPack } from "../../common/hooks/useIconPack";
import { movementTypes } from "../../common/constants";
import { FaPen } from "react-icons/fa6";
import DeleteCategoryAlert from "./DeleteCategoryAlert";
import { useState } from "react";
import UpdateCategoryCard from "./UpdateCategoryCard";
import { Card, FormatNumber, Heading, HStack, Icon } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { Tooltip } from "../../components/ui/tooltip";

interface Props {
  category: Category;
}
const CategoryCard = ({ category }: Props) => {
  const iconPack = useIconPack();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <UpdateCategoryCard category={category} setIsEditing={setIsEditing} />
      ) : (
        <Card.Root variant={"elevated"}>
          <Card.Header>
            <HStack justifyContent="space-between">
              <HStack justifyContent="center">
                <Icon
                  boxSize={4}
                  as={
                    iconPack?.find((icon) => icon.name === category.Icon)?.icon
                  }
                ></Icon>
                <Heading>{category.Name}</Heading>
              </HStack>

              <DeleteCategoryAlert category={category} />
            </HStack>
          </Card.Header>
          <Card.Body>
            <HStack width={"full"} justifyContent="space-between">
              <HStack>
                {category.MonthlySpent != null && (
                  <HStack>
                    <Tooltip
                      showArrow
                      content={movementTypes[category.CategoryType].name}
                    >
                      <span>
                        <Icon as={TbArrowBarUp} />
                      </span>
                    </Tooltip>

                    <FormatNumber
                      value={category.MonthlySpent}
                      style="currency"
                      currency="EUR"
                    ></FormatNumber>
                  </HStack>
                )}
                {category.MonthlyEarned != null && (
                  <HStack>
                    <Icon as={TbArrowBarToDown} />
                    <FormatNumber
                      value={category.MonthlyEarned}
                      style="currency"
                      currency="EUR"
                    ></FormatNumber>
                  </HStack>
                )}
              </HStack>
              <Button
                variant="ghost"
                colorPalette="gray"
                aria-label="Edit"
                onClick={() => setIsEditing(true)}
              >
                <FaPen />
              </Button>
            </HStack>
          </Card.Body>
        </Card.Root>
      )}
    </>
  );
};

export default CategoryCard;
