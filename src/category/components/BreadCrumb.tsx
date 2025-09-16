import { BiCategory } from "react-icons/bi";
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "../../components/ui/breadcrumb";
import { LuHome } from "react-icons/lu";

interface Props {
  name: string;
}
const BreadCrumb = ({ name }: Props) => {
  return (
    <BreadcrumbRoot colorPalette={"teal"} variant={"underline"}>
      <BreadcrumbLink href="/s/dashboard">
        <LuHome /> Home
      </BreadcrumbLink>
      <BreadcrumbLink href="/s/categories">
        <BiCategory />
        Categories
      </BreadcrumbLink>
      <BreadcrumbCurrentLink fontWeight={"bold"}>{name}</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  );
};

export default BreadCrumb;
