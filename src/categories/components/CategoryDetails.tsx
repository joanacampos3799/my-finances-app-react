import DialogComponent from "../../common/components/DialogComponent";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import { movementTypes } from "../../common/constants";

import { useUpdateCategory } from "../hooks/useUpdateCategory";
import useForm from "../../common/hooks/useForm";
import CategoryFormObject from "../model/CategoryFormObject";
import Category from "../model/Category";

interface Props {
  category: Category;
}

const CategoryDetails = ({ category }: Props) => {
  return (
    <DialogComponent size="lg" name={category.Name} isAlert={false}>
      <DataListRoot>
        <DataListItem label="Category Name" value={category.Name} />
        <DataListItem
          label="Category Type"
          value={movementTypes[category.CategoryType].name}
        />
      </DataListRoot>
    </DialogComponent>
  );
};

export default CategoryDetails;
