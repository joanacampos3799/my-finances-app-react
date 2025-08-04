import {
  Flex,
  FormatNumber,
  HStack,
  Show,
  Table,
  useBreakpointValue,
} from "@chakra-ui/react";
import Transaction from "../model/Transaction";
import { useEffect, useMemo, useState } from "react";
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
import TransactionCard from "./TransactionCard";
import useMonthStore from "../../common/hooks/useMonthStore";

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
  const { getStartEndDates } = useDateFilter();
  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const { startDate, endDate } = getStartEndDates(period, month);
  const deleteTransaction = useDeleteTransaction();
  const [sortedTransactions, setSortedTransactions] =
    useState<Transaction[]>(data);
  const [page, setPage] = useState(1);
  const [transCount, setTransCount] = useState(data.length);
  const filteredData = useMemo(() => {
    if (fromAccount || fromCategory) {
      return data.filter((transaction) => {
        const transactionDate = new Date(
          transaction.Date.year,
          transaction.Date.month - 1,
          transaction.Date.day
        );
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }
    return data;
  }, [data, fromAccount, fromCategory, startDate, endDate]);

  useEffect(() => {
    setTransCount(filteredData.length);
    if (size)
      setSortedTransactions(
        sortDate(
          filteredData.slice((page - 1) * size, page * size),
          "Date",
          "Date",
          "Id",
          "desc"
        )
      );
    else
      setSortedTransactions(
        sortDate(filteredData, "Date", "Date", "Id", "asc")
      );
  }, [filteredData, page, size]);

  const handleDelete = (element: Transaction) => {
    element.deleted = true;
    deleteTransaction(element);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
    if (size)
      setSortedTransactions(filteredData.slice((page - 1) * size, page * size));
  };
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Flex direction="column" gap={2} py={2} borderRadius="md" w="full">
        {sortedTransactions && sortedTransactions.length > 0 ? (
          <>
            {sortedTransactions.map((t) => (
              <TransactionCard
                transaction={t}
                onDelete={handleDelete}
                fromAccount={fromAccount}
                fromCategory={fromCategory}
                key={"tr-card-" + t.Id}
              />
            ))}
            {showFooter && (
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                borderRadius="md"
                p={3}
                mt={2}
                fontWeight="semibold"
                fontSize="md"
              >
                <Flex direction="column" align="start">
                  <span>Total Spent</span>
                  <FormatNumber
                    value={filteredData.reduce(
                      (total, { transactionType, Amount }) => {
                        if (transactionType === 0) return total + Amount;
                        else return total;
                      },
                      0
                    )}
                    style="currency"
                    currency="EUR"
                  />
                </Flex>
                <Flex direction="column" align="end">
                  <span>Total Earned</span>
                  <FormatNumber
                    value={filteredData.reduce(
                      (total, { transactionType, Amount }) => {
                        if (transactionType === 1) return total + Amount;
                        else return total;
                      },
                      0
                    )}
                    style="currency"
                    currency="EUR"
                  />
                </Flex>
              </Flex>
            )}

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
  }

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
                      value={filteredData.reduce(
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
                      value={filteredData.reduce(
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
