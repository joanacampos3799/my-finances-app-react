import { Flex, HStack, Show, Table } from "@chakra-ui/react";

import TableHeader from "../../common/components/TableHeader";
import { useEffect, useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import useSorting from "../../common/hooks/useSorting";
import AccountList from "../models/AccountList";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import AccountRow from "./AccountRow";
import AccountsEmptyState from "./AccountsEmptyState";

interface Props {
  accounts: AccountList[];
  fromInstitution?: boolean;
}

const AccountsTable = ({ accounts, fromInstitution }: Props) => {
  const { getSortingState, sortString, sortNumber, isSorting, SortSum } =
    useSorting();

  const [sortedAccounts, setSortedAccounts] = useState<AccountList[]>(accounts);
  const [page, setPage] = useState(1);
  const [accountCount, setAccountCount] = useState(accounts.length);
  const size = 5;

  useEffect(() => {
    setAccountCount(accounts.length);
    setSortedAccounts(accounts.slice((page - 1) * size, page * size));
  }, [accounts, page, size]);

  const handlePageChange = (page: number) => {
    setPage(page);
    setSortedAccounts(accounts.slice((page - 1) * size, page * size));
  };
  const deleteAccount = useDeleteAccount();
  const handleDelete = (element: AccountList) => {
    element.deleted = true;
    deleteAccount(element);
  };

  return (
    <Flex p={"10px"}>
      {sortedAccounts.length > 0 ? (
        <Flex
          justifyContent={"center"}
          bgColor="white"
          gap={2}
          py={2}
          borderRadius={"md"}
          direction={"column"}
          w="full"
        >
          <Table.Root stickyHeader colorPalette={"teal"}>
            <Table.Header>
              <Table.Row>
                <TableHeader
                  label="Name"
                  w={"100px"}
                  sortFn={() => {
                    setSortedAccounts(
                      sortString(accounts, "Name", "Name", "Id")
                    );
                  }}
                  isSorting={isSorting("Name")}
                  sortingState={getSortingState()}
                />
                <Show when={!fromInstitution}>
                  <TableHeader
                    label="Linked Institution"
                    w={"150px"}
                    sortFn={() => {
                      setSortedAccounts(
                        sortString(
                          accounts,
                          "Institution",
                          "Linked Institution",
                          "Id",
                          "Name"
                        )
                      );
                    }}
                    isSorting={isSorting("Linked Institution")}
                    sortingState={getSortingState()}
                  />
                </Show>
                <TableHeader
                  label="Balance"
                  w={"100px"}
                  sortFn={() => {
                    setSortedAccounts(
                      sortNumber(accounts, "Balance", "Balance", "Id")
                    );
                  }}
                  isSorting={isSorting("Balance")}
                  sortingState={getSortingState()}
                />
                <TableHeader
                  label={"#Transactions"}
                  w={"80px"}
                  isSorting={isSorting("#Tranactions")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedAccounts(
                      SortSum(accounts, "Transactions", "#Transactions", "Id")
                    )
                  }
                />
                <TableHeader
                  label={"Last Transaction"}
                  w={"150px"}
                  isSorting={isSorting("Last Transaction")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedAccounts(
                      SortSum(
                        accounts,
                        "Transactions",
                        "Last Transaction",
                        "Id"
                      )
                    )
                  }
                />
                <TableHeader
                  label={"Type"}
                  w={"80px"}
                  isSorting={isSorting("Type")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedAccounts(
                      sortNumber(accounts, "Type", "Type", "Id")
                    )
                  }
                />

                <Table.ColumnHeader w="80px" textAlign={"end"}>
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedAccounts.map((account) => (
                <AccountRow
                  key={account.Id + "-account"}
                  account={account}
                  fromInstitution={fromInstitution}
                  onDelete={handleDelete}
                />
              ))}
            </Table.Body>
          </Table.Root>
          <PaginationRoot
            count={accountCount}
            pageSize={size}
            page={page}
            onPageChange={(e) => handlePageChange(e.page)}
          >
            <HStack flexWrap={"wrap"} justifyContent={"center"}>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Flex>
      ) : (
        <AccountsEmptyState bgColor="white" />
      )}
    </Flex>
  );
};

export default AccountsTable;