import { BiCategory } from "react-icons/bi";
import { EmptyState } from "../../components/ui/empty-state";

const CategoryEmptyState = () => {
  return (
    <EmptyState
      bgColor={"gray.100"}
      paddingTop="10%"
      icon={<BiCategory />}
      title="Start adding categories"
      description="Add a new Category to get started"
    />
  );
};

export default CategoryEmptyState;
