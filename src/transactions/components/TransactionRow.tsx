import Transaction from "../model/Transaction";
import {
  Button,
  FormatNumber,
  HStack,
  Icon,
  Show,
  Table,
} from "@chakra-ui/react";
import CategoryTag from "../../common/components/CategoryTag";
import useDateFilter from "../../common/hooks/useDateFilter";
import NewTransactionDrawer from "./NewTransactionDrawer";
import {
  LuArrowDownToLine,
  LuArrowDownUp,
  LuArrowUpFromLine,
  LuTrash2,
} from "react-icons/lu";

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
        {transaction.transactionType === 0 ? (
          <Icon color={"red.500"}>
            <LuArrowUpFromLine />
          </Icon>
        ) : transaction.transactionType === 1 ? (
          <Icon color={"green.500"}>
            <LuArrowDownToLine />
          </Icon>
        ) : (
          <Icon color={"gray.500"}>
            <LuArrowDownUp />
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
          {transaction.category && (
            <CategoryTag
              category={transaction.category}
              key={transaction.category.Id + "-cat_tag"}
            />
          )}
        </Table.Cell>
      </Show>
      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
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
