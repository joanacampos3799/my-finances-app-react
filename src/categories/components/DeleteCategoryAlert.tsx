import { useState } from "react";
import Category from "../Category";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { Button } from "../../components/ui/button";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTrigger,
} from "../../components/ui/dialog";
import { FaEraser } from "react-icons/fa6";
interface Props {
  category: Category;
}
const DeleteCategoryAlert = ({ category }: Props) => {
  const [open, setOpen] = useState(false);
  const deleteCategory = useDeleteCategory();

  const handleDelete = () => {
    category.Name = "Deleted";
    deleteCategory(category);
    setOpen(false);
  };

  return (
    <DialogRoot
      motionPreset="slide-in-bottom"
      centered
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" aria-label="Delete">
          <FaEraser />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader fontSize="lg" fontWeight="bold">
          Delete Category
        </DialogHeader>

        <DialogBody>
          Are you sure? You can't undo this action afterwards.
        </DialogBody>

        <DialogFooter>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button colorPalette="red" onClick={handleDelete} ml={3}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteCategoryAlert;
