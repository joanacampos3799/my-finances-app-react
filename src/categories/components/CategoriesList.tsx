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
import { useEffect, useState } from "react";
import usePeriodStore from "../../common/hooks/usePeriodStore";

interface Props {
  categories: Category[];

  categoryTypeId: number;
}
const CategoriesList = ({ categories, categoryTypeId }: Props) => {
  const {
    getSortingState,
    sortString,
    sortNumber,
    isSorting,
    SortTotal,
    SortSum,
  } = useSorting();

  const { period } = usePeriodStore();
  const [sortedCategories, setSortedCategories] =
    useState<Category[]>(categories);
  const [page, setPage] = useState(1);
  const [catCount, setCatCount] = useState(categories.length);
  useEffect(() => {
    setCatCount(categories.length);
    setSortedCategories(categories.slice((page - 1) * size, page * size));
  }, [categories, setSortedCategories, page]);
  const deleteCategory = useDeleteCategory();
  const size = 5;
  const handlePageChange = (page: number) => {
    setPage(page);
    setSortedCategories(sortedCategories.slice((page - 1) * size, page * size));
  };
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
                  onDelete={handleDelete}
                />
              ))}
            </Table.Body>
          </Table.Root>
          <PaginationRoot
            count={catCount}
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
        </Flex>
      ) : (
        <CategoryEmptyState keyname={categoryTypeId + "-empty"} />
      )}
    </Flex>
  );
};

export default CategoriesList;
