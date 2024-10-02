import React from "react";
import BankList from "../../models/BankList";
import { FormatNumber, HStack, Table } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";

import { LuTrash2 } from "react-icons/lu";
import AccountList from "../../models/AccountList";
import AccountDetails from "./AccountDetails";
import NewAccountDrawer from "./NewAccountDrawer";
import useInsights from "../../../common/hooks/useInsights";
interface Props {
  account: AccountList;
  onDelete: (account: AccountList) => void;
}
const AccountRow = ({ account, onDelete }: Props) => {
  const { findMostRecentTransaction } = useInsights();
  return (
    <Table.Row key={account.Id + "-row-account"}>
      <Table.Cell w="150px">{account.Name}</Table.Cell>

      <Table.Cell>
        <FormatNumber
          value={account.Balance ?? 0}
          style={"currency"}
          currency="EUR"
        />
      </Table.Cell>

      <Table.Cell>{account.Transactions.length}</Table.Cell>
      <Table.Cell>{findMostRecentTransaction(account.Transactions)}</Table.Cell>
      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <AccountDetails id={0} />
          <NewAccountDrawer />
          <Button
            h="40px"
            w="40px"
            bgColor="red.500"
            onClick={() => onDelete(account)}
          >
            <LuTrash2 />
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default AccountRow;
