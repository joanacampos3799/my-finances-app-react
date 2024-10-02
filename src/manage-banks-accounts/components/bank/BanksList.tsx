import { Flex, HStack, Table } from "@chakra-ui/react";

import TableHeader from "../../../common/components/TableHeader";
import { useEffect, useState } from "react";
import { useDeleteBank } from "../../hooks/useDeleteBank";
import BankList from "../../models/BankList";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination";
import useSorting from "../../../common/hooks/useSorting";
import BankRow from "./BankRow";

interface Props {
  banks: BankList[];
}

const BanksList = ({ banks }: Props) => {
  const { getSortingState, sortString, sortNumber, isSorting, SortSum } =
    useSorting();

  const [sortedBanks, setSortedBanks] = useState<BankList[]>(banks);
  const [page, setPage] = useState(1);
  const [bankCount, setBankCount] = useState(banks.length);
  const size = 5;

  useEffect(() => {
    setBankCount(banks.length);
    setSortedBanks(banks.slice((page - 1) * size, page * size)); // Use original `banks`
  }, [banks, page, size]);

  const handlePageChange = (page: number) => {
    setPage(page);
    setSortedBanks(banks.slice((page - 1) * size, page * size)); // Slice `banks`
  };

  const deleteBank = useDeleteBank();
  const handleDelete = (element: BankList) => {
    element.deleted = true;
    deleteBank(element);
  };

  return (
    <Flex p={"10px"}>
      {sortedBanks.length > 0 ? (
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
                    setSortedBanks(sortString(banks, "Name", "Name", "Id"));
                  }}
                  isSorting={isSorting("Name")}
                  sortingState={getSortingState()}
                />
                <TableHeader
                  label="Total Amount"
                  w={"140px"}
                  sortFn={() => {
                    setSortedBanks(
                      sortNumber(banks, "Balance", "Total Amount", "Id")
                    );
                  }}
                  isSorting={isSorting("Total Amount")}
                  sortingState={getSortingState()}
                />
                <TableHeader
                  label={"#Accounts"}
                  w={"80px"}
                  isSorting={isSorting("#Accounts")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedBanks(
                      SortSum(banks, "Accounts", "#Accounts", "Id")
                    )
                  }
                />
                <Table.ColumnHeader w="80px" textAlign={"end"}>
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedBanks.map((bank) => (
                <BankRow
                  key={bank.Id + "-bank"}
                  bank={bank}
                  onDelete={handleDelete}
                />
              ))}
            </Table.Body>
          </Table.Root>
          <PaginationRoot
            count={bankCount}
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
        <div>No banks found.</div>
      )}
    </Flex>
  );
};

export default BanksList;
