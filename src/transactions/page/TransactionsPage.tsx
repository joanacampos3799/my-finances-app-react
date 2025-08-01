import NewTransactionDrawer from "../components/NewTransactionDrawer";
import { Box, Flex, HStack, Tabs, useBreakpointValue } from "@chakra-ui/react";
import { HelperEntity } from "../../common/helper";
import Transaction from "../model/Transaction";
import useTransactions from "../hooks/useTransactions";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";
import TabContent from "../components/TabContent";
import TransactionEmptyState from "../components/TransactionEmptyState";
import CollapsibleTitle from "../../common/components/CollapsibleTitle";
import DateObj from "../../common/date";
import LoadingPage from "../../common/components/LoadingPage";
import NavbarMobile from "../../hero/components/NavbarMobile";

const TransactionsPage = () => {
  const { transactions, isLoading } = useTransactions();
  const pendingData = useMutationState({
    filters: {
      mutationKey: [queryKeys.transactions],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as Transaction;
    },
  });
  const pendingTransaction = pendingData ? pendingData[0] : null;
  let transData = transactions.data;
  let transCount = transactions.count;

  const helper = new HelperEntity<Transaction>();
  if (pendingTransaction) {
    const now = new Date();
    pendingTransaction.Date = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
    } as DateObj;
    const { tCount, tData } = helper.getPendingData(
      transactions,
      pendingTransaction
    );
    transData = tData;
    transCount = tCount;
  }
  let years: string[] = [];
  if (transData && transCount > 0)
    years = Array.from(
      new Set(transData.map((s) => s.Date.year.toString()))
    ).sort((a, b) => +b - +a);
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isLoading || !transactions.isValueSet) return <LoadingPage />;
  return (
    <Box padding={{ base: "8px", md: "15px" }}>
      <Box>
        <HStack
          flexDirection={"row"}
          alignItems={{ base: "stretch", md: "flex-start" }}
          justifyContent="space-between"
          gap={{ base: 4, md: 0 }}
        >
          {isMobile && <NavbarMobile />}
          <CollapsibleTitle
            title="Transactions"
            description="Welcome to the Transactions Page, where you can easily manage all your expenses and incomes"
          />
          <Flex
            direction={"row"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <NewTransactionDrawer isMobile={isMobile} />
          </Flex>
        </HStack>
      </Box>
      {!transData || transCount === 0 ? (
        <TransactionEmptyState />
      ) : (
        <Box>
          <Tabs.Root defaultValue={years[0]} colorPalette={"teal"}>
            <Tabs.List width={"full"} border={0}>
              {years.map((year) => (
                <Tabs.Trigger key={year} value={year}>
                  {year}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {years.map((year) => (
              <Tabs.Content key={year} value={year}>
                <TabContent
                  transactions={transData.filter(
                    (t) => t.Date.year.toString() === year
                  )}
                />
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Box>
      )}
    </Box>
  );
};

export default TransactionsPage;
