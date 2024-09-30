import { Flex, HStack, Show, Table } from "@chakra-ui/react";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import Category from "../model/Category";
import CategoryEmptyState from "./CategoryEmptyState";
import useSorting from "../../common/hooks/useSorting";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import TableHeader from "../../common/components/TableHeader";
import CategoryRow from "./CategoryRow";
import { useState } from "react";

interface Props {
  categories: Category[];
  period: string;
  categoryTypeId: number;
}
const CategoriesList = ({ categories, period, categoryTypeId }: Props) => {
  const {
    getSortingState,
    sortString,
    sortNumber,
    isSorting,
    SortTotal,
    SortSum,
  } = useSorting();

  const [sortedCategories, setSortedCategories] =
    useState<Category[]>(categories);
  const deleteCategory = useDeleteCategory();

  const handleDelete = (element: Category) => {
    element.deleted = true;
    deleteCategory(element);
  };

  return (
    <Flex p={"10px"}>
      {sortedCategories.length > 0 ? (
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
                    setSortedCategories(
                      sortString(categories, "Name", "Name", "Id")
                    );
                  }}
                  isSorting={isSorting("Name")}
                  sortingState={getSortingState()}
                />
                <Show when={categoryTypeId !== 2}>
                  <TableHeader
                    label="Total Amount"
                    w={"140px"}
                    sortFn={() => {
                      setSortedCategories(
                        SortTotal(
                          categories,
                          "Transactions",
                          "CategoryType",
                          period,
                          "Total Amount",
                          "Id"
                        )
                      );
                    }} // Add sorting logic if needed
                    isSorting={isSorting("Total Amount")}
                    sortingState={getSortingState()}
                  />
                </Show>
                <Show when={categoryTypeId === 2}>
                  <TableHeader
                    label="Net Balance"
                    w={"150px"}
                    sortFn={() => {
                      setSortedCategories(
                        SortTotal(
                          categories,
                          "Transactions",
                          "CategoryType",
                          period,
                          "Net Balance",
                          "Id"
                        )
                      );
                    }} // Add sorting logic if needed
                    isSorting={isSorting("Net Balance")}
                    sortingState={getSortingState()}
                  />
                  <TableHeader
                    label="Total Expenses"
                    w={"150px"}
                    sortFn={() => {
                      setSortedCategories(
                        SortTotal(
                          categories,
                          "Transactions",
                          "CategoryType",
                          period,
                          "Total Expenses",
                          "Id",
                          0
                        )
                      );
                    }} // Add sorting logic if needed
                    isSorting={isSorting("Total Expenses")}
                    sortingState={getSortingState()}
                  />
                  <TableHeader
                    label="Total Income"
                    w={"150px"}
                    sortFn={() => {
                      setSortedCategories(
                        SortTotal(
                          categories,
                          "Transactions",
                          "CategoryType",
                          period,
                          "Total Income",
                          "Id",
                          1
                        )
                      );
                    }}
                    isSorting={isSorting("Total Income")}
                    sortingState={getSortingState()}
                  />
                </Show>
                <TableHeader
                  label={"#Transactions"}
                  w={"80px"}
                  isSorting={isSorting("#Transactions")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedCategories(
                      SortSum(categories, "Transactions", "#Transactions", "Id")
                    )
                  }
                />
                <Show when={categoryTypeId === 0}>
                  <TableHeader
                    label={`Budget (${period})`}
                    w={"170px"}
                    sortFn={() => {
                      setSortedCategories(
                        sortNumber(categories, "Budget", "Budget", "Id")
                      );
                    }}
                    isSorting={isSorting("Budget")}
                    sortingState={getSortingState()}
                  />

                  <Table.ColumnHeader w={"250px"}>Progress</Table.ColumnHeader>
                </Show>
                <Table.ColumnHeader w="80px" textAlign={"end"}>
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedCategories.map((category) => (
                <CategoryRow
                  key={category.Id + "-category"}
                  category={category}
                  period={period}
                  onDelete={handleDelete}
                />
              ))}
            </Table.Body>
          </Table.Root>
          <PaginationRoot count={sortedCategories.length} pageSize={5} page={1}>
            <HStack wrap="wrap" justifyContent={"center"}>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Flex>
      ) : (
        <CategoryEmptyState keyname={categoryTypeId + "-empty"} />
      )}
    </Flex>
  );
};

export default CategoriesList;
