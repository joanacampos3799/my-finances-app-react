import Category from "../Category";
import { movementTypes } from "../../common/constants";
import { FaCheck } from "react-icons/fa6";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import IconPicker from "../../common/components/IconPicker";
import { BsChevronDown } from "react-icons/bs";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { Button } from "../../components/ui/button";
import { Card, Input } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react/stack";
import { CloseButton } from "../../components/ui/close-button";
interface Props {
  category: Category;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}
const UpdateCategoryCard = ({ category, setIsEditing }: Props) => {
  const [icon, setIcon] = useState(category.Icon);
  const [selectedCTId, setSelectedCTId] = useState<string>(
    "" + category.CategoryType
  );
  const ref = useRef<HTMLInputElement>(null);
  const updateCategory = useUpdateCategory();
  return (
    <Card.Root>
      <form
        id="update-category-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateCategory({
            Id: category.Id,
            Name:
              ref.current && ref.current.value && ref.current.value !== ""
                ? ref.current.value
                : category.Name,
            Icon: icon,
            CategoryType: +selectedCTId,
            userId: category.userId,
          });
          setIsEditing(false);
        }}
      >
        <Card.Header>
          <HStack justifyContent="space-between">
            <IconPicker iconSize={4} iconParam={icon} setIconParam={setIcon} />
            <Input ref={ref} id="name" placeholder={category.Name} />
            <CloseButton onClick={() => setIsEditing(false)} />
          </HStack>
        </Card.Header>
        <Card.Body>
          <HStack width={"full"} justifyContent="space-between">
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {movementTypes[+selectedCTId].name || "Select Category Type"}{" "}
                  <BsChevronDown />
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuRadioItemGroup
                  value={selectedCTId}
                  onValueChange={(e) => setSelectedCTId(e.value)}
                >
                  {movementTypes?.map((tt) => (
                    <MenuRadioItem value={"" + tt.id} key={tt.id}>
                      {tt.name}
                    </MenuRadioItem>
                  ))}
                </MenuRadioItemGroup>
              </MenuContent>
            </MenuRoot>
            <Button
              variant="ghost"
              aria-label="Complete"
              type="submit"
              form="update-category-form"
            >
              <FaCheck />
            </Button>
          </HStack>
        </Card.Body>
      </form>
    </Card.Root>
  );
};

export default UpdateCategoryCard;
