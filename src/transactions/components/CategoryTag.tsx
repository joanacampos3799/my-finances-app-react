import React from "react";
import Category from "../../categories/model/Category";
import { Tag } from "../../components/ui/tag";
import { useIconPack } from "../../common/hooks/useIconPack";
import { FaPen } from "react-icons/fa6";
interface Props {
  category: Category;
}
const CategoryTag = ({ category }: Props) => {
  const iconPack = useIconPack();
  const Icon =
    iconPack?.find((icon) => icon.name === category.Icon)?.icon ?? FaPen;
  return (
    <Tag key={category.Id + "-cat"} rounded={"md"} startElement={<Icon />}>
      {category.Name}
    </Tag>
  );
};

export default CategoryTag;
