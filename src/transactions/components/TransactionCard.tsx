import { Box, Flex, Text, Icon, Button, HStack } from "@chakra-ui/react";
import CategoryTag from "../../common/components/CategoryTag";
import useDateFilter from "../../common/hooks/useDateFilter";
import NewTransactionDrawer from "./NewTransactionDrawer";
import {
  LuArrowDownToLine,
  LuArrowDownUp,
  LuArrowUpFromLine,
  LuTrash2,
} from "react-icons/lu";
import { FormatNumber } from "@chakra-ui/react";
import Transaction from "../model/Transaction";

interface Props {
  transaction: Transaction;
  onDelete: (tr: Transaction) => void;
  fromAccount?: boolean;
  fromCategory?: boolean;
}

const TransactionCard = ({
  transaction,
  onDelete,
  fromAccount,
  fromCategory,
}: Props) => {
  const { parseDate } = useDateFilter();

  let icon, color;
  if (transaction.transactionType === 0) {
    icon = <LuArrowUpFromLine />;
    color = "red.500";
  } else if (transaction.transactionType === 1) {
    icon = <LuArrowDownToLine />;
    color = "green.500";
  } else {
    icon = <LuArrowDownUp />;
    color = "blue.500";
  }

  return (
    <Box bg="white" borderRadius="md" boxShadow="sm" p={3} mb={3} w="full">
      <Flex align="center" gap={2} mb={2}>
        <Icon color={color}>{icon}</Icon>
        <Text fontWeight="bold" fontSize="lg">
          {transaction.Name}
        </Text>
        <HStack ml="auto">
          <NewTransactionDrawer transaction={transaction} />
          <Button
            h="32px"
            w="32px"
            bgColor="red.500"
            onClick={() => onDelete(transaction)}
          >
            <LuTrash2 />
          </Button>
        </HStack>
      </Flex>
      <Flex direction="column" gap={1}>
        <Text fontSize="sm">
          <b>Description:</b> {transaction.Description}
        </Text>
        <Text fontSize="sm">
          <b>Amount:</b>{" "}
          <FormatNumber
            value={transaction.Amount}
            style="currency"
            currency="EUR"
          />
        </Text>
        <Text fontSize="sm">
          <b>Date:</b> {parseDate(transaction.Date).toDateString()}
        </Text>
        {!fromAccount && (
          <Text fontSize="sm">
            <b>Account:</b> {transaction.accountName}
          </Text>
        )}
        {!fromCategory && transaction.category && (
          <Text fontSize="sm">
            <b>Category:</b>{" "}
            <CategoryTag
              category={transaction.category}
              key={transaction.category.Id + "-cat_tag"}
            />
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default TransactionCard;
