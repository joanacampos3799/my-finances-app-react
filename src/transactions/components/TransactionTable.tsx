import { Flex, FormatNumber, HStack, Show, Table } from "@chakra-ui/react";
import Transaction from "../model/Transaction";
import { useEffect, useState } from "react";
import useSorting from "../../common/hooks/useSorting";
import TableHeader from "../../common/components/TableHeader";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import TransactionEmptyState from "./TransactionEmptyState";
import TransactionRow from "./TransactionRow";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";

interface Props {
  data: Transaction[];
  fromAccount?: boolean;
  fromCategory?: boolean;
  showFooter?: boolean;
}
const TransactionTable = ({
  data,
  fromAccount,
  fromCategory,
  showFooter,
}: Props) => {
  const { isSorting, getSortingState, sortNumber, sortString } = useSorting();
  const deleteTransaction = useDeleteTransaction();
  const [sortedTransactions, setSortedTransactions] = useState<
    Transaction[] | undefined
  >();
  useEffect(() => {
    if (data.length > 0) setSortedTransactions(data);
  }, [data]);
  const handleDelete = (element: Transaction) => {
    element.deleted = true;
    deleteTransaction(element);
  };
  return (
    <Flex
      justifyContent={"center"}
      bgColor="white"
      gap={2}
      py={2}
      borderRadius={"md"}
      direction={"column"}
      w="full"
    >
      {sortedTransactions && sortedTransactions.length > 0 ? (
        <>
          <Table.Root colorPalette={"teal"} stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader w={"30px"}></Table.ColumnHeader>
                <TableHeader
                  label={"Name"}
                  w={"100px"}
                  isSorting={isSorting("Name")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedTransactions(
                      sortString(data, "Name", "Name", "Id")
                    )
                  }
                />
                <TableHeader
                  label={"Description"}
                  w={"150px"}
                  isSorting={isSorting("Description")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedTransactions(
                      sortString(data, "Description", "Description", "Id")
                    )
                  }
                />
                <TableHeader
                  label={"Amount"}
                  w={"80px"}
                  isSorting={isSorting("Amount")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedTransactions(
                      sortNumber(data, "Amount", "Amount", "Id")
                    )
                  }
                />

                <TableHeader
                  label={"Date"}
                  w={"120px"}
                  isSorting={isSorting("Date")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedTransactions(
                      sortString(data, "Date", "Date", "Id")
                    )
                  }
                />
                <Show when={!fromAccount}>
                  <Table.ColumnHeader w={"100px"}>Account</Table.ColumnHeader>
                </Show>
                <Show when={!fromCategory}>
                  <Table.ColumnHeader w={"100px"}>
                    Categories
                  </Table.ColumnHeader>
                </Show>
                <Table.ColumnHeader w="80px" textAlign={"end"}>
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedTransactions.map((t) => (
                <TransactionRow
                  transaction={t}
                  onDelete={handleDelete}
                  fromAccount={fromAccount!!}
                  fromCategory={fromCategory!!}
                />
              ))}
            </Table.Body>
            <Show when={showFooter}>
              <Table.Footer>
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader>Total</Table.ColumnHeader>
                <Table.ColumnHeader>
                  <FormatNumber
                    value={data.reduce(
                      (total, { Amount }) => (total += Amount),
                      0
                    )}
                    style={"currency"}
                    currency="EUR"
                  />
                </Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Footer>
            </Show>
          </Table.Root>
          <PaginationRoot
            count={sortedTransactions.length}
            pageSize={10}
            page={1}
          >
            <HStack wrap="wrap" justifyContent={"center"}>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </>
      ) : (
        <TransactionEmptyState />
      )}
    </Flex>
  );
};

export default TransactionTable;
