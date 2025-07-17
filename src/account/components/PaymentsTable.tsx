import { Flex, HStack, Table } from "@chakra-ui/react";
import useAccountStore from "../hooks/useAccountStore";
import { useEffect, useState } from "react";
import { Payment } from "../Model/Account";
import TableHeader from "../../common/components/TableHeader";
import useSorting from "../../common/hooks/useSorting";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { EmptyState } from "../../components/ui/empty-state";
import { TbReceipt } from "react-icons/tb";
import PaymentRow from "./PaymentRow";

const PaymentsTable = () => {
  const { account } = useAccountStore();
  const { sortString, isSorting, getSortingState, sortNumber, sortDate } =
    useSorting();
  const [sortedPayments, setSortedPayments] = useState<Payment[] | undefined>(
    account.CreditCardPayments
  );
  const [page, setPage] = useState(1);
  const [payCount, setPayCount] = useState(account.CreditCardPayments?.length);
  useEffect(() => {
    setPayCount(account.CreditCardPayments?.length);
    setSortedPayments(
      account.CreditCardPayments?.slice((page - 1) * size, page * size)
    );
  }, [account.CreditCardPayments, setSortedPayments, page]);

  const size = 5;
  const handlePageChange = (page: number) => {
    setPage(page);
    setSortedPayments(sortedPayments?.slice((page - 1) * size, page * size));
  };

  return (
    <Flex p={"10px"}>
      {sortedPayments !== undefined && sortedPayments.length > 0 ? (
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
                  label="Date"
                  w={"100px"}
                  sortFn={() => {
                    setSortedPayments(
                      sortDate(
                        account.CreditCardPayments!!,
                        "Date",
                        "Date",
                        "Id"
                      )
                    );
                  }}
                  isSorting={isSorting("Date")}
                  sortingState={getSortingState()}
                />

                <TableHeader
                  label={"Amount"}
                  w={"80px"}
                  isSorting={isSorting("Amount")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedPayments(
                      sortNumber(
                        account.CreditCardPayments!!,
                        "Amount",
                        "Amount",
                        "Id"
                      )
                    )
                  }
                />
                <TableHeader
                  label={"Account"}
                  w={"80px"}
                  isSorting={isSorting("Account")}
                  sortingState={getSortingState()}
                  sortFn={() =>
                    setSortedPayments(
                      sortString(
                        account.CreditCardPayments!!,
                        "AccountName",
                        "Account",
                        "Id"
                      )
                    )
                  }
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedPayments.map((payment) => (
                <PaymentRow payment={payment} />
              ))}
            </Table.Body>
          </Table.Root>
          <PaginationRoot
            count={payCount!!}
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
          icon={<TbReceipt />}
          title="No payments to this account yet"
          description="Add a new account payment"
        />
      )}
    </Flex>
  );
};

export default PaymentsTable;
