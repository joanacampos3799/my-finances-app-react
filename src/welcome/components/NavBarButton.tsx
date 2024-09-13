import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  link: string;
}
const NavBarButton = ({ title, link }: Props) => {
  return (
    <Link to={link}>
      <Button variant="ghost">{title}</Button>
    </Link>
  );
};

export default NavBarButton;
