import { Flex, HStack, Table } from "@chakra-ui/react";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import Category from "../model/Category";
import CategoryEmptyState from "./CategoryEmptyState";
import useSorting from "../../common/hooks/useSorting";
import useAmount from "../../common/hooks/useAmount";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import CategoryHeader from "./CategoryHeader";
import CategoryRow from "./CategoryRow";
import { useState } from "react";

interface Props {
  categories: Category[];
  period: string;
}
const CategoriesList = ({ categories, period }: Props) => {
  const { getSortingState, sortString, sortNumber, isSorting, SortTotal } =
    useSorting();
  const { getTransactionsTotalAmount } = useAmount();
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
                <CategoryHeader
                  label="Name"
                  w={"150px"}
                  sortFn={() => {
                    setSortedCategories(
                      sortString(categories, "Name", "Name", "Id")
                    );
                  }}
                  isSorting={isSorting("Name")}
                  sortingState={getSortingState()}
                />
                <CategoryHeader
                  label="Total Amount"
                  w={"150px"}
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
                <CategoryHeader
                  label={`Budget (${period})`}
                  w={"150px"}
                  sortFn={() => {
                    setSortedCategories(
                      sortNumber(categories, "Budget", "Budget", "Id")
                    );
                  }}
                  isSorting={isSorting("Budget")}
                  sortingState={getSortingState()}
                />
                <Table.ColumnHeader w="300px">Progress</Table.ColumnHeader>
                <Table.ColumnHeader w="80px" textAlign={"end"}>
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedCategories.map((category) => (
                <CategoryRow
                  key={category.Id}
                  category={category}
                  period={period}
                  getTransactionsTotalAmount={getTransactionsTotalAmount}
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
        <CategoryEmptyState />
      )}
    </Flex>
  );
};

export default CategoriesList;
