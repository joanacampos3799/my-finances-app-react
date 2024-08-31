import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CategoriesButton = () => {
  return (
    <Link to="/s/categories">
      <Button>Categories</Button>
    </Link>
  );
};

export default CategoriesButton;
