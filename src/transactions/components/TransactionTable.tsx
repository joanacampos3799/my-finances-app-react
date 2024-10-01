import {
  Flex,
  FormatNumber,
  HStack,
  Icon,
  Show,
  Table,
} from "@chakra-ui/react";
import useCategories from "../../categories/hooks/useCategories";
import { useIconPack } from "../../common/hooks/useIconPack";
import useAccounts from "../../manage-banks-accounts/hooks/useAccounts";
import Transaction from "../model/Transaction";
import { useState } from "react";
import { TbArrowBarDown, TbArrowBarUp } from "react-icons/tb";
import { Tag } from "../../components/ui/tag";
import useSorting from "../../common/hooks/useSorting";
import TableHeader from "../../common/components/TableHeader";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import TransactionEmptyState from "./TransactionEmptyState";

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
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const { isSorting, getSortingState, sortNumber, sortString } = useSorting();
  const iconPack = useIconPack();
  const [sortedTransactions, setSortedTransactions] =
    useState<Transaction[]>(data);

  return (
    <>
      {accounts.length > 0 &&
      categories.length > 0 &&
      sortedTransactions.length > 0 ? (
        <Flex direction={"column"} gap={2} py={2} colorPalette={"teal"}>
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
                  <Table.Cell>{t.Date}</Table.Cell>
                  <Show when={!fromAccount}>
                    <Table.Cell>
                      {accounts.find((a) => a.Id === t.accountId) &&
                        accounts.find((a) => a.Id === t.accountId)?.Name}
                    </Table.Cell>
                  </Show>
                  <Show when={!fromCategory}>
                    <Table.Cell>
                      {t.categories.map((val) => {
                        const cat = categories.find((c) => c.Id === val)!!;
                        return (
                          <Tag
                            key={cat.Id + "cat"}
                            rounded={"md"}
                            startElement={
                              <Icon
                                as={
                                  iconPack?.find(
                                    (icon) => icon.name === cat.Icon
                                  )?.icon!!
                                }
                              />
                            }
                          >
                            {cat.Name}
                          </Tag>
                        );
                      })}
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
        </Flex>
      ) : (
        <TransactionEmptyState />
      )}
    </>
  );
};

export default TransactionTable;
