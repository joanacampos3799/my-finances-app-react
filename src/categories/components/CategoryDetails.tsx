import { useRef, useState } from "react";
import useCategory from "../hooks/useCategory";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import DialogComponent from "../../common/components/DialogComponent";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import { HStack, Input } from "@chakra-ui/react";
import { movementTypes } from "../../common/constants";
import RadioMenu from "../../common/components/RadioMenu";
import IconPicker from "../../common/components/IconPicker";

interface Props {
  id: number;
}

const CategoryDetails = ({ id }: Props) => {
  const category = useCategory(id);
  const [updating, setUpdating] = useState(false);
  const [icon, setIcon] = useState(category.Icon);
  const [selectedCTId, setSelectedCTId] = useState<string>(
    "" + category.CategoryType
  );
  const ref = useRef<HTMLInputElement>(null);
  const updateCategory = useUpdateCategory();

  const handleUpdate = () => {
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
    setUpdating(false);
  };
  return (
    <DialogComponent
      size={"lg"}
      name={category.Name}
      isAlert={false}
      updating={updating}
      handleUpdate={handleUpdate}
      setUpdating={setUpdating}
    >
      <DataListRoot>
        {!updating ? (
          <DataListItem label="Category Name" value={category.Name} />
        ) : (
          <DataListItem label="Category Name and Icon" value={""}>
            <HStack>
              {" "}
              <IconPicker
                iconParam={icon}
                iconSize={4}
                setIconParam={setIcon}
              />
              <Input ref={ref} defaultValue={category.Name} />
            </HStack>
          </DataListItem>
        )}

        {!updating ? (
          <DataListItem
            label="Category Type"
            value={movementTypes[category.CategoryType].name}
          />
        ) : (
          <DataListItem label="Category Type" value={""}>
            <RadioMenu
              data={movementTypes}
              selectedId={selectedCTId}
              setSelectedId={setSelectedCTId}
            />
          </DataListItem>
        )}
      </DataListRoot>
    </DialogComponent>
  );
};

export default CategoryDetails;
