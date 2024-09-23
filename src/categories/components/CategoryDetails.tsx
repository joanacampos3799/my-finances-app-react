import { useState } from "react";
import useCategory from "../hooks/useCategory";
import DialogComponent from "../../common/components/DialogComponent";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import { movementTypes } from "../../common/constants";
import CategoryUpdateForm from "./CategoryUpdateForm";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import useForm from "../../common/hooks/useForm";
import CategoryFormObject from "../model/CategoryFormObject";

interface Props {
  id: number;
}

const CategoryDetails = ({ id }: Props) => {
  const category = useCategory(id);
  const [updating, setUpdating] = useState(false);
  const { values, handleChange } = useForm<CategoryFormObject>({
    Name: category.Name,
    icon: category.Icon,
    selectedTT: "" + category.CategoryType,
  });
  const updateCategory = useUpdateCategory();

  // Move handleUpdate to the parent

  const handleUpdate = () => {
    updateCategory({
      Id: category.Id,
      Name: values.Name,
      Icon: values.icon,
      CategoryType: +values.selectedTT,
      userId: category.userId,
    });
    setUpdating(false);
  };

  return (
    <DialogComponent
      size="lg"
      name={category.Name}
      isAlert={false}
      updating={updating}
      setUpdating={setUpdating}
      handleUpdate={handleUpdate} // Pass handleUpdate to DialogComponent
    >
      <DataListRoot>
        {!updating ? (
          <>
            <DataListItem label="Category Name" value={category.Name} />
            <DataListItem
              label="Category Type"
              value={movementTypes[category.CategoryType].name}
            />
          </>
        ) : (
          <CategoryUpdateForm values={values} handleChange={handleChange} />
        )}
      </DataListRoot>
    </DialogComponent>
  );
};

export default CategoryDetails;
