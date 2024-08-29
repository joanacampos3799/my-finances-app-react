import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CategoriesButton = () => {
  return (
    <Link to="/categories">
      <Button>Categories</Button>
    </Link>
  );
};

export default CategoriesButton;
