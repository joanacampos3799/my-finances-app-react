import React from "react";
import NewTransactionDrawer from "../NewTransactionDrawer";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { EmptyState } from "../../../components/ui/empty-state";
import { HStack, Tabs } from "@chakra-ui/react";
import { HelperEntity } from "../../../common/helper";
import Transaction from "../../model/Transaction";
import useTransactions from "../../hooks/useTransactions";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../../common/constants";
import TabContent from "../TabContent";

const TransactionsPage = () => {
  const transactions = useTransactions();
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
    const { tCount, tData } = helper.getPendingData(
      transactions,
      pendingTransaction
    );
    transData = tData;
    transCount = tCount;
  }
  let years: string[] = [];
  if (transData && transCount > 0)
    years = transData.map((s) => s.Date.split("/")[2]).sort((a, b) => +b - +a);
  return (
    <>
      {" "}
      {!transData || transCount === 0 ? (
        <EmptyState
          paddingTop="10%"
          paddingEnd={"25%"}
          icon={<FaMoneyBillTransfer />}
          title="Start adding transactions"
          description="Add a new transaction to get started"
        >
          <NewTransactionDrawer isEmpty />
        </EmptyState>
      ) : (
        <>
          <HStack float={"right"}>
            <NewTransactionDrawer isEmpty />
          </HStack>
          <Tabs.Root defaultValue={years[0]} variant="plain">
            <Tabs.List>
              {years.map((year) => (
                <Tabs.Trigger key={year} value={year}>
                  {year}
                </Tabs.Trigger>
              ))}

              <Tabs.Indicator />
            </Tabs.List>
            {years.map((year) => (
              <Tabs.Content key={year} value={year}>
                <TabContent
                  transactions={transData.filter(
                    (t) => t.Date.split("/")[2] === year
                  )}
                />
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </>
      )}
    </>
  );
};

export default TransactionsPage;