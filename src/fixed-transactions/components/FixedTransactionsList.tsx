import { Flex, HStack, Table, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import FixedTransactionList from "../model/FixedTransactionsList";
import { useUpdateFixedTransaction } from "../hooks/useUpdateFixedTransaction";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { EmptyState } from "../../components/ui/empty-state";
import TableHeader from "../../common/components/TableHeader";
import useSorting from "../../common/hooks/useSorting";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import FixedTransactionRow from "./FixedTransactionRow";
import FixedTransactionCard from "./FixedTransactionCard";

interface Props {
  fixedTransactions: FixedTransactionList[];
}
const FixedTransactionsList = ({ fixedTransactions }: Props) => {
  const updateFixedTransactions = useUpdateFixedTransaction();
  const { getSortingState, sortString, isSorting } = useSorting();
  const [sortedFx, setSortedFx] =
    useState<FixedTransactionList[]>(fixedTransactions);
  const size = 5;
  const handlePageChange = (page: number) => {
    setPage(page);
    setSortedFx(sortedFx.slice((page - 1) * size, page * size));
  };
  const handleDelete = (element: FixedTransactionList) => {
    updateFixedTransactions({
      Id: element.Id,
      Name: element.Name,
      Icon: element.Icon,
      Amount: element.Amount,
      transactionType: element.transactionType,
      userId: element.userId!!,
      PaymentDay: element.PaymentDay,
      Periodicity: element.Periodicity,
      active: !element.active,
      category: element.category.Id!!,
      account: element.Account,
    });
  };
  const [page, setPage] = useState(1);
  const [fxCount, setFxCount] = useState(fixedTransactions.length);

  useEffect(() => {
    setFxCount(fixedTransactions.length);
    setSortedFx(fixedTransactions.slice((page - 1) * size, page * size));
  }, [fixedTransactions, setSortedFx, page]);
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Flex direction="column" gap={3} p={2}>
        {sortedFx.map((fx) => (
          <FixedTransactionCard
            key={fx.Id + "-mobile"}
            fixed={fx}
            onDelete={handleDelete}
          />
        ))}

        <PaginationRoot
          count={fxCount}
          pageSize={size}
          page={page}
          onPageChange={(e) => handlePageChange(e.page)}
        >
          <HStack wrap="wrap" justifyContent="center" mt={2}>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Flex>
    );
  }
  return (
    <Flex p={"10px"}>
      {sortedFx.length > 0 ? (
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
                    setSortedFx(
                      sortString(fixedTransactions, "Name", "Name", "Id")
                    );
                  }}
                  isSorting={isSorting("Name")}
                  sortingState={getSortingState()}
                />
                <TableHeader
                  label="Amount"
                  w={"100px"}
                  sortFn={() => {
                    setSortedFx(
                      sortString(fixedTransactions, "Amount", "Amount", "Id")
                    );
                  }}
                  isSorting={isSorting("Amount")}
                  sortingState={getSortingState()}
                />
                <TableHeader
                  label="Type"
                  w={"100px"}
                  sortFn={() => {
                    setSortedFx(
                      sortString(
                        fixedTransactions,
                        "transactionType",
                        "Type",
                        "Id"
                      )
                    );
                  }}
                  isSorting={isSorting("transactionType")}
                  sortingState={getSortingState()}
                />
                <TableHeader
                  label="Category"
                  w={"100px"}
                  sortFn={() => {
                    setSortedFx(
                      sortString(
                        fixedTransactions,
                        "category",
                        "Category",
                        "Id"
                      )
                    );
                  }}
                  isSorting={isSorting("category")}
                  sortingState={getSortingState()}
                />
                <Table.ColumnHeader w="80px" textAlign={"end"}>
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedFx.map((fx) => (
                <FixedTransactionRow
                  key={fx.Id + "-fixed-tr"}
                  fixed={fx}
                  onDelete={handleDelete}
                />
              ))}
            </Table.Body>
          </Table.Root>
          <PaginationRoot
            count={fxCount}
            pageSize={5}
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
        <EmptyState
          paddingTop="10%"
          icon={<FaMoneyBillTransfer />}
          title="Start adding fixed transactions"
          description="Add a new subscription, bill or fixed income"
        />
      )}
    </Flex>
  );
};

export default FixedTransactionsList;
