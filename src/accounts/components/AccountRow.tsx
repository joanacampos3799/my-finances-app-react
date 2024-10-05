import { Badge, FormatNumber, HStack, Show, Table } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { LuTrash2 } from "react-icons/lu";
import AccountList from "../models/AccountList";
import AccountDetails from "./AccountDetails";
import NewAccountDrawer from "./NewAccountDrawer";
import useInsights from "../../common/hooks/useInsights";
import { accountTypes } from "../../common/constants";
interface Props {
  account: AccountList;
  fromInstitution?: boolean;
  onDelete: (account: AccountList) => void;
}
const AccountRow = ({ account, onDelete, fromInstitution }: Props) => {
  const { findMostRecentTransaction } = useInsights();

  return (
    <Table.Row key={account.Id + "-row-account"}>
      <Table.Cell w="150px">{account.Name}</Table.Cell>
      <Show when={!fromInstitution}>
        <Table.Cell w="150px">
          {account.Institution ? account.Institution.Name : ""}
        </Table.Cell>
      </Show>

      <Table.Cell>
        <FormatNumber
          value={account.Balance ?? 0}
          style={"currency"}
          currency="EUR"
        />
      </Table.Cell>

      <Table.Cell>
        {account.Transactions && account.Transactions.length}
      </Table.Cell>
      <Table.Cell>{findMostRecentTransaction(account.Transactions)}</Table.Cell>
      <Table.Cell>
        <Badge colorPalette={"teal"}>{accountTypes[account.Type].name}</Badge>
      </Table.Cell>
      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <AccountDetails account={account} />
          <NewAccountDrawer account={account} />
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
