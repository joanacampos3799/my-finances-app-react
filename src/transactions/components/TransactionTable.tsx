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
import useDateFilter from "../../common/hooks/useDateFilter";
import usePeriodStore from "../../common/hooks/usePeriodStore";

interface Props {
  data: Transaction[];
  fromAccount?: boolean;
  fromCategory?: boolean;
  showFooter?: boolean;
  size?: number;
}
const TransactionTable = ({
  data,
  fromAccount,
  fromCategory,
  showFooter,
  size,
}: Props) => {
  const { isSorting, getSortingState, sortNumber, sortString, sortDate } =
    useSorting();
  const deleteTransaction = useDeleteTransaction();
  const [sortedTransactions, setSortedTransactions] =
    useState<Transaction[]>(data);
  const [page, setPage] = useState(1);
  const [transCount, setTransCount] = useState(data.length);

  useEffect(() => {
    setTransCount(data.length);
    if (size)
      setSortedTransactions(
        sortDate(
          data.slice((page - 1) * size, page * size),
          "Date",
          "Date",
          "Id",
          "desc"
        )
      );
    else setSortedTransactions(sortDate(data, "Date", "Date", "Id", "asc"));
  }, [setSortedTransactions, data, page, size]);

  const handleDelete = (element: Transaction) => {
    element.deleted = true;
    deleteTransaction(element);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
    if (size) setSortedTransactions(data.slice((page - 1) * size, page * size));
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
                      sortString(sortedTransactions, "Name", "Name", "Id")
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
                      sortString(
                        sortedTransactions,
                        "Description",
                        "Description",
                        "Id",
                        undefined,
                        true
                      )
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
                      sortNumber(sortedTransactions, "Amount", "Amount", "Id")
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
                      sortDate(sortedTransactions, "Date", "Date", "Id")
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
                  key={"tr-row-" + t.Id}
                />
              ))}
            </Table.Body>
            <Show when={showFooter}>
              <Table.Footer>
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>Total Spent</Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={data.reduce(
                        (total, { transactionType, Amount }) => {
                          if (transactionType === 0) return total + Amount;
                          else return total;
                        },
                        0
                      )}
                      style={"currency"}
                      currency="EUR"
                    />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>Total Earned</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <FormatNumber
                      value={data.reduce(
                        (total, { transactionType, Amount }) => {
                          if (transactionType === 1) return total + Amount;
                          else return total;
                        },
                        0
                      )}
                      style={"currency"}
                      currency="EUR"
                    />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              </Table.Footer>
            </Show>
          </Table.Root>
          {size && (
            <PaginationRoot
              count={transCount}
              pageSize={size}
              page={page}
              onPageChange={(e) => handlePageChange(e.page)}
            >
              <HStack wrap="wrap" justifyContent={"center"}>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          )}
        </>
      ) : (
        <TransactionEmptyState />
      )}
    </Flex>
  );
};

export default TransactionTable;
