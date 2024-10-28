import {
  Flex,
  FormatNumber,
  HStack,
  Icon,
  Show,
  Table,
} from "@chakra-ui/react";
import Transaction from "../model/Transaction";
import { useEffect, useState } from "react";
import { TbArrowBarDown, TbArrowBarUp } from "react-icons/tb";
import useSorting from "../../common/hooks/useSorting";
import TableHeader from "../../common/components/TableHeader";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import TransactionEmptyState from "./TransactionEmptyState";
import useDateFilter from "../../common/hooks/useDateFilter";
import CategoryTag from "./CategoryTag";

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
  const { parseDate } = useDateFilter();
  const [sortedTransactions, setSortedTransactions] = useState<
    Transaction[] | undefined
  >();
  useEffect(() => {
    if (data.length > 0) setSortedTransactions(data);
  }, [data]);

  return (
    <Flex direction={"column"} gap={2} py={2} colorPalette={"teal"}>
      {sortedTransactions && sortedTransactions.length > 0 ? (
        <>
          <Table.Root colorPalette={"teal"} stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader></Table.ColumnHeader>
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
                  w={"100px"}
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
                  w={"100px"}
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
                  w={"100px"}
                  isSorting={isSorting("Date")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedTransactions(
                      sortString(data, "Date", "Date", "Id")
                    )
                  }
                />
                <Show when={!fromAccount}>
                  <Table.ColumnHeader>Account</Table.ColumnHeader>
                </Show>
                <Show when={!fromCategory}>
                  <Table.ColumnHeader>Categories</Table.ColumnHeader>
                </Show>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedTransactions.map((t) => (
                <Table.Row key={t.Id + "-transaction"}>
                  <Table.Cell>
                    {t.transactionType === 1 ? (
                      <Icon>
                        <TbArrowBarDown />
                      </Icon>
                    ) : (
                      <Icon>
                        <TbArrowBarUp />
                      </Icon>
                    )}
                  </Table.Cell>
                  <Table.Cell>{t.Name}</Table.Cell>
                  <Table.Cell>{t.Description}</Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={t.Amount}
                      style={"currency"}
                      currency="EUR"
                    />
                  </Table.Cell>
                  <Table.Cell>{parseDate(t.Date).toDateString()}</Table.Cell>
                  <Show when={!fromAccount}>
                    <Table.Cell>{t.accountName}</Table.Cell>
                  </Show>
                  <Show when={!fromCategory}>
                    <Table.Cell>
                      {t.categories.map((val) => (
                        <CategoryTag category={val} key={val.Id + "-cat_tag"} />
                      ))}
                    </Table.Cell>
                  </Show>
                </Table.Row>
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
