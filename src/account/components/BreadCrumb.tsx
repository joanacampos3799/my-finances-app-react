import React from "react";
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "../../components/ui/breadcrumb";
import { LuHome, LuWalletCards } from "react-icons/lu";

interface Props {
  name: string;
}
const BreadCrumb = ({ name }: Props) => {
  return (
    <BreadcrumbRoot colorPalette={"teal"} variant={"underline"}>
      <BreadcrumbLink href="/s/dashboard">
        <LuHome /> Home
      </BreadcrumbLink>
      <BreadcrumbLink href="/s/accounts">
        <LuWalletCards />
        Accounts
      </BreadcrumbLink>
      <BreadcrumbCurrentLink fontWeight={"bold"}>{name}</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  );
};

export default BreadCrumb;
