import React from "react";
import Transaction from "../model/Transaction";
import {
  Button,
  FormatNumber,
  HStack,
  Icon,
  Show,
  Table,
} from "@chakra-ui/react";
import { TbArrowBarDown, TbArrowBarUp } from "react-icons/tb";
import CategoryTag from "../../common/components/CategoryTag";
import useDateFilter from "../../common/hooks/useDateFilter";
import TransactionDetails from "./TransactionDetails";
import NewTransactionDrawer from "./NewTransactionDrawer";
import { LuTrash2 } from "react-icons/lu";

interface Props {
  transaction: Transaction;
  onDelete: (tr: Transaction) => void;
  fromAccount: boolean;
  fromCategory: boolean;
}
const TransactionRow = ({
  transaction,
  onDelete,
  fromAccount,
  fromCategory,
}: Props) => {
  const { parseDate } = useDateFilter();
  return (
    <Table.Row key={transaction.Id + "-transaction"}>
      <Table.Cell>
        {transaction.transactionType === 1 ? (
          <Icon>
            <TbArrowBarDown />
          </Icon>
        ) : (
          <Icon>
            <TbArrowBarUp />
          </Icon>
        )}
      </Table.Cell>
      <Table.Cell>{transaction.Name}</Table.Cell>
      <Table.Cell>{transaction.Description}</Table.Cell>
      <Table.Cell>
        <FormatNumber
          value={transaction.Amount}
          style={"currency"}
          currency="EUR"
        />
      </Table.Cell>
      <Table.Cell>{parseDate(transaction.Date).toDateString()}</Table.Cell>
      <Show when={!fromAccount}>
        <Table.Cell>{transaction.accountName}</Table.Cell>
      </Show>
      <Show when={!fromCategory}>
        <Table.Cell>
          {transaction.categories.map((val) => (
            <CategoryTag category={val} key={val.Id + "-cat_tag"} />
          ))}
        </Table.Cell>
      </Show>
      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <TransactionDetails transaction={transaction} />
          <NewTransactionDrawer transaction={transaction} />
          <Button
            h="40px"
            w="40px"
            bgColor="red.500"
            onClick={() => onDelete(transaction)}
          >
            <LuTrash2 />
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default TransactionRow;
